using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNThiCongNuocService
    {
        Task<GDNThiCongNuocViewModel> Get_GDNThiCongNuoc_ByGDNDMCCNuocId(Int32 id);

        Task<bool> CreateGDNThiCongNuoc(GDNThiCongNuocViewModel gdntcnuoc, DateTime createDate, string createBy);

        Task<bool> UpGDNThiCongNuoc(GDNThiCongNuocViewModel gdntcnuoc, DateTime updateDate, string updateBy);

    }
}
