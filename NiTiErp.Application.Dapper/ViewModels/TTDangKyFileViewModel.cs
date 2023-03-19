using System;
using System.Collections.Generic;
using System.Drawing;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class TTDangKyFileViewModel
    {
        public Int32 Id { get; set; }


        public int TTDangKyDienId { get; set; }

        public string TTDangKyCode { get; set; }
        


        public Guid CodeId { get; set; }

        public int TTDMDangKyMaCot { get; set; }

        public string TTDMDangKyTenCot { get; set; }

        public string TenFile { get; set; }

        public string DuongDan { get; set; }

        public string TenImage { get; set; }

        public string ImageFile { get; set; }

        public byte[] ImageFileByte { get; set; }


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
