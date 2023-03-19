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
    public class PCTDiaDiemCongTacService : IPCTDiaDiemCongTacService
    {
        private readonly IConfiguration _configuration;

        public PCTDiaDiemCongTacService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTDiaDiemCongTacViewModel> PCTD_Get_PCTDiaDiemCongTac_ById(int Id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", Id);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
                        "PCTD_Get_PCTDiaDiemCongTac_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTDiaDiemCongTacViewModel>> PCTD_Get_PCTDiaDiemCongTac_ByDienId(int pctdienid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienId", pctdienid);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
                        "PCTD_Get_PCTDiaDiemCongTac_ByDienId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Create_PCTDiaDiemCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienId", pctdiadiemcongtac.PCTDienId);

                dynamicParameters.Add("@TenDiaDiemCongTac", pctdiadiemcongtac.TenDiaDiemCongTac);
                dynamicParameters.Add("@GioBatDau", pctdiadiemcongtac.GioBatDau);
                dynamicParameters.Add("@PhutBatDau", pctdiadiemcongtac.PhutBatDau);
                dynamicParameters.Add("@NgayBatDau", pctdiadiemcongtac.NgayBatDau);
                dynamicParameters.Add("@GioKetThuc", pctdiadiemcongtac.GioKetThuc);
                dynamicParameters.Add("@PhutKetThuc", pctdiadiemcongtac.PhutKetThuc);
                dynamicParameters.Add("@NgayKetThuc", pctdiadiemcongtac.NgayKetThuc);
                dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdiadiemcongtac.NguoiChiHuyTrucTiepId);
                dynamicParameters.Add("@NguoiChoPhepId", pctdiadiemcongtac.NguoiChoPhepId);
                dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdiadiemcongtac.TenNguoiChiHuyTrucTiep);
                dynamicParameters.Add("@TenNguoiChoPhep", pctdiadiemcongtac.TenNguoiChoPhep);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
                        "PCTD_Create_PCTDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDiaDiemCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdiadiemcongtac.Id);

                dynamicParameters.Add("@TenDiaDiemCongTac", pctdiadiemcongtac.TenDiaDiemCongTac);
                dynamicParameters.Add("@GioBatDau", pctdiadiemcongtac.GioBatDau);
                dynamicParameters.Add("@PhutBatDau", pctdiadiemcongtac.PhutBatDau);
                dynamicParameters.Add("@NgayBatDau", pctdiadiemcongtac.NgayBatDau);
                dynamicParameters.Add("@GioKetThuc", pctdiadiemcongtac.GioKetThuc);
                dynamicParameters.Add("@PhutKetThuc", pctdiadiemcongtac.PhutKetThuc);
                dynamicParameters.Add("@NgayKetThuc", pctdiadiemcongtac.NgayKetThuc);
                dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdiadiemcongtac.NguoiChiHuyTrucTiepId);
                dynamicParameters.Add("@NguoiChoPhepId", pctdiadiemcongtac.NguoiChoPhepId);
                dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdiadiemcongtac.TenNguoiChiHuyTrucTiep);
                dynamicParameters.Add("@TenNguoiChoPhep", pctdiadiemcongtac.TenNguoiChoPhep);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
                        "PCTD_Update_PCTDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Delete_PCTDiaDiemCongTac(int Id, DateTime updateDate, string updateBy)
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
                    await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
                        "PCTD_Delete_PCTDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
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
