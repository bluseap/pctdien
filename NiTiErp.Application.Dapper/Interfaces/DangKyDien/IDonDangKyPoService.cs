using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyDien
{
    public interface IDonDangKyPoService
    {
        Task<DonDangKyPoViewModel> Get_DonDangKyPo_ByMaDon(string maddk);

        Task<PagedResult<DonDangKyPoViewModel>> Get_DonDangKyPo_AllPaging(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<List<DonDangKyPoViewModel>> Get_DonDangKyPo_ByLichSuDDKPo(string maddkPo);

        Task<bool> Create_DonDangKyPo(DonDangKyPoViewModel dangky, DateTime createDate, string createBy);

        Task<bool> Update_DonDangKyPo(DonDangKyPoViewModel dangky, DateTime createDate, string createBy);

        Task<bool> Update_DonDangKyPo_ByXuLyDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy);

        Task<bool> Update_DonDangKyPo_ByTuChoiDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy);

        Task<bool> Update_DonDangKyPo_ByPhucHoiTuChoiDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy);
    }
}
