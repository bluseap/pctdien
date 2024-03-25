using NiTiErp.Application.Dapper.ViewModels.KyThuatDien;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.KyThuatDien
{
    public interface IKTDThayTheVatTuService
    {
        Task<KTDThayTheVatTuRequest> KTD_KTDThayTheVatTu_Get_ById(int ThayTheVatTuId);
        Task<KTDPhatTrienLuoiDienRequest> KTD_KTDPhatTrienLuoiDien_Get_ById(int PhatTrienLuoiDienId);
        Task<KTDNangCongSuatCayMoiRequest> KTD_KTDNangCongSuatCayMoi_Get_ById(int NangCongSuatCayMoiId);
        Task<KTDPhatTrienKhachHangRequest> KTD_KTDPhatTrienKhachHang_Get_ById(int PhatTrienKhachHangId);

        Task<List<KTDThayTheVatTuRequest>> KTD_KTDThayTheVatTu_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDPhatTrienLuoiDienRequest>> KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDNangCongSuatCayMoiRequest>> KTD_KTDNangCongSuatCayMoi_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDPhatTrienKhachHangRequest>> KTD_KTDPhatTrienKhachHang_Get_ByCorKy(string makhuvuc, int nam, int thang);
        
        Task<bool> KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm(string DmKhoiTao, string MaKhuVuc, int Nam, int Thang, string createBy);

        Task<bool> KTD_KTDThayTheVatTu_Update_ById(int ThayTheVatTuId, int SoLuongVatTu, int SoLuongLuyTuyen,
            string ChiTietVatTu, string ThietBiKhac, string UpdateBy);
        Task<bool> KTD_KTDPhatTrienLuoiDien_Update_ById(int PhatTrienLuoiDienId, int ChieuDaiPhatTrienLuoiDien, int ChieuDaiLuyTuyenPhatTrienLuoiDien, string UpdateBy);
        Task<bool> KTD_KTDNangCongSuatCayMoi_Update_ById(int NangCongSuatCayMoiId, int SoLuongNangCongSuat,
            int SoLuongSoLuongNangCongSuat, string CuTheNangCongSuat, int SoLuongLuyTuyenNangCongSuat, int CongSuatSoLuongLuyTuyenNangCongSuat, string UpdateBy);
        Task<bool> KTD_KTDPhatTrienKhachHang_Update_ById(int PhatTrienKhachHangId,
            int SoLuongPhatTrienKhachHang, int LuyTuyenPhatTrienKhachHang, string UpdateBy);
    }
}
