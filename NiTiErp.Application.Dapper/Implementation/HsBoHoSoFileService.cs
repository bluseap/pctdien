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
    public class HsBoHoSoFileService : IHsBoHoSoFileService
    {
        private readonly IConfiguration _configuration;

        public HsBoHoSoFileService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HsBoHoSoFileViewModel> Get_HsBoHoSoFile_ById(Int32 bohosofileid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoFileId", bohosofileid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsBoHoSoFileViewModel>(
                        "Get_HsBoHoSoFile_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HsBoHoSoFileViewModel>> Get_HsBoHoSoFile_ByHsBoHoSoId(Int32 hsbohosoid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoId", hsbohosoid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsBoHoSoFileViewModel>(
                        "Get_HsBoHoSoFile_ByHsBoHoSoId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HsBoHoSoFile(HsBoHoSoFileViewModel bohosofile, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeId", bohosofile.CodeId);
                dynamicParameters.Add("@HsBoHoSoId", bohosofile.HsBoHoSoId);

                dynamicParameters.Add("@TenFile", bohosofile.TenFile);
                dynamicParameters.Add("@DuongDan", bohosofile.DuongDan);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsBoHoSoFileViewModel>(
                        "Create_HsBoHoSoFile", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsBoHoSoFile(HsBoHoSoFileViewModel bohosofile, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoFileId", bohosofile.Id);

                dynamicParameters.Add("@CodeId", bohosofile.CodeId);
                dynamicParameters.Add("@HsBoHoSoId", bohosofile.HsBoHoSoId);

                dynamicParameters.Add("@TenFile", bohosofile.TenFile);
                dynamicParameters.Add("@DuongDan", bohosofile.DuongDan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsBoHoSoFileViewModel>(
                        "Update_HsBoHoSoFile", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_HsBoHoSoFile(Int32 hsbohosofileId, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoFileId", hsbohosofileId);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsBoHoSoFileViewModel>(
                        "Delete_HsBoHoSoFile", dynamicParameters, commandType: CommandType.StoredProcedure);
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
