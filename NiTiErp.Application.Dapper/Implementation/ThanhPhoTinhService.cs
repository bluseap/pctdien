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
using System.Linq;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class ThanhPhoTinhService : IThanhPhoTinhService
    {
        private readonly IConfiguration _configuration;

        public ThanhPhoTinhService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<ThanhPhoTinhViewModel>> ThanhPhoTinhGetList(string bangId, string id2, string id3, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@bangId", bangId);
                dynamicParameters.Add("@id2", id2);
                dynamicParameters.Add("@id3", id3);
                dynamicParameters.Add("@parameters", parameters);

                try
                {
                    var query = await sqlConnection.QueryAsync<ThanhPhoTinhViewModel>(
                        "BangDanhMucGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<ThanhPhoTinhViewModel> Get_ThanhPhoTinh_ById(int thanhphotinhid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThanhPhoTinhId", thanhphotinhid);

                try
                {
                    var query = await sqlConnection.QueryAsync<ThanhPhoTinhViewModel>(
                        "Get_ThanhPhoTinh_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<ThanhPhoTinhViewModel>> Get_ThanhPhoTinh_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();               

                try
                {
                    var query = await sqlConnection.QueryAsync<ThanhPhoTinhViewModel>(
                        "Get_ThanhPhoTinh_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);
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
