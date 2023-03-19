using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;

namespace NiTiErp.Application.Dapper.Implementation.DangKyDien
{
    public class MDSDPOService : IMDSDPOService
    {
        private readonly IConfiguration _configuration;

        public MDSDPOService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<MDSDPOViewModel>> Get_MDSDPO_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                try
                {
                    var query = await sqlConnection.QueryAsync<MDSDPOViewModel>(
                        "Get_MDSDPO_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);

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
