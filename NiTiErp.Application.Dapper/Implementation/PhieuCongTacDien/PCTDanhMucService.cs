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
    public class PCTDanhMucService : IPCTDanhMucService
    {
        private readonly IConfiguration _configuration;

        public PCTDanhMucService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTDanhMucViewModel> PCTD_Get_PCTDanhMuc_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);

                var result = await sqlConnection.QueryAsync<PCTDanhMucViewModel>("PCTD_Get_PCTDanhMuc_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<PagedResult<PCTDanhMucViewModel>> PCTD_Get_PCTDanhMuc_AllPaging(string code, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", code);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<PCTDanhMucViewModel>("PCTD_Get_PCTDanhMuc_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<PCTDanhMucViewModel>()
                    {
                        Results = result.ToList(),
                        CurrentPage = page,
                        RowCount = totalRow,
                        PageSize = pageSize
                    };
                    return pagedResult;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTDanhMucViewModel>> PCTD_Get_PCTDanhMuc_ByCode(string code)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", code);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDanhMucViewModel>(
                        "PCTD_Get_PCTDanhMuc_ByCode", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }        

        public async Task<bool> PCTD_Create_PCTDanhMuc(PCTDanhMucViewModel pctdanhmuc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", pctdanhmuc.Code);
                dynamicParameters.Add("@NgayNhap", pctdanhmuc.NgayNhap);  
                dynamicParameters.Add("@TenNoiDung", pctdanhmuc.TenNoiDung);
                dynamicParameters.Add("@Stt", pctdanhmuc.Stt);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<PCTDanhMucViewModel>(
                        "PCTD_Create_PCTDanhMuc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDanhMuc(PCTDanhMucViewModel pctdanhmuc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdanhmuc.Id);

                dynamicParameters.Add("@Code", pctdanhmuc.Code);
                dynamicParameters.Add("@NgayNhap", pctdanhmuc.NgayNhap);
                dynamicParameters.Add("@TenNoiDung", pctdanhmuc.TenNoiDung);
                dynamicParameters.Add("@Stt", pctdanhmuc.Stt);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<PCTDanhMucViewModel>(
                        "PCTD_Update_PCTDanhMuc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Delete_PCTDanhMuc(int Id, DateTime updateDate, string updateBy)
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
                    await sqlConnection.QueryAsync<PCTDanhMucViewModel>(
                        "PCTD_Delete_PCTDanhMuc", dynamicParameters, commandType: CommandType.StoredProcedure);
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
