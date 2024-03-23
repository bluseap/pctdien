using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDPhatTrienLuoiDienRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaPhatTrienLuoiDien { get; set; }
        public DateTime NgayBaoCao { get; set; }
        public string TenVatTu { get; set; }
        public string TenChieuDai { get; set; }
        public string SoLuongChieuDai { get; set; }
        public string TenLuyTuyenChieuDai { get; set; }
        public string SoLuongLuyTuyenChieuDai { get; set; }

        public string TenPhatTrienLuoiDien { get; set; }
        public int ChieuDaiPhatTrienLuoiDien { get; set; }
        public int ChieuDaiLuyTuyenPhatTrienLuoiDien { get; set; }

    }
}
