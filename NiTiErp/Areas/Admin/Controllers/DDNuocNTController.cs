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
    public class DDNuocNTController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNNghiemThuNuocService _gdnnghiemthunuocService;
        private readonly IGiayDeNghiDMCungCapNuocService _giaydenghiDMCungCapNuocService;

        public DDNuocNTController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNNghiemThuNuocService gdnnghiemthunuocService,
            IGiayDeNghiDMCungCapNuocService giaydenghiDMCungCapNuocService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnnghiemthunuocService = gdnnghiemthunuocService;
            _giaydenghiDMCungCapNuocService = giaydenghiDMCungCapNuocService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocNghiemThu", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNNTNuocId(Int32 id)
        {
            var model = _gdnnghiemthunuocService.Get_GDNNghiemThuNuoc_ByGDNDMCCNuocId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCNuocId(Int32 id)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListGDNNuocTTNT(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_AllByTTNT(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        public IActionResult CreateGDNTCNuoc(GDNNghiemThuNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocNghiemThu", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnnghiemthunuocService.CreateGDNNghiemThuNuoc(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpGDNNTNuoc(GDNNghiemThuNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocNghiemThu", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnnghiemthunuocService.UpGDNNghiemThuNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
