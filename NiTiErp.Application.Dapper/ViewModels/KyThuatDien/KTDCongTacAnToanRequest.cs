using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDCongTacAnToanRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaCongTacAnToan { get; set; }
        public DateTime NgayBaoCao { get; set; }

        public string TenCongTacAnToan { get; set; }
        public string TenSoLuongDaThucHienTheoTo { get; set; }
        public string TenLuyTuyenDaThucHienTheoTo { get; set; }
        public string TenLuyTuyenSoLuongDaThucHienTheoTo { get; set; }
        public string TenSoLuongDaThucHienTheoCanBoCongNhan { get; set; }
        public string TenLuyTuyenDaThucHienTheoCanBoCongNhan { get; set; }
        public string TenLuyTuyenSoLuongDaThucHienTheoCanBoCongNhan { get; set; }

        public string KiemTraThucHienTo { get; set; }
        public int SoLuongDaThucHienTheoTo { get; set; }
        public int LuyTuyenDaThucHienTheoTo { get; set; }
        public int SoLuongDaThucHienTheoCanBoCongNhan { get; set; }
        public int LuyTuyenDaThucHienTheoCanBoCongNhan { get; set; }


    }
}
