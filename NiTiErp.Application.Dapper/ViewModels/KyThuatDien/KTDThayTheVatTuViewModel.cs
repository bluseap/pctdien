using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDThayTheVatTuViewModel
    {
        public int Id { get; set; }

        public Guid Code { get; set; }

        public string CorporationId { get; set; }

        public string CodeThayTheVatTu { get; set; }
        public DateTime NgayBaoCao { get; set; }
        public string TenThayTheVatTu { get; set; }
        public string MaTenThayTheVatTu { get; set; }
        public decimal SoLuongThayTheVatTu { get; set; }
        public string LoaiTenThayTheVatTu { get; set; }
        public decimal SoLuongLuyTuyenThayTheVatTu { get; set; }
        public string LoaiLuyTuyenThayTheVatTu { get; set; }
        public string ChiTietThayTheVatTu { get; set; }
        public string ThietBiKhacThayTheVatTu { get; set; }


        public DateTime NgayNhap { get; set; }
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
