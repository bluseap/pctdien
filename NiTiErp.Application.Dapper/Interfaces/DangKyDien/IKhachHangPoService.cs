using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.DangKyDien
{
    public interface IKhachHangPoService
    {
        Task<List<KhachHangPoViewModel>> Get_KhachHangPo_ByDieuKien(string KhuVuc, string DieuKien);

        Task<KhachHangPoViewModel> Get_KhachHangPo_ByMaKhachHang(string MaKhachHang);

        Task<PagedResult<KhachHangPoViewModel>> Get_KhachHangPo_AllPagingSttHs(string khuvuc, string keyword, int sttbohoso,
            int page, int pageSize);

        Task<bool> Update_KhachHangPo_BySTTBoHoSo(string MaKhachHang, int SoThuTu,
            DateTime updateDate, string updateBy);

        Task<PagedResult<KhachHangPoViewModel>> Get_KhachHangPo_AllPaging(string khuvuc, string phongto,
            string keyword, int page, int pageSize);
    }
}
