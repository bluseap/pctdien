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
    public class GDNNghiemThuNuocService : IGDNNghiemThuNuocService
    {
        private readonly IConfiguration _configuration;

        public GDNNghiemThuNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNNghiemThuNuocViewModel> Get_GDNNghiemThuNuoc_ByGDNDMCCNuocId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", id);

                var result = await sqlConnection.QueryAsync<GDNNghiemThuNuocViewModel>("Get_GDNNghiemThuNuoc_ByGDNDMCCNuocId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNNghiemThuNuoc(GDNNghiemThuNuocViewModel gdnntnuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdnntnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayDuyet", gdnntnuoc.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdnntnuoc.TenNhanVienDuyet);
                dynamicParameters.Add("@KetLuan", gdnntnuoc.KetLuan);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNNghiemThuNuocViewModel>(
                        "Create_GDNNghiemThuNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpGDNNghiemThuNuoc(GDNNghiemThuNuocViewModel gdnntnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdnntnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayDuyet", gdnntnuoc.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdnntnuoc.TenNhanVienDuyet);
                dynamicParameters.Add("@KetLuan", gdnntnuoc.KetLuan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNNghiemThuNuocViewModel>(
                        "Update_GDNNghiemThuNuoc_ByGDNDMIdDuyetNT", dynamicParameters, commandType: CommandType.StoredProcedure);
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
