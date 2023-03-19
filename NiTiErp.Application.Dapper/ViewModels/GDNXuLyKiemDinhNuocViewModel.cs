using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GDNXuLyKiemDinhNuocViewModel
    {
        public int Id { get; set; }

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


        public DateTime NgayLapBBYeuCauKiemDinh { get; set; }

        public string NhanVienBBYeuCauKiemDinh { get; set; }

        public Guid NhanVienLapBBYeuCau1Id { get; set; }

        public string TenNhanVienLapBBYeuCau1 { get; set; }

        public string ChucVuNhanVienLapBBYeuCau1 { get; set; }

        public Guid NhanVienLapBBYeuCau2Id { get; set; }

        public string TenNhanVienLapBBYeuCau2 { get; set; }

        public string ChucVuNhanVienLapBBYeuCau2 { get; set; }

        public string TenDaiDienKhachHang { get; set; }

        //public string DanhSoKhachHang { get; set; }

        public string NoiDungBBYeuCauKiemDinh { get; set; }

        public string PathFileBBYeuCauKiemDinh { get; set; }

        public DateTime NgayLapBBKiemTraDongHoKHYC { get; set; }

        public string NhanVienBBKiemTraDongHoKHYC { get; set; }

        public string DiaChiLapBBKiemTraDongHoKHYC { get; set; }

        public Guid NhanVienLapBBKiemTraDHKHYC1Id { get; set; }

        public string TenNhanVienLapBBKiemTraDHKHYC1Id { get; set; }

        public string ChucVuNhanVienLapBBKiemTraDHKHYC1Id { get; set; }

        public Guid NhanVienLapBBKiemTraDHKHYC2Id { get; set; }

        public string TenNhanVienLapBBKiemTraDHKHYC2Id { get; set; }

        public string ChucVuNhanVienLapBBKiemTraDHKHYC2Id { get; set; }

        public string TenDaiDienKhachHangKiemTra { get; set; }

        public string DanhSoKhachHangKiemTra { get; set; }

        public string MucDichSuDungKH { get; set; }

        public string DongHoId { get; set; }

        public string HieuDongHo { get; set; }

        public string SoNo { get; set; }

        public string NuocSanXuat { get; set; }

        public string CoDongHo { get; set; }

        public string ChiSoTichLuy { get; set; }

        public DateTime NgayLapDongHo { get; set; }

        public string ChiNiemRacCo { get; set; }

        public string MaSoRacCoKimM1 { get; set; }

        public string MaSoRacCoKimM2 { get; set; }

        public string ChiNiemKiemDinh { get; set; }

        public string MaSoKiemDinhKimM1 { get; set; }

        public string MaSoKiemDinhKimM2 { get; set; }

        public string TinhTrangHoatDong { get; set; }

        public string HienTrangMatSo { get; set; }

        public string DongHoLapChoKiemDinhId { get; set; }

        public string HieuDongHoChoKiemDinh { get; set; }

        public string SoNoLapChoKiemDinh { get; set; }

        public string NuocSanXuatChoKiemDinh { get; set; }

        public string CoDongHoChoKiemDinh { get; set; }

        public string SoTichLuyChoKiemDinh { get; set; }

        public DateTime NgayLapChoKiemDinh { get; set; }

        public decimal ChieuCaoLapChoKiemDinh { get; set; }

        public decimal KhoangCachLapChoKiemDinh { get; set; }

        public string ViTriLapChoKiemDinh { get; set; }

        public DateTime NgayNhapKHYCKiemDinh { get; set; }

        public string NhanVienNhapKHYCKiemDinh { get; set; }

        public DateTime NgayNhapKiemTraDHKHYCKD { get; set; }

        public string NhanVienNhapKiemTraDHKHYCKD { get; set; }


        public bool IsKetThucHoSo { get; set; }

        public DateTime NgayKetThucHoSo { get; set; }

        public string GhiChuKetThucHoSo { get; set; }

        public string TenNhanVienNhapKetThucHoSo { get; set; }


        public DateTime NgayLapBBThoaThuan { get; set; }

        public string NhanVienLapBBThoaThuan { get; set; }

        public string TenDaiDienKH { get; set; }

        public string NoiDungLapBBThoaThuan { get; set; }

        public DateTime NgayNhapBBThoaThuan { get; set; }

        public string NhanVienNhapBBThoaThuan { get; set; }


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
