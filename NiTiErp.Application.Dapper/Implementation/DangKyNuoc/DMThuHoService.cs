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
    public class DMThuHoService : IDMThuHoService
    {
        private readonly IConfiguration _configuration;

        public DMThuHoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<DMThuHoViewModel>> Get_DMThuHo_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                try
                {
                    var query = await sqlConnection.QueryAsync<DMThuHoViewModel>(
                        "Get_DMThuHo_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);

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
