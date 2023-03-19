using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
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
    public class PoKyLaiHDDienController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IThayHopDongPoService _thayhopdongpoService;
        private readonly IMDSDPOService _mdsdpoService;
        //private readonly IThanhPhoTinhService _thanhphotinhService;
        private readonly IKhachHangPoService _khachhangpoService;
        //private readonly IPoDMDieuKienService _podieukienService;
        private readonly ILockStatusPoService _lockstatuspoService;

        public PoKyLaiHDDienController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, 
            IThayHopDongPoService thayhopdongpoService,
            IMDSDPOService mdsdpoService,
            //IThanhPhoTinhService thanhphotinhService,  IPoDMDieuKienService podieukienService,
            IKhachHangPoService khachhangpoService,
            ILockStatusPoService lockstatuspoService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _thayhopdongpoService = thayhopdongpoService;
            _mdsdpoService = mdsdpoService;
            //_thanhphotinhService = thanhphotinhService;
            _khachhangpoService = khachhangpoService;
            //_podieukienService = podieukienService;
            _lockstatuspoService = lockstatuspoService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDDien", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetListTHD(string KhuVuc, string LoaiHopDong, string DSHopDongTheo, string keyword,
            int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            if (LoaiHopDong == "0" && DSHopDongTheo == "0")
            {
                var model = _thayhopdongpoService.Get_ThayHopDongPo_AllPaging(KhuVuc, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else if (LoaiHopDong != "0" && DSHopDongTheo == "0")
            {
                var model = _thayhopdongpoService.Get_ThayHopDongPo_ByLoaiHopDongPaging(KhuVuc, LoaiHopDong, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var model = _thayhopdongpoService.Get_ThayHopDongPo_ByDsHopDongTheoPaging(KhuVuc, DSHopDongTheo, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult KhoaSo(string MaKhachHangPo, int THANG, int NAM)
        {
            var model = _lockstatuspoService.Get_LockStatusPo_ByMaDPPoKyThay(MaKhachHangPo, THANG, NAM);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetTHDId(string ThayHopDongPoIdMakvPo)
        {
            var model = _thayhopdongpoService.Get_ThayHopDongPo_ByIdMakvPo(ThayHopDongPoIdMakvPo);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult TimKHDien(string KhuVuc, string DieuKien)
        {
            var tukhoa = !string.IsNullOrEmpty(DieuKien) ? DieuKien : "%";

            var model = _khachhangpoService.Get_KhachHangPo_ByDieuKien(KhuVuc, tukhoa);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListMDSD()
        {
            var model = _mdsdpoService.Get_MDSDPO_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetKHId(string MaKhachHang)
        {
            var model = _khachhangpoService.Get_KhachHangPo_ByMaKhachHang(MaKhachHang);
            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, Update, Delete, Report

        [HttpPost]
        public async Task<IActionResult> SaveThayHDong(ThayHopDongPoViewModel thayhopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDDien", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = await _thayhopdongpoService.Create_ThayHopDongPo(thayhopdong, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpThayHDong(ThayHopDongPoViewModel thayhopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDDien", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = await _thayhopdongpoService.Update_ThayHopDongPo(thayhopdong, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult InTHDDien(string ThayHopDongPoIdMaKvPo)
        {
            var thayhopdong = _thayhopdongpoService.Get_ThayHopDongPo_ByIdMakvPo(ThayHopDongPoIdMaKvPo).Result;

            string makv = ThayHopDongPoIdMaKvPo.Substring(0, 1);

            HttpContext.Session.SetString("MaKV", makv);

            HttpContext.Session.SetString("SoHDMoi", thayhopdong.SOHDMOI);
            HttpContext.Session.SetString("TenKH", thayhopdong.TENKHMOI.ToUpper());
            HttpContext.Session.SetString("DiaChiLD", thayhopdong.DIACHILD);
            HttpContext.Session.SetString("DanhSo", thayhopdong.MADPPO.ToUpper() + thayhopdong.MADBPO.ToUpper());
            HttpContext.Session.SetString("NgayHieuLuc", thayhopdong.NGAYHL.ToString("dd/mm/YYYY"));

            HttpContext.Session.SetString("NgayKyHD", thayhopdong.NGAYKT.Day.ToString());
            HttpContext.Session.SetString("ThangKyHD", thayhopdong.NGAYKT.Month.ToString());
            HttpContext.Session.SetString("NamKyHD", thayhopdong.NGAYKT.Year.ToString());
            HttpContext.Session.SetString("TaiXN", thayhopdong.TENKV.ToUpper());

            HttpContext.Session.SetString("NguoiDaiDien", thayhopdong.TENKHMOI != null ? thayhopdong.TENKHMOI.ToUpper() : "");
            HttpContext.Session.SetString("NguoiUyQuyen", thayhopdong.UYQUYEN != null ? thayhopdong.UYQUYEN.ToUpper() : "");
            HttpContext.Session.SetString("TenChucVu", thayhopdong.TENCHUCVU != null ? thayhopdong.TENCHUCVU.ToUpper() : "");
            HttpContext.Session.SetString("CMND", thayhopdong.CMND != null ? thayhopdong.CMND : "");
            HttpContext.Session.SetString("NgayCap", thayhopdong.CAPNGAY.Day.ToString());
            HttpContext.Session.SetString("ThangCap", thayhopdong.CAPNGAY.Month.ToString());
            HttpContext.Session.SetString("NamCap", thayhopdong.CAPNGAY.Year.ToString());
            HttpContext.Session.SetString("TaiDau", thayhopdong.TAI != null ? thayhopdong.TAI : "");

            HttpContext.Session.SetString("SoGiayUyQuyen", thayhopdong.SoGiayUyQuyen != null ? thayhopdong.SoGiayUyQuyen : "");
            HttpContext.Session.SetString("NgayUyQuyen", thayhopdong.NgayUyQuyen.ToString("dd/mm/YYYY"));
            HttpContext.Session.SetString("DiaChiKH", thayhopdong.DiaChiKH != null ? thayhopdong.DiaChiKH : "");

            HttpContext.Session.SetString("MaSoThueMoi", thayhopdong.MaSoThueMoi != null ? thayhopdong.MaSoThueMoi : "");
            HttpContext.Session.SetString("DienThoai", thayhopdong.DIENTHOAI != null ? thayhopdong.DIENTHOAI : "");

            HttpContext.Session.SetString("NgayHLHD", thayhopdong.NGAYHL.Day.ToString());
            HttpContext.Session.SetString("ThangHLHD", thayhopdong.NGAYHL.Month.ToString());
            HttpContext.Session.SetString("NamKyHLHD", thayhopdong.NGAYHL.Year.ToString());

            HttpContext.Session.SetString("MaKhachHangPo", thayhopdong.IDKHPO);            

            return new OkObjectResult(thayhopdong);     
        }

        #endregion

    }
}
