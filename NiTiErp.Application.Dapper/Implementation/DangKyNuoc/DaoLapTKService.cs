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
    public class DaoLapTKService : IDaoLapTKService
    {
        private readonly IConfiguration _configuration;

        public DaoLapTKService(IConfiguration configuration)
        {
            _configuration = configuration;
        }    

        public async Task<List<DaoLapTKViewModel>> Get_DaoLapTK_ByMaddk(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                        "Get_DaoLapTK_ByMaddk", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_DaoLapTK(string maddk, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);                

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Create_DaoLapTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DaoLapTK_MaDonNoiDung(string MADON, string MADDK, string NOIDUNG, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@NOIDUNG", NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Update_DaoLapTK_MaDonNoiDung", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DaoLapTK_MaDonDonGia(string MADON, string MADDK, decimal DONGIACP, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@DONGIACP", DONGIACP);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Update_DaoLapTK_MaDonDonGia", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DaoLapTK_MaDonSoLuong(string MADON, string MADDK, decimal SOLUONG, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@SOLUONG", SOLUONG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Update_DaoLapTK_MaDonSoLuong", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DaoLapTK_MaDonDonViTinh(string MADON, string MADDK, string DONVITINH, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@DONVITINH", DONVITINH);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Update_DaoLapTK_MaDonDonViTinh", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DaoLapTK_MaDonLoaiCP(string MADON, string MADDK, string LOAICP, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@LOAICP", LOAICP);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Update_DaoLapTK_MaDonLoaiCP", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_DaoLapTK(string MADON, string MADDK, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADON", MADON);
                dynamicParameters.Add("@MADDK", MADDK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DaoLapTKViewModel>(
                         "Delete_DaoLapTK", dynamicParameters, commandType: CommandType.StoredProcedure);
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
