using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class HsChiTietBoHoSoViewModel
    {
        public long Id { get; set; }

        public long HsBoHoSoId { get; set; }

        public string CodeMa { get; set; }

        public string MaKHMaVBMaHs { get; set; }


        public int SoThuTu { get; set; }

        public string MaKhachHang { get; set; }

        public string TENKH { get; set; }

        public string DanhSo { get; set; }

        public int STTTS { get; set; }


        public int Status { get; set; }

        public bool Active { get; set; }

        public int Stt { get; set; }

        public string CreateBy { get; set; }

        public DateTime CreateDate { get; set; }

        public string UpdateBy { get; set; }

        public DateTime UpdateDate { get; set; }
    }
}
