using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;

namespace NiTiErp.Application.Dapper.Implementation.DangKyNuoc
{
    public class NhanVienService : INhanVienService
    {
        private readonly IConfiguration _configuration;

        public NhanVienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<NhanVienViewModel> Get_NhanVien_ByMaNV(string manv, string corporationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MANV", manv);
                dynamicParameters.Add("@CorporationId", corporationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<NhanVienViewModel>(
                        "Get_NhanVien_ByMaNV", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<NhanVienViewModel>> Get_NhanVien_ByMaKV(string corporationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                
                dynamicParameters.Add("@CorporationId", corporationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<NhanVienViewModel>(
                        "Get_NhanVien_ByMaKV", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
