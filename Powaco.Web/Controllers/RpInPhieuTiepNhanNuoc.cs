using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Dapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Powaco.Web.Controllers
{
    public class RpInPhieuTiepNhanNuoc : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTDangKyNuocService _ttdangkynuocService;
        private readonly ITTDangKyFileService _ttdangkyfileService;

        public RpInPhieuTiepNhanNuoc(IHostingEnvironment hostingEnvironment, ITTDangKyNuocService ttdangkynuocService,
           ITTDangKyFileService ttdangkyfileService)
        {
            _hostingEnvironment = hostingEnvironment;

            _ttdangkynuocService = ttdangkynuocService;
            _ttdangkyfileService = ttdangkyfileService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int dangkynuocId)
        {
            var model = await _ttdangkynuocService.Get_TTDangKyNuoc_ById(dangkynuocId);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetHinh(int dangkynuocId, Guid codeId)
        {
            var model = await _ttdangkyfileService.Get_TTDangKyFile_ByDangKyId(dangkynuocId, codeId);

            return new OkObjectResult(model);
        }
    }
}
