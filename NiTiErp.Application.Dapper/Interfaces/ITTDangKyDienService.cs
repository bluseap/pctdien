using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTDangKyDienService
    {
        Task<List<DonDangKyPoViewModel>> Get_DonDangKyPo_ByLichSuTTDangKyDienId(int TTDangKyDienId);

        Task<TTDangKyDienViewModel> Get_TTDangKyDien_ById(int id);

        Task<TTDangKyDienViewModel> Get_TTDangKyDien_ByIdNoTest(int id);

        Task<PagedResult<TTDangKyDienViewModel>> Get_TTDangKyDien_AllPaging(int tinh, int quanhuyen, string keyword,
            int page, int pageSize);

        Task<PagedResult<TTDangKyDienViewModel>> Get_TTDangKyDien_AllPagingTT(int tinh, int quanhuyen, string theotrangthai,
            string keyword, int page, int pageSize);

        Task<List<TTDangKyDienViewModel>> Get_TTDangKyDien_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
            DateTime TuNgay, DateTime DenNgay);

        Task<PagedResult<TTDangKyDienViewModel>> Create_TTDangKyDien(Guid codeid, TTDangKyDienViewModel dangkydien, 
            DateTime createDate, string createBy);

        Task<bool> Update_TTDangKyDien_ById(TTDangKyDienViewModel dangkydien,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyDien_ByTuChoi(int dangkydienId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyDien_ByPhucHoiTuChoi(int dangkydienId, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_TTDangKyDien(int id, DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyDien_ByXacNhanDien(int dangkydienId, DateTime NgayChuyenTK, string LyDoChuyenTK,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTDangKyDien_ByAllDienNuocDichVu(DateTime updateDate, string updateBy);
    }
}
