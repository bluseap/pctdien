using System;
using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;
using NiTiErp.Utilities.Dtos;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IVanBanNhomXuLyService
    {
        Task<Boolean> VanBanNhomXuLyAUD(VanBanNhomXuLyViewModel vanbancoquan, string parameters);

        Task<PagedResult<VanBanNhomXuLyViewModel>> GetAllVanBanNhomXuLyPaging(string tennhom, Guid hosonhanvienId,
            string keyword, int page, int pageSize, int vanbannhomxulyid, string ghichu, string parameters);

        Task<List<VanBanNhomXuLyViewModel>> VanBanNhomXuLyGetList(string tennhom, Guid hosonhanvienId,
            string keyword,  int vanbannhomxulyid, string ghichu, string parameters);

        Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomXuLy_ByCorCodeNhomXL(string corporationid, string codenhomxuly);

        Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomNhanVien_ByCorCodeNhomXL(string corporationid, string codenhomxuly);

        Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomNhanVien_ByNhomXuLyId(int nhomxulyid);

        Task<bool> Create_VanBanNhomXuLy_ByCorCode(VanBanNhomXuLyViewModel nhomxuly, DateTime createDate, string createBy);

        Task<PagedResult<VanBanNhomXuLyViewModel>> Get_VanBanNhomXuLy_AllPaging(string corporationId,
            string keyword, int page, int pageSize);

        Task<VanBanNhomXuLyViewModel> Get_VanBanNhomXuLy_ById(int id);

        Task<bool> Update_VanBanNhomXuLy_ById(VanBanNhomXuLyViewModel nhomxuly, DateTime updateDate, string updateBy);

        Task<bool> Delete_VanBanNhomNhanVien(int nhomxulyId, Guid hosonhanvienId, DateTime updateDate, string updateBy);

        Task<bool> Create_VanBanNhomNhanVien(int nhomxulyid, Guid hosonhanvienId, DateTime createDate, string createBy);

    }
}
