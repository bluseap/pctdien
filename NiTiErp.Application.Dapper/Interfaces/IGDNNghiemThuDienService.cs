using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNNghiemThuDienService
    {
        Task<GDNNghiemThuDienViewModel> Get_GDNNghiemThuDien_ByGDNDMCCDienId(Int32 id);

        Task<bool> CreateGDNNghiemThuDien(GDNNghiemThuDienViewModel gdnntdien, DateTime createDate, string createBy);

        Task<bool> UpGDNNghiemThuDien(GDNNghiemThuDienViewModel gdnntdien, DateTime updateDate, string updateBy);
    }
}
