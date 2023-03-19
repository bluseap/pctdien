using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiAPI.Utilities.Dtos
{
    public class PagedResult<T>
    {
        public List<T> Items { set; get; }

        public int PageIndex { get; set; }

        public int PageSize { get; set; }

        public int TotalRow { get; set; }

        public string TongTienHang { get; set; }

        public string TongTienCoc { get; set; }

        public string TongTienConLai { get; set; }
    }
}
