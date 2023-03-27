using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien
{
    public class PCTNhanVienCongTacViewModel
    {
        public int Id { get; set; }

        public int PCTDienId { get; set; }

        public Guid PCTDienCode { get; set; }

        public Guid TenNhanVienCongTacId { get; set; }

        public string TenNhanVienCongTac { get; set; }


        public int Stt2 { get; set; }
        public string TenNhanVienCongTac2 { get; set; }
        public int BacATDNhanVienCongTac2 { get; set; }


        public string TuNgayDenNgay { get; set; }

        public string GioDenLamViec { get; set; }
        public string PhutDenLamViec { get; set; }

        public string GioRutKhoi { get; set; }
        public string PhutRutKhoi { get; set; }


        public int BacATDNhanVienCongTac { get; set; }


        public string TenKhuVuc { get; set; }

        public string TenPhong { get; set; }


        public int TTCongTac { get; set; }

        public string GhiChuTTCongTac { get; set; }

        public DateTime NgayNhap { get; set; }

        public DateTime NgayDenLamViec { get; set; }

        public int TTDenLamViec { get; set; }

        public string GhiChuDenLamViec { get; set; }

        public DateTime NgayRutKhoi { get; set; }

        public int TTRutKhoi { get; set; }

        public string GhiChuRutKhoi { get; set; }


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
