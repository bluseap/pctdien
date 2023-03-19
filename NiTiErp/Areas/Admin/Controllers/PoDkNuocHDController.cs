using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Helpers;
using NiTiErp.Utilities.Dtos;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class PoDkNuocHDController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDonDangKyService _dondangkyService;
        private readonly IPoHopDongService _pohopdongService;
       

        public PoDkNuocHDController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IDonDangKyService dondangkyService,
            IPoHopDongService pohopdongService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dondangkyService = dondangkyService;
            _pohopdongService = pohopdongService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCHD", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public async Task<IActionResult> GetHDNuocId(string DangKyNuocId)
        {
            var model = await _pohopdongService.Get_HopDong_ByMaDon(DangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListHD(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _dondangkyService.Get_DonDangKy_ByHopDong(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListChuanBiHD(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _dondangkyService.Get_DonDangKy_ByChuanBiHopDong(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, Update, Delete

        [HttpPost]
        public async Task<IActionResult> SaveHopDong(PoHopDongViewModel hopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCHD", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pohopdongService.Create_HopDong(hopdong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpHopDong(PoHopDongViewModel hopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCHD", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pohopdongService.Update_HopDong(hopdong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult InHDNuoc(string MADDK)
        {
            var thayhopdong = _pohopdongService.Get_HopDong_ByMaDon(MADDK).Result;

            string makv = thayhopdong.MAKV;

            HttpContext.Session.SetString("MaKV", makv);

            HttpContext.Session.SetString("SoHDMoi", MADDK);
            HttpContext.Session.SetString("TenKH", thayhopdong.TENKH.ToUpper());
            HttpContext.Session.SetString("DiaChiLD", thayhopdong.SONHA);
            HttpContext.Session.SetString("DanhSo", thayhopdong.MADP.ToUpper() + thayhopdong.MADB.ToUpper());
            HttpContext.Session.SetString("NgayHieuLuc", thayhopdong.NGAYHL.ToString("dd/MM/yyyy"));

            HttpContext.Session.SetString("NgayKyHD", thayhopdong.NGAYKT.Day.ToString());
            HttpContext.Session.SetString("ThangKyHD", thayhopdong.NGAYKT.Month.ToString());
            HttpContext.Session.SetString("NamKyHD", thayhopdong.NGAYKT.Year.ToString());
            HttpContext.Session.SetString("TaiXN", thayhopdong.TENKV.ToUpper());

            HttpContext.Session.SetString("NguoiDaiDien", thayhopdong.TENKH.ToUpper() != null ? thayhopdong.TENKH.ToUpper() : "");
            HttpContext.Session.SetString("NguoiUyQuyen", "");
            HttpContext.Session.SetString("TenChucVu", "");
            HttpContext.Session.SetString("CMND", thayhopdong.CMND != null ? thayhopdong.CMND : "");
            HttpContext.Session.SetString("NgayCap", thayhopdong.CAPNGAY.Day.ToString());
            HttpContext.Session.SetString("ThangCap", thayhopdong.CAPNGAY.Month.ToString());
            HttpContext.Session.SetString("NamCap", thayhopdong.CAPNGAY.Year.ToString());
            HttpContext.Session.SetString("TaiDau", thayhopdong.TAI != null ? thayhopdong.TAI : "");

            HttpContext.Session.SetString("SoGiayUyQuyen", "");
            HttpContext.Session.SetString("NgayUyQuyen", DateTime.Now.ToString("dd/MM/yyyy"));
            HttpContext.Session.SetString("DiaChiKH", thayhopdong.DiaChiKH != null ? thayhopdong.DiaChiKH : "");

            HttpContext.Session.SetString("MaSoThueMoi", "");
            HttpContext.Session.SetString("DienThoai", thayhopdong.DIENTHOAI != null ? thayhopdong.DIENTHOAI : "");

            HttpContext.Session.SetString("NgayHLHD", thayhopdong.NGAYHL.Day.ToString());
            HttpContext.Session.SetString("ThangHLHD", thayhopdong.NGAYHL.Month.ToString());
            HttpContext.Session.SetString("NamKyHLHD", thayhopdong.NGAYHL.Year.ToString());

            HttpContext.Session.SetString("MaKhachHang", "");

            return new OkObjectResult(thayhopdong);
        }

        #endregion

    }
}
