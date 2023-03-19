﻿using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class HsNhomHoSoDMViewModel
    {
        public int Id { get; set; }

        public string CorporationId { get; set; }


        public string  TenKhuVuc { get; set; }


        public string Ten { get; set; }

        public int SttNhom { get; set; }


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
