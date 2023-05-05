using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Authorization;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpPCTDienInPCTController : BaseController
    {
        private readonly IAuthorizationService _authorizationService;

        private readonly IPCTDienService _pctdienService;

        public RpPCTDienInPCTController(
            IAuthorizationService authorizationService,
            IPCTDienService pctdienService
            )
        {
            _authorizationService = authorizationService;

            _pctdienService = pctdienService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> UpXacNhanDaCap(string username, int pctdienid)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var result = _authorizationService.AuthorizeAsync(User, "PCTDIENNHAP", Operations.Update);
                if (result.Result.Succeeded == false)
                {
                    return new ObjectResult(new GenericResult(false, "Bạn không đủ quyền cập nhật."));
                }

                DateTime CreateDate = DateTime.Now;
                string CreateBy = username;

                var model = await _pctdienService.PCTD_Update_PCTDien_ByIdXacNhanDaCap(username, pctdienid, CreateDate, CreateBy);
                return new OkObjectResult(model);
            }
        }

    }
}
