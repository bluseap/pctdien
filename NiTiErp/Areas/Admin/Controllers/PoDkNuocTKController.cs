using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Helpers;
using NiTiErp.Utilities.Dtos;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http.Extensions;


namespace NiTiErp.Areas.Admin.Controllers
{
    public class PoDkNuocTKController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDonDangKyService _dondangkyService;
        private readonly IPhuongXaService _phuongxaService;
        private readonly IDuongPhoService _duongphoService;
        private readonly IHoSoNhanVienService _hosonhanvienService;
        private readonly IThietKeService _thietkeService;
        private readonly IMauBocVatTuService _maubocvattuService;
        private readonly IMauThietKeService _mauthietkeService;
        private readonly IChiTietThietKeService _chitietthietkeService;
        private readonly IDaoLapTKService _daolaptkService;
        private readonly IKhoDanhMucService _khodanhmucService;
        private readonly IVatTuService _vattuService;
        private readonly INhanVienService _nhanvienService;

        public PoDkNuocTKController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IDonDangKyService dondangkyService,
            IPhuongXaService phuongxaService, IDuongPhoService duongphoService, IHoSoNhanVienService hosonhanvienService,
            IThietKeService thietkeService, IMauBocVatTuService maubocvattuService, IMauThietKeService mauthietkeService,
            IChiTietThietKeService chitietthietkeService, IDaoLapTKService daolaptkService, IKhoDanhMucService khodanhmucService,
            IVatTuService vattuService, INhanVienService nhanvienService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dondangkyService = dondangkyService;
            _phuongxaService = phuongxaService;
            _duongphoService = duongphoService;
            _hosonhanvienService = hosonhanvienService;
            _thietkeService = thietkeService;
            _maubocvattuService = maubocvattuService;
            _mauthietkeService = mauthietkeService;
            _chitietthietkeService = chitietthietkeService;
            _daolaptkService = daolaptkService;
            _khodanhmucService = khodanhmucService;
            _vattuService = vattuService;
            _nhanvienService = nhanvienService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult TimNhanVien(string corporationid)
        {
            var model = _nhanvienService.Get_NhanVien_ByMaKV(corporationid);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult TimVatTu(string corporationid, string khodanhmuc, string timtenmavattu)
        {
            var model = _vattuService.Get_VatTu_ByKhoTimVatTu(corporationid, khodanhmuc, timtenmavattu);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult KhoDanhMuc(string CorporationId, string LoaiVatTuId)
        {
            var model = _khodanhmucService.Get_KhoDanhMuc_ByLoaiVatTu(CorporationId, LoaiVatTuId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult BVTChiPhi(string DonDangKyId)
        {
            var model = _daolaptkService.Get_DaoLapTK_ByMaddk(DonDangKyId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult BocVatTu(string DonDangKyId)
        {
            var model = _chitietthietkeService.Get_ChiTietThietKe_ByMaddk(DonDangKyId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult Mauthietke(string CorporationId, string loaidv, int order)
        {
            var model = _mauthietkeService.Get_MauThietKe_ByNuocOrder9(CorporationId, loaidv, order);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult Maubvt(string CorporationId, string loaimbvt)
        {
            var model = _maubocvattuService.Get_MauBocVatTu_ByLoaiMBVT(CorporationId, loaimbvt);

            return new OkObjectResult(model);
        }       

        [HttpGet]
        public async Task<IActionResult> GetTKNuocId(string DangKyNuocId)
        {
            var model = await _thietkeService.Get_ThietKe_ByMaDon(DangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListTK(string KhuVuc, string PhongTo, string keyword, int page, int pageSize, string DanhSachDieuKienTimDK)
        {
            if (DanhSachDieuKienTimDK == "%")
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_ByThietKe(KhuVuc, PhongTo, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
                var model = _dondangkyService.Get_DonDangKy_ByThietKeDsDieuKienTim(KhuVuc, PhongTo, DanhSachDieuKienTimDK, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }                
        }

        [HttpGet]
        public IActionResult ListChuanBiTK(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _dondangkyService.Get_DonDangKy_ByChuanBiThietKe(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult PhuongXa(string corporationId)
        {
            var model = _phuongxaService.Get_PhuongXa_ByCor(corporationId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult DuongPhoLx(string corporationId)
        {
            var model = _duongphoService.Get_DuongPho_ByCor(corporationId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult TenNhanvien(string corporationId)
        {
            var model = _hosonhanvienService.Get_HoSoNhanVien_ByCorId(corporationId);

            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, Update, Delete

        [HttpPost]
        public async Task<IActionResult> SaveTK(ThietKeViewModel thietke)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thietkeService.Create_ThietKe(thietke, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTK(ThietKeViewModel thietke)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thietkeService.Update_ThietKe(thietke, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDuyetTK(ThietKeViewModel thietke)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thietkeService.Update_ThietKe_ByDuyetTK(thietke, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpTuChoiTK(ThietKeViewModel thietke)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thietkeService.Update_ThietKe_ByTuChoiTK(thietke, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsMauBVT(string MADDK, string MaVatTu, string KhoiLuong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _chitietthietkeService.Update_ChiTietThietKe_ByMaddkMaVatTu(MADDK, MaVatTu, KhoiLuong, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> XoaVatTu(string MADDK, string MaVatTu)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _chitietthietkeService.Delete_ChiTietThietKe(MADDK, MaVatTu, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsChiPhi(string MADDK)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Create_DaoLapTK(MADDK, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDaoLapND(string MADON, string MADDK, string NOIDUNG)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Update_DaoLapTK_MaDonNoiDung(MADON, MADDK, NOIDUNG, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDaoLapDonGia(string MADON, string MADDK, decimal DONGIACP)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Update_DaoLapTK_MaDonDonGia(MADON, MADDK, DONGIACP, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDaoLapSoLuong(string MADON, string MADDK, decimal SOLUONG)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Update_DaoLapTK_MaDonSoLuong(MADON, MADDK, SOLUONG, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpDaoLapDonViTinh(string MADON, string MADDK, string DonViTinh)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Update_DaoLapTK_MaDonDonViTinh(MADON, MADDK, DonViTinh, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> UpDaoLapLoaiCP(string MADON, string MADDK, string LOAICP)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Update_DaoLapTK_MaDonLoaiCP(MADON, MADDK, LOAICP, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> XoaCPDL(string MADON, string MADDK)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _daolaptkService.Delete_DaoLapTK(MADON, MADDK, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddVatTu(string MADDK, string MAVATTU)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _chitietthietkeService.Create_ChiTietThietKe_ByMaddkMaVatTu(MADDK, MAVATTU, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> InsMauTK(string MADDK, string MauBocVatTuId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _chitietthietkeService.Create_ChiTietThietKe_ByMaddkMauTK(MADDK, MauBocVatTuId, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpHinhTK(string MADDK, string TenKHBenPhai, string DanhSoKHBenPhai, string TenKHBenTrai,
            string DanhSoKHBenTrai, string MauThietKe)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCTK", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _thietkeService.Update_ThietKe_ByMauHinhThietKe(MADDK, TenKHBenPhai, DanhSoKHBenPhai,
                    TenKHBenTrai, DanhSoKHBenTrai, MauThietKe, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult InTKNuoc(string MADDK)
        {
            var thietke = _thietkeService.Get_ThietKe_ByMaDon(MADDK);

            string tenxinghiep = thietke.Result.MAKV == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + thietke.Result.TENKV.ToUpper() :
                thietke.Result.TENKV.ToUpper();

            string madondangky = thietke.Result.MADDK.ToString();
            string hoten = thietke.Result.TENKH.ToString();
            string danhso = thietke.Result.SODB != null ? thietke.Result.SODB.ToString() : "";
            string diachi = thietke.Result.SONHA != null ? thietke.Result.SONHA.ToString() : "";
            string diachilapdat = thietke.Result.DIACHILD != null ? thietke.Result.DIACHILD.ToString() : "";
            string lydothietke = thietke.Result.TENTK != null ? thietke.Result.TENTK.ToString() : "";
            string ketluan = thietke.Result.CHUTHICH != null ? thietke.Result.CHUTHICH.ToString() : "";

            string tenkhphai = thietke.Result.TENKHPHAI != null ? thietke.Result.TENKHPHAI.ToString() : "";
            string danhsophai = thietke.Result.DANHSOPHAI != null ? thietke.Result.DANHSOPHAI.ToString() : "";
            string tenkhtrai = thietke.Result.TENKHTRAI != null ? thietke.Result.TENKHTRAI.ToString() : "";
            string danhsotrai = thietke.Result.DANHSOTRAI != null ? thietke.Result.DANHSOTRAI.ToString() : "";
            //string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");

            HttpContext.Session.SetString("MaDonDangKy", madondangky);
            HttpContext.Session.SetString("TenXiNghiepNuoc", tenxinghiep);
            HttpContext.Session.SetString("HotenNuoc", hoten);
            HttpContext.Session.SetString("DanhSo", danhso);
            HttpContext.Session.SetString("DiaChi", diachi);
            HttpContext.Session.SetString("DiaChiLapDat", diachilapdat);
            HttpContext.Session.SetString("LyDoThietKe", lydothietke);
            HttpContext.Session.SetString("KetLuan", ketluan);
            HttpContext.Session.SetString("TenKHPhai", tenkhphai);
            HttpContext.Session.SetString("DanhSoPhai", danhsophai);
            HttpContext.Session.SetString("TenKHTrai", tenkhtrai);
            HttpContext.Session.SetString("DanhSoTrai", danhsotrai);

            var url2 = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host.Value; 
            string hinhtk = "", hinhtkUrl = "";

            switch (thietke.Result.MAMAUTK != null ? thietke.Result.MAMAUTK : "")
            {
                case "NHPEBP":
                    hinhtk = "/UpLoadFile/mautk/HDPEbenphai.png";
                    break;
                case "NHPEBT":
                    hinhtk = "/UpLoadFile/mautk/HDPEbentrai.png";
                    break;
                case "NHPELP":
                    hinhtk = "/UpLoadFile/mautk/HDPED27lobenphai.png";
                    break;
                case "NHPELT":
                    hinhtk = "/UpLoadFile/mautk/HDPElobentrai.png";
                    break;
                case "NP27BP":
                    hinhtk = "/UpLoadFile/mautk/PVCD27benphai.png";
                    break;
                case "NP27BT":
                    hinhtk = "/UpLoadFile/mautk/PVCD27bentrai.png";
                    break;
                case "NP27LP":
                    hinhtk = "/UpLoadFile/mautk/PVCD27lobenphai.png";
                    break;
                case "NP27LT":
                    hinhtk = "/UpLoadFile/mautk/PVCD27lobentrai.png";
                    break;
                case "NT27BP":
                    hinhtk = "/UpLoadFile/mautk/teD27benphainha.png";
                    break;
                case "NT27BT":
                    hinhtk = "/UpLoadFile/mautk/TeD27bentrai.png";
                    break;
                case "NT27LP":
                    hinhtk = "/UpLoadFile/mautk/TeD27lobenphai.png";
                    break;
                case "NT27LT":
                    hinhtk = "/UpLoadFile/mautk/TeD27lobentrai.png";
                    break;
                case "NTPEBP":
                    hinhtk = "/UpLoadFile/mautk/TeHDPEbenphai.png";
                    break;
                case "NTPEBT":
                    hinhtk = "/UpLoadFile/mautk/TeHDPEbentrai.png";
                    break;
                case "NTPELP":
                    hinhtk = "/UpLoadFile/mautk/TeHDPElobenphai.png";
                    break;
                case "NTPELT":
                    hinhtk = "/UpLoadFile/mautk/TeHDPElobentrai.png";
                    break;
                case "All":
                    hinhtk = "/UpLoadFile/longxuyen/tranglx.png";
                    break;
                case "":
                    hinhtk = "/UpLoadFile/longxuyen/tranglx.png";
                    break;
            }

            hinhtkUrl = url2 + hinhtk;
            HttpContext.Session.SetString("HinhThietKe1", hinhtkUrl);

            var chitietthietke = _chitietthietkeService.Get_ChiTietThietKe_ByMaddk(MADDK);
            SessionHelper.SetObjectAsJson(HttpContext.Session, "listThietKe", chitietthietke.Result);

            return new OkObjectResult(thietke);
        }

        #endregion


    }
}
