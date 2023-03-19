using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTCountDangKyService
    {
        Task<List<TTCountDangKyViewModel>> Get_TTCountDangKy_ByList();
    }
}
