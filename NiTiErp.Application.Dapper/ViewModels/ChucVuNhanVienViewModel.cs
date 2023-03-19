﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class ChucVuNhanVienViewModel
    {
        public string Id { set; get; }

        public int InsertchucvunvId { set; get; }

        [StringLength(50)]
        public string CorporationId { get; set; }

        [StringLength(500)]
        public string CorporationName { get; set; }

        [StringLength(500)]
        public string TenChucVu { get; set; }

        [StringLength(50)]
        public string ChucDanhDanhMucId { get; set; }
        
        [StringLength(500)]
        public string TenChucDanh { get; set; }



        public int Status { get; set; }

        public int Stt { get; set; }

        public bool Active { get; set; }
        


        [StringLength(20)]
        public string CreateBy { get; set; }

        public DateTime CreateDate { get; set; }

        [StringLength(20)]
        public string UpdateBy { get; set; }

        public DateTime UpdateDate { get; set; }

        
    }
}
