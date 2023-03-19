using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;
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
    public class HsHoSoController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IHsBoHoSoService _hsbohosoService;
        private readonly IHsKeTuBaoService _hsketubaoService;
        private readonly IHsNhomHoSoDMService _hsnhomhosodmService;
        private readonly IHsThoiHanBaoQuanDMService _thoihanbaoquandmService;
        private readonly IHsBoHoSoFileService _hsbohosofileService;
        private readonly IHsChuyenBoHoSoMuonTraService _hschuyenbohosomuontraService;
        private readonly IKhachHangService _khachhangService;
        private readonly IHsChiTietBoHoSoService _hschitietbohosoService;
        private readonly IKhachHangPoService _khachhangpoService;

        public HsHoSoController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IHsBoHoSoService hsbohosoService,
            IHsKeTuBaoService hsketubaoService,
            IHsNhomHoSoDMService hsnhomhosodmService,
            IHsThoiHanBaoQuanDMService thoihanbaoquandmService,
            IHsBoHoSoFileService hsbohosofileService,
            IHsChuyenBoHoSoMuonTraService hschuyenbohosomuontraService, 
            IKhachHangService khachhangService,
            IHsChiTietBoHoSoService hschitietbohosoService,
            IKhachHangPoService khachhangpoService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _hsbohosoService = hsbohosoService;
            _hsketubaoService = hsketubaoService;
            _hsnhomhosodmService = hsnhomhosodmService;
            _thoihanbaoquandmService = thoihanbaoquandmService;
            _hsbohosofileService = hsbohosofileService;
            _hschuyenbohosomuontraService = hschuyenbohosomuontraService;
            _khachhangService = khachhangService;
            _hschitietbohosoService = hschitietbohosoService;
            _khachhangpoService = khachhangpoService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult ListChiTietBHS(Int32 HsBoHoSoId)
        {
            var model = _hschitietbohosoService.Get_HsChiTietBoHoSo_ByHsBoHoSoId(HsBoHoSoId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult getmuontrahsismuon(int hschuyenbohosomuontraId, bool ismuon)
        {
            var model = _hschuyenbohosomuontraService.Get_HsChuyenBoHoSoMuonTra_ByIdIsMuon(hschuyenbohosomuontraId, ismuon);
            return new OkObjectResult(model);
        }
        
        [HttpGet]
        public IActionResult getmuontrahs(int hschuyenbohosomuontraId)
        {
            var model = _hschuyenbohosomuontraService.Get_HsChuyenBoHoSoMuonTra_ById(hschuyenbohosomuontraId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListTraHs(Int32 hsbohosoid)
        {
            var model = _hschuyenbohosomuontraService.Get_HsChuyenBoHoSoMuonTra_ByHsBoHoSoCuId(hsbohosoid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult getbohsfile(Int32 hsbohosofileid)
        {
            var model = _hsbohosofileService.Get_HsBoHoSoFile_ById(hsbohosofileid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListBoHsFile(Int32 hsbohosoid)
        {
            var model = _hsbohosofileService.Get_HsBoHoSoFile_ByHsBoHoSoId(hsbohosoid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListTgBaoQuan()
        {
            var model = _thoihanbaoquandmService.Get_HsThoiHanBaoQuanDM_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNhomHs(string corporationid)
        {
            var model = _hsnhomhosodmService.Get_HsNhomHoSoDM_ByCor(corporationid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListKeTuBao(string corporationid)
        {
            var model = _hsketubaoService.Get_HsKeTuBao_ByCor(corporationid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetBoHs(int hsbohosoId)
        {
            var model = _hsbohosoService.Get_HsBoHoSo_ById(hsbohosoId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListHsBoHs(string corporationId, string phongdanhmucId, string phongdanhmucquanlyId,
            string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var phongquanly = !string.IsNullOrEmpty(phongdanhmucquanlyId) ? phongdanhmucquanlyId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _hsbohosoService.Get_HsBoHoSo_AllPaging(khuvuc, phong, phongquanly, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListKHNuoc(string corporationId, string keyword, int SoThuTu, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";            
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _khachhangService.Get_KhachHang_AllPagingSttHs(khuvuc, tukhoa, SoThuTu, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListKHDien(string corporationId, string keyword, int SoThuTu, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _khachhangpoService.Get_KhachHangPo_AllPagingSttHs(khuvuc, tukhoa, SoThuTu, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetKhacHang(string makhachhang)
        {
            var model = _khachhangService.Get_KhachHang_ByMaKhachHang(makhachhang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetKhacHangPo(string makhachhang)
        {
            var model = _khachhangpoService.Get_KhachHangPo_ByMaKhachHang(makhachhang);
            return new OkObjectResult(model);
        }

        #endregion 

        #region Create, Update, Delete

        public IActionResult Create(HsBoHoSoViewModel bohoso)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsbohosoService.Create_HsBoHoSo(bohoso, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult Update(HsBoHoSoViewModel bohoso)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _hsbohosoService.Update_HsBoHoSo(bohoso, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult AddBohsFile(HsBoHoSoFileViewModel bohosofile)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsbohosofileService.Create_HsBoHoSoFile(bohosofile, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult DelBoHsFile(Int32 HsBoHoSoFileId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hsbohosofileService.Delete_HsBoHoSoFile(HsBoHoSoFileId, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult AddMuonTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschuyenbohosomuontraService.Create_HsChuyenBoHoSoMuonTra_ByMuon(chuyenbohosomuontra, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpMuonTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschuyenbohosomuontraService.Update_HsChuyenBoHoSoMuonTra_ByMuon(chuyenbohosomuontra, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult AddTraHs(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschuyenbohosomuontraService.Update_HsChuyenBoHoSoMuonTra_ByTra(chuyenbohosomuontra, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpdateTraHs(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschuyenbohosomuontraService.Update_HsChuyenBoHoSoMuonTra_ByTraUpdate(chuyenbohosomuontra, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpChuaTraHs(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschuyenbohosomuontraService.Update_HsChuyenBoHoSoMuonTra_ByTraChuaTra(chuyenbohosomuontra, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpdateSTT(string MaKhachHang, int SoThuTu)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _khachhangService.Update_KhachHang_BySTTBoHoSo(MaKhachHang, SoThuTu, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult UpdateSTTDien(string MaKhachHang, int SoThuTu)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _khachhangpoService.Update_KhachHangPo_BySTTBoHoSo(MaKhachHang, SoThuTu, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult InsChiTietBHS(Int32 BoHoSoId, string CodeMa, string MaKhachHang)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschitietbohosoService.Create_HsChiTietBoHoSo(BoHoSoId, CodeMa, MaKhachHang, 
                    createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        public IActionResult DelChiTietBHS(Int32 chitietbohosiId, string UpdateBy)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "HoSoNhapHoSo", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _hschitietbohosoService.Delete_HsChiTietBoHoSo(chitietbohosiId, createBy, createDate);
                return new OkObjectResult(model);
            }
        }
        #endregion

    }
}
