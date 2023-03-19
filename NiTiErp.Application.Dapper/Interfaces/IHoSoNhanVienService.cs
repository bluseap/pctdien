using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHoSoNhanVienService
    {
        Task<HoSoNhanVienViewModel> Get_HoSoNhanVien_ByUserName(string username);

        Task<List<HoSoNhanVienViewModel>> Get_HoSoNhanVien_ByCorId(string corporationid);

        Task<List<HoSoNhanVienViewModel>> Get_HoSoNhanVien_ById(string hosonhanvienid);

        Task<PagedResult<HoSoNhanVienViewModel>> Get_HoSoNhanVien_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize);

        Task<PagedResult<HoSoNhanVienViewModel>> GetAllHoSoNhanVienPaging(string corporationId, string phongId, string keyword, int page, int pageSize,
            string hosoId, string hosoId2, string hosoId3, string parameters);

        Task<List<HoSoNhanVienViewModel>> HoSoNhanVienGetList(string corporationId, string phongId, string keyword, string hosoId, string hosoId2, string hosoId3, string parameters);

        Task<IEnumerable<dynamic>> HoSoDataTable(string corporationId, string phongId, string keyword, string hosoId, string hosoId2, string hosoId3, string parameters);

        Task<IQueryable<HoSoNhanVienViewModel>> HoSoDataTableQuery(string corporationId, string phongId, string keyword, string hosoId, string hosoId2, string hosoId3, string parameters);

        Task<Boolean> HoSoNhanVienAUD(HoSoNhanVienViewModel hosonhanvien, string parameters);

        Task<bool> Update_HoSoNhanVien_DaoTaoHV(HoSoNhanVienViewModel hosohocvien, DateTime updateDate, string updateBy);

        Task<bool> Update_HoSoNhanVien_ByBacATD(string HoSoNhanVienId, int BacAnToanDienId, DateTime updateDate, string updateBy);
    }
}