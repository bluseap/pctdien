using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GiayDeNghiDMCungCapNuocViewModel
    {
        public Int32 Id { get; set; }

        public Guid CodeXuLy { get; set; }

        public int GiayDeNghiCungCapNuocId { get; set; }


        public string KhachHangId { get; set; }

        public string KhuVucId { get; set; }


        public string CorporationId { get; set; }

        public string DongHoId { get; set; }

        public string DongHoMaLoai { get; set; }

        public string SoNo { get; set; }

        public string TenKhachHang { get; set; }


        public string TenKhuVuc { get; set; }

        public string DiaChi { get; set; }

        public string SoDienThoai { get; set; }

        public string Email { get; set; }

        public string DiaChiMuaNuoc { get; set; }

        public string DanhSoKhachHang { get; set; }

        public string MucDichSuDung { get; set; }

        public string ThongTinHienTai { get; set; }

        public string ThongTinThayDoi { get; set; }

        public string HoSoKhachHangCungCap { get; set; }

        public string HoSoKhachHangCanBoSung { get; set; }

        public string BenDeNghiCungCap { get; set; }

        public DateTime NgayDeNghiCungCap { get; set; }

        public Guid NhanVienTiepNhanId { get; set; }

        public string TenNhanVienTiepNhan { get; set; }

        public DateTime NgayTiepNhan { get; set; }


        public int DMCungCapDichVuId { get; set; }

        public string TenDMCungCapDichVu { get; set; }

        public int TTDeNghi { get; set; }

        public int TTThietKe { get; set; }

        public int TTChietTinh { get; set; }

        public int TTThiCong { get; set; }

        public int TTNghiemThu { get; set; }

        public int TTKiemTraKiemDinh { get; set; }

        public int TTXuLyKiemDinh { get; set; }

        public bool IsHuyGDN { get; set; }

        public string LyDoHuyGDN { get; set; }


        public string PhongDanhMucId { get; set; }

        public Guid NhanVienId { get; set; }

        public string AppUsersUserName { get; set; }

        public string TTChuyen { get; set; }

        public string TTDen { get; set; }

        public DateTime NgayChuyen { get; set; }

        public string LyDoChuyen { get; set; }

        public DateTime NgayDen { get; set; }

        public string LyDoDen { get; set; }


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
