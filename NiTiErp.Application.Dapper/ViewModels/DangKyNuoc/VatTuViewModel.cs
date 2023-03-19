using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.DangKyNuoc
{
    public class VatTuViewModel
    {
        public string MAVT { get; set; }

        public string MAHIEU { get; set; }

        public string TENVT { get; set; }

        public string DVT { get; set; }

        public decimal GIAVT { get; set; }

        public decimal GIANC { get; set; }

        public DateTime NGAYAD { get; set; }

        public string MANHOM { get; set; }

        public bool HAYDUNG { get; set; }

        public string MANVN { get; set; }

        public string HINHVT1 { get; set; }

        public string HINHVT2 { get; set; }

        public string KYHIEUVT { get; set; }

        public string MAKV { get; set; }

        public decimal SOLUONG { get; set; }

        public int STT { get; set; }

        public decimal GIAVTNHAP { get; set; }

        public decimal GIANCNHAP { get; set; }

        public string LOAIVT { get; set; }

        public string MAVTCTY { get; set; }

        public string KeToanMaSoVatTu { get; set; }

        public string KhoDanhMucId { get; set; }

        public DateTime NgayNhap { get; set; }

        public string NhanVienId { get; set; }

        public DateTime NgayUpdate { get; set; }

        public string LoaiVatTuId { get; set; }

        public string TenKhoVatTu { get; set; }
    }
}
