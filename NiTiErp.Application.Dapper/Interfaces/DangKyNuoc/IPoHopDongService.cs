using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IPoHopDongService
    {
        Task<PoHopDongViewModel> Get_HopDong_ByMaDon(string maddk);

        Task<bool> Create_HopDong(PoHopDongViewModel hopdong, DateTime createDate, string createBy);

        Task<bool> Update_HopDong(PoHopDongViewModel hopdong, DateTime updateDate, string updateBy);
    }
}
