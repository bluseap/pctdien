using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IPoDMDieuKienService
    {
        Task<List<PoDMDieuKienViewModel>> Get_PoDMDieuKien_ByCode(string code);
    }
}
