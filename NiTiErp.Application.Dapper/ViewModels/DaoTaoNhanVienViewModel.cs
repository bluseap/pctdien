using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class DaoTaoNhanVienViewModel
    {
        public Guid Id { set; get; }

        public int InsertDaoTaoNhanVienId { set; get; }

        [StringLength(50)]
        public string KETQUA { get; set; }


        public Guid HoSoNhanVienId { set; get; }


        public string TenHocVien { get; set; }


        [StringLength(1000)]
        public string TenNhanVien { get; set; }

        [StringLength(2)]
        public string GioiTinh { get; set; }

        public DateTime NgaySinh { get; set; }

        public Guid DaoTaoLopId { set; get; }


        public int DaoTaoNoiId { get; set; }

        public string TenTruong { get; set; }

      
        public string ChuyenMon { get; set; }

        public DateTime NgayBatDau { get; set; }

        public DateTime NgayKetThuc { get; set; }

        public string MaSoTheHocVien { get; set; }

        public string BacDaoTao { get; set; }

        public string GhiChuBacDaoTao { get; set; }


       
        public string Ten { get; set; }
        
        public string CorporationId { get; set; }

        public string TenKhuVuc { get; set; }
        

        
        public string PhongBanDanhMucId { get; set; }

       
        public string TenPhong { get; set; }

      
        public string ChucVuNhanVienId { get; set; }

      
        public string TenChucVu { get; set; }

      
        public string Hinh { get; set; }



        public int Status { get; set; }

        public bool Active { get; set; }

        public int Stt { get; set; }

        public DateTime CreateDate { get; set; }

        [StringLength(50)]
        public string CreateBy { get; set; }

        public DateTime UpdateDate { get; set; }

        [StringLength(50)]
        public string UpdateBy { get; set; }

    }
}
