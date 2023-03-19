using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IKhoDanhMucService
    {
        Task<List<KhoDanhMucViewModel>> Get_KhoDanhMuc_ByLoaiVatTu(string corporationid, string loaivattu);
    }
}
