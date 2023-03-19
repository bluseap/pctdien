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
    public class DangKyDienController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        
        private readonly ITTDangKyDienService _ttdangkydienService;        

        public DangKyDienController(IHostingEnvironment hostingEnvironment, ITTDangKyDienService ttdangkydienService)
        {
            _hostingEnvironment = hostingEnvironment;

            _ttdangkydienService = ttdangkydienService;            
        }

        public IActionResult Index()
        {            
            return View();
        }

        #region Get list    
        
        [HttpGet]
        public async Task<IActionResult> GetId(int dangkydienId)
        {
            var model = await _ttdangkydienService.Get_TTDangKyDien_ByIdNoTest(dangkydienId);
            return new OkObjectResult(model);
        }

        #endregion

        [HttpPost]
        public async Task<IActionResult> DangKy(Guid codeid, CommentCreateRequest request, TTDangKyDienViewModel dangkydien)
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
            var model = await _ttdangkydienService.Create_TTDangKyDien(codeid, dangkydien, createDate, createBy);
            return new OkObjectResult(model);            
        }

        [HttpGet]
        public IActionResult SessionDienId(int dangkuydienId)
        {            
            //HttpContext.Session.SetInt32("age", 20);
            HttpContext.Session.SetString("dangkuydienId", dangkuydienId.ToString());
            //HttpContext.Session.SetString("TuNgay", tungaydenngay);
            //SessionHelper.SetObjectAsJson(HttpContext.Session, "sovbd", vbdDetail.Result);

            return new OkObjectResult(dangkuydienId);
        }


    }
}
