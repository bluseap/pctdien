using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class HsBoHoSoViewModel
    {
        public Int32 Id { get; set; }

        public int HsKeTuBaoId { get; set; }

        public string PhongDanhMucQuanLyId { get; set; }

        public string MaBoHoSo { get; set; }

        public string TieuDeBoHoSo { get; set; }

        public int HsNhomHoSoId { get; set; }

        public string TenNhomHoSo { get; set; }



        public string TenKeTuBao { get; set; }

        public string TenPhongBan { get; set; }

        public string TenKhuVuc { get; set; }

        public string TenPhongHs { get; set; }



        public string ThoiHanBaoQuan { get; set; }

        public int HsThoiHanBaoQuanDMId { get; set; }

        public string CheDoSuDung { get; set; }

        public int TrangThaiBoHoSo { get; set; }

        public int SoTTHoSoTrenKe { get; set; }

        public DateTime ThoiGianBatDau { get; set; }

        public DateTime ThoiGianKetThuc { get; set; }

        public decimal TongSoVanBanTrongBoHoSo { get; set; }

        public string TenNhanVienNhapHoSo { get; set; }

        public string ChuGiaiBoHoSo { get; set; }

        public string KyHieuThongTin { get; set; }

        public string TuKhoa { get; set; }

        public decimal SoLuongTo { get; set; }

        public decimal SoLuongTrang { get; set; }

        public string TinhTrangVatLy { get; set; }

        public int HsPhongLuuTruDMIdLanDauNhap { get; set; }

        public string MaPhongLuuTruLanDauNhap { get; set; }

        public int HsKeTuBaoDMIdLanDauNhap { get; set; }

        public bool IsHuy { get; set; }

        public string BoPhanHuy { get; set; }

        public DateTime NgayHuy { get; set; }

        public string GhiChuHuy { get; set; }

        public string TenNguoiNhapHuy { get; set; }



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
