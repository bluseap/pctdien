using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.DangKyDien
{
    public class LockStatusPoViewModel
    {
        public string MADPPO { get; set; }

        public string DUONGPHUPO { get; set; }

        public string KYGT { get; set; }

        public bool LOCKGCS { get; set; }

        public bool LOCKTINHCUOC { get; set; }

        public bool LOCKCN { get; set; }

        public string MAKVPO { get; set; }
    }
}
