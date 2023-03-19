using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyDien
{
    public interface IThayHopDongPoService
    {
        Task<ThayHopDongPoViewModel> Get_ThayHopDongPo_ByIdMakvPo(string thayhopdongpoid);

        Task<PagedResult<ThayHopDongPoViewModel>> Get_ThayHopDongPo_AllPaging(string khuvuc, string keyword, int page, int pageSize);

        Task<PagedResult<ThayHopDongPoViewModel>> Get_ThayHopDongPo_ByLoaiHopDongPaging(string khuvuc, string loaihopdong,
            string keyword, int page, int pageSize);

        Task<PagedResult<ThayHopDongPoViewModel>> Get_ThayHopDongPo_ByDsHopDongTheoPaging(string khuvuc, string dshopdongtheo,
            string keyword, int page, int pageSize);

        Task<bool> Create_ThayHopDongPo(ThayHopDongPoViewModel thayhopdong, DateTime createDate, string createBy);

        Task<bool> Update_ThayHopDongPo(ThayHopDongPoViewModel thayhopdong, DateTime updateDate, string updateBy);

    }
}
