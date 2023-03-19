using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IThayHopDongService
    {
        Task<ThayHopDongViewModel> Get_ThayHopDong_ByIdMakv(string thayhopdongid);

        Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_AllPaging(string khuvuc, string keyword, int page, int pageSize);

        Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_ByLoaiHopDongPaging(string khuvuc, string loaihopdong,
            string keyword, int page, int pageSize);

        Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_ByDsHopDongTheoPaging(string khuvuc, string dshopdongtheo,
            string keyword, int page, int pageSize);

        Task<bool> Create_ThayHopDong(ThayHopDongViewModel thayhopdong, DateTime createDate, string createBy);

        Task<bool> Update_ThayHopDong(ThayHopDongViewModel thayhopdong, DateTime updateDate, string updateBy);

    }
}
