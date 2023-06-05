using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class DaoTaoHVController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IHoSoNhanVienService _hosonhanvienService;
        private readonly IChucVuNhanVienService _chucvunhanvienService;
        private readonly ICongViecService _congviecService;
        private readonly ITrinhDoService _trinhdoService;
        private readonly IDaoTaoNhanVienService _daotaonhanvienService;
        private readonly IPCTChucDanhNhanVienService _chucdanhnhanvienService;        

        public DaoTaoHVController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IHoSoNhanVienService hosonhanvienService,
            IChucVuNhanVienService chucvunhanvienService,
            ICongViecService congviecService,
            ITrinhDoService trinhdoService,
            IDaoTaoNhanVienService daotaonhanvienService, IPCTChucDanhNhanVienService chucdanhnhanvienService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _hosonhanvienService = hosonhanvienService;
            _chucvunhanvienService = chucvunhanvienService;
            _congviecService = congviecService;
            _trinhdoService = trinhdoService;
            _daotaonhanvienService = daotaonhanvienService;
            _chucdanhnhanvienService = chucdanhnhanvienService;
        }

        public IActionResult Index()
        {
            var username = User.GetSpecificClaim("UserName");
            var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult ListChucDanhNV(Guid hosonhanvienid)
        {
            var model = _chucdanhnhanvienService.PCTD_Get_PCTChucDanhNhanVien_ByHoSoNhanVienId(hosonhanvienid);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult congtac(string hosonhanvienId)
        {
            var model = _congviecService.Get_CongViecNhanVien_ByHoSoNhanVienId(hosonhanvienId);

            return new OkObjectResult(model);
        }        

        [HttpGet]
        public IActionResult hosonvid(string hosonhanvienId)
        {          
            var model = _hosonhanvienService.Get_HoSoNhanVien_ById(hosonhanvienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListHoSoHV(string corporationId, string phongdanhmucId, string keyword, int page, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
            var phong = !string.IsNullOrEmpty(phongdanhmucId) ? phongdanhmucId : "%";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

            var model = _hosonhanvienService.Get_HoSoNhanVien_AllPaging(khuvuc, phong, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ChucVuNV(string corporationId)
        {          
            var model = _chucvunhanvienService.Get_ChucVuNhanVien_ByCor(corporationId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult QuaTrinhDT(Guid hosonhanvienid)
        {
            var model = _daotaonhanvienService.Get_DaoTaoNhanVien_ByHoSoId(hosonhanvienid);

            return new OkObjectResult(model);
        }

        #endregion

        #region Create, Update, Delete, Export

        [HttpPost]
        public IActionResult UpHoSoNV(HoSoNhanVienViewModel hosonhanvien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _hosonhanvienService.Update_HoSoNhanVien_DaoTaoHV(hosonhanvien, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult InTrinhDo(TrinhDoViewModel trinhdo)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _trinhdoService.Create_TrinhDo_ById(trinhdo, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpTrinhDo(TrinhDoViewModel trinhdo)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _trinhdoService.Update_TrinhDo_ById(trinhdo, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult DelTrinhDo(TrinhDoViewModel trinhdo)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền xóa."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _trinhdoService.Delete_TrinhDo_ById(trinhdo, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult ExcelHoSoHV(string corporationid)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"DSHocVien.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "DSHocVien.xlsx");

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
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["hshocvien"];

                    //var khuvuc = !string.IsNullOrEmpty(corporationId) ? corporationId : "%";
                    //var phong = !string.IsNullOrEmpty(phongId) ? phongId : "%";
                    //var chucvu = !string.IsNullOrEmpty(chucvuId) ? chucvuId : "%";
                    //var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";

                    //var daotaonhanvienlopDetail = _daotaonhanvienService.DaoTaoNhanVienGetList(daotaolopId, hosoId, daotaolopId,
                    //        corporationId, phongId, daotaolopId, keyword, 1, 1000, "GetListDaoTaoNhanVienLop");
                    //var daotaonhanvienlopDetail = _daotaonhanvienService.Get_DaoTaoNhanVien_ByLop(daotaolopId);

                    int rowIndex = 12;
                    int count = 1;

                    //if (khuvuc == "%")
                    //{
                    //    worksheet.Cells[2, 3].Value = "";
                    //}
                    //else
                    //{
                    //    var khuvucvm = _corporationsService.GetAllCorPaging(khuvuc, "", "", 1, 10, "", "", khuvuc, "GetCorporationId");

                    //    //worksheet.Cells[2, 3].Value = khuvucvm.Result.Results[0].Name.ToString().ToUpper();
                    //}

                    var hosohocvien = _hosonhanvienService.Get_HoSoNhanVien_ByCorId(corporationid);

                    //worksheet.Cells[5, 4].Value = !string.IsNullOrEmpty(daotaolop.Result[0].TenTruong) ? daotaolop.Result[0].TenTruong.ToString() : "";
                    //worksheet.Cells[6, 4].Value = !string.IsNullOrEmpty(daotaolop.Result[0].NoiHoc) ? daotaolop.Result[0].NoiHoc.ToString() : "";
                    //worksheet.Cells[7, 4].Value = !string.IsNullOrEmpty(daotaolop.Result[0].ChuyenMon) ? daotaolop.Result[0].ChuyenMon.ToString() : "";

                    worksheet.InsertRow(12, hosohocvien.Result.Count());

                    foreach (var dtlnvDetail in hosohocvien.Result)
                    {
                        //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
                        // Cell 1, Carton Count
                        worksheet.Cells[rowIndex, 2].Value = count.ToString();
                        //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam                        
                        //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
                        worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
                        worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                        worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
                        worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 3].Value = !string.IsNullOrEmpty(dtlnvDetail.Ten) ? dtlnvDetail.Ten.ToString() : "";
                        worksheet.Cells[rowIndex, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 4].Value = !string.IsNullOrEmpty(dtlnvDetail.NgaySinh.ToString()) ?
                            dtlnvDetail.NgaySinh.ToString("dd/MM/yyyy") : "";
                        worksheet.Cells[rowIndex, 4].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 5].Value = !string.IsNullOrEmpty(dtlnvDetail.MaSoBHXH) ? dtlnvDetail.MaSoBHXH.ToString() : "";
                        worksheet.Cells[rowIndex, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;                      

                        worksheet.Cells[rowIndex, 6].Value = !string.IsNullOrEmpty(dtlnvDetail.NgayThamGiaBHXH.ToString()) ? 
                            dtlnvDetail.NgayThamGiaBHXH.ToString("dd/MM/yyyy") : "";
                        worksheet.Cells[rowIndex, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 7].Value = !string.IsNullOrEmpty(dtlnvDetail.SoCMND) ? dtlnvDetail.SoCMND : "";
                        worksheet.Cells[rowIndex, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 7].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 7].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 8].Value = !string.IsNullOrEmpty(dtlnvDetail.NgayCapCMND.ToString()) ?
                            dtlnvDetail.NgayCapCMND.ToString("dd/MM/yyyy") : "";
                        worksheet.Cells[rowIndex, 8].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 8].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 8].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 8].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 9].Value = !string.IsNullOrEmpty(dtlnvDetail.SoDienThoai) ? dtlnvDetail.SoDienThoai : "";
                        worksheet.Cells[rowIndex, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 9].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 9].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 10].Value = !string.IsNullOrEmpty(dtlnvDetail.Email) ? dtlnvDetail.Email.ToString() : "";
                        worksheet.Cells[rowIndex, 10].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 10].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 10].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 10].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 11].Value = !string.IsNullOrEmpty(dtlnvDetail.NoiSinh) ? dtlnvDetail.NoiSinh.ToString() : "";
                        worksheet.Cells[rowIndex, 11].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 11].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 11].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 11].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 12].Value = !string.IsNullOrEmpty(dtlnvDetail.NoiOHienNay) ? dtlnvDetail.NoiOHienNay.ToString() : "";
                        worksheet.Cells[rowIndex, 12].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 12].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 12].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 12].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 13].Value = !string.IsNullOrEmpty(dtlnvDetail.TrinhDoHocVan) ? dtlnvDetail.TrinhDoHocVan.ToString() : "";
                        worksheet.Cells[rowIndex, 13].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 13].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 13].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 13].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 14].Value = !string.IsNullOrEmpty(dtlnvDetail.NgayCongTac.ToString()) ?
                            dtlnvDetail.NgayCongTac.ToString("dd/MM/yyyy") : "";
                        worksheet.Cells[rowIndex, 14].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 14].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 14].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 14].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 15].Value = !string.IsNullOrEmpty(dtlnvDetail.TenChucVu) ? dtlnvDetail.TenChucVu.ToString() : "";
                        worksheet.Cells[rowIndex, 15].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 15].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 15].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 15].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        worksheet.Cells[rowIndex, 16].Value = !string.IsNullOrEmpty(dtlnvDetail.TenPhong) ? dtlnvDetail.TenPhong.ToString() : "";
                        worksheet.Cells[rowIndex, 16].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 16].Style.Border.Right.Style = ExcelBorderStyle.Medium;
                        worksheet.Cells[rowIndex, 16].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 16].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;                       

                        //worksheet.Cells[rowIndex, 23].Value = !string.IsNullOrEmpty(hdDetail.HuongDieuTri) ? hdDetail.HuongDieuTri.ToString() : "";
                        //worksheet.Cells[rowIndex, 9].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        //worksheet.Cells[rowIndex, 9].Style.Border.Right.Style = ExcelBorderStyle.Medium;
                        //worksheet.Cells[rowIndex, 9].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        //worksheet.Cells[rowIndex, 9].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;

                        //worksheet.Cells[rowIndex, 6].Value = hdDetail.NgayHetHan != null ? hdDetail.NgayHetHan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        //worksheet.Cells[rowIndex, 5].Value = hdDetail.NgaySinh != null ? hdDetail.NgaySinh.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";

                        rowIndex++;
                        count++;
                    }

                    package.SaveAs(file); //Save the workbook.    

                }
            }
            return new OkObjectResult(url);
        }

        [HttpPost]
        public IActionResult AddChucDanh(PCTChucDanhNhanVienViewModel chucdanh)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _chucdanhnhanvienService.PCTD_Create_PCTChucDanhNhanVien(chucdanh, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult DeleteChucDanh(int chucdanhnhanvienid)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Delete);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = _chucdanhnhanvienService.PCTD_Delete_PCTChucDanhNhanVien(chucdanhnhanvienid, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public IActionResult UpBacATDHoSoNV(string HoSoNhanVienId, int BacAnToanDienId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "DAOTAOHOCVIEN", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime updateDate = DateTime.Now;
                string updateBy = User.GetSpecificClaim("UserName");

                var model = _hosonhanvienService.Update_HoSoNhanVien_ByBacATD(HoSoNhanVienId, BacAnToanDienId, updateDate, updateBy);
                return new OkObjectResult(model);
            }
        }

        #endregion

    }
}
