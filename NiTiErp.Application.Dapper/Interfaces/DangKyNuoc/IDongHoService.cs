using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IDongHoService
    {
        Task<DongHoViewModel> Get_DongHo_ByMaDongHo(string madongho, string Corporation);

        Task<PagedResult<DongHoViewModel>> Get_DongHo_ByChuaSuDung(string khuvuc, string keyword,
            int page, int pageSize);
    }
}
