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
    public class KhoDanhMucService: IKhoDanhMucService
    {
        private readonly IConfiguration _configuration;

        public KhoDanhMucService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<KhoDanhMucViewModel>> Get_KhoDanhMuc_ByLoaiVatTu(string corporationid, string loaivattu)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@LoaiVatTuId", loaivattu);

                try
                {
                    var query = await sqlConnection.QueryAsync<KhoDanhMucViewModel>(
                        "Get_KhoDanhMuc_ByLoaiVatTu", dynamicParameters, commandType: CommandType.StoredProcedure);

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
