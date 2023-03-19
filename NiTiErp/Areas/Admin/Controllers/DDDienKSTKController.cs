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
    public class DDDienKSTKController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNThietKeDienService _gdnthietkedienService;
        private readonly IGiayDeNghiDMCungCapDienService _giaydenghiDMCungCapDienService;
        private readonly IPhongDanhMucService _phongdanhmucService;

        public DDDienKSTKController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGDNThietKeDienService gdnthietkedienService,
            IGiayDeNghiDMCungCapDienService giaydenghiDMCungCapDienService,
            IPhongDanhMucService phongdanhmucService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnthietkedienService = gdnthietkedienService;
            _giaydenghiDMCungCapDienService = giaydenghiDMCungCapDienService;
            _phongdanhmucService = phongdanhmucService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetGDNTKDienId(Int32 id)
        {
            var model = _gdnthietkedienService.Get_GDNThietKeDien_ByGDNDMCCDienId(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDMCCDienId(Int32 id)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListGDNDienTTTK(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_AllByTTTK(khuvuc, phong, tukhoa, page, pageSize);

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
        public IActionResult CreateGDNTKDien(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.CreateGDNThietKeDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult CreateKetThucDDDien(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.CreateGDNThietKeDienKetThucDD(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpGDNTKDien(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.UpdateGDNThietKeDien(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpKSTKDien(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.UpdateKhaoSatThietKeDien(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult Up2KSTKDien(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.UpKhaoSatThietKeDienNoDuyet(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpDuyetTK(GDNThietKeDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DiDoiDienThietKe", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _gdnthietkedienService.UpDuyetThietKeDien(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
