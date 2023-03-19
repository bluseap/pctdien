using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsBoHoSoFileService
    {
        Task<HsBoHoSoFileViewModel> Get_HsBoHoSoFile_ById(Int32 bohosofileid);

        Task<List<HsBoHoSoFileViewModel>> Get_HsBoHoSoFile_ByHsBoHoSoId(Int32 hsbohosoid);

        Task<bool> Create_HsBoHoSoFile(HsBoHoSoFileViewModel bohosofile, DateTime createDate, string createBy);

        Task<bool> Update_HsBoHoSoFile(HsBoHoSoFileViewModel bohosofile, DateTime updateDate, string updateBy);

        Task<bool> Delete_HsBoHoSoFile(Int32 hsbohosofileId, DateTime updateDate, string updateBy);
    }
}
