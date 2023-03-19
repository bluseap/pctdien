using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GDNNghiemThuNuocViewModel
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


        public Guid NhanVienNghiemThu1Id { get; set; }

        public string TenNhanVien1 { get; set; }

        public Guid NhanVienNghiemThu2Id { get; set; }

        public string TenNhanVien2 { get; set; }

        public Guid NhanVienNghiemThu3Id { get; set; }

        public string TenNhanVien3 { get; set; }

        public string DongHoId { get; set; }

        public string SoNo { get; set; }

        public decimal ChieuCao { get; set; }

        public decimal KhoangCach { get; set; }

        public string ViTri { get; set; }

        public string ChiNiemM1 { get; set; }

        public string ChiNiemM2 { get; set; }

        public string KetLuan { get; set; }

        public DateTime NgayNghiemThu { get; set; }

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
