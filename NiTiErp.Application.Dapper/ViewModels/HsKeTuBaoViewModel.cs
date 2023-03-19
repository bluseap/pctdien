using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class HsKeTuBaoViewModel
    {
        public int Id { get; set; }

        public string CorporationId { get; set; }

        public string TenKhuVuc { get; set; }

        public string TenPhongBan { get; set; }

        public string PhongDanhMucId { get; set; }

        public int HsPhongLuuTruDMId { get; set; }

        public string MaPhongLuuTru { get; set; }

        public int HsKeTuBaoDMId { get; set; }

        public string MaKeTuBao { get; set; }

        public string Ten { get; set; }

        public int TrangThaiKeTuBao { get; set; }

        public int TrangThaiTrenKe { get; set; }

        public int SoLuongTrenKe { get; set; }

        public int SoLuongThucTe { get; set; }

        public decimal ChieuDai { get; set; }

        public decimal ChieuCao { get; set; }

        public int SttKeTuBao { get; set; }

        public string LichSuHinhThanh { get; set; }

        public string ThoiGianTaiLieu { get; set; }

        public decimal TongSoTaiLieuGiay { get; set; }

        public decimal SoLuongTaiLieuGiaySoHoa { get; set; }

        public string NhomTaiLieuChuYeu { get; set; }

        public string CacLoaiTaiLieuKhac { get; set; }

        public string NgonNgu { get; set; }

        public string CongCuTraCuu { get; set; }

        public string SoLuongTrangLapBanSaoBaoHiem { get; set; }

        public string GhiChuThongTinCanThiet { get; set; }



        public int HsKeTuBaoId { get; set; }

        public string CorporationCuId { get; set; }

        public string PhongDanhMucCuId { get; set; }

        public string CorporationMoiId { get; set; }

        public string PhongDanhMucMoiId { get; set; }

        public string TenKhuVucCu { get; set; }

        public string TenPhongBanCu { get; set; }

        public string TenKhuVucMoi { get; set; }

        public string TenPhongBanMoi { get; set; }

        public DateTime NgayChuyen { get; set; }

        public string LyDoChuyen { get; set; }



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
