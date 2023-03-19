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
    public class GDNThiCongDienService : IGDNThiCongDienService
    {
        private readonly IConfiguration _configuration;

        public GDNThiCongDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNThiCongDienViewModel> Get_GDNThiCongDien_ByGDNDMCCDienId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", id);

                var result = await sqlConnection.QueryAsync<GDNThiCongDienViewModel>("Get_GDNThiCongDien_ByGDNDMCCDienId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNThiCongDien(GDNThiCongDienViewModel gdntcdien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntcdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayDuyet", gdntcdien.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntcdien.TenNhanVienDuyet);
                dynamicParameters.Add("@GhiChu", gdntcdien.GhiChu);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThiCongDienViewModel>(
                        "Create_GDNThiCongDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpGDNThiCongDien(GDNThiCongDienViewModel gdntcdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntcdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayDuyet", gdntcdien.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntcdien.TenNhanVienDuyet);
                dynamicParameters.Add("@GhiChu", gdntcdien.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThiCongDienViewModel>(
                        "Update_GDNThiCongDien_ByGDNDMIdDuyetTC", dynamicParameters, commandType: CommandType.StoredProcedure);
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
