﻿using System;
using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHonNhanService
    {
        Task<List<HonNhanViewModel>> HonNhanGetList(string bangId, string id2, string id3, string parameters);
    }
}
