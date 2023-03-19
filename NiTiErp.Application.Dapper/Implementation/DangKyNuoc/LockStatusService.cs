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
    public class LockStatusService : ILockStatusService
    {
        private readonly IConfiguration _configuration;

        public LockStatusService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<LockStatusViewModel> Get_LockStatus_ByMaDPKyThay(string makhachhang, int thang, int nam)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MaKhachHang", makhachhang);
                dynamicParameters.Add("@Thang", thang);
                dynamicParameters.Add("@Nam", nam);

                try
                {
                    var query = await sqlConnection.QueryAsync<LockStatusViewModel>(
                        "Get_LockStatus_ByMaDPKyThay", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
