using AspNetCore.Reporting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Helpers;
using NiTiErp.Utilities.Dtos;
using OfficeOpenXml;
using OfficeOpenXml.Style;

using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class TTDangKyTTController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly ITTDangKyDienService _ttdangkydienService;        
        private readonly ITTCountDangKyService _ttcountdangkyService;
        private readonly ITTDangKyFileService _ttdangkyfileService;
        private readonly ICorporationService _corporationService;
        private readonly IThanhPhoTinhService _thanhphotinhService;
        private readonly IQuanHuyenService _quanhuyenService;
        private readonly IPhuongXaService _phuongxaService;
        private readonly ITTDMDangKyService _ttdmdangkyService;
        private readonly ITTDangKyNuocService _ttdangkynuocService;
        private readonly ITTCacDichVuDienService _ttcacdichvudienService;
        private readonly ITTCacDichVuNuocService _ttcacdichvunuocService;

        public TTDangKyTTController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, ITTDangKyDienService ttdangkydienService,
            ITTCountDangKyService ttcountdangkyService, ITTDangKyFileService ttdangkyfileService,
            ICorporationService corporationService, IQuanHuyenService quanhuyenService,
            IThanhPhoTinhService thanhphotinhService, IPhuongXaService phuongxaService,
            ITTDMDangKyService ttdmdangkyService, ITTDangKyNuocService ttdangkynuocService,
            ITTCacDichVuDienService ttcacdichvudienService, ITTCacDichVuNuocService ttcacdichvunuocService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _ttdangkydienService = ttdangkydienService;
            _ttcountdangkyService = ttcountdangkyService;
            _ttdangkyfileService = ttdangkyfileService;
            _corporationService = corporationService;
            _quanhuyenService = quanhuyenService;
            _thanhphotinhService = thanhphotinhService;
            _phuongxaService = phuongxaService;
            _ttdmdangkyService = ttdmdangkyService;
            _ttdangkynuocService = ttdangkynuocService;
            _ttcacdichvudienService = ttcacdichvudienService;
            _ttcacdichvunuocService = ttcacdichvunuocService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list Tinh - Quan huyen - phuong xa

        [HttpGet]
        public async Task<IActionResult> PhuongXa(string Huyen)
        {
            var model = await _phuongxaService.Get_PhuongXa_ByHuyen(Convert.ToInt16(Huyen));
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> PhuongXaAll()
        {
            var model = await _phuongxaService.Get_PhuongXa_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> Huyen(string Tinh)
        {
            var model = await _quanhuyenService.Get_QuanHuyen_ByTinh(Convert.ToInt16(Tinh));
            return new OkObjectResult(model);
        }

        #endregion

        #region Get list TTDMDangKy

        [HttpGet]
        public async Task<IActionResult> ListDMDangKy(string tenCot)
        {
            var model = await _ttdmdangkyService.Get_TTDMDangKy_ByTenCot(tenCot);
            return new OkObjectResult(model);
        }

        #endregion

        #region Dang ky dien

        [HttpGet]
        public IActionResult ListLichSuDien(int TTDangKyDienId)
        {
            var model = _ttdangkydienService.Get_DonDangKyPo_ByLichSuTTDangKyDienId(TTDangKyDienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetDkDien(int dangkydienId)
        {           
            var model = _ttdangkydienService.Get_TTDangKyDien_ByIdNoTest(dangkydienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListDkDien(int tinh, int huyen, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";            

            var model = _ttdangkydienService.Get_TTDangKyDien_AllPaging(tinh, huyen, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDkDienTT(int tinh, int huyen, string theotrangthai, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttdangkydienService.Get_TTDangKyDien_AllPagingTT(tinh, huyen, theotrangthai, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetFile(int ttdangkyId, string ttdangkyCode)
        {
            var model = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdangkyId, ttdangkyCode);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetFileId(Int64 ttdmdangkyfileId)
        {
            var model = _ttdangkyfileService.Get_TTDangKyFile_ById(ttdmdangkyfileId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListCountDK()
        {
            var model = _ttcountdangkyService.Get_TTCountDangKy_ByList();

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult InGDNDien(int ttdangkydienId, int xiNghiep)
        {
            var ttdmdangkyfile = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdangkydienId, "Dien");

            var ttdangkydien = _ttdangkydienService.Get_TTDangKyDien_ByIdNoTest(ttdangkydienId);            

            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(xiNghiep).Result;            

            string tenxinghiep = quanhuyen.MAKV == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + quanhuyen.TenQuanHuyen.ToUpper() :
                quanhuyen.TenQuanHuyen.ToUpper();

            string hoten = ttdangkydien.Result.HoTenNguoiYeuCau.ToString();
            string socmnd = ttdangkydien.Result.SoTheCCCD.ToString();
            string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");
            string noicap = ttdangkydien.Result.NoiCap.ToString();

            //string diachi = ttdangkydien.Result.SoNha != null ? ttdangkydien.Result.SoNha.ToString() : ""
            //    + " " + ttdangkydien.Result.TenDuongApTo.ToString() +
            //    "," + ttdangkydien.Result.Tenphuong.ToString() + "," + ttdangkydien.Result.TenQuan.ToString() + "," +
            //    ttdangkydien.Result.TenTinh.ToString();

            string diachi = ttdangkydien.Result.DiaChiLD != null ? ttdangkydien.Result.DiaChiLD.ToString() : "";
            string dienthoai = ttdangkydien.Result.DienThoai != null ? ttdangkydien.Result.DienThoai.ToString() : ""; 

            string dvgiadinh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 26 ? "X" : "";
            string dvcoquan = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 27 ? "X" : "";
            string dvtruonghoc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 28 ? "X" : "";
            string dvsanxuatc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 29 ? "X" : "";
            string dvkinhdoanh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 30 ? "X" : "";

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiep", tenxinghiep);
            HttpContext.Session.SetString("Hoten", hoten);
            HttpContext.Session.SetString("SoCMND", socmnd);
            HttpContext.Session.SetString("NgayCap", ngaycap);
            HttpContext.Session.SetString("NoiCap", noicap);
            HttpContext.Session.SetString("DiaChi", diachi);
            HttpContext.Session.SetString("DienThoai", dienthoai);

            HttpContext.Session.SetString("dvGiaDinh", dvgiadinh);
            HttpContext.Session.SetString("dvCoQuan", dvcoquan);
            HttpContext.Session.SetString("dvTruongHoc", dvtruonghoc);
            HttpContext.Session.SetString("dvSanXuat", dvsanxuatc);
            HttpContext.Session.SetString("dvKinhDoanh", dvkinhdoanh);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdmdangkyfile", ttdmdangkyfile.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpPost]
        public async Task<IActionResult> TuChoiDien(int dangkydienId, DateTime NgayTuChoi, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkydienService.Update_TTDangKyDien_ByTuChoi(dangkydienId, NgayTuChoi, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PhucHoiDien(int dangkydienId, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkydienService.Update_TTDangKyDien_ByPhucHoiTuChoi(dangkydienId, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDKDien(TTDangKyDienViewModel dangkydien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            DateTime updateDate = DateTime.Now;
            string updateBy = User.GetSpecificClaim("UserName");

            var model = await _ttdangkydienService.Update_TTDangKyDien_ById(dangkydien, updateDate, updateBy);
            return new OkObjectResult(model);
        }
        
        [HttpPost]
        //Luc dau chuyen tk luon, gio chuyen lai thanh xac nhan don dang ky truc tuyen, du phong co the cho chuyen tk luon.
        public async Task<IActionResult> XacNhanDkDien(int dangkydienId, DateTime NgayChuyenTK, string LyDoChuyenTK)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkydienService.Update_TTDangKyDien_ByXacNhanDien(dangkydienId, NgayChuyenTK, LyDoChuyenTK,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

        #region Dang ky nuoc
        [HttpGet]
        public IActionResult ListLichSuNuoc(int TTDangKyNuocId)
        {
            var model = _ttdangkynuocService.Get_DonDangKy_ByLichSuTTDangKyNuocId(TTDangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetDkNuoc(int dangkynuocId)
        {
            var model = _ttdangkynuocService.Get_TTDangKyNuoc_ByIdNoTest(dangkynuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListDkNuoc(int tinh, int huyen, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttdangkynuocService.Get_TTDangKyNuoc_AllPaging(tinh, huyen, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDkNuocTT(int tinh, int huyen, string theotrangthai, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttdangkynuocService.Get_TTDangKyNuoc_AllPagingTT(tinh, huyen, theotrangthai, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult InGDNNuoc(int ttdangkynuocId, int xiNghiep)
        {
            var ttdmdangkyfile = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdangkynuocId, "Nuoc");

            var ttdangkydien = _ttdangkynuocService.Get_TTDangKyNuoc_ByIdNoTest(ttdangkynuocId);

            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(xiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                quanhuyen.Result.TenQuanHuyen.ToUpper();

            string hoten = ttdangkydien.Result.HoTenNguoiYeuCau.ToString();
            string socmnd = ttdangkydien.Result.SoTheCCCD.ToString();
            string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");
            string noicap = ttdangkydien.Result.NoiCap.ToString();

            //string diachi = ttdangkydien.Result.SoNha != null ? ttdangkydien.Result.SoNha.ToString() : ""
            //    + " " + ttdangkydien.Result.TenDuongApTo != null ? ttdangkydien.Result.TenDuongApTo.ToString() : "" +
            //    "," + ttdangkydien.Result.Tenphuong.ToString() + "," + ttdangkydien.Result.TenQuan.ToString() + "," +
            //    ttdangkydien.Result.TenTinh.ToString();

            string diachi = ttdangkydien.Result.DiaChiLD != null ? ttdangkydien.Result.DiaChiLD.ToString() : "";
            string dienthoai = ttdangkydien.Result.DienThoai != null ? ttdangkydien.Result.DienThoai.ToString() : "";

            //string diachi = ttdangkydien.Result.DiaChiLD.ToString();
            //string dienthoai = ttdangkydien.Result.DienThoai.ToString();

            string dvgiadinh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 3 ? "X" : "";
            string dvcoquan = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 4 ? "X" : "";
            string dvtruonghoc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 5 ? "X" : "";
            string dvsanxuatc = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 6 ? "X" : "";
            string dvkinhdoanh = ttdangkydien.Result.TTDMDangKyLoaiHinhDichVu == 7 ? "X" : "";

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepNuoc", tenxinghiep);
            HttpContext.Session.SetString("HotenNuoc", hoten);
            HttpContext.Session.SetString("SoCMNDNuoc", socmnd);
            HttpContext.Session.SetString("NgayCapNuoc", ngaycap);
            HttpContext.Session.SetString("NoiCapNuoc", noicap);
            HttpContext.Session.SetString("DiaChiNuoc", diachi);
            HttpContext.Session.SetString("DienThoaiNuoc", dienthoai);

            HttpContext.Session.SetString("dvGiaDinhNuoc", dvgiadinh);
            HttpContext.Session.SetString("dvCoQuanNuoc", dvcoquan);
            HttpContext.Session.SetString("dvTruongHocNuoc", dvtruonghoc);
            HttpContext.Session.SetString("dvSanXuatNuoc", dvsanxuatc);
            HttpContext.Session.SetString("dvKinhDoanhNuoc", dvkinhdoanh);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdmdangkyfileNuoc", ttdmdangkyfile.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpPost]
        public async Task<IActionResult> TuChoiNuoc(int dangkynuocId, DateTime NgayTuChoi, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkynuocService.Update_TTDangKyNuoc_ByTuChoi(dangkynuocId, NgayTuChoi, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PhucHoiNuoc(int dangkynuocId, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkynuocService.Update_TTDangKyNuoc_ByPhucHoiTuChoi(dangkynuocId, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDKNuoc(TTDangKyNuocViewModel dangkynuoc)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            DateTime updateDate = DateTime.Now;
            string updateBy = User.GetSpecificClaim("UserName");

            var model = await _ttdangkynuocService.Update_TTDangKyNuoc_ById(dangkynuoc, updateDate, updateBy);
            return new OkObjectResult(model);
        }

        [HttpPost]
        //Luc dau chuyen tk luon, gio chuyen lai thanh xac nhan don dang ky truc tuyen, du phong co the cho chuyen tk luon.
        public async Task<IActionResult> XacNhanDkNuoc(int dangkynuocId, DateTime NgayChuyenTK, string LyDoChuyenTK)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkynuocService.Update_TTDangKyNuoc_ByXacNhanNuoc(dangkynuocId, NgayChuyenTK, LyDoChuyenTK,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

        #region Cac dich vu dien

        [HttpGet]
        public IActionResult GetDvDien(int dichvudienId)
        {
            var model = _ttcacdichvudienService.Get_TTCacDichVuDien_ByIdNoTest(dichvudienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListDvDien(int tinh, int huyen, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttcacdichvudienService.Get_TTCacDichVuDien_AllPaging(tinh, huyen, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDvDienTT(int tinh, int huyen, string theotrangthai, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttcacdichvudienService.Get_TTCacDichVuDien_AllPagingTT(tinh, huyen, theotrangthai, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult InDVDien(int ttdichvudienId, int xiNghiep)
        {
            var ttdmdangkyfile = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdichvudienId, "DichVuDien");

            var ttdangkydien = _ttcacdichvudienService.Get_TTCacDichVuDien_ByIdNoTest(ttdichvudienId);

            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(xiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                " ĐIỆN NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper();
            //string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
            //    quanhuyen.Result.TenQuanHuyen.ToUpper();

            string hoten = ttdangkydien.Result.HoTenNguoiYeuCau.ToString();
            string socmnd = ttdangkydien.Result.SoTheCCCD.ToString();
            string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");
            string noicap = ttdangkydien.Result.NoiCap.ToString();

            //string diachi = ttdangkydien.Result.SoNha != null ? ttdangkydien.Result.SoNha.ToString() : ""
            //    + " " + ttdangkydien.Result.TenDuongApTo != null ? ttdangkydien.Result.TenDuongApTo.ToString() : "" +
            //    "," + ttdangkydien.Result.Tenphuong.ToString() + "," + ttdangkydien.Result.TenQuan.ToString() + "," +
            //    ttdangkydien.Result.TenTinh.ToString();

            string diachi = ttdangkydien.Result.DiaChiLD != null ? ttdangkydien.Result.DiaChiLD.ToString() : "";
            string dienthoai = ttdangkydien.Result.DienThoai != null ? ttdangkydien.Result.DienThoai.ToString() : "";
            //string diachi = ttdangkydien.Result.DiaChiLD.ToString();
            //string dienthoai = ttdangkydien.Result.DienThoai.ToString();

            string thaydoivitri = ttdangkydien.Result.TTDMDangKyDichVu == 32 ? "X" : "";
            string thaydoimdsd = ttdangkydien.Result.TTDMDangKyDichVu == 33 ? "X" : "";
            string thaydoidinhmucsudung = ttdangkydien.Result.TTDMDangKyDichVu == 34 ? "X" : "";
            string thaydoihopdong = ttdangkydien.Result.TTDMDangKyDichVu == 35 ? "X" : "";
            string kiemtradongho = ttdangkydien.Result.TTDMDangKyDichVu == 36 ? "X" : "";

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDVDien", tenxinghiep);
            HttpContext.Session.SetString("HotenDVDien", hoten);
            HttpContext.Session.SetString("SoCMNDDVDien", socmnd);
            HttpContext.Session.SetString("NgayCapDVDien", ngaycap);
            HttpContext.Session.SetString("NoiCapDVDien", noicap);
            HttpContext.Session.SetString("DiaChiDVDien", diachi);
            HttpContext.Session.SetString("DienThoaiDVDien", dienthoai);

            HttpContext.Session.SetString("dvThayDoiViTriDVDien", thaydoivitri);
            HttpContext.Session.SetString("dvThayDoiMDSDDVDien", thaydoimdsd);
            HttpContext.Session.SetString("dvThayDoiDMSDDVDien", thaydoidinhmucsudung);
            HttpContext.Session.SetString("dvThayDoiHopDongDVDien", thaydoihopdong);
            HttpContext.Session.SetString("dvKiemTraDongHoDVDien", kiemtradongho);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdmdangkyfiledvdien", ttdmdangkyfile.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpPost]
        public async Task<IActionResult> TuChoiDvDien(int dichvudienId, DateTime NgayTuChoi, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvudienService.Update_TTCacDichVuDien_ByTuChoi(dichvudienId, NgayTuChoi, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PhucHoiDvDien(int dichvudienId, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvudienService.Update_TTCacDichVuDien_ByPhucHoiTuChoi(dichvudienId, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDVDien(TTCacDichVuDienViewModel dichvudien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            DateTime updateDate = DateTime.Now;
            string updateBy = User.GetSpecificClaim("UserName");

            var model = await _ttcacdichvudienService.Update_TTCacDichVuDien_ById(dichvudien, updateDate, updateBy);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> XacNhanDvDien(int dichvudienId, DateTime NgayXacNhan, string LyDoXacNhan)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvudienService.Update_TTCacDichVuDien_ByXacNhan(dichvudienId, NgayXacNhan, LyDoXacNhan,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

        #region Cac dich vu nuoc

        [HttpGet]
        public IActionResult GetDvNuoc(int dichvunuocId)
        {
            var model = _ttcacdichvunuocService.Get_TTCacDichVuNuoc_ByIdNoTest(dichvunuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListDvNuoc(int tinh, int huyen, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttcacdichvunuocService.Get_TTCacDichVuNuoc_AllPaging(tinh, huyen, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDvNuocTT(int tinh, int huyen, string theotrangthai, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _ttcacdichvunuocService.Get_TTCacDichVuNuoc_AllPagingTT(tinh, huyen, theotrangthai, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult InDVNuoc(int ttdichvunuocId, int xiNghiep)
        {
            var ttdmdangkyfile = _ttdangkyfileService.Get_TTDangKyFile_ByDangKy(ttdichvunuocId, "DichVuNuoc");

            var ttdangkydien = _ttcacdichvunuocService.Get_TTCacDichVuNuoc_ByIdNoTest(ttdichvunuocId);

            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(xiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                " ĐIỆN NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper();

            string hoten = ttdangkydien.Result.HoTenNguoiYeuCau.ToString();
            string socmnd = ttdangkydien.Result.SoTheCCCD.ToString();
            string ngaycap = ttdangkydien.Result.NgayCap.ToString("dd/MM/yyyy");
            string noicap = ttdangkydien.Result.NoiCap.ToString();

            //string diachi = ttdangkydien.Result.SoNha != null ? ttdangkydien.Result.SoNha.ToString() : ""
            //    + " " + ttdangkydien.Result.TenDuongApTo != null ? ttdangkydien.Result.TenDuongApTo.ToString() : "" +
            //    "," + ttdangkydien.Result.Tenphuong.ToString() + "," + ttdangkydien.Result.TenQuan.ToString() + "," +
            //    ttdangkydien.Result.TenTinh.ToString();

            string diachi = ttdangkydien.Result.DiaChiLD != null ? ttdangkydien.Result.DiaChiLD.ToString() : "";
            string dienthoai = ttdangkydien.Result.DienThoai != null ? ttdangkydien.Result.DienThoai.ToString() : "";
            //string diachi = ttdangkydien.Result.DiaChiLD.ToString();
            //string dienthoai = ttdangkydien.Result.DienThoai.ToString();

            string thaydoivitri = ttdangkydien.Result.TTDMDangKyDichVu == 60 ? "X" : "";
            string thaydoimdsd = ttdangkydien.Result.TTDMDangKyDichVu == 61 ? "X" : "";
            string thaydoidinhmucsudung = ttdangkydien.Result.TTDMDangKyDichVu == 62 ? "X" : "";
            string thaydoihopdong = ttdangkydien.Result.TTDMDangKyDichVu == 63 ? "X" : "";
            string kiemtradongho = ttdangkydien.Result.TTDMDangKyDichVu == 64 ? "X" : "";

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDVNuoc", tenxinghiep);
            HttpContext.Session.SetString("HotenDVNuoc", hoten);
            HttpContext.Session.SetString("SoCMNDDVNuoc", socmnd);
            HttpContext.Session.SetString("NgayCapDVNuoc", ngaycap);
            HttpContext.Session.SetString("NoiCapDVNuoc", noicap);
            HttpContext.Session.SetString("DiaChiDVNuoc", diachi);
            HttpContext.Session.SetString("DienThoaiDVNuoc", dienthoai);

            HttpContext.Session.SetString("dvThayDoiViTriDVNuoc", thaydoivitri);
            HttpContext.Session.SetString("dvThayDoiMDSDDVNuoc", thaydoimdsd);
            HttpContext.Session.SetString("dvThayDoiDMSDDVNuoc", thaydoidinhmucsudung);
            HttpContext.Session.SetString("dvThayDoiHopDongDVNuoc", thaydoihopdong);
            HttpContext.Session.SetString("dvKiemTraDongHoDVNuoc", kiemtradongho);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdmdangkyfiledvnuoc", ttdmdangkyfile.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpPost]
        public async Task<IActionResult> TuChoiDvNuoc(int dichvunuocId, DateTime NgayTuChoi, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvunuocService.Update_TTCacDichVuNuoc_ByTuChoi(dichvunuocId, NgayTuChoi, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PhucHoiDvNuoc(int dichvunuocId, string LyDoTuChoi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvunuocService.Update_TTCacDichVuNuoc_ByPhucHoiTuChoi(dichvunuocId, LyDoTuChoi,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpdateDVNuoc(TTCacDichVuNuocViewModel dichvunuoc)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            DateTime updateDate = DateTime.Now;
            string updateBy = User.GetSpecificClaim("UserName");

            var model = await _ttcacdichvunuocService.Update_TTCacDichVuNuoc_ById(dichvunuoc, updateDate, updateBy);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> XacNhanDvNuoc(int dichvunuocId, DateTime NgayXacNhan, string LyDoXacNhan)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttcacdichvunuocService.Update_TTCacDichVuNuoc_ByXacNhan(dichvunuocId, NgayXacNhan, LyDoXacNhan,
                    updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }
        #endregion

        #region Cac bao cao dang ky truc tuyen

        [HttpGet]
        public IActionResult DsDkDien(int XiNghiep, string DanhSachTheo, DateTime TuNgay, DateTime DenNgay)
        {  
            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(XiNghiep);

            string tenxinghiep = "";

            if (XiNghiep == 0)
            {
                tenxinghiep = " TỔ CSKH";
            }
            else if (quanhuyen.Result.MAKV == "LX")
            {
                tenxinghiep = " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper();
            }
            else
            {
                tenxinghiep = quanhuyen.Result.TenQuanHuyen.ToUpper();
            }              

            string tugaydenngay = "Từ ngày " + TuNgay.ToString("dd/MM/yyyy") + " đến ngày " + DenNgay.ToString("dd/MM/yyyy");

            string ngayindanhsach = "An Giang, ngày " + DateTime.Now.Day.ToString() + " tháng " + DateTime.Now.Month.ToString()
                + " năm " + DateTime.Now.Year.ToString();

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDk", tenxinghiep);
            HttpContext.Session.SetString("TuNgayDenNgayDk", tugaydenngay);
            HttpContext.Session.SetString("NgayInDanhSachDk", ngayindanhsach);

            var dsttdmdangky = _ttdangkydienService.Get_TTDangKyDien_ByDsTheoTuNgay(XiNghiep, DanhSachTheo, TuNgay, DenNgay);
            if (DanhSachTheo == "TongHopDkDv")
            {                
                SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdangkydienTongHop", dsttdmdangky.Result);                
            }
            else
            {                
                SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdangkydien", dsttdmdangky.Result);               
            }

            return new OkObjectResult(dsttdmdangky.Result);
        }

        [HttpGet]
        public IActionResult DsDkNuoc(int XiNghiep, string DanhSachTheo, DateTime TuNgay, DateTime DenNgay)
        {
            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(XiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                 quanhuyen.Result.TenQuanHuyen.ToUpper();

            string tugaydenngay = "Từ ngày " + TuNgay.ToString("dd/MM/yyyy") + " đến ngày " + DenNgay.ToString("dd/MM/yyyy");

            string ngayindanhsach = "An Giang, ngày " + DateTime.Now.Day.ToString() + " tháng " + DateTime.Now.Month.ToString()
                + " năm " + DateTime.Now.Year.ToString();

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDkNuoc", tenxinghiep);
            HttpContext.Session.SetString("TuNgayDenNgayDkNuoc", tugaydenngay);
            HttpContext.Session.SetString("NgayInDanhSachDkNuoc", ngayindanhsach);

            var dsttdmdangky = _ttdangkynuocService.Get_TTDangKyNuoc_ByDsTheoTuNgay(XiNghiep, DanhSachTheo, TuNgay, DenNgay);
            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdangkynuoc", dsttdmdangky.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpGet]
        public IActionResult DsDvDien(int XiNghiep, string DanhSachTheo, DateTime TuNgay, DateTime DenNgay)
        {
            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(XiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                 quanhuyen.Result.TenQuanHuyen.ToUpper();

            string tugaydenngay = "Từ ngày " + TuNgay.ToString("dd/MM/yyyy") + " đến ngày " + DenNgay.ToString("dd/MM/yyyy");

            string ngayindanhsach = "An Giang, ngày " + DateTime.Now.Day.ToString() + " tháng " + DateTime.Now.Month.ToString()
                + " năm " + DateTime.Now.Year.ToString();

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDvDien", tenxinghiep);
            HttpContext.Session.SetString("TuNgayDenNgayDvDien", tugaydenngay);
            HttpContext.Session.SetString("NgayInDanhSachDvDien", ngayindanhsach);

            var dsttdmdangky = _ttcacdichvudienService.Get_TTCacDichVuDien_ByDsTheoTuNgay(XiNghiep, DanhSachTheo, TuNgay, DenNgay);
            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdichvudien", dsttdmdangky.Result);

            return new OkObjectResult(quanhuyen);
        }

        [HttpGet]
        public IActionResult DsDvNuoc(int XiNghiep, string DanhSachTheo, DateTime TuNgay, DateTime DenNgay)
        {
            var quanhuyen = _quanhuyenService.Get_QuanHuyen_ById(XiNghiep);

            string tenxinghiep = quanhuyen.Result.MAKV == "LX" ? " CẤP NƯỚC " + quanhuyen.Result.TenQuanHuyen.ToUpper() :
                 quanhuyen.Result.TenQuanHuyen.ToUpper();

            string tugaydenngay = "Từ ngày " + TuNgay.ToString("dd/MM/yyyy") + " đến ngày " + DenNgay.ToString("dd/MM/yyyy");

            string ngayindanhsach = "An Giang, ngày " + DateTime.Now.Day.ToString() + " tháng " + DateTime.Now.Month.ToString()
                + " năm " + DateTime.Now.Year.ToString();

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenXiNghiepDvNuoc", tenxinghiep);
            HttpContext.Session.SetString("TuNgayDenNgayDvNuoc", tugaydenngay);
            HttpContext.Session.SetString("NgayInDanhSachDvNuoc", ngayindanhsach);

            var dsttdmdangky = _ttcacdichvunuocService.Get_TTCacDichVuNuoc_ByDsTheoTuNgay(XiNghiep, DanhSachTheo, TuNgay, DenNgay);
            SessionHelper.SetObjectAsJson(HttpContext.Session, "ttdichvunuoc", dsttdmdangky.Result);

            return new OkObjectResult(quanhuyen);
        }

        #endregion

        #region Update trang thai khach hang chua lap dat dong ho

        [HttpPost]
        public async Task<IActionResult> DkChuaLap()
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYTRUCTUYENCHUYEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = await _ttdangkydienService.Update_TTDangKyDien_ByAllDienNuocDichVu(updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
