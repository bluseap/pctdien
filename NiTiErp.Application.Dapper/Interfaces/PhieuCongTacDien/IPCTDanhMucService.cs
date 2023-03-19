using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTDanhMucService
    {
        Task<PCTDanhMucViewModel> PCTD_Get_PCTDanhMuc_ById(int id);

        Task<PagedResult<PCTDanhMucViewModel>> PCTD_Get_PCTDanhMuc_AllPaging(string code, int page, int pageSize);

        Task<List<PCTDanhMucViewModel>> PCTD_Get_PCTDanhMuc_ByCode(string code);

        Task<bool> PCTD_Create_PCTDanhMuc(PCTDanhMucViewModel pctdanhmuc, DateTime createDate, string createBy);

        Task<bool> PCTD_Update_PCTDanhMuc(PCTDanhMucViewModel pctdanhmuc, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Delete_PCTDanhMuc(int Id, DateTime updateDate, string updateBy);
    }
}
