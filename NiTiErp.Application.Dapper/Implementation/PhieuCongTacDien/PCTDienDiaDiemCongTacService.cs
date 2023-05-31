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
    public class PCTDienDiaDiemCongTacService : IPCTDienDiaDiemCongTacService
    {
        private readonly IConfiguration _configuration;

        public PCTDienDiaDiemCongTacService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTDienDiaDiemCongTacViewModel> PCTD_Get_PCTDienDiaDiemCongTac_ById(int Id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", Id);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDienDiaDiemCongTacViewModel>(
                        "PCTD_Get_PCTDienDiaDiemCongTac_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }        

        public async Task<List<PCTDienDiaDiemCongTacViewModel>> PCTD_Get_PCTDienDiaDiemCongTac_ByCode(string code)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", code);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDienDiaDiemCongTacViewModel>(
                        "PCTD_Get_PCTDienDiaDiemCongTac_ByCode", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<PCTDienDiaDiemCongTacViewModel>> PCTD_Get_PCTDienDiaDiemCongTac_ByDienId(int pctdienid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienId", pctdienid);

                try
                {
                    var query = await sqlConnection.QueryAsync<PCTDienDiaDiemCongTacViewModel>(
                        "PCTD_Get_PCTDienDiaDiemCongTac_ByDienId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Create_PCTDienDiaDiemCongTac(PCTDienDiaDiemCongTacViewModel pctdiendiadiemcongtac, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@PCTDienCode", pctdiendiadiemcongtac.PCTDienCode);

                dynamicParameters.Add("@TramBienApDuongDay", pctdiendiadiemcongtac.TramBienApDuongDay);
                dynamicParameters.Add("@SoTru", pctdiendiadiemcongtac.SoTru);
                dynamicParameters.Add("@GhiChuHoTen", pctdiendiadiemcongtac.GhiChuHoTen);
                dynamicParameters.Add("@NgayNhap", pctdiendiadiemcongtac.NgayNhap);
                dynamicParameters.Add("@Stt", pctdiendiadiemcongtac.Stt);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienDiaDiemCongTacViewModel>(
                        "PCTD_Create_PCTDienDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
               
        public async Task<bool> PCTD_Delete_PCTDienDiaDiemCongTac(int Id, DateTime updateDate, string updateBy)
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
                    await sqlConnection.QueryAsync<PCTDienDiaDiemCongTacViewModel>(
                        "PCTD_Delete_PCTDienDiaDiemCongTac", dynamicParameters, commandType: CommandType.StoredProcedure);
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
