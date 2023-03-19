using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyDien
{
    public interface IMDSDPOService
    {
        Task<List<MDSDPOViewModel>> Get_MDSDPO_ByAll();
    }
}
