using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsThoiHanBaoQuanDMService
    {
        Task<List<HsThoiHanBaoQuanDMViewModel>> Get_HsThoiHanBaoQuanDM_ByAll();
    }
}
