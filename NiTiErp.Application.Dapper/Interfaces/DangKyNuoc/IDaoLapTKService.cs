using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IDaoLapTKService
    {       
        Task<List<DaoLapTKViewModel>> Get_DaoLapTK_ByMaddk(string maddk);

        Task<bool> Update_DaoLapTK_MaDonNoiDung(string MADON, string MADDK, string NOIDUNG, DateTime updateDate, string updateBy);

        Task<bool> Update_DaoLapTK_MaDonDonGia(string MADON, string MADDK, decimal DONGIACP, DateTime updateDate, string updateBy);

        Task<bool> Update_DaoLapTK_MaDonSoLuong(string MADON, string MADDK, decimal SOLUONG, DateTime updateDate, string updateBy);

        Task<bool> Update_DaoLapTK_MaDonDonViTinh(string MADON, string MADDK, string DONVITINH, DateTime updateDate, string updateBy);

        Task<bool> Update_DaoLapTK_MaDonLoaiCP(string MADON, string MADDK, string LOAICP, DateTime updateDate, string updateBy);

        Task<bool> Create_DaoLapTK(string maddk, DateTime createDate, string createBy);

        Task<bool> Delete_DaoLapTK(string MADON, string MADDK, DateTime updateDate, string updateBy);
    }
}
