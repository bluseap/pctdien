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

namespace NiTiErp.Application.Dapper.Implementation
{
    public class BacAnToanDienService : IBacAnToanDienService
    {
        private readonly IConfiguration _configuration;

        public BacAnToanDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<BacAnToanDienViewModel>> Get_BacAnToanDien_All(bool active)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Active", active);

                try
                {
                    var query = await sqlConnection.QueryAsync<BacAnToanDienViewModel>(
                        "Get_BacAnToanDien_All", dynamicParameters, commandType: CommandType.StoredProcedure);

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
