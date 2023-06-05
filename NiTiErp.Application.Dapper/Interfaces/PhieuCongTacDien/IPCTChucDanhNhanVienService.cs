using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System;

namespace NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien
{
    public interface IPCTChucDanhNhanVienService
    {
        Task<PCTChucDanhNhanVienViewModel> PCTD_Get_PCTChucDanhNhanVien_ById(int id);

        Task<List<PCTChucDanhNhanVienViewModel>> PCTD_Get_PCTChucDanhNhanVien_ByHoSoNhanVienId(Guid HoSoNhanVienId);

        Task<bool> PCTD_Create_PCTChucDanhNhanVien(PCTChucDanhNhanVienViewModel pctchucdanhnhanvien, DateTime createDate, string createBy);

        Task<bool> PCTD_Delete_PCTChucDanhNhanVien(int ChucDanhNhanVienId, DateTime updateDate, string updateBy);
    }
}
