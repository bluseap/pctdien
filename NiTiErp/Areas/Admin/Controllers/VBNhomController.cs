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
    public class VBNhomController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IVanBanNhomXuLyService _vanbannhomxulyService;

        public VBNhomController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IVanBanNhomXuLyService vanbannhomxulyService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _vanbannhomxulyService = vanbannhomxulyService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");

            return View();
        }

        #region AJAX API

        public IActionResult NvToNhom(int nhomxulyId, Guid hosonhanvienId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _vanbannhomxulyService.Create_VanBanNhomNhanVien(nhomxulyId, hosonhanvienId, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult Update(VanBanNhomXuLyViewModel nhomxuly)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _vanbannhomxulyService.Update_VanBanNhomXuLy_ById(nhomxuly, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult Create(VanBanNhomXuLyViewModel nhomxuly)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _vanbannhomxulyService.Create_VanBanNhomXuLy_ByCorCode(nhomxuly, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult AddUpdateVBNXL(VanBanNhomXuLyViewModel vanbannhomxulyVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var username = User.GetSpecificClaim("UserName");

                vanbannhomxulyVm.CreateBy = username;
                vanbannhomxulyVm.CreateDate = DateTime.Now;
                vanbannhomxulyVm.UpdateBy = username;
                vanbannhomxulyVm.UpdateDate = DateTime.Now;

                if (vanbannhomxulyVm.InsertVanBanNhomXuLyId == 1)
                {
                    var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Create); // nhap danh muc van ban nhom xu ly
                    if (result.Result.Succeeded == false)
                    {
                        return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm mới."));
                    }

                    var chiphi = _vanbannhomxulyService.VanBanNhomXuLyAUD(vanbannhomxulyVm, "InVanBanNhomXuLy");
                    return new OkObjectResult(chiphi);
                }
                else
                {
                    var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Update); //  nhap danh muc van ban nhom xu ly
                    if (result.Result.Succeeded == false)
                    {
                        return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền sửa."));
                    }

                    var chiphi = _vanbannhomxulyService.VanBanNhomXuLyAUD(vanbannhomxulyVm, "UpVanBanNhomXuLy");
                    return new OkObjectResult(chiphi);
                }
            }
        }

        [HttpGet]
        public IActionResult NhomLanhDaoDuyetGetList(int nhomid)
        {
            var hosonewguid = new Guid();

            var model = _vanbannhomxulyService.VanBanNhomXuLyGetList("", hosonewguid, "", nhomid
                , "", "GetAllVanBanNhomXuLyId");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult NhomLanhDaoKyGetList(string corporationId)
        {
            var hosonewguid = new Guid();

            var model = _vanbannhomxulyService.VanBanNhomXuLyGetList("", hosonewguid, "", 1
                , corporationId, "GetAllNhomXuLyLDKVB");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNVByNhomXL(int nhomxulyId)
        {
            var model = _vanbannhomxulyService.Get_VanBanNhomNhanVien_ByNhomXuLyId(nhomxulyId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNVByCorCode(string corporationId, string codenhomxuly)
        {          
            var model = _vanbannhomxulyService.Get_VanBanNhomNhanVien_ByCorCodeNhomXL(corporationId, codenhomxuly);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNhomXuLy(string corporationId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";            
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _vanbannhomxulyService.Get_VanBanNhomXuLy_AllPaging(khuvuc, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetId(int nhomxulyid)
        {
            var model = _vanbannhomxulyService.Get_VanBanNhomXuLy_ById(nhomxulyid);

            return new OkObjectResult(model);
        }

        [HttpPost]
        public IActionResult XoaNhanVien(int nhomxulyId, Guid hosonhanvienId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANHMUCVANBANNHOM", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var daotao = _vanbannhomxulyService.Delete_VanBanNhomNhanVien(nhomxulyId, hosonhanvienId, updateDate, updateBy);

                return new OkObjectResult(daotao);
            }
        }

        #endregion


    }
}