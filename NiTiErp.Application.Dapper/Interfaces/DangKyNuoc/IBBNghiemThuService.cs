using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IBBNghiemThuService
    {
        Task<List<BBNghiemThuViewModel>> Get_BBNghiemThu_ByDSNhanHoSo(string MADDK, string CorporationId, string PhongDanhMucId,
            DateTime TuNgay, DateTime DenNgay);

        Task<List<BBNghiemThuViewModel>> Get_BBNghiemThu_ByDSChuyenKeToan(string MADDK, string CorporationId, string PhongDanhMucId,
            DateTime TuNgay, DateTime DenNgay);

        Task<BBNghiemThuViewModel> Get_BBNghiemThu_ByMaDon(string maddk);

        Task<bool> Create_BBNghiemThu(BBNghiemThuViewModel nghiemthu, DateTime createDate, string createBy);

        Task<bool> Update_BBNghiemThu(BBNghiemThuViewModel nghiemthu, DateTime updateDate, string updateBy);
    }
}
