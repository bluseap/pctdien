﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.WebErp.Areas.Client.Controllers.Components
{
    public class ClientCategoryViewComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View();
        }

        //private IProductCategoryService _productCategoryService;
        //private IMemoryCache _memoryCache;

        //public CategoryMenuViewComponent(IProductCategoryService productCategoryService,IMemoryCache memoryCache)
        //{
        //    _productCategoryService = productCategoryService;
        //    _memoryCache = memoryCache;
        //}
        //public async Task<IViewComponentResult> InvokeAsync()
        //{
        //    var categories = _memoryCache.GetOrCreate(CacheKeys.ProductCategories, entry => {
        //        entry.SlidingExpiration = TimeSpan.FromHours(2);
        //        return _productCategoryService.GetAll();
        //    });
            
        //    return View(categories);
        //}

    }
}
