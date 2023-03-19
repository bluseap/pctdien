using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IDonDangKyService
    {
        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiThietKe(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiHopDong(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiThiCong(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThietKe(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThietKeDsDieuKienTim(string khuvuc, string phongto,
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByHopDong(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThiCong(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThiCongDsDieuKienTim(string khuvuc, string phongto,
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByNghiemThu(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiNghiemThu(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_AllPaging(string khuvuc, string phongto, string keyword,
            int page, int pageSize);

        Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_AllPagingDsDieuKienTim(string khuvuc, string phongto,
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize);

        Task<List<DonDangKyViewModel>> Get_DonDangKy_ByLichSuDDK(string maddk);

        Task<DonDangKyViewModel> Get_DonDangKy_ByMaDon(string maddk);

        Task<bool> Create_DonDangKy(DonDangKyViewModel dangky, DateTime createDate, string createBy);

        Task<bool> Update_DonDangKy(DonDangKyViewModel dangky, DateTime updateDate, string updateBy);

        Task<bool> Update_DonDangKy_ByXuLyDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy);

        Task<bool> Update_DonDangKy_ByTuChoiDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy);

        Task<bool> Update_DonDangKy_ByPhucHoiTuChoiDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy);

    }
}
