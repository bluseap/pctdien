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
    public class GDNThiCongNuocService : IGDNThiCongNuocService
    {
        private readonly IConfiguration _configuration;

        public GDNThiCongNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNThiCongNuocViewModel> Get_GDNThiCongNuoc_ByGDNDMCCNuocId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", id);

                var result = await sqlConnection.QueryAsync<GDNThiCongNuocViewModel>("Get_GDNThiCongNuoc_ByGDNDMCCNuocId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNThiCongNuoc(GDNThiCongNuocViewModel gdntcnuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntcnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayDuyet", gdntcnuoc.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntcnuoc.TenNhanVienDuyet);
                dynamicParameters.Add("@GhiChu", gdntcnuoc.GhiChu);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThiCongNuocViewModel>(
                        "Create_GDNThiCongNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpGDNThiCongNuoc(GDNThiCongNuocViewModel gdntcnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntcnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayDuyet", gdntcnuoc.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntcnuoc.TenNhanVienDuyet);
                dynamicParameters.Add("@GhiChu", gdntcnuoc.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThiCongNuocViewModel>(
                        "Update_GDNThiCongNuoc_ByGDNDMIdDuyetTC", dynamicParameters, commandType: CommandType.StoredProcedure);
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
