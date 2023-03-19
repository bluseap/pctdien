using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class TTCacDichVuDienViewModel
    {
        public int Id { get; set; }

        public int SoThuTu { get; set; }

        public string HoTenNguoiYeuCau { get; set; }

        public int TTDichVuOnline { get; set; }

        public DateTime NgayXacNhan { get; set; }

        public string MaNhanVienNhapXacNhan { get; set; }

        public string TenNhanVienXacNhan { get; set; }

        public string LyDoXacNhan { get; set; }

        public string DienThoai { get; set; }

        public string SoTheCCCD { get; set; }

        public DateTime NgayCap { get; set; }

        public string NoiCap { get; set; }

        public int ThanhPhoTinhId { get; set; }

        public int QuanHuyenId { get; set; }

        public int PhuongXaId { get; set; }

        public string TenTinh { get; set; }

        public string TenQuan { get; set; }

        public string Tenphuong { get; set; }

        public string SoNha { get; set; }

        public string DiaChiLD { get; set; }

        public string TenDuongApTo { get; set; }

        public int TTDMDangKyDichVu { get; set; }

        public int TTDMDangKyThayDoiViTri { get; set; }

        public int TTDMDangKyThayDoiMDSD { get; set; }

        public int TTDMDangKyThayDoiDMSD { get; set; }

        public int TTDMDangKyHopDongGiayToTuyThan { get; set; }

        public int TTDMDangKyHopDongChuThe { get; set; }

        public string DichVuKhachHang { get; set; }

        public string ThayDoiViTri { get; set; }

        public string ThayDoiMDSD { get; set; }

        public string ThayDoiDMSD { get; set; }

        public string HopDongGiayToTuyThan { get; set; }

        public string ThayDoiHopDong { get; set; }


        public DateTime NgayNhap { get; set; }

        public bool IsTuChoi { get; set; }

        public DateTime NgayTuChoi { get; set; }

        public string MaNhanVienNhapTuChoi { get; set; }

        public string TenNhanVienTuChoi { get; set; }

        public string LyDoTuChoi { get; set; }

        public DateTime NgayNhapTuChoi { get; set; }

        public string NoiDungYeuCau { get; set; }

        public string SoLuongHoSo { get; set; }

        public string ThoiGianGiaiQuyetHoSo { get; set; }

        public DateTime ThoiGianNhanHoSo { get; set; }

        public DateTime ThoiGianTraKetQuaHoSo { get; set; }

        public string MaSoHoSo { get; set; }
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
