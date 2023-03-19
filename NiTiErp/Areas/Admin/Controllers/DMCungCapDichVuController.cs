using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Authorization;
using NiTiErp.Extensions;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class DMCungCapDichVuController : BaseController
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly NiTiErp.Application.Interfaces.IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        private readonly IDMCungCapDichVuService _dmcungcapdichvuService;
       
        public DMCungCapDichVuController(IHostingEnvironment hostingEnvironment,
            NiTiErp.Application.Interfaces.IUserService userService,
            IAuthorizationService authorizationService,

            IDMCungCapDichVuService dmcungcapdichvuService            
            )
        {
            _hostingEnvironment = hostingEnvironment;
            _userService = userService;
            _authorizationService = authorizationService;

            _dmcungcapdichvuService = dmcungcapdichvuService;           
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult DMCungCapDichVu(int loaidichvuid)
        {
            // 1: Nuoc; 2: Dien
            var model = _dmcungcapdichvuService.Get_DMCungCapDichVu_ByLoaiDichVuId(loaidichvuid);
            return new OkObjectResult(model);
        }
        

    }
}
