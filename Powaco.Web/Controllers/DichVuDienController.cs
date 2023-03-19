using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Helpers;
using Powaco.Web.Helpers;
using Powaco.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Powaco.Web.Controllers
{
    public class DichVuDienController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTCacDichVuDienService _ttcacdichvudienService;        

        public DichVuDienController(IHostingEnvironment hostingEnvironment, ITTCacDichVuDienService ttcacdichvudienService
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
        public async Task<IActionResult> GetId(int dichvudienId)
        {
            var model = await _ttcacdichvudienService.Get_TTCacDichVuDien_ByIdNoTest(dichvudienId);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> DangKy(Guid codeid, CommentCreateRequest request, TTCacDichVuDienViewModel dichvudien)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (!Captcha.ValidateCaptchaCode(request.CaptchaCode, HttpContext))
            {
                ModelState.AddModelError("", "Mã xác nhận không đúng");
                return BadRequest(ModelState);
            }

            DateTime createDate = DateTime.Now;
            string createBy = "Client";

            var model = await _ttcacdichvudienService.Create_TTCacDichVuDien(codeid, dichvudien, createDate, createBy);

            return new OkObjectResult(model);           
        }

        [HttpGet]
        public IActionResult SessionDichVuDienId(int dichvudienId)
        {
            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("dichvudienId", dichvudienId.ToString());
            //HttpContext.Session.SetString("TuNgay", tungaydenngay);
            //SessionHelper.SetObjectAsJson(HttpContext.Session, "sovbd", vbdDetail.Result);

            return new OkObjectResult(dichvudienId);
        }

    }
}
