using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Dapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Powaco.Web.Controllers
{
    public class RpInPhieuTiepNhanDien : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTDangKyDienService _ttdangkydienService;
        private readonly ITTDangKyFileService _ttdangkyfileService;

        public RpInPhieuTiepNhanDien(IHostingEnvironment hostingEnvironment, ITTDangKyDienService ttdangkydienService,
            ITTDangKyFileService ttdangkyfileService)
        {
            _hostingEnvironment = hostingEnvironment;

            _ttdangkydienService = ttdangkydienService;
            _ttdangkyfileService = ttdangkyfileService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int dangkydienId)      
        {
            var model = await _ttdangkydienService.Get_TTDangKyDien_ById(dangkydienId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetHinh(int dangkydienId, Guid codeId)
        {
            var model = await _ttdangkyfileService.Get_TTDangKyFile_ByDangKyId(dangkydienId, codeId);

            return new OkObjectResult(model);
        }

        //[HttpGet]
        //public async Task<IActionResult> GetListAll()
        //{
        //    var model = await _ttdangkyfileService.Get_TTDangKyFile_ByAll();

        //    return new OkObjectResult(model);
        //}

        //[HttpPost]
        //[DisableRequestSizeLimit]
        //public async Task<IActionResult> Image64Base(Int64 ttdangkyfileId, string imagefile)
        //{
        //    var model = await _ttdangkyfileService.Update_TTDangKyFile_ByImageFile64(ttdangkyfileId, imagefile);

        //    return new OkObjectResult(model);
        //}

    }
}
