using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface INhanVienService
    {
        Task<NhanVienViewModel> Get_NhanVien_ByMaNV(string manv, string corporationid);

        Task<List<NhanVienViewModel>> Get_NhanVien_ByMaKV(string corporationid);
    }
}
