using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTNhanVienCongTacService
    {       
        Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByCode(string code);

        Task<bool> PCTD_Create_PCTNhanVienCongTac(PCTNhanVienCongTacViewModel pctnhanviencongtac, DateTime createDate, string createBy);

        Task<bool> PCTD_Delete_PCTNhanVienCongTac(int Id, DateTime updateDate, string updateBy);
    }
}
