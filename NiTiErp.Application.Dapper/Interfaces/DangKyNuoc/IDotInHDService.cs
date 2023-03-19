using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IDotInHDService
    {
        Task<List<DotInHDViewModel>> Get_DotInHD_ByCorporationId(string corpotationid);

        Task<List<DotInHDViewModel>> Get_DotInHD_ByCorporationIdPO(string corpotationid);

        Task<List<DotInHDViewModel>> Get_DotInHD_ByMakv(string makv);

        Task<List<DotInHDViewModel>> Get_DotInHD_ByMakvPo(string makvpo);
    }
}
