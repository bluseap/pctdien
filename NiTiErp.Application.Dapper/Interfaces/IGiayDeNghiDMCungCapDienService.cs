using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IGiayDeNghiDMCungCapDienService
    {
        Task<GiayDeNghiDMCungCapDienViewModel> Get_GiayDeNghiDMCungCapDien_ById(Int32 id);

        Task<GiayDeNghiDMCungCapDienViewModel> Get_GiayDeNghiCungCapDien_ById(int giaydenghiid);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiCungCapDien_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_Tim(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTTK(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTTC(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTNT(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTKTKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTXLKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize);

        Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByCodeXuLy(Guid codeXyLy);

        Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByGDNId(int giaydenghiId);

        Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByGDNId1Top(int giaydenghiId);

        Task<bool> CreateGiayDeNghiDMCungCapDienByCodeXuLy(Guid CodeXuLy, int DMCungCapDichVuId, DateTime createDate, string createBy);

        Task<bool> CreateGiayDeNghiDMCungCapDien(GiayDeNghiDMCungCapDienViewModel giaydenghi, DateTime createDate, string createBy);

        Task<bool> UpdateGiayDeNghiDMCungCapDien(GiayDeNghiDMCungCapDienViewModel giaydenghi, DateTime updateDate, string updateBy);

        Task<bool> Update_GiayDeNghiDMCungCapDien_ByIdXuLy(int giaydenghiId, Int32 giaydenghidmcungcapdienId, DateTime ngayXuLy,
            string toNhaMay, string ghichuXuLy, string updateBy);

        Task<bool> DeleteGiayDeNghiDMCungCapDienId(Int32 id, string createBy);
    }
}
