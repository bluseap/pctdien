using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class HsChuyenBoHoSoMuonTraViewModel
    {
        public int Id { get; set; }

        public Int32 HsBoHoSoCuId { get; set; }

        public Int32 HsBoHoSoMoiId { get; set; }

        public DateTime NgayChuyen { get; set; }

        public string LyDoChuyen { get; set; }

        public string TenNguoiChuyen { get; set; }

        public string TenNguoiNhan { get; set; }

        public string TenNguoiNhapChuyen { get; set; }

        public int IsMuon { get; set; }

        public Guid NguoiMuonId { get; set; }

        public string TenNguoiMuon { get; set; }

        public DateTime NgayMuon { get; set; }

        public DateTime NgayTraIsMuon { get; set; }

        public string GhiChuMuon { get; set; }

        public string TenNguoiNhapMuon { get; set; }


        public int TrangThaiBoHoSo { get; set; }


        public Guid NguoiTraId { get; set; }

        public string TenNguoiTra { get; set; }

        public DateTime NgayMuonIsTra { get; set; }

        public DateTime NgayTra { get; set; }

        public string GhiChuTra { get; set; }

        public string TenNguoiNhapTra { get; set; }


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
