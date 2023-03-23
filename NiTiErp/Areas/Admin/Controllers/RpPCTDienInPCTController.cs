using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpPCTDienInPCTController : Controller
    {
        private readonly IAuthorizationService _authorizationService;

        public RpPCTDienInPCTController(
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
