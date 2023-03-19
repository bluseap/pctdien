﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.Application.Interfaces;
using NiTiErp.Application.ViewModels.System;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Authorization;
using NiTiErp.Authorization;
using NiTiErp.Extensions;

namespace NiTiErp.Areas.Admin.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IAuthorizationService _authorizationService;


        public UserController(IUserService userService, IAuthorizationService authorizationService)
        {
            _userService = userService;
            _authorizationService = authorizationService;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "USER", Operations.Read);
            if (result.Succeeded == false)
                return new RedirectResult("/Admin/Login/Index");

            return View();
        }

        public IActionResult GetAll()
        {
            var model = _userService.GetAllAsync();

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(string id)
        {
            var model = await _userService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetByUserName2Id(string username)
        {
            var model = await _userService.GetByUserName2Id(username);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int page, int pageSize)
        {
            var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> GetUserName(string username)
        {
            var model = await _userService.GetUserName(username);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPagingCor(string keyword, int page, int pageSize)
        {
            var email = User.GetSpecificClaim("Email");

            var id = User.GetSpecificClaim("UserId");
            var username = User.GetSpecificClaim("UserName");
            var corporationId = User.GetSpecificClaim("CorporationId");

            if (email.Equals("khoinguyenaglx@gmail.com"))
            {
                var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var model = _userService.GetAllPagingAsyncCor(keyword, page, pageSize, corporationId);
                return new OkObjectResult(model);
            }        
        }

        [HttpGet]
        public IActionResult GetAllPagingKhuVucCor(string corporationId, string keyword, int page, int pageSize)
        {
            var email = User.GetSpecificClaim("Email");

            var id = User.GetSpecificClaim("UserId");
            var username = User.GetSpecificClaim("UserName");
            //var corporationId = User.GetSpecificClaim("CorporationId");

            if (email.Equals("khoinguyenaglx@gmail.com"))
            {
                var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
                return new OkObjectResult(model);
            }
            else if (corporationId == "%")
            {
                var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var model = _userService.GetAllPagingAsyncCor(keyword, page, pageSize, corporationId);
                return new OkObjectResult(model);
            }
        }

        [HttpGet]
        public IActionResult GetAllPagingKhuVucCorPhong(string corporationId, string phongId, string keyword, int page, int pageSize)
        {
            var email = User.GetSpecificClaim("Email");

            var id = User.GetSpecificClaim("UserId");
            var username = User.GetSpecificClaim("UserName");
            //var corporationId = User.GetSpecificClaim("CorporationId");

            if (email.Equals("khoinguyenaglx@gmail.com"))
            {
                var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
                return new OkObjectResult(model);
            }
            else if (corporationId == "%")
            {
                var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
                return new OkObjectResult(model);
            }
            else
            {
                var model = _userService.GetAllPagingAsyncCorPhong(keyword, page, pageSize, corporationId, phongId);
                return new OkObjectResult(model);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(AppUserViewModel userVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                var username = User.GetSpecificClaim("UserName");    

                if (userVm.Id == null)
                {
                    userVm.UserCreated = username;
                    userVm.DateCreated = DateTime.Now;

                    await _userService.AddAsync(userVm);
                }
                else
                {
                    userVm.UserModified = username;
                    userVm.DateModified = DateTime.Now;

                    await _userService.UpdateAsync(userVm);
                }
                return new OkObjectResult(userVm);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveEditPass(AppUserViewModel userVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                if (userVm.Id != null)
                {
                    await _userService.EditPassAsync(userVm);
                }
                
                return new OkObjectResult(userVm);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            else
            {
                await _userService.DeleteAsync(id);

                return new OkObjectResult(id);
            }
        }
    }
}