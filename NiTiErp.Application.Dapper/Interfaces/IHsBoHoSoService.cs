using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsBoHoSoService
    {
        Task<HsBoHoSoViewModel> Get_HsBoHoSo_ById(int ketubaoid);

        Task<PagedResult<HsBoHoSoViewModel>> Get_HsBoHoSo_AllPaging(string corporationId, string phongdanhmucId,
            string phongdanhmucquanlyId, string keyword, int page, int pageSize);

        Task<bool> Create_HsBoHoSo(HsBoHoSoViewModel bohoso, DateTime createDate, string createBy);

        Task<bool> Update_HsBoHoSo(HsBoHoSoViewModel bohoso, DateTime updateDate, string updateBy);
    }
}
