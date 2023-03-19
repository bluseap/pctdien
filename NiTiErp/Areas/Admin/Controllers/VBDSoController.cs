﻿using AspNetCore.Reporting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Helpers;
using OfficeOpenXml;
using OfficeOpenXml.Style;

using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class VBDSoController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IVanBanDenSoService _vanbandensoService;
        private readonly ICorporationService _corporationService;

        public VBDSoController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,
            IVanBanDenSoService vanbandensoService,
            ICorporationService corporationService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _vanbandensoService = vanbandensoService;
            _corporationService = corporationService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ExcelVBDenSo(string corporationId, DateTime tungay, DateTime dengay)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"SoDKVBDen.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "SoDKVBDen.xlsx");

            string url = $"{Request.Scheme}://{Request.Host}/{"export-files"}/{sFileName}";

            FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));

            if (file.Exists)
            {
                file.Delete();
                file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));
            }

            using (FileStream templateDocumentStream = System.IO.File.OpenRead(templateDocument))
            {
                using (ExcelPackage package = new ExcelPackage(templateDocumentStream))
                {
                    // add a new worksheet to the empty workbook
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["SoDKVBDen"];

                    var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
                    //var phong = !string.IsNullOrEmpty(madphongChamCong) ? madphongChamCong : "%";
                    //var tukhoa = !string.IsNullOrEmpty(keywordChamCong) ? keywordChamCong : "%";

                    var vbdDetail = _vanbandensoService.VBDenSoExcel(khuvuc, tungay, dengay, "", "", "",
                        "VBDenSoExcelKhuVuc");

                    int rowIndex = 13;
                    int count = 1;

                    worksheet.Cells[6, 2].Value = "(Từ ngày " + tungay.ToString("dd/MM/yyyy") + " đến ngày " + dengay.ToString("dd/MM/yyyy") + ")";
                    //worksheet.Cells[6, 2].Style.Font.Size = 7;
                    //worksheet.Cells[6, 2].Style.Font.Bold = true;
                    //worksheet.Cells[6, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    //worksheet.Cells[6, 2].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    worksheet.InsertRow(13, vbdDetail.Result.Count());

                    foreach (var hdDetail in vbdDetail.Result)
                    {
                        //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
                        // Cell 1, Carton Count
                        //worksheet.Cells[rowIndex, 2].Value = count.ToString();
                        worksheet.Cells[rowIndex, 2].Value = hdDetail.NgayDenCuaVanBan != null ? hdDetail.NgayDenCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam
                        //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
                        worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
                        worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                        worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
                        worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 2].Style.Font.Size = 9;
                        worksheet.Cells[rowIndex, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                        worksheet.Row(rowIndex).Height = 35;

                        worksheet.Cells[rowIndex, 3].Value = hdDetail.SoVanBanDenStt.ToString();
                        worksheet.Cells[rowIndex, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Font.Size = 9;

                        worksheet.Cells[rowIndex, 4].Value = !string.IsNullOrEmpty(hdDetail.NguoiKyCuaVanBan) ? hdDetail.NguoiKyCuaVanBan.ToString() : "";
                        worksheet.Cells[rowIndex, 4].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Font.Size = 9;

                        worksheet.Cells[rowIndex, 5].Value = !string.IsNullOrEmpty(hdDetail.SoKyHieuCuaVanBan) ? hdDetail.SoKyHieuCuaVanBan.ToString() : "";
                        worksheet.Cells[rowIndex, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Font.Size = 9;

                        worksheet.Cells[rowIndex, 6].Value = hdDetail.NgayBanHanhCuaVanBan != null ? hdDetail.NgayBanHanhCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        worksheet.Cells[rowIndex, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Font.Size = 9;
                        worksheet.Cells[rowIndex, 6].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;

                        worksheet.Cells[rowIndex, 7].Value = (!string.IsNullOrEmpty(hdDetail.TenLoaiVanBan) ? hdDetail.TenLoaiVanBan.ToString() : "") + ", " + (!string.IsNullOrEmpty(hdDetail.TrichYeuCuaVanBan) ? hdDetail.TrichYeuCuaVanBan.ToString() : "");
                        worksheet.Cells[rowIndex, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 7].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 7].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 7].Style.Font.Size = 9;
                        worksheet.Cells[rowIndex, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                        worksheet.Cells[rowIndex, 7].Style.WrapText = true;

                        worksheet.Cells[rowIndex, 8].Value = !string.IsNullOrEmpty(hdDetail.TenCoQuanBanHanh) ? hdDetail.TenCoQuanBanHanh.ToString() : "";
                        worksheet.Cells[rowIndex, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 8].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 8].Style.Font.Size = 9;
                        worksheet.Cells[rowIndex, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                        worksheet.Cells[rowIndex, 8].Style.WrapText = true;

                        worksheet.Cells[rowIndex, 9].Value = "";
                        worksheet.Cells[rowIndex, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 9].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 9].Style.Font.Size = 9;
                        worksheet.Cells[rowIndex, 9].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                        worksheet.Cells[rowIndex, 9].Style.WrapText = true;

                        worksheet.Cells[rowIndex, 10].Value = "";
                        worksheet.Cells[rowIndex, 10].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 10].Style.Border.Right.Style = ExcelBorderStyle.Medium;
                        worksheet.Cells[rowIndex, 10].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 10].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 10].Style.Font.Size = 10;
                        worksheet.Cells[rowIndex, 10].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                        //worksheet.Cells[rowIndex, 6].Value = hdDetail.NgayHetHan != null ? hdDetail.NgayHetHan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        //worksheet.Cells[rowIndex, 5].Value = hdDetail.NgaySinh != null ? hdDetail.NgaySinh.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";

                        rowIndex++;
                        count++;
                    }
                                       
                    package.SaveAs(file); //Save the workbook.                    
                }
                return new OkObjectResult(url);
            }
        }

        [HttpGet]
        public IActionResult BaoCaoSoDen(string corporationId, DateTime tungay, DateTime dengay)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";    
            var vbdDetail = _vanbandensoService.VBDenSoExcel(khuvuc, tungay, dengay, "", "", "",
                "VBDenSoExcelKhuVuc");           

            var xinghiep = _corporationService.CorporationGetList(corporationId, "", "", "GetListCorporation");

            string tenxinghiep = corporationId == "LX" ? "XÍ NGHIỆP CẤP NƯỚC " + xinghiep.Result[0].Name.ToUpper() : 
                "XÍ NGHIỆP ĐIỆN NƯỚC " + xinghiep.Result[0].Name.ToUpper();

            string tungaydenngay = "(Từ ngày " + tungay.ToString("dd/MM/yyyy") + " đến ngày " +
                dengay.ToString("dd/MM/yyyy") + ")";

            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("TenKhuVuc", tenxinghiep);
            HttpContext.Session.SetString("TuNgay", tungaydenngay);
            SessionHelper.SetObjectAsJson(HttpContext.Session, "sovbd", vbdDetail.Result);

            return new OkObjectResult(vbdDetail);
        }

 

    }
}