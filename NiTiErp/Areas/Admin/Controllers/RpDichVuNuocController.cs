using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Authorization;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpDichVuNuocController : Controller
    {
        private readonly IAuthorizationService _authorizationService;

        public RpDichVuNuocController(
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
