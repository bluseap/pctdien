using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDXuLyKhacRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaXuLyKhac { get; set; }
        public DateTime NgayBaoCao { get; set; }
        public string TenXuLyKhac { get; set; }
        public string NoiDungXuLyKhac { get; set; }

    }
}
