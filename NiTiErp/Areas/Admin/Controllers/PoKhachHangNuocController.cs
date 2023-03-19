using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class PoKhachHangNuocController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IKhachHangService _khachhangService;
        private readonly IThanhPhoTinhService _thanhphotinhService;
        private readonly IQuanHuyenService _quanhuyenService;
        private readonly IDotInHDService _dotinhdService;
        private readonly IDMThuHoService _dmthuhoService;
        private readonly IMDSDService _mdsdService;

        public PoKhachHangNuocController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IKhachHangService khachhangService, IThanhPhoTinhService thanhphotinhService, IQuanHuyenService quanhuyenService,
            IDotInHDService dotinhdService, IDMThuHoService dmthuhoService, IMDSDService mdsdService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _khachhangService = khachhangService;
            _thanhphotinhService = thanhphotinhService;
            _quanhuyenService = quanhuyenService;
            _dotinhdService = dotinhdService;
            _dmthuhoService = dmthuhoService;
            _mdsdService = mdsdService;
        }

        public IActionResult Index()
        {
            return View();
        }

        #region Get list

        [HttpGet]
        public IActionResult ListMDSD()
        {
            var model = _mdsdService.Get_MDSD_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListThuHo()
        {
            var model = _dmthuhoService.Get_DMThuHo_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult DotIn(string corporationid)
        {
            var model = _dotinhdService.Get_DotInHD_ByCorporationId(corporationid);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListTinh()
        {          
            var model = _thanhphotinhService.Get_ThanhPhoTinh_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult ListQuan()
        {
            var model = _quanhuyenService.Get_QuanHuyen_ByAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetListKHN(string KhuVuc, string DieuKien, string keyword, int page, int pageSize)
        {
            var dieukien = !string.IsNullOrEmpty(DieuKien) ? DieuKien : "0";
            var tukhoa = !string.IsNullOrEmpty(keyword) ? keyword : "0";

            var model = _khachhangService.Get_KhachHang_AllPaging(KhuVuc, dieukien, tukhoa, page, pageSize);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult KhachHangId(string makh)
        {
            var model = _khachhangService.Get_KhachHang_ByMaKhachHang(makh);
            return new OkObjectResult(model);
        }

        #endregion

    }
}
