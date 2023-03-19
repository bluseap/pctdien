

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Utilities.Helpers;
using Powaco.Web.Helpers;
using Powaco.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Xml;

namespace Powaco.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        private readonly ITTDangKyFileService _ttdangkyfileService;
        private readonly ITTDMDangKyService _ttdmdangkyService;
        private readonly IQuanHuyenService _quanhuyenService;
        private readonly IPhuongXaService _phuongxaService;       

        public HomeController(IHostingEnvironment hostingEnvironment, ITTDMDangKyService ttdmdangkyService,
            ITTDangKyFileService ttdangkyfileService, IQuanHuyenService quanhuyenService, IPhuongXaService phuongxaService)
        {
            _hostingEnvironment = hostingEnvironment;

            _ttdmdangkyService = ttdmdangkyService;
            _ttdangkyfileService = ttdangkyfileService;
            _quanhuyenService = quanhuyenService;
            _phuongxaService = phuongxaService;
        }

        public IActionResult Index()
        {           
            return View();
        }

        #region Get list Tinh - Quan huyen - phuong xa

        [HttpGet]
        public async Task<IActionResult> PhuongXa(string Huyen)
        {
            var model = await _phuongxaService.Get_PhuongXa_ByHuyen(Convert.ToInt16(Huyen));
            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> Huyen(string Tinh)
        {
            var model = await _quanhuyenService.Get_QuanHuyen_ByTinh(Convert.ToInt16(Tinh));
            return new OkObjectResult(model);
        }

        #endregion

        #region Get list TTDMDangKy

        [HttpGet]
        public async Task<IActionResult> ListDMDangKy(string tenCot)
        {
            var model = await _ttdmdangkyService.Get_TTDMDangKy_ByTenCot(tenCot);
            return new OkObjectResult(model);
        }

        #endregion

        #region Upload file Bo Ho So, Del file, Upfile to data

        [HttpPost]
        public IActionResult UploadHinhBoHoSo()
        {
            DateTime now = DateTime.Now;
            var files = Request.Form.Files;
            if (files.Count == 0)
            {
                return new BadRequestObjectResult(files);
            }
            else
            {
                var file = files[0];
                var filename = ContentDispositionHeaderValue
                                    .Parse(file.ContentDisposition)
                                    .FileName
                                    .Trim('"');

                var imageFolder = $@"\uploaded\HinhBoHoSo\{now.ToString("yyyyMMdd")}";

                string folder = _hostingEnvironment.WebRootPath + imageFolder;

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var datetimeFilename = TextHelper.ConvertStringHour(now) + filename;
                string filePath = Path.Combine(folder, datetimeFilename);
                using (FileStream fs = System.IO.File.Create(filePath))
                {
                    file.CopyTo(fs);
                    fs.Flush();
                }
                //var datetimeFilename2 = TextHelper.ConvertStringHour(now);
                return new OkObjectResult(Path.Combine(imageFolder, datetimeFilename).Replace(@"\", @"/"));
            }
        }
        
        public async Task<IActionResult> DelFile(Guid codeid, string FileName)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime createDate = DateTime.Now;
                string createBy = "Client";

                var model = await _ttdangkyfileService.Delete_TTDangKyFile_ByCodeIdFileName(codeid, FileName, createDate, createBy);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> UpFile(string dangkyfileXML, Guid codeid, string imgeUrl)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime createDate = DateTime.Now;
                string createBy = "Client";

                var model = await _ttdangkyfileService.Create_TTDangKyFile(codeid, dangkyfileXML, createDate, createBy);
                //var model = await _ttdangkyfileService.Create_TTDangKyFile2(codeid, dangkyfileXML, imgeUrl, createDate, createBy);
                return new OkObjectResult(model);

                //string folder = _hostingEnvironment.WebRootPath;
                //var imageFile = ConvertImageURLToBase64.ImageURLToBase642(folder+imgeUrl);
                //string duoi;
                //var duoiFile = imgeUrl.Substring(imgeUrl.Length - 3, 3);
                //if (duoiFile == "pdf")
                //{
                //    duoi = "data:application/pdf;base64,";
                //}
                //else if (duoiFile == "doc" || duoiFile == "ocx")
                //{
                //    duoi = "data:application/msword;base64,";
                //}
                //else if (duoiFile == "xls" || duoiFile == "lsx")
                //{
                //    duoi = "data:application/vnd.ms-excel;base64,";
                //}
                //else
                //{
                //    duoi = "data:image/png;base64,";
                //}

                //var xml = "<tables><items>";
                //xml = xml + dangkyfileXML;
                //xml = xml + "<ImageFile64>" + duoi + imageFile + "</ImageFile64>";                
                //xml = xml + "</items></tables>";

                //var model = await _ttdangkyfileService.Create_TTDangKyFile(dangkyfileXML, xml, createDate, createBy);
                //return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostFile(string ImageFile, Guid NewGuid, string Tenfile)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                DateTime createDate = DateTime.Now;
                string createBy = "Client";

                var model = await _ttdangkyfileService.Create_TTDangKyFileImage(ImageFile, NewGuid, Tenfile);
                return new OkObjectResult(model);
            }
        }

        #endregion

        [Route("get-captcha-image")]
        public IActionResult GetCaptchaImage()
        {
            int width = 100;
            int height = 36;
            var captchaCode = Captcha.GenerateCaptchaCode();
            var result = Captcha.GenerateCaptchaImage(width, height, captchaCode);
            HttpContext.Session.SetString("CaptchaCode", result.CaptchaCode);
            Stream s = new MemoryStream(result.CaptchaByteData);
            return new FileStreamResult(s, "image/png");
        }


    }
}
