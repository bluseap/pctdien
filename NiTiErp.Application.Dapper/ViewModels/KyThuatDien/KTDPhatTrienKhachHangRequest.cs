using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDPhatTrienKhachHangRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaPhatTrienKhachHang { get; set; }
        public DateTime NgayBaoCao { get; set; }

        public string TenVatTu { get; set; }
        public string TenSoLuongPhatTrienKhachHang { get; set; }
        public string LuyTuyenTenSoLuongPhatTrienKhachHang { get; set; }
        public string LuyTuyenSoLuongPhatTrienKhachHang { get; set; }

        public int SoLuongPhatTrienKhachHang { get; set; }
        public int LuyTuyenPhatTrienKhachHang { get; set; }

    }
}
