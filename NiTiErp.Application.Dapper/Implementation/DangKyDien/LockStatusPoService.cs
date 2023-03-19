using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;

namespace NiTiErp.Application.Dapper.Implementation.DangKyDien
{
    public class LockStatusPoService : ILockStatusPoService
    {
        private readonly IConfiguration _configuration;

        public LockStatusPoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<LockStatusPoViewModel> Get_LockStatusPo_ByMaDPPoKyThay(string makhachhangpo, int thang, int nam)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MaKhachHangPo", makhachhangpo);
                dynamicParameters.Add("@Thang", thang);
                dynamicParameters.Add("@Nam", nam);

                try
                {
                    var query = await sqlConnection.QueryAsync<LockStatusPoViewModel>(
                        "Get_LockStatusPo_ByMaDPPoKyThay", dynamicParameters, commandType: CommandType.StoredProcedure);

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
