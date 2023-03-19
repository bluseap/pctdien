using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.DangKyNuoc
{
    public class KhoDanhMucViewModel
    {
        public string Id { get; set; }

        public string TenKho { get; set; }

        public string KhuVucId { get; set; }

        public string NhanVienNhap { get; set; }

        public DateTime NgayNhap { get; set; }

        public string NhanVienSua { get; set; }

        public DateTime NgaySua { get; set; }

        public int SoThuTu { get; set; }

        public string LoaiVatTuId { get; set; }
    }
}
