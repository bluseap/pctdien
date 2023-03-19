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
    public class HsChiTietBoHoSoService : IHsChiTietBoHoSoService
    {
        private readonly IConfiguration _configuration;

        public HsChiTietBoHoSoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<HsChiTietBoHoSoViewModel>> Get_HsChiTietBoHoSo_ByHsBoHoSoId(Int32 hsbohosoid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
               
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoId", hsbohosoid);
                
                try
                {
                    var query = await sqlConnection.QueryAsync<HsChiTietBoHoSoViewModel>(
                        "Get_HsChiTietBoHoSo_ByHsBoHoSoId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HsChiTietBoHoSo(Int32 BoHoSoId, string CodeMa, string MaKhachHang,
            DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@BoHoSoId", BoHoSoId);
                dynamicParameters.Add("@CodeMa", CodeMa);
                dynamicParameters.Add("@MaKhachHang", MaKhachHang);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChiTietBoHoSoViewModel>(
                        "Create_HsChiTietBoHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_HsChiTietBoHoSo(Int32 chitietbohosiId, string createBy, DateTime createDate)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ChiTietBoHoSoId", chitietbohosiId);

                dynamicParameters.Add("@CreateBy", createBy);
                dynamicParameters.Add("@CreateDate", createDate);

                try
                {
                    await sqlConnection.QueryAsync<HsChiTietBoHoSoViewModel>(
                        "Delete_HsChiTietBoHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);
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
