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
    public class ChiTietThietKeService : IChiTietThietKeService
    {
        private readonly IConfiguration _configuration;

        public ChiTietThietKeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<ChiTietThietKeViewModel>> Get_ChiTietThietKe_ByMaddk(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<ChiTietThietKeViewModel>(
                        "Get_ChiTietThietKe_ByMaddk", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ChiTietThietKe_ByMaddkMaVatTu(string MADDK, string MaVatTu, string KhoiLuong, 
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@MaVatTu", MaVatTu);
                dynamicParameters.Add("@KhoiLuong", KhoiLuong);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ChiTietThietKeViewModel>(
                         "Update_ChiTietThietKe_ByMaddkMaVatTu", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_ChiTietThietKe(string MADDK, string MaVatTu, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@MaVatTu", MaVatTu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ChiTietThietKeViewModel>(
                         "Delete_ChiTietThietKe", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_ChiTietThietKe_ByMaddkMaVatTu(string MADDK, string MAVATTU, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@MAVATTU", MAVATTU);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<ChiTietThietKeViewModel>(
                         "Create_ChiTietThietKe_ByMaddkMaVatTu", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_ChiTietThietKe_ByMaddkMauTK(string MADDK, string MauBocVatTuId, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@MauBocVatTuId", MauBocVatTuId);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<ChiTietThietKeViewModel>(
                         "Create_ChiTietThietKe_ByMaddkMauTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }


    }
}
