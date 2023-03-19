using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
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
    public class PoDangKyNuocController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDonDangKyService _dondangkyService;
        private readonly ITTDMDangKyService _ttdmdangkyService;
        private readonly IPhongDanhMucService _phongdanhmucService;
        private readonly IHoSoNhanVienService _hosonhanvienService;

        public PoDangKyNuocController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IDonDangKyService dondangkyService,
            ITTDMDangKyService ttdmdangkyService, IPhongDanhMucService phongdanhmucService,
            IHoSoNhanVienService hosonhanvienService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dondangkyService = dondangkyService;
            _ttdmdangkyService = ttdmdangkyService;
            _phongdanhmucService = phongdanhmucService;
            _hosonhanvienService = hosonhanvienService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list 

        [HttpGet]
        public IActionResult PhongByUserName(string UserName)
        {
            var model = _hosonhanvienService.Get_HoSoNhanVien_ByUserName(UserName);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListPhong(string corporationId)
        {
            var model = _phongdanhmucService.Get_PhongDanhMuc_ByCor(corporationId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetDKNuocId(string DangKyNuocId)
        {
            var model = await _dondangkyService.Get_DonDangKy_ByMaDon(DangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListDDK(string KhuVuc, string PhongTo, string keyword, int page, int pageSize, string DanhSachDieuKienTimDK)
        {
            if (DanhSachDieuKienTimDK == "%")
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_AllPaging(KhuVuc, PhongTo, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_AllPagingDsDieuKienTim(KhuVuc, PhongTo, DanhSachDieuKienTimDK, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }            
        }

        [HttpGet]
        public IActionResult LichSuDDK(string MADDK)
        {
            var model = _dondangkyService.Get_DonDangKy_ByLichSuDDK(MADDK);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult LishHsKemTheo(string tencot)
        {
            var model = _ttdmdangkyService.Get_TTDMDangKy_ByTenCot(tencot);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        [HttpPost]       
        public async Task<IActionResult> SaveDon(DonDangKyViewModel dondangky)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _dondangkyService.Create_DonDangKy(dondangky, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDon(DonDangKyViewModel dondangky)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _dondangkyService.Update_DonDangKy(dondangky, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpXuLy(DonDangKyViewModel dondangky)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _dondangkyService.Update_DonDangKy_ByXuLyDon(dondangky, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpTuChoi(DonDangKyViewModel dondangky)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _dondangkyService.Update_DonDangKy_ByTuChoiDon(dondangky, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpPhucHoi(DonDangKyViewModel dondangky)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNHAPTT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _dondangkyService.Update_DonDangKy_ByPhucHoiTuChoiDon(dondangky, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
