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

using Microsoft.AspNetCore.Http.Extensions;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class PoDkNuocTCController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDonDangKyService _dondangkyService;
        private readonly IThiCongService _thicongService;
        private readonly IDongHoService _donghoService;

        public PoDkNuocTCController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IDonDangKyService dondangkyService, IThiCongService thicongService,
            IDongHoService donghoService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dondangkyService = dondangkyService;
            _thicongService = thicongService;
            _donghoService = donghoService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public async Task<IActionResult> GetDongHoId(string MaDongHoId, string CorporationId)
        {
            var model = await _donghoService.Get_DongHo_ByMaDongHo(MaDongHoId, CorporationId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult SoNoDH(string KhuVuc, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
            var model = _donghoService.Get_DongHo_ByChuaSuDung(KhuVuc, tukhoa, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetTCNuocId(string DangKyNuocId)
        {
            var model = await _thicongService.Get_ThiCong_ByMaDon(DangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListTC(string KhuVuc, string PhongTo, string keyword, int page, int pageSize, string DanhSachDieuKienTimDK)
        {
            if (DanhSachDieuKienTimDK == "%")
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_ByThiCong(KhuVuc, PhongTo, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_ByThiCongDsDieuKienTim(KhuVuc, PhongTo, DanhSachDieuKienTimDK, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult ListChuanBiTC(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _dondangkyService.Get_DonDangKy_ByChuanBiThiCong(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, Update, Delete

        [HttpPost]
        public async Task<IActionResult> SaveTC(ThiCongViewModel thicong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thicongService.Create_ThiCong(thicong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTC(ThiCongViewModel thicong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thicongService.Update_ThiCong(thicong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        [RequestSizeLimit(2147483647)]        
        public async Task<IActionResult> UpdateTCSoNo(ThiCongViewModel thicong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thicongService.Update_ThiCong_BySoNoDH(thicong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        public async Task<IActionResult> UpdateTCSuaSoNo(ThiCongViewModel thicong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thicongService.Update_ThiCong_BySuaSoNoDH(thicong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpTraVeTK(ThiCongViewModel thicong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTC", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thicongService.Update_ThiCong_ByTraVeTK(thicong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
