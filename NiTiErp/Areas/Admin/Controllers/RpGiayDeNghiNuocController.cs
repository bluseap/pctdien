using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Authorization;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpGiayDeNghiNuocController : Controller
    {
        private readonly IAuthorizationService _authorizationService;

        public RpGiayDeNghiNuocController(
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
