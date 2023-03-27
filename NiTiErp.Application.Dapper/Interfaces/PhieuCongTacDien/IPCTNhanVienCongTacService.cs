using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTNhanVienCongTacService
    {
        Task<PCTNhanVienCongTacViewModel> PCTD_Get_PCTNhanVienCongTac_ById(int id);

        Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByPCTDienIdInPCT(int pctdien);

        Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByPCTDienId(int pctdien);

        Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByCode(string code);

        Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByThayDoiNguoiDienId(int pctdien);

        Task<bool> PCTD_Create_PCTNhanVienCongTac(PCTNhanVienCongTacViewModel pctnhanviencongtac, DateTime createDate, string createBy);

        Task<bool> PCTD_Create_PCTNhanVienCongTac_ByIdThayDoi(PCTNhanVienCongTacViewModel pctnhanviencongtac, DateTime createDate, string createBy);

        Task<bool> PCTD_Update_PCTNhanVienCongTac_ByIdThayDoi(PCTNhanVienCongTacViewModel pctnhanviencongtac, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Delete_PCTNhanVienCongTac(int Id, DateTime updateDate, string updateBy);
    }
}
