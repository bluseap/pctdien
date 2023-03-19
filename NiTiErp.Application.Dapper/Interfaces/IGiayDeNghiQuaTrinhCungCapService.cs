using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGiayDeNghiQuaTrinhCungCapService
    {

        Task<PagedResult<GiayDeNghiQuaTrinhCungCapViewModel>> Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc(bool isNuoc, Int32 gdnDMCCNuocId,
            Int32 gdnDMCCDienId, int page, int pageSize);

    }
}
