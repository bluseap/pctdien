﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NiTiErp.Application.Interfaces;
using NiTiErp.Application.ViewModels.System;
using NiTiErp.Data.Entities;
using NiTiErp.Data.IRepositories;
using NiTiErp.Infrastructure.Interfaces;
using NiTiErp.Utilities.Dtos;

namespace NiTiErp.Application.Implementation
{
    public class RoleService : IRoleService
    {
        private RoleManager<AppRole> _roleManager;
        private IFunctionRepository _functionRepository;
        private IPermissionRepository _permissionRepository;
        private IUnitOfWork _unitOfWork;
        public RoleService(RoleManager<AppRole> roleManager, IUnitOfWork unitOfWork,
         IFunctionRepository functionRepository, IPermissionRepository permissionRepository)
        {
            _unitOfWork = unitOfWork;
            _roleManager = roleManager;
            _functionRepository = functionRepository;
            _permissionRepository = permissionRepository;
        }
        public async Task<bool> AddAsync(AppRoleViewModel roleVm)
        {
            var role = new AppRole()
            {
                Name = roleVm.Name,
                Description = roleVm.Description,
                CorporationId = roleVm.CorporationId
            };
            var result = await _roleManager.CreateAsync(role);
            return result.Succeeded;
        }

        public Task<bool> CheckPermission(string functionId, string action, string[] roles)
        {
            var functions = _functionRepository.FindAll();
            var permissions = _permissionRepository.FindAll();
            var query = from f in functions
                        join p in permissions on f.Id equals p.FunctionId
                        join r in _roleManager.Roles on p.RoleId equals r.Id
                        where roles.Contains(r.Name) && f.Id == functionId
                        && ((p.CanCreate && action == "Create")
                        || (p.CanUpdate && action == "Update")
                        || (p.CanDelete && action == "Delete")
                        || (p.CanRead && action == "Read"))
                        select p;
            return query.AnyAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            await _roleManager.DeleteAsync(role);
        }

        public async Task<List<AppRoleViewModel>> GetAllAsync()
        {
            return await _roleManager.Roles.ProjectTo<AppRoleViewModel>().ToListAsync();
        }

        public async Task<List<AppRoleViewModel>> GetAllKhuVucAsync(string corporationId)
        {
            if (corporationId == "%")
            {
                return await _roleManager.Roles.ProjectTo<AppRoleViewModel>().ToListAsync();
            }
            else
            {
                return await _roleManager.Roles.Where(p => p.CorporationId.Equals(corporationId)).ProjectTo<AppRoleViewModel>().ToListAsync();
            }
        }

        public PagedResult<AppRoleViewModel> GetAllPagingAsync(string keyword, int page, int pageSize)
        {
            var query = _roleManager.Roles;
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword)
                || x.Description.Contains(keyword));

            int totalRow = query.Count();
            query = query.Skip((page - 1) * pageSize)
               .Take(pageSize);

            var data = query.ProjectTo<AppRoleViewModel>().ToList();
            var paginationSet = new PagedResult<AppRoleViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };

            return paginationSet;
        }

        public PagedResult<AppRoleViewModel> GetAllKhuVucPagingAsync(string corporationId, string keyword, int page, int pageSize)
        {
            if (corporationId == "%")
            {
                var query = _roleManager.Roles;
                if (!string.IsNullOrEmpty(keyword))
                    query = query.Where(x => x.Name.Contains(keyword)
                    || x.Description.Contains(keyword));

                int totalRow = query.Count();
                query = query.Skip((page - 1) * pageSize)
                   .Take(pageSize);

                var data = query.ProjectTo<AppRoleViewModel>().ToList();
                var paginationSet = new PagedResult<AppRoleViewModel>()
                {
                    Results = data,
                    CurrentPage = page,
                    RowCount = totalRow,
                    PageSize = pageSize
                };
                return paginationSet;
            }
            else
            {
                var query = _roleManager.Roles.Where(x => x.CorporationId.Equals(corporationId));
                if (!string.IsNullOrEmpty(keyword))
                    query = query.Where(x => x.Name.Contains(keyword)
                    || x.Description.Contains(keyword));

                int totalRow = query.Count();
                query = query.Skip((page - 1) * pageSize)
                   .Take(pageSize);

                var data = query.ProjectTo<AppRoleViewModel>().ToList();
                var paginationSet = new PagedResult<AppRoleViewModel>()
                {
                    Results = data,
                    CurrentPage = page,
                    RowCount = totalRow,
                    PageSize = pageSize
                };
                return paginationSet;
            }            
        }

        public async Task<AppRoleViewModel> GetById(Guid id)
        {
            var role = await _roleManager.FindByIdAsync(id.ToString());
            return Mapper.Map<AppRole, AppRoleViewModel>(role);
        }

        public List<PermissionViewModel> GetListFunctionWithRole(Guid roleId)
        {
            var functions = _functionRepository.FindAll();
            var permissions = _permissionRepository.FindAll();

            var query = from f in functions
                        join p in permissions on f.Id equals p.FunctionId into fp
                        from p in fp.DefaultIfEmpty()
                        where p != null && p.RoleId == roleId
                        select new PermissionViewModel()
                        {
                            RoleId = roleId,
                            FunctionId = f.Id,
                            CanCreate = p != null ? p.CanCreate : false,
                            CanDelete = p != null ? p.CanDelete : false,
                            CanRead = p != null ? p.CanRead : false,
                            CanUpdate = p != null ? p.CanUpdate : false
                        };            
            return query.ToList();
        }

        public void SavePermission(List<PermissionViewModel> permissionVms, Guid roleId)
        {
            var permissions = Mapper.Map<List<PermissionViewModel>, List<Permission>>(permissionVms);
            var oldPermission = _permissionRepository.FindAll().Where(x => x.RoleId == roleId).ToList();
            if (oldPermission.Count > 0)
            {
                _permissionRepository.RemoveMultiple(oldPermission);
            }
            foreach (var permission in permissions)
            {
                _permissionRepository.Add(permission);
            }
            _unitOfWork.Commit();
        }

        public async Task UpdateAsync(AppRoleViewModel roleVm)
        {
            var role = await _roleManager.FindByIdAsync(roleVm.Id.ToString());
            role.Description = roleVm.Description;
            role.Name = roleVm.Name;

            role.CorporationId = roleVm.CorporationId;

            await _roleManager.UpdateAsync(role);
        }
    }
}
