using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GDNThietKeDienViewModel
    {
        public Int32 Id { get; set; }

        public Int32 GiayDeNghiDMCungCapDienId { get; set; }


        public string TenKhachHang { get; set; }

        public string TenKhuVuc { get; set; }

        public string DiaChi { get; set; }

        public string SoDienThoai { get; set; }

        public string Email { get; set; }

        public string DiaChiMuaNuoc { get; set; }

        public string DanhSoKhachHang { get; set; }

        public string MucDichSuDung { get; set; }

        public int TTDeNghi { get; set; }

        public int TTThietKe { get; set; }

        public int TTChietTinh { get; set; }

        public int TTThiCong { get; set; }

        public int TTNghiemThu { get; set; }

        public int TTKiemTraKiemDinh { get; set; }

        public int TTXuLyKiemDinh { get; set; }


        public DateTime NgayLapBBKiemTra { get; set; }

        public Guid NhanVienLapBBKiemTra { get; set; }

        public string TenNhanVienLapBBKiemTra { get; set; }

        //public string TenKhachHang { get; set; }

        public Guid NhanVienKiemTra1Id { get; set; }

        public string TenNhanVien1 { get; set; }

        public string ChucVu1 { get; set; }

        public Guid NhanVienKiemTra2Id { get; set; }

        public string TenNhanVien2 { get; set; }

        public string ChucVu2 { get; set; }

        public string TenDaiDienKhachHang { get; set; }

        public string DiaChiCuTru { get; set; }

        public string DiaChiLapDat { get; set; }
        
        //public string DanhSoKhachHang { get; set; }

        public string SuDungQuaTramBienAp { get; set; }

        public string TruDienTramBienAp { get; set; }        

        public string DongHoPoId { get; set; }

        public string SoNo { get; set; }

        public string DongDienDongHo { get; set; }

        public string DienTheDongHo { get; set; }

        public string SoTichLuyTrenDongHo { get; set; }

        //public string MucDichSuDung { get; set; }

        public string HeSoNhanTrenHopSo { get; set; }

        public string ChiNiemKiemDinh { get; set; }

        public string MaSoKiemDinhKimM1 { get; set; }

        public string MaSoKiemDinhKimM2 { get; set; }

        public string ChiNiemHopDauDay { get; set; }

        public string DongHoDienChet { get; set; }

        public string NapDayHopDauDay { get; set; }

        public string LyDoNapDayHopDauDay { get; set; }

        public string BangGoNhua { get; set; }

        public string CapDongHoDienDungQuyDinh { get; set; }

        public string TruPoteleDungQuyDinh { get; set; }

        public string ChieuCaoDienKe { get; set; }

        public string DaKyHopDongCUSDDienNam { get; set; }

        public string DoiTuongKiemTraThucTe { get; set; }

        public string KhoanCachTuDayDenDongHo { get; set; }

        public string CoTruDoDungTieuChuan { get; set; }

        public string DayNhanhDuplex { get; set; }

        public string TinhTrangDayNhanhKH { get; set; }

        public int SoHoPhuCauChuyenSauDongHo { get; set; }

        public string HoTenCauChuyenSauDongHo { get; set; }

        public string TinhTrangThucTeChuyenSauDongHo { get; set; }

        public DateTime NgayKiemNghiCatChuyenSauDongHo { get; set; }

        public string CacTruongHopKhac { get; set; }

        public string KetLuanBBKiemTra { get; set; }

        public DateTime NgayNhapBBKiemTra { get; set; }       

        public Guid NhanVienNhapBBKiemTra { get; set; }

        public DateTime NgayGioYeuCauKHDenXN { get; set; }

        public string LyDoThietKe { get; set; }

        public DateTime NgayLapThietKe { get; set; }

        public Guid NhanVienLapThietKeId { get; set; }

        public string TenNhanVienLapThietKe { get; set; }

        public string NgayNhapThietKe { get; set; }

        public Guid NhanVienNhapThietKeId { get; set; }

        public string TenNhanVienNhapThietKe { get; set; }

        public string TenKhachHangBenPhai { get; set; }

        public string DanhSoBenPhai { get; set; }

        public string TenKhachHangBenTrai { get; set; }

        public string DanhSoBenTrai { get; set; }

        public string KeoChuyenTuTruPhiaTruocTen { get; set; }

        public string DanhSoKeoChuyenPhiaTruoc { get; set; }

        public string KeoChuyenTuTruPhiaSauTen { get; set; }

        public string DanhSoKeoChuyenPhiaSau { get; set; }

        public string PathHinhThietKe1 { get; set; }

        public string PathHinhThietKe2 { get; set; }

        public decimal TongTienThietKe { get; set; }

        public string DiaChiThietKe { get; set; }

        public string DuongHemThietKe { get; set; }

        public string PhuongThietKe { get; set; }

        public string SoDienThoaiThietKe { get; set; }

        public string ViTriDongHoThietKe { get; set; }

        public string DanhSoThietKe { get; set; }

        public string MauThietKeId { get; set; }

        public decimal TongTienVatTu { get; set; }

        public decimal TongTienCong { get; set; }

        public decimal TongTienVanChuyen { get; set; }

        public decimal TongTien { get; set; }

        public bool IsTraVeGDN { get; set; }

        public string LyDoTraVeGDN { get; set; }

        public DateTime NgayTraVeGDN { get; set; }


        public bool IsTuChoiThietKe { get; set; }

        public DateTime NgayTuChoiThietKe { get; set; }

        public string GhiChuTuChoiTK { get; set; }


        public DateTime NgayDuyetTK { get; set; }

        public string TenNhanVienDuyetTK { get; set; }

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
