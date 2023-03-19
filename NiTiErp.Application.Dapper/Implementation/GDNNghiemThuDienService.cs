using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System.Linq;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class GDNNghiemThuDienService : IGDNNghiemThuDienService
    {
        private readonly IConfiguration _configuration;

        public GDNNghiemThuDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNNghiemThuDienViewModel> Get_GDNNghiemThuDien_ByGDNDMCCDienId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", id);

                var result = await sqlConnection.QueryAsync<GDNNghiemThuDienViewModel>("Get_GDNNghiemThuDien_ByGDNDMCCDienId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNNghiemThuDien(GDNNghiemThuDienViewModel gdnntdien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdnntdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayDuyet", gdnntdien.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdnntdien.TenNhanVienDuyet);
                dynamicParameters.Add("@KetLuan", gdnntdien.KetLuanChayThu);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNNghiemThuDienViewModel>(
                        "Create_GDNNghiemThuDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpGDNNghiemThuDien(GDNNghiemThuDienViewModel gdnntdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdnntdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayDuyet", gdnntdien.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdnntdien.TenNhanVienDuyet);
                dynamicParameters.Add("@KetLuan", gdnntdien.KetLuanChayThu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNNghiemThuDienViewModel>(
                        "Update_GDNNghiemThuDien_ByGDNDMIdDuyetNT", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
