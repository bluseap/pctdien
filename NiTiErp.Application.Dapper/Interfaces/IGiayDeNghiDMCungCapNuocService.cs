using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGiayDeNghiDMCungCapNuocService
    {
        Task<GiayDeNghiDMCungCapNuocViewModel> Get_GiayDeNghiDMCungCapNuoc_ById(Int32 id);

        Task<GiayDeNghiDMCungCapNuocViewModel> Get_GiayDeNghiCungCapNuoc_ById(int giaydenghiid);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiCungCapNuoc_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_Tim(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTTK(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTTC(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTNT(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTKTKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTXLKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByCodeXuLy(Guid codeXyLy);

        Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByGDNId(int giaydenghiId);

        Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByGDNId1Top(int giaydenghiId);

        Task<bool> CreateGiayDeNghiDMCungCapNuocByCodeXuLy (Guid CodeXuLy, int DMCungCapDichVuId, DateTime createDate, string createBy);

        Task<bool> CreateGiayDeNghiDMCungCapNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi, DateTime createDate, string createBy);

        Task<bool> UpdateGiayDeNghiDMCungCapNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi, DateTime updateDate, string updateBy);

        Task<bool> Update_GiayDeNghiDMCungCapNuoc_ByIdXuLy(int giaydenghiId, Int32 giaydenghidmcungcapnuocId, DateTime ngayXuLy,
            string toNhaMay, string ghichuXuLy, string updateBy);

        Task<bool> DeleteGiayDeNghiDMCungCapNuocId(Int32 id, string createBy);

    }
}
