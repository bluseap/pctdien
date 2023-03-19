using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Dapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Powaco.Web.Controllers
{
    public class RpInPhieuDichVuDien : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTCacDichVuDienService _ttcacdichvudienService;        

        public RpInPhieuDichVuDien(IHostingEnvironment hostingEnvironment, ITTCacDichVuDienService ttcacdichvudienService
            )
        {
            _hostingEnvironment = hostingEnvironment;

            _ttcacdichvudienService = ttcacdichvudienService;           
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetById(int dichvudienId)
        {
            var model = await _ttcacdichvudienService.Get_TTCacDichVuDien_ById(dichvudienId);

            return new OkObjectResult(model);
        }

    }
}
