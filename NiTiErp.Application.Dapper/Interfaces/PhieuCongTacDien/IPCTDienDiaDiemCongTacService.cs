using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTDienDiaDiemCongTacService
    {
        Task<PCTDienDiaDiemCongTacViewModel> PCTD_Get_PCTDienDiaDiemCongTac_ById(int Id);

        Task<List<PCTDienDiaDiemCongTacViewModel>> PCTD_Get_PCTDienDiaDiemCongTac_ByCode(string code);

        Task<List<PCTDienDiaDiemCongTacViewModel>> PCTD_Get_PCTDienDiaDiemCongTac_ByDienId(int pctdienid);

        Task<bool> PCTD_Create_PCTDienDiaDiemCongTac(PCTDienDiaDiemCongTacViewModel pctdiendiadiemcongtac, DateTime createDate, string createBy);

        Task<bool> PCTD_Delete_PCTDienDiaDiemCongTac(int Id, DateTime updateDate, string updateBy);
    }
}
