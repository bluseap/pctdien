﻿using System;
using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHeSoNhanVienService
    {
        Task<List<HeSoNhanVienViewModel>> HeSoNhanVienGetList(string corporationId, string phongId, string keyword, string hosoId,
               string hosoId2, string hesoluongId, string chucVuId, string bacluongId, string luongtoithieuId, string parameters);
    }
}
