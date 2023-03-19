using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IThiCongService
    {
        Task<ThiCongViewModel> Get_ThiCong_ByMaDon(string maddk);

        Task<bool> Create_ThiCong(ThiCongViewModel thicong, DateTime createDate, string createBy);

        Task<bool> Update_ThiCong(ThiCongViewModel thicong, DateTime updateDate, string updateBy); 

        Task<bool> Update_ThiCong_BySoNoDH(ThiCongViewModel thicong, DateTime updateDate, string updateBy);

        Task<bool> Update_ThiCong_BySuaSoNoDH(ThiCongViewModel thicong, DateTime updateDate, string updateBy);

        Task<bool> Update_ThiCong_ByTraVeTK(ThiCongViewModel thicong, DateTime updateDate, string updateBy);
    }
}
