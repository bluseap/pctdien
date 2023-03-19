using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface ILockStatusService
    {
        Task<LockStatusViewModel> Get_LockStatus_ByMaDPKyThay(string makhachhang, int thang, int nam);
    }
}
