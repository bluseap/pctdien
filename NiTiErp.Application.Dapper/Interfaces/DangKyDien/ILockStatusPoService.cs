using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyDien
{
    public interface ILockStatusPoService
    {
        Task<LockStatusPoViewModel> Get_LockStatusPo_ByMaDPPoKyThay(string makhachhangpo, int thang, int nam);
    }
}
