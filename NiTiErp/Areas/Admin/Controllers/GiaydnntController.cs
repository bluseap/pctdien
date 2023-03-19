using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
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
    public class GiaydnntController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGiayDeNghiQuaTrinhCungCapService _gdnqtccService;
        private readonly IDMCungCapDichVuService _dmcungcapdichvuService;
        private readonly IGiayDeNghiDMCungCapNuocService _giaydenghiDMCungCapNuocService;
        //private readonly IVBAutocompleteService _vbAutocompleteServices;

        public GiaydnntController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGiayDeNghiQuaTrinhCungCapService gdnqtccService, IDMCungCapDichVuService dmcungcapdichvuService,
            IGiayDeNghiDMCungCapNuocService giaydenghiDMCungCapNuocService//,
            //IVBAutocompleteService vbAutocompleteServices
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnqtccService = gdnqtccService;
            _dmcungcapdichvuService = dmcungcapdichvuService;
            _giaydenghiDMCungCapNuocService = giaydenghiDMCungCapNuocService;
            //_vbAutocompleteServices = vbAutocompleteServices;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiTim", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GDNQTCCN(Int32 GiayDeNghiDMCungCapNuocId)
        {
            var model = _gdnqtccService.Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc(true, GiayDeNghiDMCungCapNuocId, 0, 1, 1000);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListGDNNuoc(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_Tim(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        

    }
}
