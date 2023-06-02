using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien
{
    public class PCTDienDiaDiemCongTacViewModel
    {
        public int Id { get; set; }

        public int PCTDienId { get; set; }

        public Guid PCTDienCode { get; set; }


        public int SoThuTu { get; set; }

        public string TuNgayDenNgay { get; set; }


        public string TramBienApDuongDay { get; set; }

        public string SoTru { get; set; }

        public string GhiChuHoTen { get; set; }


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
