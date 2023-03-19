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
    public class HsKeBaoController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IHoSoNhanVienService _hsnvService;
        private readonly IHsKeTuBaoService _hsketubaoService;
        private readonly IPhongDanhMucService _phongdanhmucService;

        public HsKeBaoController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IHoSoNhanVienService hsnvService,
            IHsKeTuBaoService hsketubaoService,
            IPhongDanhMucService phongdanhmucService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _hsnvService = hsnvService;
            _hsketubaoService = hsketubaoService;
            _phongdanhmucService = phongdanhmucService;

        }

        public IActionResult Index()
        {
            //var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "HoSoKeBao", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult ListPhong()
        {
            var model = _phongdanhmucService.Get_PhongDanhMuc_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetChuyenKe(int HsChuyenKeTuId)
        {
            var model = _hsketubaoService.Get_HsChuyenKeTu_ById(HsChuyenKeTuId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListBaoChuyenDi(int hsketubaoid)
        {
            var model = _hsketubaoService.Get_HsChuyenKeTu_ByHsKeTuBaoId(hsketubaoid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult getketu(int hsketubaoid)
        {
            var model = _hsketubaoService.Get_HsKeTuBao_ById(hsketubaoid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListHsKe(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _hsketubaoService.Get_HsKeTuBao_AllPaging(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult getHoSonv(string username)
        {
            var model = _hsnvService.Get_HoSoNhanVien_ByUserName(username);
            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        public IActionResult Create(HsKeTuBaoViewModel ketubao, string DaiDai, string CaoCao)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoKeBao", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");                

                var model = _hsketubaoService.Create_HsKeTuBao(ketubao, DaiDai, CaoCao, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult Update(HsKeTuBaoViewModel ketubao, string DaiDai, string CaoCao)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoKeBao", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");     

                var model = _hsketubaoService.Update_HsKeTuBao(ketubao, DaiDai, CaoCao, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult AddChuyen(HsKeTuBaoViewModel ketubao)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoKeBao", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsketubaoService.Create_HsChuyenKeTu(ketubao, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpChuyen(HsKeTuBaoViewModel ketubao)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoKeBao", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsketubaoService.Update_HsChuyenKeTu(ketubao, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
