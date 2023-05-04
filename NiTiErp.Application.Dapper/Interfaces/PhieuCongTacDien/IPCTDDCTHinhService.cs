using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTDDCTHinhService
    {
        Task<PCTDDCTHinhViewModel> PCTD_Get_PCTDDCTHinh_ById(int Id);

        Task<List<PCTDDCTHinhViewModel>> PCTD_Get_PCTDDCTHinh_ByDiaDiemCongTacId(int pctdiadiemcongtacid);

        Task<bool> PCTD_Create_PCTDDCTHinh(PCTDDCTHinhViewModel pctddcthinh, DateTime createDate, string createBy);

        //Task<bool> PCTD_Update_PCTDDCTHinh(PCTDDCTHinhViewModel pctddcthinh, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Delete_PCTDDCTHinh(int Id, DateTime updateDate, string updateBy);
    }
}
