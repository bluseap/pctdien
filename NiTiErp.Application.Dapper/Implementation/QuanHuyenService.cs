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
    public class QuanHuyenService : IQuanHuyenService
    {
        private readonly IConfiguration _configuration;

        public QuanHuyenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<QuanHuyenViewModel>> QuanHuyenGetList(string bangId, string id2, string id3, string parameters)
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
                    var query = await sqlConnection.QueryAsync<QuanHuyenViewModel>(
                        "BangDanhMucGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<QuanHuyenViewModel>> Get_QuanHuyen_ByTinh(int tinh)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThanhPhoTinhId", tinh);                

                try
                {
                    var query = await sqlConnection.QueryAsync<QuanHuyenViewModel>(
                        "Get_QuanHuyen_ByTinh", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<QuanHuyenViewModel> Get_QuanHuyen_ById(int quanhuyenid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@QuanHuyenId", quanhuyenid);

                try
                {
                    var query = await sqlConnection.QueryAsync<QuanHuyenViewModel>(
                        "Get_QuanHuyen_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<QuanHuyenViewModel>> Get_QuanHuyen_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();               

                try
                {
                    var query = await sqlConnection.QueryAsync<QuanHuyenViewModel>(
                        "Get_QuanHuyen_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);

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
