using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDDuyTuBaoDuongRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaDuyTuBaoDuong { get; set; }
        public DateTime NgayBaoCao { get; set; }

        public string TenDuyTuBaoDuong { get; set; }
        public string TenSoLuongDuyTuBaoDuong { get; set; }
        public string TenCuTheGom { get; set; }
        public string TenLuyTuyen { get; set; }
        public string TenSoLuongLuyTuyenDTBT { get; set; }

        public int SoLuongDuyTuBaoDuong { get; set; }
        public string CuTheDuyTuBaoDuong { get; set; }
        public int SoLuongLuyTuyenDuyTuBaoDuong { get; set; }

    }
}
