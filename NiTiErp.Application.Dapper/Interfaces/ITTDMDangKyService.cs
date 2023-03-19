using NiTiErp.Application.Dapper.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTDMDangKyService
    {
        Task<TTDMDangKyViewModel> Get_TTDMDangKy_ById(int id);

        Task<List<TTDMDangKyViewModel>> Get_TTDMDangKy_ByTenCot(string tenCot);

    }
}
