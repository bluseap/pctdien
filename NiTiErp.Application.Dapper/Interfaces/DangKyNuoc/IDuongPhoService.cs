using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IDuongPhoService
    {
        Task<List<DuongPhoViewModel>> Get_DuongPho_ByCor(string corporationId);
    }
}
