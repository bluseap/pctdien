using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNXuLyKiemDinhDienService
    {
        Task<GDNXuLyKiemDinhDienViewModel> Get_GDNXuLyKiemDinhDien_ByGDNDMCCDienId(Int32 id);

        Task<bool> CreateGDNXuLyKiemDinhDien(GDNXuLyKiemDinhDienViewModel xlkdnuoc, DateTime createDate, string createBy);

        Task<bool> UpdateGDNXuLyKiemDinhDien(GDNXuLyKiemDinhDienViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpdateGDNXuLyKiemDinhDienBBTT(GDNXuLyKiemDinhDienViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpdateGDNXuLyKiemDinhDienBBTTUp(GDNXuLyKiemDinhDienViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpKetThucKiemDinhDien(GDNXuLyKiemDinhDienViewModel xlkdnuoc, DateTime updateDate, string updateBy);
    }
}
