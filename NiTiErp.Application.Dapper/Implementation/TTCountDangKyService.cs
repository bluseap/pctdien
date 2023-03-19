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
    public class TTCountDangKyService : ITTCountDangKyService
    {
        private readonly IConfiguration _configuration;

        public TTCountDangKyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<TTCountDangKyViewModel>> Get_TTCountDangKy_ByList()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();               

                try
                {
                    var query = await sqlConnection.QueryAsync<TTCountDangKyViewModel>(
                        "Get_TTCountDangKy", dynamicParameters, commandType: CommandType.StoredProcedure);

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
