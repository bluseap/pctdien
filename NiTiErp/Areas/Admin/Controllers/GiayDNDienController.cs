using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;
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
    public class GiayDNDienController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IGiayDeNghiQuaTrinhCungCapService _gdnqtccService;
        private readonly IDMCungCapDichVuService _dmcungcapdichvuService;
        private readonly IGiayDeNghiDMCungCapDienService _giaydenghiDMCungCapDienService;
        private readonly IKhachHangPoService _khachhangpoService;

        public GiayDNDienController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IGiayDeNghiQuaTrinhCungCapService gdnqtccService, IDMCungCapDichVuService dmcungcapdichvuService,
            IGiayDeNghiDMCungCapDienService giaydenghiDMCungCapDienService, IKhachHangPoService khachhangpoService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _gdnqtccService = gdnqtccService;
            _dmcungcapdichvuService = dmcungcapdichvuService;
            _giaydenghiDMCungCapDienService = giaydenghiDMCungCapDienService;
            _khachhangpoService = khachhangpoService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public async Task<IActionResult> GetKH(string makhachhang)
        {
            var model = await _khachhangpoService.Get_KhachHangPo_ByMaKhachHang(makhachhang);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListKH(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _khachhangpoService.Get_KhachHangPo_AllPaging(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetGDNDienId(int giaydenghiId)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiCungCapDien_ById(giaydenghiId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListGDNDien(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiCungCapDien_AllPaging(khuvuc, phong, tukhoa, page, pageSize);

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
        public IActionResult GDNDMCungCapDVDien(Guid codexuly)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ByCodeXuLy(codexuly);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNDMDienByGDNId(int giaydenghiId)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ByGDNId(giaydenghiId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNDMDienByGDNId1Top(int giaydenghiId)
        {
            var model = _giaydenghiDMCungCapDienService.Get_GiayDeNghiDMCungCapDien_ByGDNId1Top(giaydenghiId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GDNQTCC(Int32 giaydenghiDMCCDVDienid)
        {
            var model = _gdnqtccService.Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc(false, 0, giaydenghiDMCCDVDienid, 1, 100);
            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete, Export excel
        [HttpPost]
        public IActionResult CreateGDNDMCCDien(Guid CodeXuLy, int DMCungCapDichVuId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapDienService.CreateGiayDeNghiDMCungCapDienByCodeXuLy(CodeXuLy, DMCungCapDichVuId, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult CreateGDNDien(GiayDeNghiDMCungCapDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapDienService.CreateGiayDeNghiDMCungCapDien(giaydenghi, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpdateGDNDien(GiayDeNghiDMCungCapDienViewModel giaydenghi)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapDienService.UpdateGiayDeNghiDMCungCapDien(giaydenghi, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult ChuyenXuLy(int giaydenghiId, Int32 giaydenghidmcungcapdienId, DateTime ngayXuLy,
            string toNhaMay, string ghichuXuLy)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                string updateBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapDienService.Update_GiayDeNghiDMCungCapDien_ByIdXuLy(giaydenghiId, giaydenghidmcungcapdienId,
                    ngayXuLy, toNhaMay, ghichuXuLy, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult DeleteGDNDMCCDien(Int32 id)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "GiayDeNghiThemPo", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                string createBy = User.GetSpecificClaim("UserName");

                var model = _giaydenghiDMCungCapDienService.DeleteGiayDeNghiDMCungCapDienId(id, createBy);
                return new OkObjectResult(model);
            }
        }

        //[HttpPost]
        //public IActionResult ExcelDDNuoc(string dieukien, DateTime tungay, DateTime denngay)
        //{
        //    string sWebRootFolder = _hostingEnvironment.WebRootPath;
        //    string sFileName = $"DDNuocTheoNgay.xlsx";
        //    // Template File
        //    string templateDocument = Path.Combine(sWebRootFolder, "templates", "DDNuocTheoNgay.xlsx");

        //    string url = $"{Request.Scheme}://{Request.Host}/{"export-files"}/{sFileName}";

        //    FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));

        //    if (file.Exists)
        //    {
        //        file.Delete();
        //        file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));
        //    }

        //    using (FileStream templateDocumentStream = System.IO.File.OpenRead(templateDocument))
        //    {
        //        using (ExcelPackage package = new ExcelPackage(templateDocumentStream))
        //        {
        //            // add a new worksheet to the empty workbook
        //            ExcelWorksheet worksheet = package.Workbook.Worksheets["DDNuoc"];

        //            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";                    

        //            var vbdDetail = _vanbandensoService.VBDenSoExcel(khuvuc, tungay, dengay, "", "", "",
        //                "VBDenSoExcelKhuVuc");

        //            int rowIndex = 13;
        //            int count = 1;

        //            //if (khuvuc == "%")
        //            //{
        //            //    worksheet.Cells[3, 2].Value = "";
        //            //}
        //            //else
        //            //{
        //            //    var khuvucvm = _corporationsService.GetAllCorPaging(khuvuc, "", "", 1, 10, "", "", khuvuc, "GetCorporationId");
        //            //    worksheet.Cells[3, 2].Value = khuvucvm.Result.Results[0].Name.ToString().ToUpper();

        //            //    worksheet.Cells[3, 2].Style.Font.Size = 8;
        //            //    worksheet.Cells[3, 2].Style.Font.Bold = true;
        //            //    worksheet.Cells[3, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //            //    worksheet.Cells[3, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
        //            //}

        //            worksheet.Cells[6, 2].Value = "(Từ ngày " + tungay.ToString("dd/MM/yyyy") + " đến ngày " + denngay.ToString("dd/MM/yyyy") + ")";
        //            //worksheet.Cells[6, 2].Style.Font.Size = 7;
        //            //worksheet.Cells[6, 2].Style.Font.Bold = true;
        //            //worksheet.Cells[6, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
        //            //worksheet.Cells[6, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

        //            worksheet.InsertRow(13, vbdDetail.Result.Count());

        //            foreach (var hdDetail in vbdDetail.Result)
        //            {
        //                //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
        //                // Cell 1, Carton Count
        //                //worksheet.Cells[rowIndex, 2].Value = count.ToString();
        //                worksheet.Cells[rowIndex, 2].Value = hdDetail.NgayDenCuaVanBan != null ? hdDetail.NgayDenCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
        //                //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam
        //                //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
        //                worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
        //                worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
        //                worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
        //                worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 2].Style.Font.Size = 9;
        //                worksheet.Cells[rowIndex, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
        //                worksheet.Row(rowIndex).Height = 35;

        //                worksheet.Cells[rowIndex, 3].Value = hdDetail.SoVanBanDenStt.ToString();
        //                worksheet.Cells[rowIndex, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 3].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 3].Style.Font.Size = 9;

        //                worksheet.Cells[rowIndex, 4].Value = !string.IsNullOrEmpty(hdDetail.NguoiKyCuaVanBan) ? hdDetail.NguoiKyCuaVanBan.ToString() : "";
        //                worksheet.Cells[rowIndex, 4].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 4].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 4].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 4].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 4].Style.Font.Size = 9;

        //                worksheet.Cells[rowIndex, 5].Value = !string.IsNullOrEmpty(hdDetail.SoKyHieuCuaVanBan) ? hdDetail.SoKyHieuCuaVanBan.ToString() : "";
        //                worksheet.Cells[rowIndex, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 5].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 5].Style.Font.Size = 9;

        //                worksheet.Cells[rowIndex, 6].Value = hdDetail.NgayBanHanhCuaVanBan != null ? hdDetail.NgayBanHanhCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
        //                worksheet.Cells[rowIndex, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 6].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 6].Style.Font.Size = 9;
        //                worksheet.Cells[rowIndex, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

        //                worksheet.Cells[rowIndex, 7].Value = (!string.IsNullOrEmpty(hdDetail.TenLoaiVanBan.ToString()) ? hdDetail.TenLoaiVanBan.ToString() : "") + ", " + (!string.IsNullOrEmpty(hdDetail.TrichYeuCuaVanBan.ToString()) ? hdDetail.TrichYeuCuaVanBan.ToString() : "");
        //                worksheet.Cells[rowIndex, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 7].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 7].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 7].Style.Font.Size = 9;
        //                worksheet.Cells[rowIndex, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
        //                worksheet.Cells[rowIndex, 7].Style.WrapText = true;

        //                worksheet.Cells[rowIndex, 8].Value = !string.IsNullOrEmpty(hdDetail.TenCoQuanBanHanh.ToString()) ? hdDetail.TenCoQuanBanHanh.ToString() : "";
        //                worksheet.Cells[rowIndex, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 8].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 8].Style.Font.Size = 9;
        //                worksheet.Cells[rowIndex, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
        //                worksheet.Cells[rowIndex, 8].Style.WrapText = true;

        //                //worksheet.Cells[rowIndex, 14].Value = !string.IsNullOrEmpty(hdDetail.TongTienThucLinh.ToString()) ? Math.Round(hdDetail.TongTienThucLinh, 0).ToString() : "";
        //                //worksheet.Cells[rowIndex, 14].Style.Numberformat.Format = "0";
        //                //worksheet.Cells[rowIndex, 14].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                //worksheet.Cells[rowIndex, 14].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //                //worksheet.Cells[rowIndex, 14].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                //worksheet.Cells[rowIndex, 14].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                //worksheet.Cells[rowIndex, 14].Style.Font.Size = 9;
        //                //worksheet.Cells[rowIndex, 14].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

        //                worksheet.Cells[rowIndex, 9].Value = "";
        //                worksheet.Cells[rowIndex, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //                worksheet.Cells[rowIndex, 9].Style.Border.Right.Style = ExcelBorderStyle.Medium;
        //                worksheet.Cells[rowIndex, 9].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
        //                worksheet.Cells[rowIndex, 9].Style.Font.Size = 9;
        //                worksheet.Cells[rowIndex, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

        //                //worksheet.Cells[rowIndex, 6].Value = hdDetail.NgayHetHan != null ? hdDetail.NgayHetHan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
        //                //worksheet.Cells[rowIndex, 5].Value = hdDetail.NgaySinh != null ? hdDetail.NgaySinh.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";

        //                rowIndex++;
        //                count++;
        //            }

        //            package.SaveAs(file); //Save the workbook.
        //        }
        //        return new OkObjectResult(url);
        //    }
        //}

        #endregion

    }
}
