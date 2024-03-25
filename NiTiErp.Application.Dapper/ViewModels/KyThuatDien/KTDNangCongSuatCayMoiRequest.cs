using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDNangCongSuatCayMoiRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaNangCongSuat { get; set; }
        public DateTime NgayBaoCao { get; set; }
        public string TenVatTu { get; set; }        
        public string TenSoLuongNangCongSuat { get; set; }
        public string TenChieuDaiSoLuongSoLuongNangCongSuat { get; set; }
        public string TenSoLuongSoLuongNangCongSuat { get; set; }
        public string TenCuTheGom { get; set; }        
        public string LuyTuyenTenSoLuongLuyTuyenNangCongSuat { get; set; }
        public string TenSoLuongLuyTuyenNangCongSuat { get; set; }
        public string TenCongSuatSoLuongLuyTuyenNangCongSuat { get; set; }


        public int SoLuongNangCongSuat { get; set; }
        public int SoLuongSoLuongNangCongSuat { get; set; }
        public int SoLuongLuyTuyenNangCongSuat { get; set; }
        public int CongSuatSoLuongLuyTuyenNangCongSuat { get; set; }
        public string CuTheNangCongSuat { get; set; }
    }
}
