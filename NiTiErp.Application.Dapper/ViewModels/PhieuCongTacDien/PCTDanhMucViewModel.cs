using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien
{
    public class PCTDanhMucViewModel
    {
        public int Id { get; set; }

        public string Code { get; set; }

        public string TenNoiDung { get; set; }

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
