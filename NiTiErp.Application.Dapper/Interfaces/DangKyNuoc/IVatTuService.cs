using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IVatTuService
    {
        Task<List<VatTuViewModel>> Get_VatTu_ByKhoTimVatTu(string corporationid, string khodanhmuc, string timtenmavattu);
    }
}
