using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiAPI.Dapper.ViewModels
{
    public class ProductQuantitiesViewModel
    {
        public long Id { get; set; }

        public long ProductId { get; set; }


        public int AttributeOptionValueIdColor { get; set; }

        public string AttributeOptionValueNameColor { get; set; }

        public int AttributeOptionValueIdSize { get; set; }

        public string AttributeOptionValueNameSize { get; set; }


        public int Quantity { get; set; }


        public int Status { get; set; }

        public bool Active { get; set; }

        public int SortOrder { get; set; }

        public DateTime CreateDate { get; set; }

        public string CreateBy { get; set; }

        public DateTime UpdateDate { get; set; }

        public string UpdateBy { get; set; }


        public string TenSanPham { get; set; }

        public string GiaSanPham { get; set; }

        public string MauSanPham { get; set; }


    }
}
