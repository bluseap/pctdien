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
    public class DDNuocTCController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNThiCongNuocService _gdnthicongnuocService;
        private readonly IGiayDeNghiDMCungCapNuocService _giaydenghiDMCungCapNuocService;

        public DDNuocTCController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNThiCongNuocService gdnthicongnuocService,
            IGiayDeNghiDMCungCapNuocService giaydenghiDMCungCapNuocService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnthicongnuocService = gdnthicongnuocService;
            _giaydenghiDMCungCapNuocService = giaydenghiDMCungCapNuocService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThiCong", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNTCNuocId(Int32 id)
        {
            var model = _gdnthicongnuocService.Get_GDNThiCongNuoc_ByGDNDMCCNuocId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCNuocId(Int32 id)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListGDNNuocTTTC(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_AllByTTTC(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        public IActionResult CreateGDNTCNuoc(GDNThiCongNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThiCong", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthicongnuocService.CreateGDNThiCongNuoc(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpGDNTCNuoc(GDNThiCongNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThiCong", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthicongnuocService.UpGDNThiCongNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
