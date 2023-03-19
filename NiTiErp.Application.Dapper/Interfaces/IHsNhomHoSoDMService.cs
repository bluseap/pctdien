using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsNhomHoSoDMService
    {
        Task<HsNhomHoSoDMViewModel> Get_HsNhomHoSoDM_ById(int hsnhomhosodmid);

        Task<List<HsNhomHoSoDMViewModel>> Get_HsNhomHoSoDM_ByCor(string corporationid);

        Task<PagedResult<HsNhomHoSoDMViewModel>> Get_HsNhomHoSoDM_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize);

        Task<bool> Create_HsNhomHoSoDM(HsNhomHoSoDMViewModel nhomhs, DateTime createDate, string createBy);

        Task<bool> Update_HsNhomHoSoDM(HsNhomHoSoDMViewModel nhomhs, DateTime updateDate, string updateBy);
    }
}
