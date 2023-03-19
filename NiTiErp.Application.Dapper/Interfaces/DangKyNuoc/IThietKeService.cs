using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace NiTiErp.Application.Dapper.Interfaces.DangKyNuoc
{
    public interface IThietKeService
    {
        Task<ThietKeViewModel> Get_ThietKe_ByMaDon(string maddk);

        Task<bool> Create_ThietKe(ThietKeViewModel thietke, DateTime createDate, string createBy);

        Task<bool> Update_ThietKe(ThietKeViewModel thietke, DateTime updateDate, string updateBy);

        Task<bool> Update_ThietKe_ByDuyetTK(ThietKeViewModel thietke, DateTime updateDate, string updateBy);

        Task<bool> Update_ThietKe_ByTuChoiTK(ThietKeViewModel thietke, DateTime updateDate, string updateBy);

        Task<bool> Update_ThietKe_ByMauHinhThietKe(string MADDK, string TenKHBenPhai, string DanhSoKHBenPhai,
            string TenKHBenTrai, string DanhSoKHBenTrai, string MauThietKe, DateTime updateDate, string updateBy);


    }
}
