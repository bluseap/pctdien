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
    public class RpDsDvNuocController : Controller
    {
        private readonly IAuthorizationService _authorizationService;

        public RpDsDvNuocController(
            IAuthorizationService authorizationService
            )
        {
            _authorizationService = authorizationService;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
