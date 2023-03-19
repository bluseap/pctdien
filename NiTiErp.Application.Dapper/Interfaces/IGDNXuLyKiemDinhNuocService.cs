using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNXuLyKiemDinhNuocService
    {
        Task<GDNXuLyKiemDinhNuocViewModel> Get_GDNXuLyKiemDinhNuoc_ByGDNDMCCNuocId(Int32 id);

        Task<bool> CreateGDNXuLyKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime createDate, string createBy);
        
        Task<bool> UpdateGDNXuLyKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpdateGDNXuLyKiemDinhNuocBBTT(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpdateGDNXuLyKiemDinhNuocBBTTUp(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy);

        Task<bool> UpKetThucKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy);

    }
}
