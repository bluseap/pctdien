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
    public class DongHoService : IDongHoService
    {
        private readonly IConfiguration _configuration;

        public DongHoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<DongHoViewModel> Get_DongHo_ByMaDongHo(string madongho, string Corporation)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", Corporation);
                dynamicParameters.Add("@MADONGHO", madongho);

                try
                {
                    var query = await sqlConnection.QueryAsync<DongHoViewModel>(
                        "Get_DongHo_ByMaDongHo", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<DongHoViewModel>> Get_DongHo_ByChuaSuDung(string khuvuc, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);                
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DongHoViewModel>("Get_DongHo_ByChuaSuDung", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DongHoViewModel>()
                    {
                        Results = result.ToList(),
                        CurrentPage = page,
                        RowCount = totalRow,
                        PageSize = pageSize
                    };
                    return pagedResult;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }


    }
}
