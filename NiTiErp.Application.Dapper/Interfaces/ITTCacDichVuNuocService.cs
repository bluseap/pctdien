using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTCacDichVuNuocService
    {
        Task<TTCacDichVuNuocViewModel> Get_TTCacDichVuNuoc_ById(int id);

        Task<TTCacDichVuNuocViewModel> Get_TTCacDichVuNuoc_ByIdNoTest(int id);

        Task<List<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
            DateTime TuNgay, DateTime DenNgay);

        Task<PagedResult<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_AllPaging(int tinh, int quanhuyen, string keyword,
            int page, int pageSize);

        Task<PagedResult<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_AllPagingTT(int tinh, int quanhuyen,
            string theotrangthai, string keyword, int page, int pageSize);

        Task<PagedResult<TTCacDichVuNuocViewModel>> Create_TTCacDichVuNuoc(Guid codeid, TTCacDichVuNuocViewModel cacdichvunuoc, DateTime createDate, string createBy);

        Task<bool> Update_TTCacDichVuNuoc_ById(TTCacDichVuNuocViewModel dichvunuoc,
           DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuNuoc_ByTuChoi(int dichvunuocId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuNuoc_ByPhucHoiTuChoi(int dichvunuocId, string LyDoTuChoi,
            DateTime updateDate, string updateBy);

        Task<bool> Update_TTCacDichVuNuoc_ByXacNhan(int dichvunuocId, DateTime NgayXacNhan, string LyDoXacNhan,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_TTCacDichVuNuoc(int id, DateTime updateDate, string updateBy);
    }
}
