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
    public class DangKyNuocController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTDangKyNuocService _ttdangkynuocService;

        public DangKyNuocController(IHostingEnvironment hostingEnvironment, ITTDangKyNuocService ttdangkynuocService)            
        {
            _hostingEnvironment = hostingEnvironment;

            _ttdangkynuocService = ttdangkynuocService;            
        }

        public IActionResult Index()
        {            
            return View();
        }

        #region Get list        
        [HttpGet]
        public async Task<IActionResult> GetId(int dangkynuocId)
        {
            var model = await _ttdangkynuocService.Get_TTDangKyNuoc_ByIdNoTest(dangkynuocId);
            return new OkObjectResult(model);
        }
        #endregion

        [HttpPost]
        public async Task<IActionResult> DangKyN(Guid codeid, CommentCreateRequest request, TTDangKyNuocViewModel dangkynuoc)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }

            if (!Captcha.ValidateCaptchaCode(request.CaptchaCode, HttpContext))
            {
                ModelState.AddModelError("", "Mã xác nhận không đúng.");
                return BadRequest(ModelState);
            }

            DateTime createDate = DateTime.Now;
            string createBy = "Client";
            var model = await _ttdangkynuocService.Create_TTDangKyNuoc(codeid, dangkynuoc, createDate, createBy);
            return new OkObjectResult(model);
        }        

        [HttpGet]
        public IActionResult SessionNuocId(int dangkuynuocId)
        {
            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("dangkuynuocId", dangkuynuocId.ToString());
            //HttpContext.Session.SetString("TuNgay", tungaydenngay);
            //SessionHelper.SetObjectAsJson(HttpContext.Session, "sovbd", vbdDetail.Result);

            return new OkObjectResult(dangkuynuocId);
        }



    }
}
