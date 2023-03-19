using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IDMCungCapDichVuService
    {
        Task<List<DMCungCapDichVuViewModel>> Get_DMCungCapDichVu_ByLoaiDichVuId(int loaidichvuId);
    }
}
