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
    public class VatTuService : IVatTuService
    {
        private readonly IConfiguration _configuration;

        public VatTuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<VatTuViewModel>> Get_VatTu_ByKhoTimVatTu(string corporationid, string khodanhmuc, string timtenmavattu)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@KhoDanhMucId", khodanhmuc);
                dynamicParameters.Add("@TimTenVatTu", timtenmavattu);

                try
                {
                    var query = await sqlConnection.QueryAsync<VatTuViewModel>(
                        "Get_VatTu_ByKhoTimVatTu", dynamicParameters, commandType: CommandType.StoredProcedure);

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
