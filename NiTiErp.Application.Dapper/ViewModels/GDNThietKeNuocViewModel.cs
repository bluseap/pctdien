using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GDNThietKeNuocViewModel
    {
        public Int32 Id { get; set; }

        public Int32 GiayDeNghiDMCungCapNuocId { get; set; }


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


        public DateTime NgayLapKiemTra { get; set; }

        public Guid NhanVienLapKiemTraId { get; set; }

        public string TenNhanVienLapKiemTra { get; set; }

        //public string TenKhachHang { get; set; }

        public string DiaChiCuTru { get; set; }

        public string DiaChiLapDat { get; set; }

        public Guid NhanVienKiemTra1Id { get; set; }

        public string TenNhanVien1 { get; set; }

        public string ChucVu1 { get; set; }

        public Guid NhanVienKiemTra2Id { get; set; }

        public string TenNhanVien2 { get; set; }

        public string ChucVu2 { get; set; }

        public string TenDaiDienKH { get; set; }

        //public string DanhSoKhachHang { get; set; }

        public int ChiSoDongHo { get; set; }

        //public string MucDichSuDung { get; set; }

        public string TinhTrangDongHo { get; set; }

        public string TinhTrangOngNhanhTruocDongHo { get; set; }

        public string CacVanDeKetLuan { get; set; }

        public string DongHoId { get; set; }

        public string SoNo { get; set; }

        public string ChiNiemRacCo { get; set; }

        public string MaSoRacCoKimM1 { get; set; }

        public string MaSoRacCoKimM2 { get; set; }

        public string ChiNiemKiemDinh { get; set; }

        public string MaSoKiemDinhKimM1 { get; set; }

        public string MaSoKiemDinhKimM2 { get; set; }

        public string DongHoBinhThuong { get; set; }

        public string DongHoLapTrongNha { get; set; }

        public string KhoanCachLapNgoaiNha { get; set; }

        public string DongHoLapKhongNghieng { get; set; }

        public string NgoVaoDungChieu { get; set; }

        public string ChiSoDeDoc { get; set; }

        public string ChieuDaiOngNhanh { get; set; }

        public string KichCoOngNhanh { get; set; }

        public string LoaiOngNhanh { get; set; }

        public string TinhTrangOngNhanh { get; set; }

        public string LoaiVan { get; set; }

        public string TinhTrangVan { get; set; }

        public string CacVanDeKhac { get; set; }

        public string KetLuan { get; set; }

        public string GioYeuCauKHDenXN { get; set; }

        public DateTime NgayGioYeuCauKHDenXN { get; set; }

        public DateTime NgayNhapBBKiemTra { get; set; }

        public Guid NhanVienNhapBBKiemTra { get; set; }


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
