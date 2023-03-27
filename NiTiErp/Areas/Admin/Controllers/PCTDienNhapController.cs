using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Helpers;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class PCTDienNhapController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IPCTDienService _pctdienService;
        private readonly IBacAnToanDienService _bacantoandienService;
        private readonly IPCTDanhMucService _pctdanhmucService;
        private readonly IHoSoNhanVienService _hosonhanvienService;
        private readonly IPCTNhanVienCongTacService _pctnhanviencongtacService;
        private readonly IPCTDiaDiemCongTacService _pctdiadiemcongtacService;

        public PCTDienNhapController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IPCTDienService pctdienService, IBacAnToanDienService bacantoandienService, IPCTDanhMucService pctdanhmucService,
            IHoSoNhanVienService hosonhanvienService, IPCTNhanVienCongTacService pctnhanviencongtacService,
            IPCTDiaDiemCongTacService pctdiadiemcongtacService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _pctdienService = pctdienService;
            _bacantoandienService = bacantoandienService;
            _pctdanhmucService = pctdanhmucService;
            _hosonhanvienService = hosonhanvienService;
            _pctnhanviencongtacService = pctnhanviencongtacService;
            _pctdiadiemcongtacService = pctdiadiemcongtacService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult GetpctdId(int PCTDienId)
        {
            var model = _pctdienService.PCTD_Get_PCTDien_ById(PCTDienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListPCTDien(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _pctdienService.PCTD_Get_PCTDien_AllPaging(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNhanVienByCor(string corporationid)
        {
            var model = _hosonhanvienService.Get_HoSoNhanVien_ByCorId(corporationid);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetDanhMucId(int pctdanhmucid)
        {
            var model = _pctdanhmucService.PCTD_Get_PCTDanhMuc_ById(pctdanhmucid);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDMCongTac(string codedanhmuccongtac, int page, int pageSize)
        {       
            var model = _pctdanhmucService.PCTD_Get_PCTDanhMuc_AllPaging(codedanhmuccongtac, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDMPCT(string Code)
        {
            var model = _pctdanhmucService.PCTD_Get_PCTDanhMuc_ByCode(Code);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListBacATD(bool active)
        {       
            var model = _bacantoandienService.Get_BacAnToanDien_All(active);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNVCongTac(int PCTNhanVienCongTacId)
        {
            var model = _pctnhanviencongtacService.PCTD_Get_PCTNhanVienCongTac_ById(PCTNhanVienCongTacId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNVCongTac(string Code)
        {
            var model = _pctnhanviencongtacService.PCTD_Get_PCTNhanVienCongTac_ByCode(Code);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNVThayDoi(int PCTDienId)
        {
            var model = _pctnhanviencongtacService.PCTD_Get_PCTNhanVienCongTac_ByThayDoiNguoiDienId(PCTDienId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDDCongTac(int PCTDienId)
        {
            var model = _pctdiadiemcongtacService.PCTD_Get_PCTDiaDiemCongTac_ByDienId(PCTDienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetDDCongTacId(int pctdiadiemcongtacid)
        {
            var model = _pctdiadiemcongtacService.PCTD_Get_PCTDiaDiemCongTac_ById(pctdiadiemcongtacid);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete

        #region PCT Dien
        [HttpPost]
        public async Task<IActionResult> SavePCTD(PCTDienViewModel pctdien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdienService.PCTD_Create_PCTDien(pctdien, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdatePCTD(PCTDienViewModel pctdien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdienService.PCTD_Update_PCTDien(pctdien, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpChoPhepLV(PCTDienViewModel pctdien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdienService.PCTD_Update_PCTDien_ByIdChoPhepLamViec(pctdien, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpKeTThucCT(PCTDienViewModel pctdien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdienService.PCTD_Update_PCTDien_ByIdKetThucCongViec(pctdien, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #region PCT Dia Diem Cong Tac
        [HttpPost]
        public async Task<IActionResult> SaveDDCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdiadiemcongtacService.PCTD_Create_PCTDiaDiemCongTac(pctdiadiemcongtac, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDDCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdiadiemcongtacService.PCTD_Update_PCTDiaDiemCongTac(pctdiadiemcongtac, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DelDDCongTac(int PCTDiaDiemCongTacId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdiadiemcongtacService.PCTD_Delete_PCTDiaDiemCongTac(PCTDiaDiemCongTacId, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #region Them Bac An Toan Dien vao HoSoNhanVien
        [HttpPost]
        public async Task<IActionResult> addBacATDHsNV(string HoSoNhanVienId, int BacAnToanDienId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _hosonhanvienService.Update_HoSoNhanVien_ByBacATD(HoSoNhanVienId, BacAnToanDienId, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #region PCT Nhan vien cong tac

        [HttpPost]
        public async Task<IActionResult> SaveThayDoiLV(PCTNhanVienCongTacViewModel pctnhanviencongtac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctnhanviencongtacService.PCTD_Create_PCTNhanVienCongTac_ByIdThayDoi(pctnhanviencongtac, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateThayDoiLV(PCTNhanVienCongTacViewModel pctnhanviencongtac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctnhanviencongtacService.PCTD_Update_PCTNhanVienCongTac_ByIdThayDoi(pctnhanviencongtac, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddDsNVCT(PCTNhanVienCongTacViewModel pctnhanviencongtac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctnhanviencongtacService.PCTD_Create_PCTNhanVienCongTac(pctnhanviencongtac, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DelNVCongTac(int pctnhanviencongtacId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctnhanviencongtacService.PCTD_Delete_PCTNhanVienCongTac(pctnhanviencongtacId, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #region PCT Danh Muc
        [HttpPost]
        public async Task<IActionResult> SaveDmNoiDung(PCTDanhMucViewModel pctdanhmuc)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdanhmucService.PCTD_Create_PCTDanhMuc(pctdanhmuc, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDmNoiDung(PCTDanhMucViewModel pctdanhmuc)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdanhmucService.PCTD_Update_PCTDanhMuc(pctdanhmuc, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> DeleteDmNoiDung(int Id)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _pctdanhmucService.PCTD_Delete_PCTDanhMuc(Id, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #endregion

        #region In Crystal Report

        [HttpGet]
        public IActionResult InPCTD(int PCTDienId)
        {
            ////var ttdmdangkyfile = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdangkynuocId, "Nuoc");

            var nhanviencongtac1 = _pctnhanviencongtacService.PCTD_Get_PCTNhanVienCongTac_ByPCTDienIdInPCT(PCTDienId);
            
            SessionHelper.SetObjectAsJson(HttpContext.Session, "nhanviencongtac1", nhanviencongtac1.Result);
            

            ////var ttdangkydien = _ttdangkynuocService.Get_TTDangKyNuoc_ByIdNoTest(ttdangkynuocId);

            ////var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(xiNghiep);

            //string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
            //    quanhuyen.Result.TenQuanHuyen.ToUpper();

            //string hoten = ttdangkydien.Result.HoTenNguoiYeuCau.ToString();
            //string socmnd = ttdangkydien.Result.SoTheCCCD.ToString();
            //string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");
            //string noicap = ttdangkydien.Result.NoiCap.ToString();

            ////string diachi = ttdangkydien.Result.SoNha != null ? ttdangkydien.Result.SoNha.ToString() : ""
            ////    + " " + ttdangkydien.Result.TenDuongApTo != null ? ttdangkydien.Result.TenDuongApTo.ToString() : "" +
            ////    "," + ttdangkydien.Result.Tenphuong.ToString() + "," + ttdangkydien.Result.TenQuan.ToString() + "," +
            ////    ttdangkydien.Result.TenTinh.ToString();

            //string diachi = ttdangkydien.Result.DiaChiLD != null ? ttdangkydien.Result.DiaChiLD.ToString() : "";
            //string dienthoai = ttdangkydien.Result.DienThoai != null ? ttdangkydien.Result.DienThoai.ToString() : "";

            ////string diachi = ttdangkydien.Result.DiaChiLD.ToString();
            ////string dienthoai = ttdangkydien.Result.DienThoai.ToString();

            //string dvgiadinh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 3 ? "X" : "";
            //string dvcoquan = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 4 ? "X" : "";
            //string dvtruonghoc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 5 ? "X" : "";
            //string dvsanxuatc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 6 ? "X" : "";
            //string dvkinhdoanh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 7 ? "X" : "";

            //HttpContext.Session.SetInt32("age", 20);
            //HttpContext.Session.SetString("TenXiNghiepNuoc", tenxinghiep);
            //HttpContext.Session.SetString("HotenNuoc", hoten);
            //HttpContext.Session.SetString("SoCMNDNuoc", socmnd);
            //HttpContext.Session.SetString("NgayCapNuoc", ngaycap);
            //HttpContext.Session.SetString("NoiCapNuoc", noicap);
            //HttpContext.Session.SetString("DiaChiNuoc", diachi);
            //HttpContext.Session.SetString("DienThoaiNuoc", dienthoai);

            //HttpContext.Session.SetString("dvGiaDinhNuoc", dvgiadinh);
            //HttpContext.Session.SetString("dvCoQuanNuoc", dvcoquan);
            //HttpContext.Session.SetString("dvTruongHocNuoc", dvtruonghoc);
            //HttpContext.Session.SetString("dvSanXuatNuoc", dvsanxuatc);
            //HttpContext.Session.SetString("dvKinhDoanhNuoc", dvkinhdoanh);

            //SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdmdangkyfileNuoc", ttdmdangkyfile.Result);
            
            return new OkObjectResult(nhanviencongtac1);
        }

        #endregion

    }
}
