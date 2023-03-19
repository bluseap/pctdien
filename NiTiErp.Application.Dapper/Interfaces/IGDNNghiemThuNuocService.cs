using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNNghiemThuNuocService
    {
        Task<GDNNghiemThuNuocViewModel> Get_GDNNghiemThuNuoc_ByGDNDMCCNuocId(Int32 id);

        Task<bool> CreateGDNNghiemThuNuoc(GDNNghiemThuNuocViewModel gdnntnuoc, DateTime createDate, string createBy);

        Task<bool> UpGDNNghiemThuNuoc(GDNNghiemThuNuocViewModel gdnntnuoc, DateTime updateDate, string updateBy);
    }
}
