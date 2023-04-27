using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTDienService
    {
        Task<PCTDienViewModel> PCTD_Get_PCTDien_ById(int id);

        Task<PagedResult<PCTDienViewModel>> PCTD_Get_PCTDien_AllTrangThai(string corporationid, string phongbandanhmucid,
            int trangthai, int page, int pageSize);

        Task<PagedResult<PCTDienViewModel>> PCTD_Get_PCTDien_AllPaging(string corporationid, string phongbandanhmucid,
            string keyword, int page, int pageSize);

        Task<bool> PCTD_Create_PCTDien(PCTDienViewModel pctdien, DateTime createDate, string createBy);

        Task<bool> PCTD_Update_PCTDien(PCTDienViewModel pctdien, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Update_PCTDien_ByIdChoPhepLamViec(PCTDienViewModel pctdien, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Update_PCTDien_ByIdKetThucCongViec(PCTDienViewModel pctdien, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Update_PCTDien_ByIdHuyCT(PCTDienViewModel pctdien, DateTime updateDate, string updateBy);

        Task<bool> PCTD_Update_PCTDien_ByIdXacNhanDaCap(string username, int pctdienid, DateTime updateDate, string updateBy);

    }
}
