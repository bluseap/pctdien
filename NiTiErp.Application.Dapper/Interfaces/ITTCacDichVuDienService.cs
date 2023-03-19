using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTCacDichVuDienService
    {
        Task<TTCacDichVuDienViewModel> Get_TTCacDichVuDien_ById(int id);

        Task<TTCacDichVuDienViewModel> Get_TTCacDichVuDien_ByIdNoTest(int id);

        Task<List<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
            DateTime TuNgay, DateTime DenNgay);

        Task<PagedResult<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_AllPaging(int tinh, int quanhuyen, string keyword,
            int page, int pageSize);

        Task<PagedResult<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_AllPagingTT(int tinh, int quanhuyen,
            string theotrangthai, string keyword, int page, int pageSize);

        Task<PagedResult<TTCacDichVuDienViewModel>> Create_TTCacDichVuDien(Guid codeid, TTCacDichVuDienViewModel cacdichvudien, DateTime createDate, string createBy);

        Task<bool> Update_TTCacDichVuDien_ById(TTCacDichVuDienViewModel dichvudien,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuDien_ByTuChoi(int dichvudienId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuDien_ByPhucHoiTuChoi(int dichvudienId, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuDien_ByXacNhan(int dichvudienId, DateTime NgayXacNhan, string LyDoXacNhan,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_TTCacDichVuDien(int id, DateTime updateDate, string updateBy);
    }
}
