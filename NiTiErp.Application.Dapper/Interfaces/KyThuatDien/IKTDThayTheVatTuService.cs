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
        Task<KTDXuLyKhacRequest> KTD_KTDXuLyKhac_Get_ById(int XuLyKhacId);
        Task<KTDDuyTuBaoDuongRequest> KTD_KTDDuyTuBaoDuong_Get_ById(int DuyTuBaoDuongId);
        Task<KTDCaiTaoSuaChuaRequest> KTD_KTDCaiTaoSuaChua_Get_ById(int CaiTaoSuaChuaId);


        Task<List<KTDThayTheVatTuRequest>> KTD_KTDThayTheVatTu_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDPhatTrienLuoiDienRequest>> KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDNangCongSuatCayMoiRequest>> KTD_KTDNangCongSuatCayMoi_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDPhatTrienKhachHangRequest>> KTD_KTDPhatTrienKhachHang_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDXuLyKhacRequest>> KTD_KTDXuLyKhac_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDDuyTuBaoDuongRequest>> KTD_KTDDuyTuBaoDuong_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDCaiTaoSuaChuaRequest>> KTD_KTDCaiTaoSuaChua_Get_ByCorKy(string makhuvuc, int nam, int thang);

        Task<bool> KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm(string DmKhoiTao, string MaKhuVuc, int Nam, int Thang, string createBy);

        Task<bool> KTD_KTDThayTheVatTu_Update_ById(int ThayTheVatTuId, int SoLuongVatTu, int SoLuongLuyTuyen,
            string ChiTietVatTu, string ThietBiKhac, string UpdateBy);
        Task<bool> KTD_KTDPhatTrienLuoiDien_Update_ById(int PhatTrienLuoiDienId, int ChieuDaiPhatTrienLuoiDien, int ChieuDaiLuyTuyenPhatTrienLuoiDien, string UpdateBy);
        Task<bool> KTD_KTDNangCongSuatCayMoi_Update_ById(int NangCongSuatCayMoiId, int SoLuongNangCongSuat,
            int SoLuongSoLuongNangCongSuat, string CuTheNangCongSuat, int SoLuongLuyTuyenNangCongSuat, int CongSuatSoLuongLuyTuyenNangCongSuat, string UpdateBy);
        Task<bool> KTD_KTDPhatTrienKhachHang_Update_ById(int PhatTrienKhachHangId,
            int SoLuongPhatTrienKhachHang, int LuyTuyenPhatTrienKhachHang, string UpdateBy);
        Task<bool> KTD_KTDXuLyKhac_Update_ById(int XuLyKhacId, string NoiDungXuLyKhac,
            string UpdateBy);
        Task<bool> KTD_KTDDuyTuBaoDuong_Update_ById(int DuyTuBaoDuongId,
            int SoLuongDuyTuBaoDuong, string CuTheDuyTuBaoDuong, int SoLuongLuyTuyenDuyTuBaoDuong, string UpdateBy);
        Task<bool> KTD_KTDCaiTaoSuaChua_Update_ById(KTDCaiTaoSuaChuaRequest caitaosuachua, string UpdateBy);

    }
}
