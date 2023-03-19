﻿using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IPhuongXaService
    {
        Task<List<PhuongXaViewModel>> PhuongXaGetList(string bangId, string id2, string id3, string parameters);

        Task<List<PhuongXaViewModel>> Get_PhuongXa_ByHuyen(int huyen);

        Task<List<PhuongXaViewModel>> Get_PhuongXa_ByAll();

        Task<List<PhuongXaViewModel>> Get_PhuongXa_ByCor(string corporationId);
    }
}
