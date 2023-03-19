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
    public class HsNhomHsController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IHsNhomHoSoDMService _hsnhomhsdmService;

        public HsNhomHsController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IHsNhomHoSoDMService hsnhomhsdmService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _hsnhomhsdmService = hsnhomhsdmService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "HoSoNhomHoSo", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View(); 
        }

        #region Get list

        [HttpGet]
        public IActionResult GetNhomHs(int hsnhomhsid)
        {
            var model = _hsnhomhsdmService.Get_HsNhomHoSoDM_ById(hsnhomhsid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNhomHs(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _hsnhomhsdmService.Get_HsNhomHoSoDM_AllPaging(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }
        #endregion

        #region Create, Update, Delete

        public IActionResult Create(HsNhomHoSoDMViewModel nhomhs)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhomHoSo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsnhomhsdmService.Create_HsNhomHoSoDM(nhomhs, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult Update(HsNhomHoSoDMViewModel nhomhs)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhomHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _hsnhomhsdmService.Update_HsNhomHoSoDM(nhomhs, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion


    }
}
