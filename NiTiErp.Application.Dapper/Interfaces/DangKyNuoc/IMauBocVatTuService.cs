using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IMauBocVatTuService
    {
        Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByLoaiMBVT(string CorporationId, string loaimbvt);

        //Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByMakvLoaiMBVT(string makv, string loaimbvt);

        //Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByLoaiMBVTMauCuaAi(string loaimbvt, string maucuaai);


    }
}
