using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
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
    public class GiayDNController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGiayDeNghiQuaTrinhCungCapService _gdnqtccService;
        private readonly IDMCungCapDichVuService _dmcungcapdichvuService;
        private readonly IGiayDeNghiDMCungCapNuocService _giaydenghiDMCungCapNuocService;
        private readonly IVBAutocompleteService _vbAutocompleteServices;
        private readonly IKhachHangService _khachhangService;

        public GiayDNController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService  ,

            IGiayDeNghiQuaTrinhCungCapService gdnqtccService, IDMCungCapDichVuService dmcungcapdichvuService,
            IGiayDeNghiDMCungCapNuocService giaydenghiDMCungCapNuocService,
            IVBAutocompleteService vbAutocompleteServices, IKhachHangService khachhangService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnqtccService = gdnqtccService;
            _dmcungcapdichvuService = dmcungcapdichvuService;
            _giaydenghiDMCungCapNuocService = giaydenghiDMCungCapNuocService;
            _vbAutocompleteServices = vbAutocompleteServices;
            _khachhangService = khachhangService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public async Task<IActionResult> GetKH(string makhachhang)
        {
            var model = await _khachhangService.Get_KhachHang_ByMaKhachHang(makhachhang);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListKH(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _khachhangService.Get_KhachHang_AllPaging(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNNuocId(int giaydenghiId)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiCungCapNuoc_ById(giaydenghiId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListGDNNuoc(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";            

            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiCungCapNuoc_AllPaging(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult DMCungCapDichVu(int loaidichvuid)
        {
            // 1: Nuoc; 2: Dien
            var model = _dmcungcapdichvuService.Get_DMCungCapDichVu_ByLoaiDichVuId(loaidichvuid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNDMCungCapDVNuoc(Guid codexuly)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ByCodeXuLy(codexuly);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNDMNuocByGDNId(int giaydenghiId)
        {            
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ByGDNId(giaydenghiId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNDMNuocByGDNId1Top(int giaydenghiId)
        {
            var model = _giaydenghiDMCungCapNuocService.Get_GiayDeNghiDMCungCapNuoc_ByGDNId1Top(giaydenghiId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNQTCC(Int32 giaydenghiDMCCDVNuocid)
        {
            var model = _gdnqtccService.Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc(true, giaydenghiDMCCDVNuocid, 0, 1, 100);
            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete, Export excel
        [HttpPost]
        public IActionResult CreateGDNDMCCNuoc(Guid CodeXuLy, int DMCungCapDichVuId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Create); 
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapNuocService.CreateGiayDeNghiDMCungCapNuocByCodeXuLy(CodeXuLy, DMCungCapDichVuId, createDate, createBy);
                return new OkObjectResult(model);
            }
        }       

        [HttpPost]
        public IActionResult CreateGDNNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapNuocService.CreateGiayDeNghiDMCungCapNuoc(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpdateGDNNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapNuocService.UpdateGiayDeNghiDMCungCapNuoc(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult ChuyenXuLy(int giaydenghiId, Int32 giaydenghidmcungcapnuocId,  DateTime ngayXuLy, 
            string toNhaMay, string ghichuXuLy)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }
                
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapNuocService.Update_GiayDeNghiDMCungCapNuoc_ByIdXuLy(giaydenghiId, giaydenghidmcungcapnuocId,
                    ngayXuLy, toNhaMay, ghichuXuLy, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult DeleteGDNDMCCNuoc(Int32 id)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThem", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapNuocService.DeleteGiayDeNghiDMCungCapNuocId(id, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult GetListNVAuto(string codeXL)
        {
            var model = _vbAutocompleteServices.VBAutoGetList(codeXL, "",
                "", "", "", "GetListNVDiDoiNuocBanAuto");

            return new OkObjectResult(model);
        }        

        #endregion

    }
}
