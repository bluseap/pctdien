using System;
using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;
using NiTiErp.Utilities.Dtos;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITrinhDoService
    {
        Task<PagedResult<TrinhDoViewModel>> GetAllTrinhDoPaging(string corporationId, string phongId, string keyword, int page, int pageSize,
            string hosoId, string hosoId2, string hosoId3, string trinhdoId, string parameters);       

        Task<Boolean> TrinhDoAUD(TrinhDoViewModel trinhdo, string parameters);

        Task<bool> Create_TrinhDo_ById(TrinhDoViewModel trinhdo, DateTime updateDate, string updateBy);

        Task<bool> Update_TrinhDo_ById(TrinhDoViewModel trinhdo, DateTime updateDate, string updateBy);

        Task<bool> Delete_TrinhDo_ById(TrinhDoViewModel trinhdo, DateTime updateDate, string updateBy);
    }
}
