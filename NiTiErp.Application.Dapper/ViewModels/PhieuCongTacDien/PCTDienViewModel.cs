using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien
{
    public class PCTDienViewModel
    {
        public int Id { get; set; }

        public string CorporationId { get; set; }

        public string PhongBanDanhMucId { get; set; }

        public Guid Code { get; set; }

        public int TrangThaiPCT { get; set; }

        public DateTime NgayUpTrangThaiPCT { get; set; }

        public string GhiChuUpTrangThaiPCT { get; set; }

        public int SoPhieuCongTac { get; set; }


        public string TenKhuVuc { get; set; }

        public string TenPhong { get; set; }

        public string TuNgayDenNgay { get; set; }


        public int DaCapPCT { get; set; }

        public int XacNhanDaCapPCT { get; set; }

        public int ChoPhepLV { get; set; }

        public int KetThucPCT { get; set; }

        public int HuyPCT { get; set; }



        public Guid NguoiLanhDaoCongViecId { get; set; }

        public Guid NguoiChiHuyTrucTiepId { get; set; }

        public Guid NguoiGiamSatATDId { get; set; }

        public Guid NguoiChoPhepId { get; set; }

        public string TenNguoiCapPCTId { get; set; }


        public string TenNguoiLanhDaoCongViec { get; set; }

        public int BacATDNguoiLanhDaoCongViecId { get; set; }

        public string TenNguoiChiHuyTrucTiep { get; set; }

        public int BacATDNguoiChiHuyTrucTiepId { get; set; }


        public string CacCongTyDonVi { get; set; }

        public string CacNoiDungCongTac { get; set; }

        public string CacDieuKiemATLD { get; set; }

        public string CacTrangBiATBHLDLamViec { get; set; }


        public string DiaDiemCongTac { get; set; }


        public string GioBatDauKH { get; set; }

        public string PhutBatDauKH { get; set; }

        public DateTime NgayBatDauKH { get; set; }

        public string GioKetThucKH { get; set; }

        public string PhutKetThucKH { get; set; }

        public DateTime NgayKetThucKH { get; set; }


        public string TongHangMucDaTrangCap { get; set; }

        public string CacDonViQLVHCoLienQuan { get; set; }


        public string TenNguoiGiamSatATD { get; set; }

        public int BacATDNguoiGiamSatATD { get; set; }

        public string TenNguoiChoPhep { get; set; }

        public int BacNguoiChoPhep { get; set; }


        public bool IsNgayCapPCT { get; set; }

        public DateTime NgayCapPCT { get; set; }
      
        public string TenNguoiCapPCT { get; set; }        


        public string CacNoiDungCT { get; set; }   
        

        public string ThietBiDuongDayDaCatDien { get; set; }

        public string DaTiepDatTai { get; set; }

        public string DaLamRaoChanTreoBienBaoTai { get; set; }

        public string PhamViDuocPhepLamViec { get; set; }

        public string CanhBaoChiDanNguyHiem { get; set; }

        public string NguoiChiHuyTTKiemTraDamBaoAT { get; set; }

        public string LamTiepDatTai { get; set; }

        public string TongHangMucDaKiemTraBHLD { get; set; }


        public string CacGiayPhoiHopChoPhep { get; set; }


        public bool IsNgayChoPhepDonViPCT { get; set; }


        public string GioChoPhepDonViCT { get; set; }

        public string PhutChoPhepDonViCT { get; set; }

        public DateTime NgayChoPhepDonViCT { get; set; }


        public Guid TraLamViecOngBaId { get; set; }

        public string TraLamViecTenOngBa { get; set; }

        public string TraLamViecOngBaTenChucVu { get; set; }

        public string TenDaiDienQuanLyVanHanh { get; set; }

        public bool IsNgayTraLamViec { get; set; }


        public string GioTraLamViec { get; set; }

        public string PhutTraLamViec { get; set; }

        public DateTime NgayTraLamViec { get; set; }

        public string LyDoTonChuaThucHien { get; set; }

        public string LyDoChuaThucHien { get; set; }

        public bool IsNgayKhoaPCT { get; set; }


        public string GioKhoaPCT { get; set; }

        public string PhutKhoaPCT { get; set; }

        public DateTime NgayKhoaPCT { get; set; }

        public bool IsNgayKiemTraHoanThanhPCT { get; set; }

        public DateTime NgayKiemTraHoanThanhPCT { get; set; }


        public Guid NguoiKiemTraATLDTaiHienTruongId { get; set; }

        public string TenNguoiKiemTraATLDTaiHienTruong { get; set; }

        public string ChucVuNguoiKiemTraATLDTaiHienTruong { get; set; }


        public bool IsHuyPCT { get; set; }

        public DateTime NgayHuyPCT { get; set; }

        public string GhiChuHuyPCT { get; set; }



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
