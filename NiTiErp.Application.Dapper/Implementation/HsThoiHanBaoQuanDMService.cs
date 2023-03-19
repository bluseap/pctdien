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
    public class HsThoiHanBaoQuanDMService : IHsThoiHanBaoQuanDMService
    {
        private readonly IConfiguration _configuration;

        public HsThoiHanBaoQuanDMService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<HsThoiHanBaoQuanDMViewModel>> Get_HsThoiHanBaoQuanDM_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                try
                {
                    var query = await sqlConnection.QueryAsync<HsThoiHanBaoQuanDMViewModel>(
                        "Get_HsThoiHanBaoQuanDM_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);

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
