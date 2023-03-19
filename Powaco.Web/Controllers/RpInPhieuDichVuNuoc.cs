using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Dapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Powaco.Web.Controllers
{
    public class RpInPhieuDichVuNuoc : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTCacDichVuNuocService _ttcacdichvunuocService;

        public RpInPhieuDichVuNuoc(IHostingEnvironment hostingEnvironment, ITTCacDichVuNuocService ttcacdichvunuocService
            )
        {
            _hostingEnvironment = hostingEnvironment;

            _ttcacdichvunuocService = ttcacdichvunuocService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int dichvunuocId)
        {
            var model = await _ttcacdichvunuocService.Get_TTCacDichVuNuoc_ById(dichvunuocId);

            return new OkObjectResult(model);
        }

    }
}
