using System;


namespace NiTiErp.Application.Dapper.ViewModels
{
    public class TTDMDangKyViewModel 
    {
        public int Id { get; set; }

        public string Ten { get; set; }

        public int MaTenCot { get; set; }

        public string TenCot { get; set; }


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