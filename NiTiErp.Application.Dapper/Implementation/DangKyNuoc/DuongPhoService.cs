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
    public class DuongPhoService : IDuongPhoService
    {
        private readonly IConfiguration _configuration;

        public DuongPhoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<DuongPhoViewModel>> Get_DuongPho_ByCor(string corporationId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationId);

                try
                {
                    var query = await sqlConnection.QueryAsync<DuongPhoViewModel>(
                        "Get_DuongPho_ByCor", dynamicParameters, commandType: CommandType.StoredProcedure);

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
