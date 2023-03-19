using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNThiCongDienService
    {
        Task<GDNThiCongDienViewModel> Get_GDNThiCongDien_ByGDNDMCCDienId(Int32 id);

        Task<bool> CreateGDNThiCongDien(GDNThiCongDienViewModel gdntcdien, DateTime createDate, string createBy);

        Task<bool> UpGDNThiCongDien(GDNThiCongDienViewModel gdntcdien, DateTime updateDate, string updateBy);

    }
}
