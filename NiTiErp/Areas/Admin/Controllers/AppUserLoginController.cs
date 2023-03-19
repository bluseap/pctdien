using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class AppUserLoginController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IAppUserLoginService _appuserloginService;        

        public AppUserLoginController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IAppUserLoginService appuserloginService
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _appuserloginService = appuserloginService;       

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetUserName(string username)
        {
            var model = _appuserloginService.GetAllAppUserPaging("", "", 1, 1000, "", username, "", "GetUserNameOnline");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNhomXuLyHoSoNhanVien(string username)
        {
            var model = _appuserloginService.GetAllAppUserPaging("", "", 1, 1000, "", username, "", "GetNhomXuLyHoSoNhanVien");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetNhomVanThuHoSoNhanVien(string username)
        {
            var model = _appuserloginService.GetAllAppUserPaging("", "", 1, 1000, "", username, "", "GetNhomVanThuHoSoNhanVien");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetHoSoNhanVien(string username)
        {
            var model = _appuserloginService.GetAllAppUserPaging("", "", 1, 1000, "", username, "", "GetHoSoNhanVien");

            return new OkObjectResult(model);
        }

        [HttpGet]
        public void CountUserLogin(string userNameId, string statuscontent)
        {
            string ipString = HttpContext.Connection.RemoteIpAddress.ToString(); // LoginIpAddress

            IPHostEntry heserver = Dns.GetHostEntry(Dns.GetHostName());

            //var ip = heserver.AddressList[2].ToString();
            var nameComputer = heserver.HostName.ToString(); // LoginNameIp
            var localIp6 = heserver.AddressList[0] != null ? heserver.AddressList[0].ToString() : "";
            var temIp6 = heserver.AddressList[1] != null ? heserver.AddressList[1].ToString() : "";
            var ip6Address = "";
            var ipComputer = ipString;//heserver.AddressList[3].ToString(); // LoginIp
            var appuserloginVm = new AppUserLoginViewModel();
            var username = userNameId;

            appuserloginVm.UserName = username;
            appuserloginVm.LoginIpAddress = ipString;
            appuserloginVm.LoginIp = ipComputer;
            appuserloginVm.LoginNameIp = nameComputer;
            appuserloginVm.LoginIp6Address = ip6Address;
            appuserloginVm.LoginLocalIp6Adress = localIp6;
            appuserloginVm.LoginMacIp = temIp6;
            appuserloginVm.StatusContent = statuscontent;
            appuserloginVm.CreateDate = DateTime.Now;
            appuserloginVm.CreateBy = username;

            var model = _appuserloginService.CreateAppUserLogin(appuserloginVm);
        }

    }
}