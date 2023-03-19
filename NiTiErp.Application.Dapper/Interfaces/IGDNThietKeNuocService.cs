using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNThietKeNuocService
    {
        Task<GDNThietKeNuocViewModel> Get_GDNThietKeNuoc_ByGDNDMCCNuocId(Int32 id);

        Task<bool> CreateGDNThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime createDate, string createBy);

        Task<bool> CreateGDNThietKeNuocKetThucDD(GDNThietKeNuocViewModel gdntknuoc, DateTime createDate, string createBy);

        Task<bool> UpdateGDNThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy);

        Task<bool> UpdateKhaoSatThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy);

        Task<bool> UpKhaoSatThietKeNuocNoDuyet(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy);

        Task<bool> UpDuyetThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy);

    }
}
