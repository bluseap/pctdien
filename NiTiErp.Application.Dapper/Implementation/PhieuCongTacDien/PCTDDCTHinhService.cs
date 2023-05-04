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
    public class PCTDDCTHinhService : IPCTDDCTHinhService
    {
        private readonly IConfiguration _configuration;

        public PCTDDCTHinhService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTDDCTHinhViewModel> PCTD_Get_PCTDDCTHinh_ById(int Id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", Id);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDDCTHinhViewModel>(
                        "PCTD_Get_PCTDDCTHinh_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTDDCTHinhViewModel>> PCTD_Get_PCTDDCTHinh_ByDiaDiemCongTacId(int pctdiadiemcongtacid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDiaDiemCongTacId", pctdiadiemcongtacid);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDDCTHinhViewModel>(
                        "PCTD_Get_PCTDDCTHinh_ByDiaDiemCongTacId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }        

        public async Task<bool> PCTD_Create_PCTDDCTHinh(PCTDDCTHinhViewModel pctddcthinh, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDiaDiemCongTacId", pctddcthinh.PCTDiaDiemCongTacId);

                dynamicParameters.Add("@TenFileHinh", pctddcthinh.TenFileHinh);
                dynamicParameters.Add("@DuongDan", pctddcthinh.DuongDan);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDDCTHinhViewModel>(
                        "PCTD_Create_PCTDDCTHinh", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        //public async Task<bool> PCTD_Update_PCTDiaDiemCongTac(PCTDiaDiemCongTacViewModel pctdiadiemcongtac, DateTime updateDate, string updateBy)
        //{
        //    using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        await sqlConnection.OpenAsync();
        //        var dynamicParameters = new DynamicParameters();

        //        dynamicParameters.Add("@Id", pctdiadiemcongtac.Id);

        //        dynamicParameters.Add("@TenDiaDiemCongTac", pctdiadiemcongtac.TenDiaDiemCongTac);
        //        dynamicParameters.Add("@GioBatDau", pctdiadiemcongtac.GioBatDau);
        //        dynamicParameters.Add("@PhutBatDau", pctdiadiemcongtac.PhutBatDau);
        //        dynamicParameters.Add("@NgayBatDau", pctdiadiemcongtac.NgayBatDau);
        //        dynamicParameters.Add("@GioKetThuc", pctdiadiemcongtac.GioKetThuc);
        //        dynamicParameters.Add("@PhutKetThuc", pctdiadiemcongtac.PhutKetThuc);
        //        dynamicParameters.Add("@NgayKetThuc", pctdiadiemcongtac.NgayKetThuc);
        //        dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdiadiemcongtac.NguoiChiHuyTrucTiepId);
        //        dynamicParameters.Add("@NguoiChoPhepId", pctdiadiemcongtac.NguoiChoPhepId);
        //        dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdiadiemcongtac.TenNguoiChiHuyTrucTiep);
        //        dynamicParameters.Add("@TenNguoiChoPhep", pctdiadiemcongtac.TenNguoiChoPhep);

        //        dynamicParameters.Add("@UpdateDate", updateDate);
        //        dynamicParameters.Add("@UpdateBy", updateBy);
        //        try
        //        {
        //            await sqlConnection.QueryAsync<PCTDiaDiemCongTacViewModel>(
        //                "PCTD_Update_PCTDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
        //            return true;
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        //}

        public async Task<bool> PCTD_Delete_PCTDDCTHinh(int Id, DateTime updateDate, string updateBy)
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
                    await sqlConnection.QueryAsync<PCTDDCTHinhViewModel>(
                        "PCTD_Delete_PCTDDCTHinh", dynamicParameters, commandType: CommandType.StoredProcedure);
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
