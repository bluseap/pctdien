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
    public class DotInHDService : IDotInHDService
    {
        private readonly IConfiguration _configuration;

        public DotInHDService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<DotInHDViewModel>> Get_DotInHD_ByCorporationId(string corpotationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@CorporationId", corpotationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<DotInHDViewModel>(
                        "Get_DotInHD_ByCorporationId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<DotInHDViewModel>> Get_DotInHD_ByCorporationIdPO(string corpotationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@CorporationId", corpotationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<DotInHDViewModel>(
                        "Get_DotInHD_ByCorporationIdPO", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<DotInHDViewModel>> Get_DotInHD_ByMakv(string makv)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@Makv", makv);

                try
                {
                    var query = await sqlConnection.QueryAsync<DotInHDViewModel>(
                        "Get_DotInHD_ByMakv", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<DotInHDViewModel>> Get_DotInHD_ByMakvPo(string makvpo)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@MakvPo", makvpo);

                try
                {
                    var query = await sqlConnection.QueryAsync<DotInHDViewModel>(
                        "Get_DotInHD_ByMakvPo", dynamicParameters, commandType: CommandType.StoredProcedure);

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
