using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien
{
    public class PCTDiaDiemCongTacViewModel
    {
        public int Id { get; set; }

        public int PCTDienId { get; set; }

        public Guid PCTDienCode { get; set; }

        public string TenDiaDiemCongTac { get; set; }


        public string GioBatDau { get; set; }

        public string PhutBatDau { get; set; }

        public DateTime NgayBatDau { get; set; }

        public string GioKetThuc { get; set; }

        public string PhutKetThuc { get; set; }

        public DateTime NgayKetThuc { get; set; }



        public Guid NguoiChiHuyTrucTiepId { get; set; }

        public string TenNguoiChiHuyTrucTiep { get; set; }

        public Guid NguoiChoPhepId { get; set; }

        public string TenNguoiChoPhep { get; set; }

        public int TTDiaDiemCT { get; set; }

        public string GhiChuDiaDiemCT { get; set; }

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
