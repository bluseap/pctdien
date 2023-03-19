using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class GiayDeNghiQuaTrinhCungCapViewModel
    {
        public Int32 Id { get; set; }

        public bool IsGiayDeNghiNuoc { get; set; }

        public Int32 GiayDeNghiDMCungCapNuocId { get; set; }

        public Int32 GiayDeNghiDMCungCapDienId { get; set; }

        public string TrangThai { get; set; }

        public string MoTa { get; set; }

      

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
