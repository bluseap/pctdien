﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiAPI.Dapper.Repositories.Interfaces;
using NiTiAPI.Dapper.ViewModels;
using NiTiAPI.WebErp.Filters;
using NiTiAPI.WebErp.Helpers;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace NiTiAPI.WebErp.Areas.Admin.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IOrderRepository _order;
        private readonly IOrderDetailsRepository _orderDetailsRepository;
        private readonly IAttributeOptionValueRepository _attributeOption;
        private readonly ICorporationRepository _corporationRepository;

        private readonly IProductQuantitiesRepository _productquantitiesRepository;

        public OrderController(IHostingEnvironment hostingEnvironment, IOrderRepository order, IOrderDetailsRepository orderDetailsRepository,
            IAttributeOptionValueRepository attributeOption, ICorporationRepository corporationRepository,
            IProductQuantitiesRepository productquantitiesRepository
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _order = order;
            _orderDetailsRepository = orderDetailsRepository;
            _attributeOption = attributeOption;
            _corporationRepository = corporationRepository;

            _productquantitiesRepository = productquantitiesRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetOrderDetails(string orderdetailsId)
        {
            var model = await _orderDetailsRepository.Get_OrderDetails_ByOrderDetailsId(orderdetailsId);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListProQuan()
        {
            var model = await _productquantitiesRepository.Get_ProductQuantities_ByAllProductId();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListTenKH(string corporationId,
            string tenkhachhang, string sodienthoai, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;
            var tenkh = !string.IsNullOrEmpty(tenkhachhang) ? tenkhachhang : "0";
            var sdt = !string.IsNullOrEmpty(sodienthoai) ? sodienthoai : "0";

            var model = await _order.Get_Order_AllPagingTenKH(khuvuc, tenkh, sdt, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListOrderDetails(string corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;            

            var model = await _orderDetailsRepository.Get_OrderDetails_AllPaging(khuvuc, tukhoa, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListGroupOD(string corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByGroupOrderAllPaging(khuvuc, tukhoa, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListTTOrderDetails(string corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByTTOrderId(khuvuc, tukhoa, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListTTLiveOrderDetails(string corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByTTLiveOrderId(khuvuc, tukhoa, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListGomDon(string corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByGomDon(khuvuc, tukhoa, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListODDieuKien(string corporationId, string DieuKien, DateTime TuNgay, DateTime DenNgay,
            int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByDieuKien(khuvuc, DieuKien, TuNgay, DenNgay, 
                pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> ListODDieuKien2(string corporationId, string DieuKien, DateTime TuNgay, DateTime DenNgay,
            int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = await _orderDetailsRepository.Get_OrderDetails_ByDieuKien2(khuvuc, DieuKien, TuNgay, DenNgay,
                pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ExcelODDieuKien(string corporationId, string DieuKien, DateTime TuNgay, DateTime DenNgay,
            int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = _orderDetailsRepository.Get_OrderDetails_ByListDieuKien(khuvuc, DieuKien, TuNgay, DenNgay,
                pageIndex, pageSize).Result;

            string ngaybuoilive = "Từ ngày Live " + TuNgay.ToString("dd/MM/yyyy").ToString() + " đến ngày Live " +
                DenNgay.ToString("dd/MM/yyyy").ToString();

            HttpContext.Session.SetString("NgayBuoiLive", ngaybuoilive);
           
            SessionHelper.SetObjectAsJson(HttpContext.Session, "DSDonHangTheoNgayLive", model);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult InODDieuKienDonDi(string corporationId, string DieuKien, DateTime TuNgay, DateTime DenNgay,
            int pageIndex, int pageSize)
        {
            var khuvuc = !string.IsNullOrEmpty(corporationId) ? Convert.ToInt32(corporationId) : 0;

            var model = _orderDetailsRepository.Get_OrderDetails_ByListDieuKien(khuvuc, DieuKien, TuNgay, DenNgay,
                pageIndex, pageSize).Result;

            string ngaydondi = "Danh sách đơn đi trong ngày " + TuNgay.ToString("dd/MM/yyyy").ToString() ;

            HttpContext.Session.SetString("NgayDonDi", ngaydondi);

            SessionHelper.SetObjectAsJson(HttpContext.Session, "DSDonHangTheoNgayDonDi", model);

            return new OkObjectResult(model);
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.CREATE)]
        public async Task<IActionResult> SaveOrder(OrderViewModel order, string createby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime createDate = DateTime.Now;                

                var orders = await _order.Create_Order(order, createby, createDate);
                return new OkObjectResult(orders);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.UPDATE)]
        public async Task<IActionResult> UpOrder(OrderViewModel order, string updateby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime uptdaeDate = DateTime.Now;

                var orders = await _order.Update_Order_KhachHang(order, updateby, uptdaeDate);
                return new OkObjectResult(orders);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.CREATE)]
        public async Task<IActionResult> SaveOrderDetails(OrderDetailsViewModel orderdetails, 
            bool ckttlive, bool ckttdondi, bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string createby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime createDate = DateTime.Now;

                var orders = await _orderDetailsRepository.Create_OrderDetails(orderdetails, ckttlive, ckttdondi, 
                    ckttdonden, ckttdonhuy, tensanphammoi, createby, createDate);
                return new OkObjectResult(orders);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.CREATE)]
        public async Task<IActionResult> InTTOD(OrderDetailsViewModel orderdetails, string TenSanPhamMoi, string createby)
        {
            DateTime createDate = DateTime.Now;

            var orders = await _orderDetailsRepository.Create_OrderDetails_ByTrucTiep(orderdetails, TenSanPhamMoi, createby, createDate);
            return new OkObjectResult(orders);
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.UPDATE)]
        public async Task<IActionResult> UpdateOrderDetails(OrderDetailsViewModel orderdetails, string orderdetailsId, string MaNhomLive,
            bool ckttlive, bool ckttdondi, bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string updateby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime updateDate = DateTime.Now;

                var orders = await _orderDetailsRepository.Update_OrderDetails(orderdetails, orderdetailsId, MaNhomLive,
                    ckttlive, ckttdondi, ckttdonden, ckttdonhuy, tensanphammoi, updateby, updateDate);
                return new OkObjectResult(orders);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.DELETE)]
        public async Task<IActionResult> DelOrderDetails(Int32 orderdetailsId, string updateBy)
        {
            DateTime updateDate = DateTime.Now;

            var orders = await _orderDetailsRepository.Delete_OrderDetails(orderdetailsId, updateBy, updateDate);
            return new OkObjectResult(orders);            
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.DELETE)]
        public async Task<IActionResult> DelOD01(Int32 orderdetailsId, string updateBy)
        {
            DateTime updateDate = DateTime.Now;

            var orders = await _orderDetailsRepository.Delete_OrderDetails01(orderdetailsId, updateBy, updateDate);
            return new OkObjectResult(orders);            
        }

        [HttpGet]
        public IActionResult InDon(string OrderDetailsId, string MaNhomLive)
        {
            var order = _order.Get_Order_ByOrderDetailsId(OrderDetailsId).Result;
            var orderdetails = _orderDetailsRepository.Get_OrderDetails_ByOrderDetailsId(OrderDetailsId).Result;
            //var orderdetailsList = _orderDetailsRepository.Get_OrderDetails_ByListOrderId(orderdetailsId).Result;

            var orderdetailsList = _orderDetailsRepository.Get_OrderDetails_ByListMaNhomLive(MaNhomLive).Result;

            HttpContext.Session.SetString("TenCongTy", order.CorporationName);
            HttpContext.Session.SetString("DiaChiCongTy", order.DiaChiCongTy);
            HttpContext.Session.SetString("DienThoaiCongTy", order.DienThoaiCongTy);
            HttpContext.Session.SetString("EmailCongTy", order.EmailCongTy);
            HttpContext.Session.SetString("TenTaiKhoan", order.TenTaiKhoan);
            HttpContext.Session.SetString("SoTaiKhoan", order.SoTaiKhoan);

            HttpContext.Session.SetString("TenKhachHang", order.CustomerName);
            HttpContext.Session.SetString("DienThoaiKhachHang", order.CustomerPhone);
            HttpContext.Session.SetString("DiaChiKhachHang", order.CustomerAddress);

            HttpContext.Session.SetString("NgayDatLive", orderdetails.NgayDatLive.ToString("dd/MM/yyyy") + "-" + orderdetails.TenBuoiLive);

            decimal tientong = orderdetailsList.Sum(p => p.TienTong);
            decimal tiencoc = orderdetailsList.Sum(p => p.TienCoc);
            HttpContext.Session.SetString("TienTong", string.Format("{0:0,0}", tientong));
            HttpContext.Session.SetString("TienCoc", string.Format("{0:0,0}", tiencoc));
            string conlai = string.Format("{0:0,0}", tientong - tiencoc).ToString();
            HttpContext.Session.SetString("ConLai", conlai);

            HttpContext.Session.SetString("TenMaTienShipKhachHangTra", (orderdetails.TenMaTienShipKhachHangTra != null ? orderdetails.TenMaTienShipKhachHangTra.ToUpper() : "" ) + 
                " + " + conlai + "K");               
           
            SessionHelper.SetObjectAsJson(HttpContext.Session, "DSDonHangTheoKH", orderdetailsList);

            return new OkObjectResult(order);
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.UPDATE)]
        public async Task<IActionResult> UpdateGomDon(Int32 Id, string updateby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime updateDate = DateTime.Now;

                var orders = await _orderDetailsRepository.Update_OrderDetails_ByIdGomDon(Id, updateby, updateDate);
                return new OkObjectResult(orders);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.UPDATE)]
        public async Task<IActionResult> DeleteGomDon(Int32 Id, string updateby)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime updateDate = DateTime.Now;

                var orders = await _orderDetailsRepository.Delete_OrderDetails_ByIdGomDon(Id, updateby, updateDate);
                return new OkObjectResult(orders);
            }
        }




        [HttpGet]
        public async Task<IActionResult> GetId(long id)
        {
            var model = await _order.GetById(id);
            return new OkObjectResult(model);
        }        

        [HttpGet]
        public async Task<IActionResult> GetPaging(string keyword, int corporationId,
           int pageIndex, int pageSize)
        {
            var model = await _order.GetAllPagingOrder(corporationId, keyword, pageIndex, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.UPDATE)]
        public async Task<IActionResult> UpdateOrder(OrderViewModel orderVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                orderVm.UpdateDate = DateTime.Now;
                var order = await _order.UpdateOrder(orderVm);
                return new OkObjectResult(order);
            }
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.DELETE)]
        public async Task<IActionResult> DeleteOrder(long Id, string username)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var role = await _order.DeleteOrder(Id, username);
                return new OkObjectResult(role);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetListAttriSizes(string codeSize, string language)
        {
            var model = await _attributeOption.GetByAttriCodeSize(codeSize, language);
            return new OkObjectResult(model);
        }

        #region Order Details

        [HttpGet]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.VIEW)]
        public async Task<IActionResult> GetListOrderDetail(long orderId, string languageId)
        {
            var model = await _orderDetailsRepository.GetListOrderDetails(orderId, languageId);
            return new OkObjectResult(model);
        }

        [HttpPost]
        [ClaimRequirement(FunctionCode.SALES_ORDER, ActionCode.CREATE)]
        public async Task<IActionResult> SaveListOrder(string listOrderXML, string username, string languageId)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var productQuantities = await _orderDetailsRepository.CreateOrderDetailsXML(listOrderXML, username, languageId);
                return new OkObjectResult(productQuantities);
            }
        }

        [HttpPost]
        public IActionResult ExportExcel(long orderId)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"OrderTemplate.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "template/cshop", "OrderTemplate.xlsx");

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
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["Order"];

                    var corporation = _corporationRepository.GetByOrderId(orderId);

                    worksheet.Cells[2, 3].Value = "Địa chỉ: " + corporation.Result.Address;
                    worksheet.Cells[2, 3].Style.Font.Size = 10;
                    worksheet.Cells[2, 3].Style.Font.Bold = true;
                    //worksheet.Cells[2, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    //worksheet.Cells[2, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

                    worksheet.Cells[3, 3].Value = "SĐT: " + corporation.Result.MobileNumber;
                    worksheet.Cells[3, 3].Style.Font.Size = 10;
                    worksheet.Cells[3, 3].Style.Font.Bold = true;

                    var order = _order.GetById(orderId);

                    worksheet.Cells[4, 3].Value = "Tên khách hàng: " + order.Result.CustomerName;
                    worksheet.Cells[4, 3].Style.Font.Size = 10;
                    worksheet.Cells[4, 3].Style.Font.Bold = true;

                    worksheet.Cells[5, 3].Value = "Địa chỉ: " + order.Result.CustomerAddress;
                    worksheet.Cells[5, 3].Style.Font.Size = 10;
                    worksheet.Cells[5, 3].Style.Font.Bold = true;

                    worksheet.Cells[6, 3].Value = "SĐT: " + order.Result.CustomerPhone;
                    worksheet.Cells[6, 3].Style.Font.Size = 10;
                    worksheet.Cells[6, 3].Style.Font.Bold = true;

                    int rowIndex = 11;
                    int count = 1;

                    var orderDetails = _orderDetailsRepository.GetListOrderDetails(orderId, "vi-VN");

                    worksheet.InsertRow(rowIndex + 1, orderDetails.Result.Count() - 1);

                    foreach (var hdDetail in orderDetails.Result)
                    {
                        //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
                        // Cell 1, Carton Count
                        //worksheet.Cells[rowIndex, 2].Value = count.ToString();
                        //worksheet.Cells[rowIndex, 2].Value = !string.IsNullOrEmpty(hdDetail.SortNumber) ? hdDetail.SoKyHieuCuaVanBan.ToString() : "";
                        worksheet.Cells[rowIndex, 2].Value = hdDetail.SortNumber;                        
                        worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam  
                        //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
                        //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
                        worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                        worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
                        worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 2].Style.Font.Size = 10;
                        worksheet.Cells[rowIndex, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                        //worksheet.Row(rowIndex).Height = 35;

                        //worksheet.Cells[rowIndex, 3].Value = hdDetail.ProductName != null ? hdDetail.NgayBanHanhCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        worksheet.Cells[rowIndex, 3].Value = hdDetail.ProductName;
                        worksheet.Cells[rowIndex, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 4].Value = hdDetail.Quantity;
                        worksheet.Cells[rowIndex, 4].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 5].Value = Convert.ToInt32(hdDetail.Price) > 0 ? Convert.ToInt32(hdDetail.Price) : Convert.ToInt32(hdDetail.DiscountPrice);
                        worksheet.Cells[rowIndex, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 6].Value = Convert.ToInt32(hdDetail.Price) > 0 ? Convert.ToInt32(hdDetail.Price) * hdDetail.Quantity: Convert.ToInt32(hdDetail.DiscountPrice) * hdDetail.Quantity;
                        worksheet.Cells[rowIndex, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Right.Style = ExcelBorderStyle.Thick;
                        worksheet.Cells[rowIndex, 6].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Font.Size = 10;

                        rowIndex++;
                        count++;
                    }

                    package.SaveAs(file); //Save the workbook.    

                }
                return new OkObjectResult(url);
            }
        }

        [HttpPost]
        public IActionResult ExcelOrderTo(DateTime FromDate, DateTime ToDate, string languageId)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"OrderToDate.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "template/cshop", "OrderToDate.xlsx");

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
                    ExcelWorksheet worksheet = package.Workbook.Worksheets["OrderToDate"];

                    var orderDetails = _orderDetailsRepository.GetListOrderByCreateDate(FromDate, ToDate, languageId);

                    worksheet.Cells[4, 2].Value = "Từ ngày " + FromDate.ToString("dd/MM/yyyy") + " đến ngày " + ToDate.ToString("dd/MM/yyyy");
                    worksheet.Cells[4, 2].Style.Font.Size = 10;
                    worksheet.Cells[4, 2].Style.Font.Bold = true;
                    //worksheet.Cells[2, 3].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center; // canh giua
                    //worksheet.Cells[2, 3].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                    
                    int rowIndex = 8;
                    int count = 1;                    

                    worksheet.InsertRow(rowIndex + 1, orderDetails.Result.Count() - 1);

                    foreach (var hdDetail in orderDetails.Result)
                    {
                        //Color DeepBlueHexCode = ColorTranslator.FromHtml("#254061");
                        // Cell 1, Carton Count
                        //worksheet.Cells[rowIndex, 2].Value = count.ToString();
                        //worksheet.Cells[rowIndex, 2].Value = !string.IsNullOrEmpty(hdDetail.SortNumber) ? hdDetail.SoKyHieuCuaVanBan.ToString() : "";
                        worksheet.Cells[rowIndex, 2].Value = hdDetail.SortNumber;
                        worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Thick; // to dam  
                        //worksheet.Cells[rowIndex, 2].Style.Border.Top.Color.SetColor(Color.Red);
                        //worksheet.Cells[rowIndex, 2].Style.Border.Left.Style = ExcelBorderStyle.Medium; // to dam vua
                        worksheet.Cells[rowIndex, 2].Style.Border.Right.Style = ExcelBorderStyle.Thin; // lien nho
                        worksheet.Cells[rowIndex, 2].Style.Border.Top.Style = ExcelBorderStyle.Dotted; // khoan cach
                        worksheet.Cells[rowIndex, 2].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 2].Style.Font.Size = 10;
                        worksheet.Cells[rowIndex, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Right;
                        //worksheet.Row(rowIndex).Height = 35;

                        worksheet.Cells[rowIndex, 3].Value = hdDetail.CustomerName;
                        worksheet.Cells[rowIndex, 3].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 3].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 3].Style.Font.Size = 10;

                        //worksheet.Cells[rowIndex, 3].Value = hdDetail.ProductName != null ? hdDetail.NgayBanHanhCuaVanBan.Date.ToString("dd/M/yyyy", CultureInfo.InvariantCulture) : "";
                        worksheet.Cells[rowIndex, 4].Value = hdDetail.ProductName;
                        worksheet.Cells[rowIndex, 4].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 4].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 4].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 5].Value = hdDetail.Quantity;
                        worksheet.Cells[rowIndex, 5].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 5].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 5].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 6].Value = Convert.ToInt32(hdDetail.Price) > 0 ? Convert.ToInt32(hdDetail.Price) : Convert.ToInt32(hdDetail.DiscountPrice);
                        worksheet.Cells[rowIndex, 6].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 6].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 6].Style.Font.Size = 10;

                        worksheet.Cells[rowIndex, 7].Value = Convert.ToInt32(hdDetail.Price) > 0 ? Convert.ToInt32(hdDetail.Price) * hdDetail.Quantity : Convert.ToInt32(hdDetail.DiscountPrice) * hdDetail.Quantity;
                        worksheet.Cells[rowIndex, 7].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        worksheet.Cells[rowIndex, 7].Style.Border.Right.Style = ExcelBorderStyle.Thick;
                        worksheet.Cells[rowIndex, 7].Style.Border.Top.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 7].Style.Border.Bottom.Style = ExcelBorderStyle.Dotted;
                        worksheet.Cells[rowIndex, 7].Style.Font.Size = 10;

                        rowIndex++;
                        count++;
                    }

                    package.SaveAs(file); //Save the workbook.    

                }
                return new OkObjectResult(url);
            }
        }

        #endregion

    }
}