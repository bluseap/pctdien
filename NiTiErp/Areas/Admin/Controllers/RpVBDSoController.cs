using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpVBDSoController : Controller
    {
        private readonly IAuthorizationService _authorizationService;

        public RpVBDSoController(
            IAuthorizationService authorizationService            
            )
        {           
            _authorizationService = authorizationService;           
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Designer()
        {
            var result = _authorizationService.AuthorizeAsync(User, "VANBANDENSO", Operations.Create);
            if (result.Result.Succeeded == false)
                return new RedirectResult("/homevanban/Index");
            return View();
        }

    }
}
