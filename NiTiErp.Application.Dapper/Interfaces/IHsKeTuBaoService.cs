using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsKeTuBaoService
    {
        Task<HsKeTuBaoViewModel> Get_HsChuyenKeTu_ById(int hschuyenketuid);

        Task<List<HsKeTuBaoViewModel>> Get_HsChuyenKeTu_ByHsKeTuBaoId(int ketubaoid);

        Task<HsKeTuBaoViewModel> Get_HsKeTuBao_ById(int ketubaoid);

        Task<List<HsKeTuBaoViewModel>> Get_HsKeTuBao_ByCor(string corporationid);

        Task<PagedResult<HsKeTuBaoViewModel>> Get_HsKeTuBao_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize);

        Task<bool> Create_HsKeTuBao(HsKeTuBaoViewModel ketubao, string chieudai, string chieucao, 
            DateTime createDate, string createBy);

        Task<bool> Update_HsKeTuBao(HsKeTuBaoViewModel ketubao, string chieudai, string chieucao,
            DateTime updateDate, string updateBy);

        Task<bool> Create_HsChuyenKeTu(HsKeTuBaoViewModel ketubao, DateTime createDate, string createBy);

        Task<bool> Update_HsChuyenKeTu(HsKeTuBaoViewModel ketubao, DateTime updateDate, string updateBy);
    }
}
