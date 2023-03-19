using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTDangKyNuocService
    {
        Task<List<DonDangKyViewModel>> Get_DonDangKy_ByLichSuTTDangKyNuocId(int TTDangKyNuocId);

        Task<TTDangKyNuocViewModel> Get_TTDangKyNuoc_ById(int id);

        Task<TTDangKyNuocViewModel> Get_TTDangKyNuoc_ByIdNoTest(int id);

        Task<List<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
            DateTime TuNgay, DateTime DenNgay);

        Task<PagedResult<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_AllPaging(int tinh, int quanhuyen, string keyword, 
            int page, int pageSize);

        Task<PagedResult<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_AllPagingTT(int tinh, int quanhuyen, string theotrangthai,
            string keyword, int page, int pageSize);

        Task<PagedResult<TTDangKyNuocViewModel>> Create_TTDangKyNuoc(Guid codeid, TTDangKyNuocViewModel dangkynuoc, DateTime createDate, string createBy);

        Task<bool> Update_TTDangKyNuoc_ById(TTDangKyNuocViewModel dangkynuoc,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyNuoc_ByTuChoi(int dangkynuocId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyNuoc_ByPhucHoiTuChoi(int dangkynuocId, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_TTDangKyNuoc(int id, DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyNuoc_ByXacNhanNuoc(int dangkynuocId, DateTime NgayChuyenTK, string LyDoChuyenTK,
            DateTime updateDate, string updateBy);
    }
}
