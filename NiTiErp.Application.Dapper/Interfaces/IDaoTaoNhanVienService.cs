using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IDaoTaoNhanVienService
    {
        Task<PagedResult<DaoTaoNhanVienViewModel>> GetAllDaoTaoNhanVienPaging(Guid daotaonhanvienId, Guid hosoId,  Guid DaoTaoLopId,
            string CorporationId, string PhongBanDanhMucId, Guid daotaonhanvienId2, string keyword, int page, int pageSize  , string parameters);

        Task<List<DaoTaoNhanVienViewModel>> DaoTaoNhanVienGetList(Guid daotaonhanvienId, Guid hosoId, Guid DaoTaoLopId,
            string CorporationId, string PhongBanDanhMucId, Guid daotaonhanvienId2, string keyword, int page, int pageSize, string parameters);

        Task<List<DaoTaoNhanVienViewModel>> DaoTaoNhanVienListAUD(Guid daotaonhanvienId, Guid hosoId, Guid DaoTaoLopId, string userId, string parameters);

        Task<Boolean> DaoTaoNhanVienAUD(DaoTaoNhanVienViewModel daotaonhanvien, string parameters);

        Task<List<DaoTaoNhanVienViewModel>> Get_DaoTaoNhanVien_ByLop(Guid daotaolopid);

        Task<List<DaoTaoNhanVienViewModel>> Get_DaoTaoNhanVien_ByHoSoId(Guid hosonhanvienid);

        Task<List<DaoTaoNhanVienViewModel>> Get_DaoTaoNhanVien_ById(Guid daotaonhanvienid);

        Task<bool> Update_DaoTaoNhanVien_ById(DaoTaoNhanVienViewModel daotaonhanvien, DateTime updateDate, string updateBy);
    }
}
