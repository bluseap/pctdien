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
    public class DDDienTCController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNThiCongDienService _gdnthicongdienService;
        private readonly IGiayDeNghiDMCungCapDienService _giaydenghiDMCungCapDienService;

        public DDDienTCController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNThiCongDienService gdnthicongdienService,
            IGiayDeNghiDMCungCapDienService giaydenghiDMCungCapDienService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnthicongdienService = gdnthicongdienService;
            _giaydenghiDMCungCapDienService = giaydenghiDMCungCapDienService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThiCong", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNTCDienId(Int32 id)
        {
            var model = _gdnthicongdienService.Get_GDNThiCongDien_ByGDNDMCCDienId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCDienId(Int32 id)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListGDNDienTTTC(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_AllByTTTC(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        public IActionResult CreateGDNTCDien(GDNThiCongDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThiCong", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthicongdienService.CreateGDNThiCongDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpGDNTCDien(GDNThiCongDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThiCong", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthicongdienService.UpGDNThiCongDien(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
