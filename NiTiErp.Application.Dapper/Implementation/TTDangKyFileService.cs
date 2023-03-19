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
using System.Xml;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class TTDangKyFileService : ITTDangKyFileService
    {
        private readonly IConfiguration _configuration;

        public TTDangKyFileService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TTDangKyFileViewModel> Get_TTDangKyFile_ById(Int64 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileId", id);

                var result = await sqlConnection.QueryAsync<TTDangKyFileViewModel>("Get_TTDangKyFile_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByDangKyId(int ttdangkyId, Guid codeid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyId", ttdangkyId);
                dynamicParameters.Add("@TTDangKyCodeId", codeid);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Get_TTDangKyFile_ByDangKyId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByDangKy(int ttdangkyId, string ttdangkyCode)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyId", ttdangkyId);
                dynamicParameters.Add("@TTDangKyCode", ttdangkyCode);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Get_TTDangKyFile_ByDangKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByAll()
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();               

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Get_TTDangKyFile_ByAll", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyFile_ByImageFile64(Int64 ttdangkyfileId, string imagefile)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileId", ttdangkyfileId);
                dynamicParameters.Add("@ImageFile", imagefile);
                
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Update_TTDangKyFile_ByImageFile64", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_TTDangKyFile(Guid codeId, string dangkyfileXML, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeId", codeId);
                dynamicParameters.Add("@DangKyFileXML", dangkyfileXML);                

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Create_TTDangKyFile", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_TTDangKyFile2(Guid codeId, string dangkyfileXML, byte[] imgebyte, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeId", codeId);
                dynamicParameters.Add("@DangKyFileXML", dangkyfileXML);

                dynamicParameters.Add("@imgebyte", imgebyte);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Create_TTDangKyFile2", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_TTDangKyFileImage(string ImageFile, Guid NewGuid, string Tenfile)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ImageFile", ImageFile);
                dynamicParameters.Add("@NewGuid", NewGuid);
                dynamicParameters.Add("@Tenfile", Tenfile);
              
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Create_TTDangKyFileImage", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyFile_ByCodeId(Guid codeId, string filename, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeId", codeId);
                dynamicParameters.Add("@TenFile", filename);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Update_TTDangKyFile_ByCodeId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_TTDangKyFile_ByCodeIdFileName(Guid codeId, string filename, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeId", codeId);
                dynamicParameters.Add("@TenFile", filename);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<TTDangKyFileViewModel>(
                        "Delete_TTDangKyFile_ByCodeIdFileName", dynamicParameters, commandType: CommandType.StoredProcedure);
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
