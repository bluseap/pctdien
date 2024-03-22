using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDThayTheVatTuRequest
    {
        public int Id { get; set; }       
        public string CorporationId { get; set; }
        public string MaTenThayTheVatTu { get; set; }
        public DateTime NgayBaoCao { get; set; }
        public string TenVatTu { get; set; }
        public string SoLuongVatTu { get; set; }
        public string TenLuyTuyen { get; set; }
        public string SoLuongLuyTuyen { get; set; }
        public string TenChiTiet { get; set; }
        public string NoiDungChiTiet { get; set; }
        public string ThietBiKhacThayTheVatTu { get; set; }

        public string TenThayTheVatTu { get; set; }
        public decimal SoLuongThayTheVatTu { get; set; }
        public decimal SoLuongLuyTuyenThayTheVatTu { get; set; }
        public string ChiTietThayTheVatTu { get; set; }
    }
}
