using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;
using NiTiErp.Utilities.Dtos;
using System.Linq;

namespace NiTiErp.Application.Dapper.Implementation.PhieuCongTacDien
{
    public class PCTNhanVienCongTacService : IPCTNhanVienCongTacService
    {
        private readonly IConfiguration _configuration;

        public PCTNhanVienCongTacService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByPCTDienIdInPCT(int pctdien)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienId", pctdien);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTNhanVienCongTacViewModel>(
                        "PCTD_Get_PCTNhanVienCongTac_ByPCTDienIdInPCT", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByPCTDienId(int pctdien)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienId", pctdien);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTNhanVienCongTacViewModel>(
                        "PCTD_Get_PCTNhanVienCongTac_ByPCTDienId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTNhanVienCongTacViewModel>> PCTD_Get_PCTNhanVienCongTac_ByCode(string code)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", code);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTNhanVienCongTacViewModel>(
                        "PCTD_Get_PCTNhanVienCongTac_ByCode", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Create_PCTNhanVienCongTac(PCTNhanVienCongTacViewModel pctnhanviencongtac, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienCode", pctnhanviencongtac.PCTDienCode);
                dynamicParameters.Add("@TenNhanVienCongTacId", pctnhanviencongtac.TenNhanVienCongTacId);           

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTNhanVienCongTacViewModel>(
                        "PCTD_Create_PCTNhanVienCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Delete_PCTNhanVienCongTac(int Id, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", Id);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTNhanVienCongTacViewModel>(
                        "PCTD_Delete_PCTNhanVienCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
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
