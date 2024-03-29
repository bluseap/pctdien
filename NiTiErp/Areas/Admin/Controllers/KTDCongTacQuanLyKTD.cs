using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces.KyThuatDien;
using NiTiErp.Application.Dapper.ViewModels.KyThuatDien;
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
    public class KTDCongTacQuanLyKTD : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IKTDThayTheVatTuService _ktdthaythevattuService;

        public KTDCongTacQuanLyKTD(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,
            IKTDThayTheVatTuService ktdthaythevattuService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _ktdthaythevattuService = ktdthaythevattuService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult ListThayTheVatTu(string makhuvuc, int nam, int thang)
        {            
            var model = _ktdthaythevattuService.KTD_KTDThayTheVatTu_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListPhatTrienLuoiDien(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListCayMoiNangCongSuat(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDNangCongSuatCayMoi_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListPhatTrienKhachHang(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDPhatTrienKhachHang_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListXuLyKhac(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDXuLyKhac_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListDuyTuBaoDuong(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDDuyTuBaoDuong_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListCaiTaoSuaChua(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDCaiTaoSuaChua_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListCongTacAnToanTheoTo(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDCongTacAnToanTheoTo_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListCongTacAnToanTheoHienTruong(string makhuvuc, int nam, int thang)
        {
            var model = _ktdthaythevattuService.KTD_KTDCongTacAnToanTheoHienTruong_Get_ByCorKy(makhuvuc, nam, thang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditThayTheVatTu(int ThayTheVatTuId)
        {
            var model = _ktdthaythevattuService.KTD_KTDThayTheVatTu_Get_ById(ThayTheVatTuId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditPhatTienLuoiDien(int PhatTrienLuoiDienId)
        {
            var model = _ktdthaythevattuService.KTD_KTDPhatTrienLuoiDien_Get_ById(PhatTrienLuoiDienId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditNangCongSuatCayMoi(int NangCongSuatCayMoiId)
        {
            var model = _ktdthaythevattuService.KTD_KTDNangCongSuatCayMoi_Get_ById(NangCongSuatCayMoiId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditPhatTrienKhachHang(int PhatTrienKhachHangId)
        {
            var model = _ktdthaythevattuService.KTD_KTDPhatTrienKhachHang_Get_ById(PhatTrienKhachHangId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditXuLyKhac(int XuLyKhacId)
        {
            var model = _ktdthaythevattuService.KTD_KTDXuLyKhac_Get_ById(XuLyKhacId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditDuyTuBaoDuong(int DuyTuBaoDuongId)
        {
            var model = _ktdthaythevattuService.KTD_KTDDuyTuBaoDuong_Get_ById(DuyTuBaoDuongId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditCaiTaoSuaChua(int CaiTaoSuaChuaId)
        {
            var model = _ktdthaythevattuService.KTD_KTDCaiTaoSuaChua_Get_ById(CaiTaoSuaChuaId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult EditCongTacAnToan(int CongTacAnToanId)
        {
            var model = _ktdthaythevattuService.KTD_KTDCongTacAnToan_Get_ById(CongTacAnToanId);
            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, update, delete

        [HttpPost]
        public async Task<IActionResult> KhoiTaoBaoCao(string DmKhoiTao, string MaKhuVuc, int Nam, int Thang)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm(DmKhoiTao, MaKhuVuc, Nam, Thang, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveThayTheVatTu(int ThayTheVatTuId, int SoLuongVatTu, int SoLuongLuyTuyen, 
            string ChiTietVatTu, string ThietBiKhac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDThayTheVatTu_Update_ById(ThayTheVatTuId, SoLuongVatTu, 
                    SoLuongLuyTuyen, ChiTietVatTu, ThietBiKhac, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SavePhatTrienLuoiDien(int PhatTrienLuoiDienId, int ChieuDaiPhatTrienLuoiDien, int ChieuDaiLuyTuyenPhatTrienLuoiDien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDPhatTrienLuoiDien_Update_ById(PhatTrienLuoiDienId, ChieuDaiPhatTrienLuoiDien,
                    ChieuDaiLuyTuyenPhatTrienLuoiDien, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveNangCongSuatCayMoi(int NangCongSuatCayMoiId, int SoLuongNangCongSuat, 
            int SoLuongSoLuongNangCongSuat, string CuTheNangCongSuat, int SoLuongLuyTuyenNangCongSuat, int CongSuatSoLuongLuyTuyenNangCongSuat)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDNangCongSuatCayMoi_Update_ById(NangCongSuatCayMoiId, SoLuongNangCongSuat,
                    SoLuongSoLuongNangCongSuat, CuTheNangCongSuat, SoLuongLuyTuyenNangCongSuat, CongSuatSoLuongLuyTuyenNangCongSuat, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SavePhatTrienKhachHang(int PhatTrienKhachHangId,
            int SoLuongPhatTrienKhachHang, int LuyTuyenPhatTrienKhachHang)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDPhatTrienKhachHang_Update_ById(PhatTrienKhachHangId, 
                    SoLuongPhatTrienKhachHang, LuyTuyenPhatTrienKhachHang, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveXuLyKhac(int XuLyKhacId, string NoiDungXuLyKhac)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDXuLyKhac_Update_ById(XuLyKhacId,
                    NoiDungXuLyKhac, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveDuyTuBaoDuong(int DuyTuBaoDuongId, 
            int SoLuongDuyTuBaoDuong, string CuTheDuyTuBaoDuong, int SoLuongLuyTuyenDuyTuBaoDuong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDDuyTuBaoDuong_Update_ById(DuyTuBaoDuongId,
                    SoLuongDuyTuBaoDuong, CuTheDuyTuBaoDuong, SoLuongLuyTuyenDuyTuBaoDuong, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveCaiTaoSuaChua(KTDCaiTaoSuaChuaRequest caitaosuachua)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDCaiTaoSuaChua_Update_ById(caitaosuachua, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveCongTacAnToan(int CongTacAnToanId, string KiemTraThucHienTo,
            int SoLuongDaThucHienTheoTo, int LuyTuyenDaThucHienTheoTo, int SoLuongDaThucHienTheoCanBoCongNhan, int LuyTuyenDaThucHienTheoCanBoCongNhan)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KTDCONGTACNHAP", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                //DateTime CreateDate = DateTime.Now;
                string UpdateBy = User.GetSpecificClaim("UserName");

                var model = await _ktdthaythevattuService.KTD_KTDCongTacAnToan_Update_ById(CongTacAnToanId, KiemTraThucHienTo,
                    SoLuongDaThucHienTheoTo, LuyTuyenDaThucHienTheoTo, SoLuongDaThucHienTheoCanBoCongNhan,
                    LuyTuyenDaThucHienTheoCanBoCongNhan, UpdateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

        [HttpPost]
        public IActionResult ExcelByPo(string TenXiNghiep, string XiNghiep, int Nam, int Thang)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"BCCTQLKHXN.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "BCCTQLKHXN.xlsx");

            string url = $"{Request.Scheme}://{Request.Host}/{"export-files"}/{sFileName}";

            FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));

            if (file.Exists)
            {
                file.Delete();
                file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));
            }

            var thaythevattu = _ktdthaythevattuService.KTD_KTDThayTheVatTu_Get_ByCorKy(XiNghiep, Nam, Thang);
            var phattrienluoidien = _ktdthaythevattuService.KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(XiNghiep, Nam, Thang);
            var nangcongsuat = _ktdthaythevattuService.KTD_KTDNangCongSuatCayMoi_Get_ByCorKy(XiNghiep, Nam, Thang);
            var phattrienkhachhang = _ktdthaythevattuService.KTD_KTDPhatTrienKhachHang_Get_ByCorKy(XiNghiep, Nam, Thang);
            var xulykhac = _ktdthaythevattuService.KTD_KTDXuLyKhac_Get_ByCorKy(XiNghiep, Nam, Thang);
            var duytubaoduong = _ktdthaythevattuService.KTD_KTDDuyTuBaoDuong_Get_ByCorKy(XiNghiep, Nam, Thang);
            var caitaosuachua = _ktdthaythevattuService.KTD_KTDCaiTaoSuaChua_Get_ByCorKy(XiNghiep, Nam, Thang);
            var congtacantoanto = _ktdthaythevattuService.KTD_KTDCongTacAnToanTheoTo_Get_ByCorKy(XiNghiep, Nam, Thang);
            var congtacantoanhientruong = _ktdthaythevattuService.KTD_KTDCongTacAnToanTheoHienTruong_Get_ByCorKy(XiNghiep, Nam, Thang);

            var tieudebaocao = "BÁO CÁO CÔNG TÁC QUẢN LÝ KỸ THUẬT ĐIỆN THÁNG " + Thang.ToString() + " NĂM " + Nam.ToString();
            var xinghiepbaocao = "XÍ NGHIỆP ĐIỆN NƯỚC " + TenXiNghiep.ToUpper();

            using (FileStream templateDocumentStream = System.IO.File.OpenRead(templateDocument))
            {
                using (ExcelPackage package = new ExcelPackage(templateDocumentStream))
                {
                    // add a new worksheet to the empty workbook
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["XN"];
                    
                    worksheet.Cells[4, 1].Value = tieudebaocao;
                    worksheet.Cells[4, 1].Style.Font.Size = 14;
                    worksheet.Cells[4, 1].Style.Font.Bold = true;
                    worksheet.Cells[4, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[4, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    
                    worksheet.Cells[5, 1].Value = xinghiepbaocao;
                    worksheet.Cells[5, 1].Style.Font.Size = 14;
                    worksheet.Cells[5, 1].Style.Font.Bold = true;
                    worksheet.Cells[5, 1].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[5, 1].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    var thayaptomat = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THAYAPMCCB")).Single();
                    worksheet.Cells[8, 2].Value = Convert.ToInt32(thayaptomat.SoLuongThayTheVatTu).ToString();
                    worksheet.Cells[8, 2].Style.Font.Size = 13;
                    worksheet.Cells[8, 2].Style.Font.Bold = true;
                    worksheet.Cells[8, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[8, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[8, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[8, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin; 
                    worksheet.Cells[8, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[8, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[8, 6].Value = Convert.ToInt32(thayaptomat.SoLuongLuyTuyenThayTheVatTu).ToString();
                    worksheet.Cells[8, 6].Style.Font.Size = 13;
                    worksheet.Cells[8, 6].Style.Font.Bold = true;
                    worksheet.Cells[8, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[8, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[8, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[8, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[8, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[8, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[8, 9].Value = thayaptomat.ChiTietThayTheVatTu != null ? thayaptomat.ChiTietThayTheVatTu.ToString() : "";
                    worksheet.Cells[8, 9].Style.Font.Size = 13;
                    worksheet.Cells[8, 9].Style.Font.Bold = true;
                    worksheet.Cells[8, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[8, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;                    

                    var thayfco = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THAYFCOLBF")).Single();
                    worksheet.Cells[9, 2].Value = Convert.ToInt32(thayfco.SoLuongThayTheVatTu).ToString();
                    worksheet.Cells[9, 2].Style.Font.Size = 13;
                    worksheet.Cells[9, 2].Style.Font.Bold = true;
                    worksheet.Cells[9, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[9, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[9, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[9, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[9, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[9, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[9, 6].Value = Convert.ToInt32(thayfco.SoLuongLuyTuyenThayTheVatTu).ToString();
                    worksheet.Cells[9, 6].Style.Font.Size = 13;
                    worksheet.Cells[9, 6].Style.Font.Bold = true;
                    worksheet.Cells[9, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[9, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[9, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[9, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[9, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[9, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[9, 9].Value = thayfco.ChiTietThayTheVatTu != null ? thayfco.ChiTietThayTheVatTu.ToString() : "";
                    worksheet.Cells[9, 9].Style.Font.Size = 13;
                    worksheet.Cells[9, 9].Style.Font.Bold = true;
                    worksheet.Cells[9, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[9, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;                    

                    var thaydaysorty = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THDAYSORTY")).Single();
                    worksheet.Cells[10, 2].Value = Convert.ToInt32(thaydaysorty.SoLuongThayTheVatTu).ToString();
                    worksheet.Cells[10, 2].Style.Font.Size = 13;
                    worksheet.Cells[10, 2].Style.Font.Bold = true;
                    worksheet.Cells[10, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[10, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[10, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[10, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[10, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[10, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[10, 6].Value = Convert.ToInt32(thaydaysorty.SoLuongLuyTuyenThayTheVatTu).ToString();
                    worksheet.Cells[10, 6].Style.Font.Size = 13;
                    worksheet.Cells[10, 6].Style.Font.Bold = true;
                    worksheet.Cells[10, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[10, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[10, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[10, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[10, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[10, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[10, 9].Value = thaydaysorty.ChiTietThayTheVatTu != null ? thaydaysorty.ChiTietThayTheVatTu.ToString() : "";
                    worksheet.Cells[10, 9].Style.Font.Size = 13;
                    worksheet.Cells[10, 9].Style.Font.Bold = true;
                    worksheet.Cells[10, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[10, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    var thaymaybienap = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THMAYBA")).Single();
                    worksheet.Cells[11, 2].Value = Convert.ToInt32(thaymaybienap.SoLuongThayTheVatTu).ToString();
                    worksheet.Cells[11, 2].Style.Font.Size = 13;
                    worksheet.Cells[11, 2].Style.Font.Bold = true;
                    worksheet.Cells[11, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[11, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[11, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[11, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[11, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[11, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[11, 6].Value = Convert.ToInt32(thaymaybienap.SoLuongLuyTuyenThayTheVatTu).ToString();
                    worksheet.Cells[11, 6].Style.Font.Size = 13;
                    worksheet.Cells[11, 6].Style.Font.Bold = true;
                    worksheet.Cells[11, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[11, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[11, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[11, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[11, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[11, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[11, 9].Value = thaymaybienap.ChiTietThayTheVatTu != null ? thaymaybienap.ChiTietThayTheVatTu.ToString() : "";
                    worksheet.Cells[11, 9].Style.Font.Size = 13;
                    worksheet.Cells[11, 9].Style.Font.Bold = true;
                    worksheet.Cells[11, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[11, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    var baotrimba = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THBAOTRITB")).Single();
                    worksheet.Cells[12, 2].Value = Convert.ToInt32(baotrimba.SoLuongThayTheVatTu).ToString();
                    worksheet.Cells[12, 2].Style.Font.Size = 13;
                    worksheet.Cells[12, 2].Style.Font.Bold = true;
                    worksheet.Cells[12, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[12, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[12, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[12, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[12, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[12, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[12, 6].Value = Convert.ToInt32(baotrimba.SoLuongLuyTuyenThayTheVatTu).ToString();
                    worksheet.Cells[12, 6].Style.Font.Size = 13;
                    worksheet.Cells[12, 6].Style.Font.Bold = true;
                    worksheet.Cells[12, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[12, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[12, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[12, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[12, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[12, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[12, 9].Value = baotrimba.ChiTietThayTheVatTu != null ? baotrimba.ChiTietThayTheVatTu.ToString() : "";
                    worksheet.Cells[12, 9].Style.Font.Size = 13;
                    worksheet.Cells[12, 9].Style.Font.Bold = true;
                    worksheet.Cells[12, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[12, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    var thietbikhac = thaythevattu.Result.Where(p => p.MaTenThayTheVatTu.Equals("THTHIETBIK")).Single();
                    worksheet.Cells[13, 2].Value = thietbikhac.ThietBiKhacThayTheVatTu != null ? thietbikhac.ThietBiKhacThayTheVatTu.ToString() : "";
                    worksheet.Cells[13, 2].Style.Font.Size = 13;
                    worksheet.Cells[13, 2].Style.Font.Bold = true;
                    worksheet.Cells[13, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[13, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    var luoidienHTHH = phattrienluoidien.Result.Where(p => p.MaPhatTrienLuoiDien.Equals("XDHTHH")).Single();
                    worksheet.Cells[15, 6].Value = Convert.ToInt32(luoidienHTHH.ChieuDaiPhatTrienLuoiDien).ToString(); 
                    worksheet.Cells[15, 6].Style.Font.Size = 13;
                    worksheet.Cells[15, 6].Style.Font.Bold = true;
                    worksheet.Cells[15, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[15, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[15, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[15, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[15, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[15, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[15, 13].Value = Convert.ToInt32(luoidienHTHH.ChieuDaiLuyTuyenPhatTrienLuoiDien).ToString();
                    worksheet.Cells[15, 13].Style.Font.Size = 13;
                    worksheet.Cells[15, 13].Style.Font.Bold = true;
                    worksheet.Cells[15, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[15, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[15, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[15, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[15, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[15, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var luoidienHTDL = phattrienluoidien.Result.Where(p => p.MaPhatTrienLuoiDien.Equals("XDHTDL")).Single();
                    worksheet.Cells[16, 6].Value = Convert.ToInt32(luoidienHTDL.ChieuDaiPhatTrienLuoiDien).ToString();
                    worksheet.Cells[16, 6].Style.Font.Size = 13;
                    worksheet.Cells[16, 6].Style.Font.Bold = true;
                    worksheet.Cells[16, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[16, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[16, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[16, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[16, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[16, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[16, 13].Value = Convert.ToInt32(luoidienHTDL.ChieuDaiLuyTuyenPhatTrienLuoiDien).ToString();
                    worksheet.Cells[16, 13].Style.Font.Size = 13;
                    worksheet.Cells[16, 13].Style.Font.Bold = true;
                    worksheet.Cells[16, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[16, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[16, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[16, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[16, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[16, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var luoidienTT1P = phattrienluoidien.Result.Where(p => p.MaPhatTrienLuoiDien.Equals("XDTT1P")).Single();
                    worksheet.Cells[17, 6].Value = Convert.ToInt32(luoidienTT1P.ChieuDaiPhatTrienLuoiDien).ToString();
                    worksheet.Cells[17, 6].Style.Font.Size = 13;
                    worksheet.Cells[17, 6].Style.Font.Bold = true;
                    worksheet.Cells[17, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[17, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[17, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[17, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[17, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[17, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[17, 13].Value = Convert.ToInt32(luoidienTT1P.ChieuDaiLuyTuyenPhatTrienLuoiDien).ToString();
                    worksheet.Cells[17, 13].Style.Font.Size = 13;
                    worksheet.Cells[17, 13].Style.Font.Bold = true;
                    worksheet.Cells[17, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[17, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[17, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[17, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[17, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[17, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var luoidienTT3P = phattrienluoidien.Result.Where(p => p.MaPhatTrienLuoiDien.Equals("XDTT3P")).Single();
                    worksheet.Cells[18, 6].Value = Convert.ToInt32(luoidienTT3P.ChieuDaiPhatTrienLuoiDien).ToString();
                    worksheet.Cells[18, 6].Style.Font.Size = 13;
                    worksheet.Cells[18, 6].Style.Font.Bold = true;
                    worksheet.Cells[18, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[18, 6].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[18, 6].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[18, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[18, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[18, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[18, 13].Value = Convert.ToInt32(luoidienTT3P.ChieuDaiLuyTuyenPhatTrienLuoiDien).ToString();
                    worksheet.Cells[18, 13].Style.Font.Size = 13;
                    worksheet.Cells[18, 13].Style.Font.Bold = true;
                    worksheet.Cells[18, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[18, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[18, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[18, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[18, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[18, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var nangcongsuatcaymoi = nangcongsuat.Result.Where(p => p.MaNangCongSuat.Equals("CMTBA")).Single();
                    worksheet.Cells[20, 2].Value = Convert.ToInt32(nangcongsuatcaymoi.SoLuongNangCongSuat).ToString();
                    worksheet.Cells[20, 2].Style.Font.Size = 13;
                    worksheet.Cells[20, 2].Style.Font.Bold = true;
                    worksheet.Cells[20, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[20, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[20, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[20, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[20, 5].Value = Convert.ToInt32(nangcongsuatcaymoi.SoLuongSoLuongNangCongSuat).ToString();
                    worksheet.Cells[20, 5].Style.Font.Size = 13;
                    worksheet.Cells[20, 5].Style.Font.Bold = true;
                    worksheet.Cells[20, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[20, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[20, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[20, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[20, 9].Value = nangcongsuatcaymoi.CuTheNangCongSuat != null ? nangcongsuatcaymoi.CuTheNangCongSuat.ToString() : "";
                    worksheet.Cells[20, 9].Style.Font.Size = 13;
                    worksheet.Cells[20, 9].Style.Font.Bold = true;
                    worksheet.Cells[20, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua

                    worksheet.Cells[20, 18].Value = Convert.ToInt32(nangcongsuatcaymoi.SoLuongLuyTuyenNangCongSuat).ToString();
                    worksheet.Cells[20, 18].Style.Font.Size = 13;
                    worksheet.Cells[20, 18].Style.Font.Bold = true;
                    worksheet.Cells[20, 18].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[20, 18].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[20, 18].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 18].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 18].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[20, 18].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[20, 20].Value = Convert.ToInt32(nangcongsuatcaymoi.CongSuatSoLuongLuyTuyenNangCongSuat).ToString();
                    worksheet.Cells[20, 20].Style.Font.Size = 13;
                    worksheet.Cells[20, 20].Style.Font.Bold = true;
                    worksheet.Cells[20, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[20, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[20, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[20, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[20, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var nangcongsuatnangcs = nangcongsuat.Result.Where(p => p.MaNangCongSuat.Equals("NCSTBA")).Single();
                    worksheet.Cells[21, 2].Value = Convert.ToInt32(nangcongsuatnangcs.SoLuongNangCongSuat).ToString();
                    worksheet.Cells[21, 2].Style.Font.Size = 13;
                    worksheet.Cells[21, 2].Style.Font.Bold = true;
                    worksheet.Cells[21, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[21, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[21, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[21, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[21, 5].Value = Convert.ToInt32(nangcongsuatnangcs.SoLuongSoLuongNangCongSuat).ToString();
                    worksheet.Cells[21, 5].Style.Font.Size = 13;
                    worksheet.Cells[21, 5].Style.Font.Bold = true;
                    worksheet.Cells[21, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[21, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[21, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[21, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[21, 9].Value = nangcongsuatnangcs.CuTheNangCongSuat != null ? nangcongsuatnangcs.CuTheNangCongSuat.ToString() : "";
                    worksheet.Cells[21, 9].Style.Font.Size = 13;
                    worksheet.Cells[21, 9].Style.Font.Bold = true;
                    worksheet.Cells[21, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua

                    worksheet.Cells[21, 18].Value = Convert.ToInt32(nangcongsuatnangcs.SoLuongLuyTuyenNangCongSuat).ToString();
                    worksheet.Cells[21, 18].Style.Font.Size = 13;
                    worksheet.Cells[21, 18].Style.Font.Bold = true;
                    worksheet.Cells[21, 18].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[21, 18].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[21, 18].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 18].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 18].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[21, 18].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[21, 20].Value = Convert.ToInt32(nangcongsuatnangcs.CongSuatSoLuongLuyTuyenNangCongSuat).ToString();
                    worksheet.Cells[21, 20].Style.Font.Size = 13;
                    worksheet.Cells[21, 20].Style.Font.Bold = true;
                    worksheet.Cells[21, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[21, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[21, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[21, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[21, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ptkhluatdl = phattrienkhachhang.Result.Where(p => p.MaPhatTrienKhachHang.Equals("LMLDL")).Single();
                    worksheet.Cells[23, 5].Value = Convert.ToInt32(ptkhluatdl.SoLuongPhatTrienKhachHang).ToString();
                    worksheet.Cells[23, 5].Style.Font.Size = 13;
                    worksheet.Cells[23, 5].Style.Font.Bold = true;
                    worksheet.Cells[23, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[23, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[23, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[23, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[23, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[23, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[23, 9].Value = Convert.ToInt32(ptkhluatdl.LuyTuyenPhatTrienKhachHang).ToString();
                    worksheet.Cells[23, 9].Style.Font.Size = 13;
                    worksheet.Cells[23, 9].Style.Font.Bold = true;
                    worksheet.Cells[23, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[23, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[23, 9].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[23, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[23, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[23, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ptkhluatmdk = phattrienkhachhang.Result.Where(p => p.MaPhatTrienKhachHang.Equals("LMDK1P")).Single();
                    worksheet.Cells[24, 5].Value = Convert.ToInt32(ptkhluatmdk.SoLuongPhatTrienKhachHang).ToString();
                    worksheet.Cells[24, 5].Style.Font.Size = 13;
                    worksheet.Cells[24, 5].Style.Font.Bold = true;
                    worksheet.Cells[24, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[24, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[24, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[24, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[24, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[24, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[24, 9].Value = Convert.ToInt32(ptkhluatmdk.LuyTuyenPhatTrienKhachHang).ToString();
                    worksheet.Cells[24, 9].Style.Font.Size = 13;
                    worksheet.Cells[24, 9].Style.Font.Bold = true;
                    worksheet.Cells[24, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[24, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[24, 9].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[24, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[24, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[24, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ptkhluatmdk3p = phattrienkhachhang.Result.Where(p => p.MaPhatTrienKhachHang.Equals("LMDK3P")).Single();
                    worksheet.Cells[25, 5].Value = Convert.ToInt32(ptkhluatmdk3p.SoLuongPhatTrienKhachHang).ToString();
                    worksheet.Cells[25, 5].Style.Font.Size = 13;
                    worksheet.Cells[25, 5].Style.Font.Bold = true;
                    worksheet.Cells[25, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[25, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[25, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[25, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[25, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[25, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[25, 9].Value = Convert.ToInt32(ptkhluatmdk3p.LuyTuyenPhatTrienKhachHang).ToString();
                    worksheet.Cells[25, 9].Style.Font.Size = 13;
                    worksheet.Cells[25, 9].Style.Font.Bold = true;
                    worksheet.Cells[25, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[25, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[25, 9].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[25, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[25, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[25, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ptkhluatdkkh = phattrienkhachhang.Result.Where(p => p.MaPhatTrienKhachHang.Equals("LMDKKH")).Single();
                    worksheet.Cells[26, 5].Value = Convert.ToInt32(ptkhluatdkkh.SoLuongPhatTrienKhachHang).ToString();
                    worksheet.Cells[26, 5].Style.Font.Size = 13;
                    worksheet.Cells[26, 5].Style.Font.Bold = true;
                    worksheet.Cells[26, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[26, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[26, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[26, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[26, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[26, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[26, 9].Value = Convert.ToInt32(ptkhluatdkkh.LuyTuyenPhatTrienKhachHang).ToString();
                    worksheet.Cells[26, 9].Style.Font.Size = 13;
                    worksheet.Cells[26, 9].Style.Font.Bold = true;
                    worksheet.Cells[26, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[26, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[26, 9].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[26, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[26, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[26, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ptkhptdkkh = phattrienkhachhang.Result.Where(p => p.MaPhatTrienKhachHang.Equals("LMPTLDKH")).Single();
                    worksheet.Cells[27, 5].Value = Convert.ToInt32(ptkhptdkkh.SoLuongPhatTrienKhachHang).ToString();
                    worksheet.Cells[27, 5].Style.Font.Size = 13;
                    worksheet.Cells[27, 5].Style.Font.Bold = true;
                    worksheet.Cells[27, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[27, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[27, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[27, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[27, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[27, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[27, 9].Value = Convert.ToInt32(ptkhptdkkh.LuyTuyenPhatTrienKhachHang).ToString();
                    worksheet.Cells[27, 9].Style.Font.Size = 13;
                    worksheet.Cells[27, 9].Style.Font.Bold = true;
                    worksheet.Cells[27, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[27, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[27, 9].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[27, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[27, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[27, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var xlktaidiaphuong = xulykhac.Result.Where(p => p.MaXuLyKhac.Equals("PVCDTDP")).Single();
                    worksheet.Cells[29, 8].Value = xlktaidiaphuong.NoiDungXuLyKhac != null ? xlktaidiaphuong.NoiDungXuLyKhac.ToString() : "";
                    worksheet.Cells[29, 8].Style.Font.Size = 13;
                    worksheet.Cells[29, 8].Style.Font.Bold = true;
                    worksheet.Cells[29, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua

                    var congtacxlk = xulykhac.Result.Where(p => p.MaXuLyKhac.Equals("CTCTK")).Single();
                    worksheet.Cells[30, 2].Value = congtacxlk.NoiDungXuLyKhac != null ? congtacxlk.NoiDungXuLyKhac.ToString() : "";
                    worksheet.Cells[30, 2].Style.Font.Size = 13;
                    worksheet.Cells[30, 2].Style.Font.Bold = true;
                    worksheet.Cells[30, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua

                    var dtbdxltx = duytubaoduong.Result.Where(p => p.MaDuyTuBaoDuong.Equals("DTKTXLTX")).Single();
                    worksheet.Cells[32, 5].Value = Convert.ToInt32(dtbdxltx.SoLuongDuyTuBaoDuong).ToString();
                    worksheet.Cells[32, 5].Style.Font.Size = 13;
                    worksheet.Cells[32, 5].Style.Font.Bold = true;
                    worksheet.Cells[32, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[32, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[32, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[32, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[32, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[32, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[32, 9].Value = dtbdxltx.CuTheDuyTuBaoDuong != null ? dtbdxltx.CuTheDuyTuBaoDuong.ToString() : "";
                    worksheet.Cells[32, 9].Style.Font.Size = 13;
                    worksheet.Cells[32, 9].Style.Font.Bold = true;
                    worksheet.Cells[32, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua

                    worksheet.Cells[32, 20].Value = Convert.ToInt32(dtbdxltx.SoLuongLuyTuyenDuyTuBaoDuong).ToString();
                    worksheet.Cells[32, 20].Style.Font.Size = 13;
                    worksheet.Cells[32, 20].Style.Font.Bold = true;
                    worksheet.Cells[32, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[32, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[32, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[32, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[32, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[32, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var dtbdstcp = duytubaoduong.Result.Where(p => p.MaDuyTuBaoDuong.Equals("DTSTCP")).Single();
                    worksheet.Cells[33, 5].Value = Convert.ToInt32(dtbdstcp.SoLuongDuyTuBaoDuong).ToString();
                    worksheet.Cells[33, 5].Style.Font.Size = 13;
                    worksheet.Cells[33, 5].Style.Font.Bold = true;
                    worksheet.Cells[33, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[33, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[33, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[33, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[33, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[33, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[33, 9].Value = dtbdstcp.CuTheDuyTuBaoDuong != null ? dtbdstcp.CuTheDuyTuBaoDuong.ToString() : "";
                    worksheet.Cells[33, 9].Style.Font.Size = 13;
                    worksheet.Cells[33, 9].Style.Font.Bold = true;
                    worksheet.Cells[33, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                                     
                    worksheet.Cells[33, 20].Value = Convert.ToInt32(dtbdstcp.SoLuongLuyTuyenDuyTuBaoDuong).ToString();
                    worksheet.Cells[33, 20].Style.Font.Size = 13;
                    worksheet.Cells[33, 20].Style.Font.Bold = true;
                    worksheet.Cells[33, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[33, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[33, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[33, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[33, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[33, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var dtbdpqddtht = duytubaoduong.Result.Where(p => p.MaDuyTuBaoDuong.Equals("DTPQDDTHT")).Single();
                    worksheet.Cells[34, 5].Value = Convert.ToInt32(dtbdpqddtht.SoLuongDuyTuBaoDuong).ToString();
                    worksheet.Cells[34, 5].Style.Font.Size = 13;
                    worksheet.Cells[34, 5].Style.Font.Bold = true;
                    worksheet.Cells[34, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[34, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[34, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[34, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[34, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[34, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[34, 9].Value = dtbdpqddtht.CuTheDuyTuBaoDuong != null ? dtbdpqddtht.CuTheDuyTuBaoDuong.ToString() : "";
                    worksheet.Cells[34, 9].Style.Font.Size = 13;
                    worksheet.Cells[34, 9].Style.Font.Bold = true;
                    worksheet.Cells[34, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                                     
                    worksheet.Cells[34, 20].Value = Convert.ToInt32(dtbdpqddtht.SoLuongLuyTuyenDuyTuBaoDuong).ToString();
                    worksheet.Cells[34, 20].Style.Font.Size = 13;
                    worksheet.Cells[34, 20].Style.Font.Bold = true;
                    worksheet.Cells[34, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[34, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[34, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[34, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[34, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[34, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ctscNCDDHT = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTCTNCHT")).Single();
                    worksheet.Cells[36, 2].Value = Convert.ToInt32(ctscNCDDHT.SoLuongCaiTaoSuaChua).ToString();
                    worksheet.Cells[36, 2].Style.Font.Size = 13;
                    worksheet.Cells[36, 2].Style.Font.Bold = true;
                    worksheet.Cells[36, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[36, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[36, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[36, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[36, 5].Value = Convert.ToInt32(ctscNCDDHT.DaiCaiTaoSuaChua).ToString();
                    worksheet.Cells[36, 5].Style.Font.Size = 13;
                    worksheet.Cells[36, 5].Style.Font.Bold = true;
                    worksheet.Cells[36, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[36, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[36, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[36, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[36, 9].Value = ctscNCDDHT.CuTheCaiTaoSuaChua != null ? ctscNCDDHT.CuTheCaiTaoSuaChua.ToString() : "";
                    worksheet.Cells[36, 9].Style.Font.Size = 13;
                    worksheet.Cells[36, 9].Style.Font.Bold = true;
                    worksheet.Cells[36, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[36, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;                    

                    worksheet.Cells[36, 18].Value = Convert.ToInt32(ctscNCDDHT.SoLuongLuyTuyenCaiTaoSuaChua).ToString();
                    worksheet.Cells[36, 18].Style.Font.Size = 13;
                    worksheet.Cells[36, 18].Style.Font.Bold = true;
                    worksheet.Cells[36, 18].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[36, 18].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[36, 18].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 18].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 18].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[36, 18].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[36, 20].Value = Convert.ToInt32(ctscNCDDHT.SoLuongSoLuongLuyTuyenCaiTaoSuaChua).ToString();
                    worksheet.Cells[36, 20].Style.Font.Size = 13;
                    worksheet.Cells[36, 20].Style.Font.Bold = true;
                    worksheet.Cells[36, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[36, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[36, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[36, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[36, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ctscNCDDTT = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTCTNCTT")).Single();
                    worksheet.Cells[37, 2].Value = Convert.ToInt32(ctscNCDDHT.SoLuongCaiTaoSuaChua).ToString();
                    worksheet.Cells[37, 2].Style.Font.Size = 13;
                    worksheet.Cells[37, 2].Style.Font.Bold = true;
                    worksheet.Cells[37, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[37, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[37, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[37, 5].Value = Convert.ToInt32(ctscNCDDHT.DaiCaiTaoSuaChua).ToString();
                    worksheet.Cells[37, 5].Style.Font.Size = 13;
                    worksheet.Cells[37, 5].Style.Font.Bold = true;
                    worksheet.Cells[37, 5].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 5].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[37, 5].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[37, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[37, 9].Value = ctscNCDDHT.CuTheCaiTaoSuaChua != null ? ctscNCDDHT.CuTheCaiTaoSuaChua.ToString() : "";
                    worksheet.Cells[37, 9].Style.Font.Size = 13;
                    worksheet.Cells[37, 9].Style.Font.Bold = true;
                    worksheet.Cells[37, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                                     
                    worksheet.Cells[37, 18].Value = Convert.ToInt32(ctscNCDDHT.SoLuongLuyTuyenCaiTaoSuaChua).ToString();
                    worksheet.Cells[37, 18].Style.Font.Size = 13;
                    worksheet.Cells[37, 18].Style.Font.Bold = true;
                    worksheet.Cells[37, 18].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 18].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[37, 18].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 18].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 18].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[37, 18].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[37, 20].Value = Convert.ToInt32(ctscNCDDHT.SoLuongSoLuongLuyTuyenCaiTaoSuaChua).ToString();
                    worksheet.Cells[37, 20].Style.Font.Size = 13;
                    worksheet.Cells[37, 20].Style.Font.Bold = true;
                    worksheet.Cells[37, 20].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 20].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[37, 20].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 20].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 20].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[37, 20].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ctscHOPDOMINO = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTLHDMN")).Single();
                    worksheet.Cells[38, 2].Value = Convert.ToInt32(ctscHOPDOMINO.SoLuongCaiTaoSuaChua).ToString();
                    worksheet.Cells[38, 2].Style.Font.Size = 13;
                    worksheet.Cells[38, 2].Style.Font.Bold = true;
                    worksheet.Cells[38, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[38, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[38, 2].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[38, 2].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[38, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[38, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[38, 9].Value = ctscHOPDOMINO.CuTheCaiTaoSuaChua != null ? ctscHOPDOMINO.CuTheCaiTaoSuaChua.ToString() : "";
                    worksheet.Cells[38, 9].Style.Font.Size = 13;
                    worksheet.Cells[38, 9].Style.Font.Bold = true;
                    worksheet.Cells[38, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[38, 9].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    worksheet.Cells[37, 19].Value = Convert.ToInt32(ctscHOPDOMINO.SoLuongLuyTuyenCaiTaoSuaChua).ToString();
                    worksheet.Cells[37, 19].Style.Font.Size = 13;
                    worksheet.Cells[37, 19].Style.Font.Bold = true;
                    worksheet.Cells[37, 19].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[37, 19].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[37, 19].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 19].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[37, 19].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[37, 19].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var diengiaomua = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTSLDG")).Single();
                    worksheet.Cells[39, 3].Value = Convert.ToInt32(diengiaomua.SoLuongMuaCaiTaoSuaChua).ToString();
                    worksheet.Cells[39, 3].Style.Font.Size = 13;
                    worksheet.Cells[39, 3].Style.Font.Bold = true;
                    worksheet.Cells[39, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[39, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[39, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[39, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[39, 8].Value = Convert.ToInt32(diengiaomua.SoLuongBanCaiTaoSuaChua).ToString();
                    worksheet.Cells[39, 8].Style.Font.Size = 13;
                    worksheet.Cells[39, 8].Style.Font.Bold = true;
                    worksheet.Cells[39, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[39, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[39, 8].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[39, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[39, 13].Value = Convert.ToInt32(diengiaomua.SoLuongTyLeCaiTaoSuaChua).ToString();
                    worksheet.Cells[39, 13].Style.Font.Size = 13;
                    worksheet.Cells[39, 13].Style.Font.Bold = true;
                    worksheet.Cells[39, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[39, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[39, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[39, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[39, 19].Value = Convert.ToInt32(diengiaomua.SoLuongHaoHutCaiTaoSuaChua).ToString();
                    worksheet.Cells[39, 19].Style.Font.Size = 13;
                    worksheet.Cells[39, 19].Style.Font.Bold = true;
                    worksheet.Cells[39, 19].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[39, 19].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[39, 19].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 19].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[39, 19].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[39, 19].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var luytuyengiaomua = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTTTLT")).Single();
                    worksheet.Cells[40, 3].Value = Convert.ToInt32(luytuyengiaomua.SoLuongMuaCaiTaoSuaChua).ToString();
                    worksheet.Cells[40, 3].Style.Font.Size = 13;
                    worksheet.Cells[40, 3].Style.Font.Bold = true;
                    worksheet.Cells[40, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[40, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[40, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[40, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                    
                    worksheet.Cells[40, 8].Value = Convert.ToInt32(luytuyengiaomua.SoLuongBanCaiTaoSuaChua).ToString();
                    worksheet.Cells[40, 8].Style.Font.Size = 13;
                    worksheet.Cells[40, 8].Style.Font.Bold = true;
                    worksheet.Cells[40, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[40, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[40, 8].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[40, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[40, 13].Value = Convert.ToInt32(luytuyengiaomua.SoLuongTyLeCaiTaoSuaChua).ToString();
                    worksheet.Cells[40, 13].Style.Font.Size = 13;
                    worksheet.Cells[40, 13].Style.Font.Bold = true;
                    worksheet.Cells[40, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[40, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[40, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[40, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                    
                    worksheet.Cells[40, 19].Value = Convert.ToInt32(luytuyengiaomua.SoLuongHaoHutCaiTaoSuaChua).ToString();
                    worksheet.Cells[40, 19].Style.Font.Size = 13;
                    worksheet.Cells[40, 19].Style.Font.Bold = true;
                    worksheet.Cells[40, 19].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[40, 19].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[40, 19].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 19].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[40, 19].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[40, 19].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var doanhthudiengiaokh = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTDTDG")).Single();
                    worksheet.Cells[41, 3].Value = Convert.ToInt32(doanhthudiengiaokh.SoLuongKHCaiTaoSuaChua).ToString();
                    worksheet.Cells[41, 3].Style.Font.Size = 13;
                    worksheet.Cells[41, 3].Style.Font.Bold = true;
                    worksheet.Cells[41, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[41, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[41, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[41, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[41, 8].Value = Convert.ToInt32(doanhthudiengiaokh.SoLuongThucHienCaiTaoSuaChua).ToString();
                    worksheet.Cells[41, 8].Style.Font.Size = 13;
                    worksheet.Cells[41, 8].Style.Font.Bold = true;
                    worksheet.Cells[41, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[41, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[41, 8].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[41, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[41, 13].Value = Convert.ToInt32(doanhthudiengiaokh.SoLuongTyLeCaiTaoSuaChua).ToString();
                    worksheet.Cells[41, 13].Style.Font.Size = 13;
                    worksheet.Cells[41, 13].Style.Font.Bold = true;
                    worksheet.Cells[41, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[41, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[41, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[41, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[41, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var thuchienluytuyenkh = caitaosuachua.Result.Where(p => p.MaCaiTaoSuaChua.Equals("CTTHLT")).Single();
                    worksheet.Cells[42, 3].Value = Convert.ToInt32(thuchienluytuyenkh.SoLuongKHCaiTaoSuaChua).ToString();
                    worksheet.Cells[42, 3].Style.Font.Size = 13;
                    worksheet.Cells[42, 3].Style.Font.Bold = true;
                    worksheet.Cells[42, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[42, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[42, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[42, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                                     
                    worksheet.Cells[42, 8].Value = Convert.ToInt32(thuchienluytuyenkh.SoLuongThucHienCaiTaoSuaChua).ToString();
                    worksheet.Cells[42, 8].Style.Font.Size = 13;
                    worksheet.Cells[42, 8].Style.Font.Bold = true;
                    worksheet.Cells[42, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[42, 8].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[42, 8].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[42, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[42, 13].Value = Convert.ToInt32(thuchienluytuyenkh.SoLuongTyLeCaiTaoSuaChua).ToString();
                    worksheet.Cells[42, 13].Style.Font.Size = 13;
                    worksheet.Cells[42, 13].Style.Font.Bold = true;
                    worksheet.Cells[42, 13].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[42, 13].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[42, 13].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[42, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[42, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ctatrto = congtacantoanto.Result.Where(p => p.MaCongTacAnToan.Equals("ATTODTH")).Single();
                    worksheet.Cells[45, 3].Value = Convert.ToInt32(ctatrto.SoLuongDaThucHienTheoTo).ToString();
                    worksheet.Cells[45, 3].Style.Font.Size = 13;
                    worksheet.Cells[45, 3].Style.Font.Bold = true;
                    worksheet.Cells[45, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[45, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[45, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[45, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[45, 7].Value = Convert.ToInt32(ctatrto.LuyTuyenDaThucHienTheoTo).ToString();
                    worksheet.Cells[45, 7].Style.Font.Size = 13;
                    worksheet.Cells[45, 7].Style.Font.Bold = true;
                    worksheet.Cells[45, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[45, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[45, 7].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 7].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[45, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    var ctatrhientruong = congtacantoanhientruong.Result.Where(p => p.MaCongTacAnToan.Equals("ATCBCNDTH")).Single();
                    worksheet.Cells[45, 3].Value = Convert.ToInt32(ctatrhientruong.SoLuongDaThucHienTheoCanBoCongNhan).ToString();
                    worksheet.Cells[45, 3].Style.Font.Size = 13;
                    worksheet.Cells[45, 3].Style.Font.Bold = true;
                    worksheet.Cells[45, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[45, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[45, 3].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[45, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    worksheet.Cells[45, 7].Value = Convert.ToInt32(ctatrhientruong.LuyTuyenDaThucHienTheoCanBoCongNhan).ToString();
                    worksheet.Cells[45, 7].Style.Font.Size = 13;
                    worksheet.Cells[45, 7].Style.Font.Bold = true;
                    worksheet.Cells[45, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    worksheet.Cells[45, 7].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    worksheet.Cells[45, 7].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    worksheet.Cells[45, 7].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    worksheet.Cells[45, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

                    //var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
                    //var phong = !string.IsNullOrEmpty(madphongChamCong) ? madphongChamCong : "%";
                    //var tukhoa = !string.IsNullOrEmpty(keywordChamCong) ? keywordChamCong : "%";

                    //var vbdDetail = _vanbandensoService.VBDenSoExcel(khuvuc, tungay, dengay, "", "", "",
                    //   "VBDenSoExcelKhuVuc");

                    //int rowIndex = 13;
                    //int count = 1;

                    //worksheet.Cells[6, 2].Value = "(Từ ngày " + tungay.ToString("dd/MM/yyyy") + " đến ngày " + dengay.ToString("dd/MM/yyyy") + ")";
                    //worksheet.Cells[6, 2].Style.Font.Size = 7;
                    //worksheet.Cells[6, 2].Style.Font.Bold = true;
                    //worksheet.Cells[6, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    //worksheet.Cells[6, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    //worksheet.InsertRow(13, vbdDetail.Result.Count());

                    //foreach (var hdDetail in vbdDetail.Result)
                    //{
                    //    //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
                    //    // Cell 1, Carton Count
                    //    //worksheet.Cells[rowIndex, 2].Value = count.ToString();
                    //    worksheet.Cells[rowIndex, 2].Value = hdDetail.NgayDenCuaVanBan != null ? hdDetail.NgayDenCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                    //    //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam
                    //    //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
                    //    worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
                    //    worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                    //    worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
                    //    worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                    //    worksheet.Cells[rowIndex, 2].Style.Font.Size = 9;
                    //    worksheet.Cells[rowIndex, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                    //    worksheet.Row(rowIndex).Height = 35;                  

                    package.SaveAs(file); //Save the workbook.                    
                }
                return new OkObjectResult(url);
            }
        }

    }
}
