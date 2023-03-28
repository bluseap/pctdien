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
            var pctdien = _pctdienService.PCTD_Get_PCTDien_ById(PCTDienId);

            var nhanviencongtac1 = _pctnhanviencongtacService.PCTD_Get_PCTNhanVienCongTac_ByPCTDienIdInPCT(PCTDienId);

            string tenxinghiep = "XÍ NGHIỆP ĐIỆN NƯỚC " + pctdien.Result.TenKhuVuc.ToUpper();

            HttpContext.Session.SetString("TenXiNghiepNuoc", tenxinghiep);
            HttpContext.Session.SetString("SoPhieuCongTac", pctdien.Result.SoPhieuCongTac.ToString());
            HttpContext.Session.SetString("TenNguoiLanhDaoCongViec", pctdien.Result.TenNguoiLanhDaoCongViec);
            HttpContext.Session.SetString("BacATDNguoiLanhDaoCongViecId", pctdien.Result.BacATDNguoiLanhDaoCongViecId.ToString());
            HttpContext.Session.SetString("TenNguoiChiHuyTrucTiep", pctdien.Result.TenNguoiChiHuyTrucTiep);
            HttpContext.Session.SetString("BacATDNguoiChiHuyTrucTiepId", pctdien.Result.BacATDNguoiChiHuyTrucTiepId.ToString());
            HttpContext.Session.SetString("CacCongTyDonVi", pctdien.Result.CacCongTyDonVi);
            HttpContext.Session.SetString("DiaDiemCongTac", pctdien.Result.DiaDiemCongTac);
            HttpContext.Session.SetString("CacNoiDungCongTac", pctdien.Result.CacNoiDungCongTac);

            string thoigianbatdaukehoach = pctdien.Result.GioBatDauKH + " giờ " + pctdien.Result.PhutBatDauKH + " phút" + ", ngày " +
                pctdien.Result.NgayBatDauKH.ToString("dd/MM/yyyy");
            HttpContext.Session.SetString("thoigianbatdaukehoach", thoigianbatdaukehoach);

            string thoigianketthuckehoach = pctdien.Result.GioKetThucKH + " giờ " + pctdien.Result.PhutKetThucKH + " phút" + ", ngày " +
                pctdien.Result.NgayKetThucKH.ToString("dd/MM/yyyy");
            HttpContext.Session.SetString("thoigianketthuckehoach", thoigianketthuckehoach);

            HttpContext.Session.SetString("CacDieuKiemATLD", pctdien.Result.CacDieuKiemATLD);
            HttpContext.Session.SetString("CacTrangBiATBHLDLamViec", pctdien.Result.CacTrangBiATBHLDLamViec);
            HttpContext.Session.SetString("TongHangMucDaTrangCap", pctdien.Result.TongHangMucDaTrangCap);
            HttpContext.Session.SetString("CacDonViQLVHCoLienQuan", pctdien.Result.CacDonViQLVHCoLienQuan);
            HttpContext.Session.SetString("TenNguoiGiamSatATD", pctdien.Result.TenNguoiGiamSatATD);
            HttpContext.Session.SetString("BacATDNguoiGiamSatATD", pctdien.Result.BacATDNguoiGiamSatATD.ToString());
            HttpContext.Session.SetString("TenNguoiChoPhep", pctdien.Result.TenNguoiChoPhep);
            HttpContext.Session.SetString("BacNguoiChoPhep", pctdien.Result.BacNguoiChoPhep.ToString());
            HttpContext.Session.SetString("NgayCapPCT", pctdien.Result.NgayCapPCT.ToString("dd/MM/yyyy"));
            HttpContext.Session.SetString("TenNguoiCapPCT", pctdien.Result.TenNguoiCapPCT);

            HttpContext.Session.SetString("ThietBiDuongDayDaCatDien", pctdien.Result.ThietBiDuongDayDaCatDien);
            HttpContext.Session.SetString("DaTiepDatTai", pctdien.Result.DaTiepDatTai);
            HttpContext.Session.SetString("DaLamRaoChanTreoBienBaoTai", pctdien.Result.DaLamRaoChanTreoBienBaoTai);
            HttpContext.Session.SetString("PhamViDuocPhepLamViec", pctdien.Result.PhamViDuocPhepLamViec);
            HttpContext.Session.SetString("CanhBaoChiDanNguyHiem", pctdien.Result.CanhBaoChiDanNguyHiem);
            HttpContext.Session.SetString("NguoiChiHuyTTKiemTraDamBaoAT", pctdien.Result.NguoiChiHuyTTKiemTraDamBaoAT);
            HttpContext.Session.SetString("LamTiepDatTai", pctdien.Result.LamTiepDatTai);
            HttpContext.Session.SetString("TongHangMucDaKiemTraBHLD", pctdien.Result.TongHangMucDaKiemTraBHLD);
            HttpContext.Session.SetString("CacGiayPhoiHopChoPhep", pctdien.Result.CacGiayPhoiHopChoPhep);

            string thoigianchophepdonvicongtac = pctdien.Result.GioChoPhepDonViCT + " giờ " + pctdien.Result.PhutChoPhepDonViCT + " phút" + ", ngày " +
                pctdien.Result.NgayChoPhepDonViCT.ToString("dd/MM/yyyy");
            HttpContext.Session.SetString("thoigianchophepdonvicongtac", thoigianchophepdonvicongtac);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "nhanviencongtac1", nhanviencongtac1.Result);

            var sonhanviencongtac = nhanviencongtac1.Result.Count().ToString();
            HttpContext.Session.SetString("sonhanviencongtac", sonhanviencongtac);

            return new OkObjectResult(nhanviencongtac1);
        }

        #endregion

    }
}
