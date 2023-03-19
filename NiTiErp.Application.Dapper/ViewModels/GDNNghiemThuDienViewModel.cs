using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GDNNghiemThuDienViewModel
    {
        public Int32 Id { get; set; }

        public Int32 GiayDeNghiDMCungCapDienId { get; set; }

        public Guid NhanVienNghiemThu1Id { get; set; }

        public string TenNhanVien1 { get; set; }

        public Guid NhanVienNghiemThu2Id { get; set; }

        public string TenNhanVien2 { get; set; }

        public Guid NhanVienNghiemThu3Id { get; set; }

        public string TenNhanVien3 { get; set; }

        public string DongHoId { get; set; }

        public string SoNo { get; set; }

        public string DongDienDongHo { get; set; }

        public string DienTheDongHo { get; set; }

        public string SoTichLuyTrenDongHo { get; set; }

        public string HeSoNhanTrenHopSo { get; set; }

        public string ChiNiemKiemDinh { get; set; }

        public string MaSoKiemDinhKimM1 { get; set; }

        public string MaSoKiemDinhKimM2 { get; set; }

        public string ChiNiemHopDauDay { get; set; }

        public string NapDayHopDauDay { get; set; }

        public string DongHoDienChet { get; set; }

        public string BangGoNhua { get; set; }

        public string CapMuller { get; set; }

        public string TruPotele { get; set; }

        public string DauNoiCapDienDayNhanh { get; set; }

        public string CauDao { get; set; }

        public string ChieuCaoDienKe { get; set; }

        public string ViTriLapDongHoDien { get; set; }

        public string DaKyHopDongCUSDDienNam { get; set; }

        public string KhoanCachTuDayDenDongHo { get; set; }

        public string DoVongOngSu { get; set; }

        public string TongChieuDaiDay { get; set; }

        public string CauChiCa { get; set; }

        public string LoaiChiChay { get; set; }

        public string TruDoSuDung { get; set; }

        public string ChieuDaiVuotSong { get; set; }

        public string ChieuDaiVuotDuong { get; set; }

        public string ChieuCaoVuotSong { get; set; }

        public string ChieuCaoVuotDuong { get; set; }

        public string DayNhanhSuDungLoai { get; set; }

        public string TinhTrangDayNhanh { get; set; }

        public string SoLuongDayNhanh { get; set; }

        public string DauNoiGiuaDayNhanh { get; set; }

        public string SoLuongDauNoi { get; set; }

        public string QuanBangKeoDauNoi { get; set; }

        public string DayNhanhVuotMai { get; set; }

        public string KhoanCachDayNhanhVuotMai { get; set; }

        public string DayNhanhKeoChuyenHoTruoc { get; set; }

        public string ChieuDaiDayNhanhKeoChuyenTruoc { get; set; }

        public string DanhSoDayNhanhKeoChuyenTruoc { get; set; }

        public string DayNhanhKeoChuyenHoSau { get; set; }

        public string ChieuDaiDayNhanhKeoChuyenSau { get; set; }

        public string DanhSoDayNhanhKeoChuyenSau { get; set; }

        public DateTime NgayLapDayKeoChuyen { get; set; }

        public DateTime NgayNghiemThuKeoChuyen { get; set; }

        public string KetLuanChayThu { get; set; }

        public DateTime NgayLapBBNghiemThu { get; set; }

        public DateTime NgayNhapNghiemThu { get; set; }

        public bool IsTraVeGDN { get; set; }

        public string LyDoTraVeGDN { get; set; }

        public DateTime NgayTraVeGDN { get; set; }

        public bool IsTraVeThietKe { get; set; }

        public string LyDoTraVeThietKe { get; set; }

        public DateTime NgayTraVeThietKe { get; set; }

        public bool IsTraVeThiCong { get; set; }

        public string LyDoTraVeThiCong { get; set; }

        public DateTime NgayTraVeThiCong { get; set; }

        public bool IsTuChoiNghiemThu { get; set; }

        public DateTime NgayTuChoiNghiemThu { get; set; }

        public string GhiChuTuChoiNT { get; set; }

        public DateTime NgayDuyet { get; set; }

        public string TenNhanVienDuyet { get; set; }


        public string GhiChu { get; set; }

        public int Status { get; set; }

        public bool Active { get; set; }

        public int Stt { get; set; }

        public string CreateBy { get; set; }

        public DateTime CreateDate { get; set; }

        public string UpdateBy { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
