using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class KDDienKSController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNXuLyKiemDinhDienService _gdnxulykiemdinhdienService;
        private readonly IGiayDeNghiDMCungCapDienService _giaydenghiDMCungCapDienService;       

        public KDDienKSController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNXuLyKiemDinhDienService gdnxulykiemdinhdienService,
            IGiayDeNghiDMCungCapDienService giaydenghiDMCungCapDienService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnxulykiemdinhdienService = gdnxulykiemdinhdienService;
            _giaydenghiDMCungCapDienService = giaydenghiDMCungCapDienService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienThietKe", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNKDDienId(Int32 id)
        {
            var model = _gdnxulykiemdinhdienService.Get_GDNXuLyKiemDinhDien_ByGDNDMCCDienId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCDienId(Int32 id)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListGDNDienTTKT(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            //  TTDeNghi = 2 ; TTKiemTraKiemDinh = 0
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_AllByTTKTKD(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        [HttpPost]
        public IActionResult CreateXLKDDien(GDNXuLyKiemDinhDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnxulykiemdinhdienService.CreateGDNXuLyKiemDinhDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpXLKDDien(GDNXuLyKiemDinhDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnxulykiemdinhdienService.UpdateGDNXuLyKiemDinhDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpKetThucKDDien(GDNXuLyKiemDinhDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnxulykiemdinhdienService.UpKetThucKiemDinhDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
