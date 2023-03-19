using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTDiaDiemCongTacService
    {
        Task<PCTDiaDiemCongTacViewModel> PCTD_Get_PCTDiaDiemCongTac_ById(int Id);

        Task<List<PCTDiaDiemCongTacViewModel>> PCTD_Get_PCTDiaDiemCongTac_ByDienId(int pctdienid);

        Task<bool> PCTD_Create_PCTDiaDiemCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac, DateTime createDate, string createBy);

        Task<bool> PCTD_Update_PCTDiaDiemCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Delete_PCTDiaDiemCongTac(int Id, DateTime updateDate, string updateBy);
    }
}
