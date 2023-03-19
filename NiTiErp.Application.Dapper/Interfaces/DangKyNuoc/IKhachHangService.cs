using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IKhachHangService
    {
        Task<List<KhachHangViewModel>> Get_KhachHang_ByDieuKien(string KhuVuc, string DieuKien);

        Task<KhachHangViewModel> Get_KhachHang_ByMaKhachHang(string MaKhachHang);

        Task<PagedResult<KhachHangViewModel>> Get_KhachHang_AllPaging(string khuvuc, string dieukien, string keyword,
            int page, int pageSize);

        Task<PagedResult<KhachHangViewModel>> Get_KhachHang_AllPagingSttHs(string khuvuc, string keyword, int sttbohoso,
            int page, int pageSize);

        Task<bool> Update_KhachHang_BySTTBoHoSo(string MaKhachHang, int SoThuTu,
            DateTime updateDate, string updateBy);
    }
}

