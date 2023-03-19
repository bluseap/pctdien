using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsChiTietBoHoSoService
    {
        Task<List<HsChiTietBoHoSoViewModel>> Get_HsChiTietBoHoSo_ByHsBoHoSoId(Int32 hsbohosoid);

        Task<bool> Create_HsChiTietBoHoSo(Int32 BoHoSoId, string CodeMa, string MaKhachHang,
            DateTime createDate, string createBy);

        Task<bool> Delete_HsChiTietBoHoSo(Int32 chitietbohosiId, string createBy, DateTime createDate);
    }
}
