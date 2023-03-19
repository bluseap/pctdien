using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IChiTietThietKeService
    {
        Task<List<ChiTietThietKeViewModel>> Get_ChiTietThietKe_ByMaddk(string maddk);

        Task<bool> Update_ChiTietThietKe_ByMaddkMaVatTu(string MADDK, string MaVatTu, string KhoiLuong,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_ChiTietThietKe(string MADDK, string MaVatTu, DateTime updateDate, string updateBy);

        Task<bool> Create_ChiTietThietKe_ByMaddkMaVatTu(string MADDK, string MAVATTU, DateTime createDate, string createBy);

        Task<bool> Create_ChiTietThietKe_ByMaddkMauTK(string MADDK, string MauBocVatTuId, DateTime createDate, string createBy);
    }
}
