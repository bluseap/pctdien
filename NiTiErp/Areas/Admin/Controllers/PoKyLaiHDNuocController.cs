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
    public class PoKyLaiHDNuocController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IThayHopDongService _thayhopdongService;
        private readonly IMDSDService _mdsdService;
        private readonly IThanhPhoTinhService _thanhphotinhService;
        private readonly IKhachHangService _khachhangService;
        private readonly IPoDMDieuKienService _podieukienService;
        private readonly ILockStatusService _lockstatusService;

        public PoKyLaiHDNuocController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService, IThayHopDongService thayhopdongService, IMDSDService mdsdService,
            IThanhPhoTinhService thanhphotinhService, IKhachHangService khachhangService, IPoDMDieuKienService podieukienService,
            ILockStatusService lockstatusService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _thayhopdongService = thayhopdongService;
            _mdsdService = mdsdService;
            _thanhphotinhService = thanhphotinhService;
            _khachhangService = khachhangService;
            _podieukienService = podieukienService;
            _lockstatusService = lockstatusService;
        }

        public IActionResult Index()
        {
            var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDNuoc", Operations.Read);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

        #region List Tinh, Phuong, Xa
        [HttpGet]
        public IActionResult ListTinh()
        {
            var model = _thanhphotinhService.Get_ThanhPhoTinh_ByAll();
            return new OkObjectResult(model);
        }

        #endregion

        #region Get list 

        [HttpGet]
        public IActionResult GetListTHD(string KhuVuc, string LoaiHopDong, string DSHopDongTheo, string keyword, 
            int page, int pageSize)
        {
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "%";
            
            if (LoaiHopDong == "0" && DSHopDongTheo == "0")
            {
                var model = _thayhopdongService.Get_ThayHopDong_AllPaging(KhuVuc, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else if (LoaiHopDong != "0" && DSHopDongTheo == "0")
            {
                var model = _thayhopdongService.Get_ThayHopDong_ByLoaiHopDongPaging(KhuVuc, LoaiHopDong, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var model = _thayhopdongService.Get_ThayHopDong_ByDsHopDongTheoPaging(KhuVuc, DSHopDongTheo, tukhoa, page, pageSize);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult ListMDSD()
        {
            var model = _mdsdService.Get_MDSD_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult TimKHNuoc(string KhuVuc, string DieuKien)
        {
            var tukhoa = !string.IsNullOrEmpty(DieuKien) ? DieuKien : "%";

            var model = _khachhangService.Get_KhachHang_ByDieuKien(KhuVuc, tukhoa);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetKHId(string MaKhachHang)
        {          
            var model = _khachhangService.Get_KhachHang_ByMaKhachHang(MaKhachHang);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult PoDieuKien(string DieuKien)
        {     
            var model = _podieukienService.Get_PoDMDieuKien_ByCode(DieuKien);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult KhoaSo(string MaKhachHang, int THANG, int NAM)
        {
            var model = _lockstatusService.Get_LockStatus_ByMaDPKyThay(MaKhachHang, THANG, NAM);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetTHDId(string ThayHopDongIdMakv)
        {
            var model = _thayhopdongService.Get_ThayHopDong_ByIdMakv(ThayHopDongIdMakv);
            return new OkObjectResult(model);
        }


        #endregion

        #region Insert, Update, Delete, Report

        [HttpPost]        
        public async Task<IActionResult> SaveThayHDong(ThayHopDongViewModel thayhopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDNuoc", Operations.Create);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = await _thayhopdongService.Create_ThayHopDong(thayhopdong, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UpThayHDong(ThayHopDongViewModel thayhopdong)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "KHKyLaiHDNuoc", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền thêm."));
                }

                DateTime createDate = DateTime.Now;
                string createBy = User.GetSpecificClaim("UserName");

                var model = await _thayhopdongService.Update_ThayHopDong(thayhopdong, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult InTHDNuoc(string ThayHopDongIdMaKv)
        {            
            var thayhopdong = _thayhopdongService.Get_ThayHopDong_ByIdMakv(ThayHopDongIdMaKv).Result;

            string makv = ThayHopDongIdMaKv.Substring(0, 1);

            HttpContext.Session.SetString("MaKV", makv);

            HttpContext.Session.SetString("SoHDMoi", thayhopdong.SOHDMOI);
            HttpContext.Session.SetString("TenKH", thayhopdong.TENKHMOI.ToUpper());
            HttpContext.Session.SetString("DiaChiLD", thayhopdong.DIACHILD);
            HttpContext.Session.SetString("DanhSo", thayhopdong.MADP.ToUpper() + thayhopdong.MADB.ToUpper());
            HttpContext.Session.SetString("NgayHieuLuc", thayhopdong.NGAYHL.ToString("dd/MM/yyyy"));

            HttpContext.Session.SetString("NgayKyHD", thayhopdong.NGAYKT.Day.ToString());
            HttpContext.Session.SetString("ThangKyHD", thayhopdong.NGAYKT.Month.ToString());
            HttpContext.Session.SetString("NamKyHD", thayhopdong.NGAYKT.Year.ToString());
            HttpContext.Session.SetString("TaiXN", thayhopdong.TENKV.ToUpper());

            HttpContext.Session.SetString("NguoiDaiDien", thayhopdong.TENKHMOI != null ? thayhopdong.TENKHMOI.ToUpper() : "");
            HttpContext.Session.SetString("NguoiUyQuyen", thayhopdong.UYQUYEN != null ? thayhopdong.UYQUYEN.ToUpper() : "");
            HttpContext.Session.SetString("TenChucVu", thayhopdong.TENCHUCVU != null ? thayhopdong.TENCHUCVU.ToUpper() : "");
            HttpContext.Session.SetString("CMND", thayhopdong.CMND != null ? thayhopdong.CMND : "");
            HttpContext.Session.SetString("NgayCap", thayhopdong.CAPNGAY.Day.ToString());
            HttpContext.Session.SetString("ThangCap", thayhopdong.CAPNGAY.Month.ToString());
            HttpContext.Session.SetString("NamCap", thayhopdong.CAPNGAY.Year.ToString());
            HttpContext.Session.SetString("TaiDau", thayhopdong.TAI != null ? thayhopdong.TAI : "");

            HttpContext.Session.SetString("SoGiayUyQuyen", thayhopdong.SoGiayUyQuyen != null ? thayhopdong.SoGiayUyQuyen : "");
            HttpContext.Session.SetString("NgayUyQuyen", thayhopdong.NgayUyQuyen.ToString("dd/MM/yyyy"));
            HttpContext.Session.SetString("DiaChiKH", thayhopdong.DiaChiKH != null ? thayhopdong.DiaChiKH : "");

            HttpContext.Session.SetString("MaSoThueMoi", thayhopdong.MaSoThueMoi != null ? thayhopdong.MaSoThueMoi : "");
            HttpContext.Session.SetString("DienThoai", thayhopdong.DIENTHOAI != null ? thayhopdong.DIENTHOAI : "");

            HttpContext.Session.SetString("NgayHLHD", thayhopdong.NGAYHL.Day.ToString());
            HttpContext.Session.SetString("ThangHLHD", thayhopdong.NGAYHL.Month.ToString());
            HttpContext.Session.SetString("NamKyHLHD", thayhopdong.NGAYHL.Year.ToString());

            HttpContext.Session.SetString("MaKhachHang", thayhopdong.IDKH);           

            return new OkObjectResult(thayhopdong);            

        }
        #endregion

    }
}
