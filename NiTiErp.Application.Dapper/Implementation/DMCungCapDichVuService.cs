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
    public class DMCungCapDichVuService : IDMCungCapDichVuService
    {
        private readonly IConfiguration _configuration;

        public DMCungCapDichVuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<DMCungCapDichVuViewModel>> Get_DMCungCapDichVu_ByLoaiDichVuId(int loaidichvuId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@loaidichvuId", loaidichvuId);                

                try
                {
                    var query = await sqlConnection.QueryAsync<DMCungCapDichVuViewModel>(
                        "Get_DMCungCapDichVu_ByLoaiDichVuId", dynamicParameters, commandType: CommandType.StoredProcedure); 

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
