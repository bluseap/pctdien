﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace NiTiAPI.WebErp.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class RpDSTheoNgayLive : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
