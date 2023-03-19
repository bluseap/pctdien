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
    public class DDNuocKSTKController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNThietKeNuocService _gdnthietkenuocService;
        private readonly IGiayDeNghiDMCungCapNuocService _giaydenghiDMCungCapNuocService;
        private readonly IPhongDanhMucService _phongdanhmucService;

        public DDNuocKSTKController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNThietKeNuocService gdnthietkenuocService,
            IGiayDeNghiDMCungCapNuocService giaydenghiDMCungCapNuocService,
            IPhongDanhMucService phongdanhmucService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnthietkenuocService = gdnthietkenuocService;
            _giaydenghiDMCungCapNuocService = giaydenghiDMCungCapNuocService;
            _phongdanhmucService = phongdanhmucService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNTKNuocId(Int32 id)
        {
            var model = _gdnthietkenuocService.Get_GDNThietKeNuoc_ByGDNDMCCNuocId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCNuocId(Int32 id)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ById(id);
            return new OkObjectResult(model);
        }        

        [HttpGet]
        public IActionResult ListGDNNuocTTTK(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_AllByTTTK(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListPhongUserName(string makv)
        {
            string userName = User.GetSpecificClaim("UserName");

            var model = _phongdanhmucService.PhongDanhMucGetList(makv, userName, "", "ListPhongMaKVUserName");
            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete


        [HttpPost]
        public IActionResult CreateGDNTKNuoc(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.CreateGDNThietKeNuoc(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult CreateKetThucDDNuoc(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.CreateGDNThietKeNuocKetThucDD(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpGDNTKNuoc(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.UpdateGDNThietKeNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpKSTKNuoc(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.UpdateKhaoSatThietKeNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult Up2KSTKNuoc(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.UpKhaoSatThietKeNuocNoDuyet(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpDuyetTK(GDNThietKeNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiNuocThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkenuocService.UpDuyetThietKeNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
