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
    public class KDDienBBTTController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGDNXuLyKiemDinhDienService _gdnxulykiemdinhdienService;
        private readonly IGiayDeNghiDMCungCapDienService _giaydenghiDMCungCapDienService;        

        public KDDienBBTTController(IHostingEnvironment hostingEnvironment,
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
            var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienKeQua", Operations.Read);
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
        public IActionResult ListGDNDienTTXL(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            //  TTDeNghi = 2 ; TTKiemTraKiemDinh = 2
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_AllByTTXLKD(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        [HttpPost]
        public IActionResult XLKDDienBBTT(GDNXuLyKiemDinhDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienKeQua", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnxulykiemdinhdienService.UpdateGDNXuLyKiemDinhDienBBTT(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult XLKDDienBBTTUp(GDNXuLyKiemDinhDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KiemDinhDienKeQua", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _gdnxulykiemdinhdienService.UpdateGDNXuLyKiemDinhDienBBTTUp(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        #endregion


    }
}
