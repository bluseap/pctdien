﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces.KyThuatDien;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
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

        #endregion

    }
}
