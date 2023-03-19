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
    public class MauThietKeService : IMauThietKeService
    {
        private readonly IConfiguration _configuration;

        public MauThietKeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<MauThietKeViewModel>> Get_MauThietKe_ByNuocOrder9(string CorporationId, string loaidv, int order)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", CorporationId);
                dynamicParameters.Add("@LoaiDV", loaidv);
                dynamicParameters.Add("@Order", order);

                try
                {
                    var query = await sqlConnection.QueryAsync<MauThietKeViewModel>(
                        "Get_MauThietKe_ByNuocOrder9", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

    }
}
