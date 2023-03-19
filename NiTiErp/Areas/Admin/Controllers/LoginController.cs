using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Models.AccountViewModels;
using Microsoft.AspNetCore.Authorization;
using NiTiErp.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using NiTiErp.Utilities.Dtos;
using System.Net;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Formatting;
using Newtonsoft.Json.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class LoginController : Controller
    {        
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ILogger _logger;
       
        private readonly IConfiguration _configuration;

        private readonly IAppUserLoginService _appuserloginService;

        public LoginController(//IHttpClientFactory httpClientFactory, 
            UserManager<AppUser> userManager,SignInManager<AppUser> signInManager
            , ILogger<LoginController> logger, IAppUserLoginService appuserloginService
            , IConfiguration configuration)
        {          
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;

            _appuserloginService = appuserloginService;

            _configuration = configuration;           
        }
        public IActionResult Index()
        {          
            return View();
        } 

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Authen(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                // This doesn't count login failures towards account lockout
                // To enable password failures to trigger account lockout, set lockoutOnFailure: true
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);
                if (result.Succeeded)
                {
                    _logger.LogInformation("User logged in.");

                    CountUserLogin(model.Email);

                    return new OkObjectResult(new GenericResult(true));
                }
                if (result.IsLockedOut)
                {
                    _logger.LogWarning("User account locked out.");
                    return new ObjectResult(new GenericResult(false, "Tài khoản đã bị khoá"));
                }
                else
                {
                    return new ObjectResult(new GenericResult(false, "Đăng nhập sai"));
                }
            }

            // If we got this far, something failed, redisplay form
            return new ObjectResult(new GenericResult(false, model));
        }

        [HttpPost]
        [AllowAnonymous]        
        //[ValidateModel]
        public async Task<List<string>> LoginAPI(string UserName, string Password)
        {
            string baseAddress = _configuration.GetValue<string>("ApiUrl");            

            HttpClient httpClient = new HttpClient();
            // Obtain a JWT token.
            StringContent httpContent = new StringContent(@"{ ""UserName"": ""lenguyen"", ""Password"": ""190785"" }", Encoding.UTF8, "application/json");
            var response = await httpClient.PostAsync("http://113.161.213.123:86/api/appuser/login", httpContent);

            // Save the token for further requests.
            var tokenapi = await response.Content.ReadAsStringAsync();
            var response2 = JsonConvert.DeserializeObject<JObject>(tokenapi)["token"].ToString();

            //httpClient.BaseAddress = new Uri(baseAddress);
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", response2);

            //StringContent httpContent3 = new StringContent(@"{ ""userId"": ""lenguyen"" }", Encoding.UTF8, "application/json");
            var response3 = await httpClient.GetAsync("http://113.161.213.123:86/api/appuser/getpermissionbyuserid?userId=A25F3BA7-2B00-4F47-3558-08D5761BE9CC");

            var response4 = await response3.Content.ReadAsStringAsync();
            //List<Permissions> listDepartment = new List<Permissions>();
            //listDepartment = JsonConvert.DeserializeObject<List<Permissions>>(response4);

            List<string> objectapi = new List<string>();
            objectapi = JsonConvert.DeserializeObject<List<string>>(response4);

            return objectapi;            
        }

        public void CountUserLogin(string userNameId)
        {
            string ipString = HttpContext.Connection.RemoteIpAddress.ToString(); // LoginIpAddress

            IPHostEntry heserver = Dns.GetHostEntry(Dns.GetHostName());

            //var ip = heserver.AddressList[2].ToString();
            var nameComputer = heserver.HostName.ToString(); // LoginNameIp
            var localIp6 = heserver.AddressList[0] != null ? heserver.AddressList[0].ToString() : "";
            var temIp6 = heserver.AddressList[1] != null ? heserver.AddressList[1].ToString() : "";
            var ip6Address =  "";
            var ipComputer = ipString;//heserver.AddressList[3].ToString(); // LoginIp


            var appuserloginVm = new AppUserLoginViewModel();

            //var username = User.GetSpecificClaim("UserName");
            var username = userNameId;

            appuserloginVm.UserName = username;

            appuserloginVm.LoginIpAddress = ipString;
            appuserloginVm.LoginIp = ipComputer;
            appuserloginVm.LoginNameIp = nameComputer;
            appuserloginVm.LoginIp6Address = ip6Address;
            appuserloginVm.LoginLocalIp6Adress = localIp6;
            appuserloginVm.LoginMacIp = temIp6;

            appuserloginVm.CreateDate = DateTime.Now;
            appuserloginVm.CreateBy = username;

            var model = _appuserloginService.AppUserLoginAUD(appuserloginVm, "InAppUserLogin");

           // return new OkObjectResult(model);
        }

        //public IActionResult CountUserLogin(string userNameId)
        //{
        //    string ipString = HttpContext.Connection.RemoteIpAddress.ToString(); // LoginIpAddress

        //    IPHostEntry heserver = Dns.GetHostEntry(Dns.GetHostName());

        //    //var ip = heserver.AddressList[2].ToString();
        //    var nameComputer = heserver.HostName.ToString(); // LoginNameIp
        //    var localIp6 = heserver.AddressList[0].ToString();
        //    var temIp6 = heserver.AddressList[1].ToString();
        //    var ip6Address = heserver.AddressList[2].ToString();
        //    var ipComputer = heserver.AddressList[3].ToString(); // LoginIp


        //    var appuserloginVm = new AppUserLoginViewModel();

        //    //var username = User.GetSpecificClaim("UserName");
        //    var username = userNameId;

        //    appuserloginVm.UserName = username;

        //    appuserloginVm.LoginIpAddress = ipString;
        //    appuserloginVm.LoginIp = ipComputer;
        //    appuserloginVm.LoginNameIp = nameComputer;
        //    appuserloginVm.LoginIp6Address = ip6Address;
        //    appuserloginVm.LoginLocalIp6Adress = localIp6;
        //    appuserloginVm.LoginMacIp = temIp6;

        //    appuserloginVm.CreateDate = DateTime.Now;
        //    appuserloginVm.CreateBy = username;

        //    var model = _appuserloginService.AppUserLoginAUD(appuserloginVm, "InAppUserLogin");

        //    return new OkObjectResult(model);
        //}
        

    }
}