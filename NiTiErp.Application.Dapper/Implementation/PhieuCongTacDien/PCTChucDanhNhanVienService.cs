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
    public class PCTChucDanhNhanVienService : IPCTChucDanhNhanVienService
    {
        private readonly IConfiguration _configuration;

        public PCTChucDanhNhanVienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTChucDanhNhanVienViewModel> PCTD_Get_PCTChucDanhNhanVien_ById(int Id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", Id);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTChucDanhNhanVienViewModel>(
                        "PCTD_Get_PCTChucDanhNhanVien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTChucDanhNhanVienViewModel>> PCTD_Get_PCTChucDanhNhanVien_ByHoSoNhanVienId(Guid HoSoNhanVienId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HoSoNhanVienId", HoSoNhanVienId);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTChucDanhNhanVienViewModel>(
                        "PCTD_Get_PCTChucDanhNhanVien_ByHoSoNhanVienId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Create_PCTChucDanhNhanVien(PCTChucDanhNhanVienViewModel pctchucdanhnhanvien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HoSoNhanVienId", pctchucdanhnhanvien.HoSoNhanVienId);

                dynamicParameters.Add("@CodeChucDanh", pctchucdanhnhanvien.CodeChucDanh);
                dynamicParameters.Add("@TenChucDanh", pctchucdanhnhanvien.TenChucDanh);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTChucDanhNhanVienViewModel>(
                        "PCTD_Create_PCTChucDanhNhanVien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Delete_PCTChucDanhNhanVien(int ChucDanhNhanVienId, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", ChucDanhNhanVienId);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTChucDanhNhanVienViewModel>(
                        "PCTD_Delete_PCTChucDanhNhanVien", dynamicParameters, commandType: CommandType.StoredProcedure);
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
