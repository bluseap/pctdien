using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiAPI.Dapper.ViewModels
{
    public class OrderDetailsViewModel
    {
        public long Id { get; set; }

        public int SortNumber { get; set; }

        public long OrderId { get; set; }

        public string CustomerName { get; set; }

        public long ProductId { get; set; }

        public string ProductName { get; set; }


        public int SoLuongSanPham { get; set; }

        public Int32 ProductQuantitiesId { get; set; }

        public string TenKhachHang { get; set; }

        public string DiaChiKhachHang { get; set; }

        public string SoDienThoai { get; set; }


        public int AttributeOptionValueIdColor { get; set; }

        public int AttributeOptionValueIdSize { get; set; }

        public decimal OriginalPrice { get; set; }

        public float Price { get; set; }

        public decimal DiscountPrice { get; set; }

        public float SellPrice { get; set; }

        public int Quantity { get; set; }


        public bool IsGomDon { get; set; }

        public Guid CodeGomDon { get; set; }

        public DateTime NgayGomDon { get; set; }

        public string GhiChuGomDon { get; set; }


        public bool IsDonLive { get; set; }

        public string MaDonLive { get; set; }

        public string SoMaDonLive { get; set; }

        public DateTime NgayDatLive { get; set; }

        public string MaBuoiLve { get; set; }

        public string TenBuoiLive { get; set; }

        public string GhiChuLive { get; set; }

        public decimal TienTong { get; set; }

        public decimal TienCoc { get; set; }

        public decimal TienTongKhachHangTra { get; set; }

        public string MaTienShipKhachHangTra { get; set; }

        public string TenMaTienShipKhachHangTra { get; set; }

        public decimal TienShipKhachHangTra { get; set; }

        public string GhiChuTienShipKhachHangTra { get; set; }

        public bool IsDonDi { get; set; }

        public string MaDonDi { get; set; }

        public DateTime NgayDonDi { get; set; }

        public string GhiChuDonDi { get; set; }        

        public decimal TrongLuong { get; set; }

        public decimal TienTongDonDi { get; set; }

        public bool IsDonDen { get; set; }

        public DateTime NgayDonDen { get; set; }

        public string GhiChuDonDen { get; set; }

        public bool IsDonDenHuy { get; set; }

        public DateTime NgayDonDenHuy { get; set; }

        public string GhiChuDonDenHuy { get; set; }

        public int TTOrderDetails { get; set; }



        public int Status { get; set; }

        public bool Active { get; set; }

        public int SortOrder { get; set; }

        public DateTime CreateDate { get; set; }

        public string CreateBy { get; set; }

        public DateTime UpdateDate { get; set; }

        public string UpdateBy { get; set; }

    }
}
