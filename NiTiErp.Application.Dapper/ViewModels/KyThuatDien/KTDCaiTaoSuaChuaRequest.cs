using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.KyThuatDien
{
    public class KTDCaiTaoSuaChuaRequest
    {
        public int Id { get; set; }
        public string CorporationId { get; set; }
        public string MaCaiTaoSuaChua { get; set; }
        public DateTime NgayBaoCao { get; set; }

        public string TenCaiTaoSuaChua { get; set; }
        public string TenSoLuongCaiTaoSuaChua { get; set; }
        public string TenDai { get; set; }
        public string TenDaiCaiTaoSuaChua { get; set; }
        public string TenCuTheGom { get; set; }
        public string TenLuyTuyen { get; set; }
        public string TenLuyTuyenDaiCaiTaoSuaChua { get; set; }
        public string TenSoLuongSoLuongLuyTuyenCaiTaoSuaChua { get; set; }
        public string TenMua { get; set; }
        public string TenMuaCaiTaoSuaChua { get; set; }
        public string TenBan { get; set; }
        public string TenBanCaiTaoSuaChua { get; set; }
        public string TenTyLe { get; set; }
        public string TenTyLeCaiTaoSuaChua { get; set; }
        public string TenHaoHut { get; set; }
        public string TenHaoHutCaiTaoSuaChua { get; set; }
        public string TenKH { get; set; }
        public string TenKHCaiTaoSuaChua { get; set; }
        public string TenThucHien { get; set; }
        public string TenThucHienCaiTaoSuaChua { get; set; }

        public int SoLuongCaiTaoSuaChua { get; set; }
        public int DaiCaiTaoSuaChua { get; set; }
        public string CuTheCaiTaoSuaChua { get; set; }
        public int SoLuongLuyTuyenCaiTaoSuaChua { get; set; }
        public int SoLuongSoLuongLuyTuyenCaiTaoSuaChua { get; set; }
        public int SoLuongMuaCaiTaoSuaChua { get; set; }
        public int SoLuongBanCaiTaoSuaChua { get; set; }
        public int SoLuongTyLeCaiTaoSuaChua { get; set; }
        public int SoLuongHaoHutCaiTaoSuaChua { get; set; }
        public int SoLuongKHCaiTaoSuaChua { get; set; }
        public int SoLuongThucHienCaiTaoSuaChua { get; set; }

    }
}
