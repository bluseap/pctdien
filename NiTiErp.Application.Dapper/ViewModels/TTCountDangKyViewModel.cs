using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels
{
    public class TTCountDangKyViewModel
    {
        public int Id { get; set; }

        public string XiNghiep { get; set; }

        public int DangKyDien { get; set; }

        public int DangKyNuoc { get; set; }

        public int CacDichVuDien { get; set; }

        public int CacDichVuNuoc { get; set; }
    }
}
