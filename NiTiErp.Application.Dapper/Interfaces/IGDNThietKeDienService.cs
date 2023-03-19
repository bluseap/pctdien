using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGDNThietKeDienService
    {
        Task<GDNThietKeDienViewModel> Get_GDNThietKeDien_ByGDNDMCCDienId(Int32 id);

        Task<bool> CreateGDNThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime createDate, string createBy);

        Task<bool> CreateGDNThietKeDienKetThucDD(GDNThietKeDienViewModel gdntkdien, DateTime createDate, string createBy);

        Task<bool> UpdateGDNThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy);

        Task<bool> UpdateKhaoSatThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy);

        Task<bool> UpKhaoSatThietKeDienNoDuyet(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy);

        Task<bool> UpDuyetThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy);
    }
}
