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

namespace NiTiErp.Areas.Admin.Controllers
{
    public class PoDkNuocNTController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDonDangKyService _dondangkyService;
        private readonly IBBNghiemThuService _bbnghiemthuService;

        public PoDkNuocNTController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IDonDangKyService dondangkyService,
            IBBNghiemThuService bbnghiemthuService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dondangkyService = dondangkyService;
            _bbnghiemthuService = bbnghiemthuService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNT", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpPost]
        public IActionResult DSNhanHoSo(string MADDK, string CorporationId, DateTime TuNgay, DateTime DenNgay)
        {           
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"NhanHoSo.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "BBNTNhanHoSo.xlsx");

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
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["NhanHoSo"];

                    // Data Acces, load order header data.
                    var hosoDetail = _bbnghiemthuService.Get_BBNghiemThu_ByDSNhanHoSo(MADDK, CorporationId, "", TuNgay, DenNgay);

                    //worksheet.Cells[2, 1].Value = "";

                    int rowIndex = 4;
                    int count = 1;
                    foreach (var orderDetail in hosoDetail.Result)
                    {
                        // Cell 1, Carton Count
                        worksheet.Cells[rowIndex, 1].Value = count.ToString();
                        worksheet.Cells[rowIndex, 2].Value = orderDetail.SOHD != null ? orderDetail.SOHD.ToString() : "";
                        worksheet.Cells[rowIndex, 3].Value = orderDetail.MADDK != null ? orderDetail.MADDK.ToString() : "";
                        worksheet.Cells[rowIndex, 4].Value = orderDetail.TENKH != null ? orderDetail.TENKH.ToString() : "";
                        worksheet.Cells[rowIndex, 5].Value = orderDetail.SONHA != null ? orderDetail.SONHA.ToString() : "";
                        worksheet.Cells[rowIndex, 6].Value = orderDetail.DUONGPHO != null ? orderDetail.DUONGPHO.ToString() : "";
                        worksheet.Cells[rowIndex, 7].Value = orderDetail.TENPHUONG != null ? orderDetail.TENPHUONG.ToString() : "";
                        worksheet.Cells[rowIndex, 8].Value = orderDetail.MALDH != null ? orderDetail.MALDH.ToString() : "";
                        worksheet.Cells[rowIndex, 9].Value = orderDetail.DongHoSoNo != null ? orderDetail.DongHoSoNo.ToString() : "";
                        worksheet.Cells[rowIndex, 10].Value = orderDetail.NGAYLD != null ? orderDetail.NGAYLD.ToString() : "";
                        worksheet.Cells[rowIndex, 11].Value = orderDetail.NGAYNHANHS != null ? orderDetail.NGAYNHANHS.ToString() : "";
                        worksheet.Cells[rowIndex, 12].Value = orderDetail.NGAYCHUYENHS != null ? orderDetail.NGAYCHUYENHS.ToString() : "";

                        //worksheet.Cells[rowIndex, 5].Value = orderDetail.NgaySinh != null ? orderDetail.NgaySinh.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        
                        rowIndex++;
                        count++;
                    }

                    package.SaveAs(file); //Save the workbook.                    
                }
            }
            return new OkObjectResult(url);
        }

        [HttpGet]
        public IActionResult DSChuyenKT(string MADDK, string CorporationId, DateTime TuNgay, DateTime DenNgay)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"ChuyenKeToan.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "BBNTChuyenKeToan.xlsx");

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
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["ChuyenKeToan"];

                    // Data Acces, load order header data.
                    var hosoDetail = _bbnghiemthuService.Get_BBNghiemThu_ByDSChuyenKeToan(MADDK, CorporationId, "", TuNgay, DenNgay);

                    //worksheet.Cells[2, 1].Value = "";

                    int rowIndex = 4;
                    int count = 1;
                    foreach (var orderDetail in hosoDetail.Result)
                    {
                        // Cell 1, Carton Count
                        worksheet.Cells[rowIndex, 1].Value = count.ToString();
                        worksheet.Cells[rowIndex, 2].Value = orderDetail.SOHD != null ? orderDetail.SOHD.ToString() : "";
                        worksheet.Cells[rowIndex, 3].Value = orderDetail.MADDK != null ? orderDetail.MADDK.ToString() : "";
                        worksheet.Cells[rowIndex, 4].Value = orderDetail.TENKH != null ? orderDetail.TENKH.ToString() : "";
                        worksheet.Cells[rowIndex, 5].Value = orderDetail.SONHA != null ? orderDetail.SONHA.ToString() : "";
                        worksheet.Cells[rowIndex, 6].Value = orderDetail.DUONGPHO != null ? orderDetail.DUONGPHO.ToString() : "";
                        worksheet.Cells[rowIndex, 7].Value = orderDetail.TENPHUONG != null ? orderDetail.TENPHUONG.ToString() : "";
                        worksheet.Cells[rowIndex, 8].Value = orderDetail.MALDH != null ? orderDetail.MALDH.ToString() : "";
                        worksheet.Cells[rowIndex, 9].Value = orderDetail.DongHoSoNo != null ? orderDetail.DongHoSoNo.ToString() : "";
                        worksheet.Cells[rowIndex, 10].Value = orderDetail.NGAYLD != null ? orderDetail.NGAYLD.ToString() : "";
                        worksheet.Cells[rowIndex, 11].Value = orderDetail.NGAYNHANHS != null ? orderDetail.NGAYNHANHS.ToString() : "";
                        worksheet.Cells[rowIndex, 12].Value = orderDetail.NGAYCHUYENHS != null ? orderDetail.NGAYCHUYENHS.ToString() : "";

                        //worksheet.Cells[rowIndex, 5].Value = orderDetail.NgaySinh != null ? orderDetail.NgaySinh.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";

                        rowIndex++;
                        count++;
                    }

                    package.SaveAs(file); //Save the workbook.                    
                }
            }
            return new OkObjectResult(url);
        }

        [HttpGet]
        public async Task<IActionResult> GetNTNuocId(string DangKyNuocId)
        {
            var model = await _bbnghiemthuService.Get_BBNghiemThu_ByMaDon(DangKyNuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListNT(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
            var model = _dondangkyService.Get_DonDangKy_ByNghiemThu(KhuVuc, PhongTo, tukhoa, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListChuanBiNT(string KhuVuc, string PhongTo, string keyword, int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _dondangkyService.Get_DonDangKy_ByChuanBiNghiemThu(KhuVuc, PhongTo, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        #endregion

        #region Insert, Update, Delete

        [HttpPost]
        public async Task<IActionResult> SaveNT(BBNghiemThuViewModel nghiemthu)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _bbnghiemthuService.Create_BBNghiemThu(nghiemthu, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpNT(BBNghiemThuViewModel nghiemthu)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DANGKYNUOCNT", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = User.GetSpecificClaim("UserName");

                var model = await _bbnghiemthuService.Update_BBNghiemThu(nghiemthu, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
