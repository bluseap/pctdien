﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace NiTiAPI.WebErp.Areas.CNews.Controllers
{
    public class ContactController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}