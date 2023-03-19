using System;
using System.Collections.Generic;
using System.Text;

namespace NiTiErp.Application.Dapper.ViewModels.DangKyNuoc
{
    public class LockStatusViewModel
    {
        public string MADP { get; set; }

        public string DUONGPHU { get; set; }

        public string KYGT { get; set; }

        public bool LOCKGCS { get; set; }

        public bool LOCKTINHCUOC { get; set; }

        public bool LOCKCN { get; set; }

        public string MAKV { get; set; }
    }
}
