using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IMauThietKeService
    {
        Task<List<MauThietKeViewModel>> Get_MauThietKe_ByNuocOrder9(string maddk, string loaidv, int order);
    }
}
