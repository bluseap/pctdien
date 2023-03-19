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
    public class TTDMDangKyService : ITTDMDangKyService
    {
        private readonly IConfiguration _configuration;

        public TTDMDangKyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TTDMDangKyViewModel> Get_TTDMDangKy_ById(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDMDangKyId", id);

                var result = await sqlConnection.QueryAsync<TTDMDangKyViewModel>("Get_TTDMDangKy_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<List<TTDMDangKyViewModel>> Get_TTDMDangKy_ByTenCot(string tenCot)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TenCot", tenCot);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDMDangKyViewModel>(
                        "Get_TTDMDangKy_ByTenCot", dynamicParameters, commandType: CommandType.StoredProcedure);
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
