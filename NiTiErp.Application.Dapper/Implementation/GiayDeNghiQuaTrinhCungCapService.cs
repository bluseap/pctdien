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
    public class GiayDeNghiQuaTrinhCungCapService : IGiayDeNghiQuaTrinhCungCapService
    {
        private readonly IConfiguration _configuration;

        public GiayDeNghiQuaTrinhCungCapService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PagedResult<GiayDeNghiQuaTrinhCungCapViewModel>> Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc(bool isNuoc, Int32 gdnDMCCNuocId,
            Int32 gdnDMCCDienId, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@IsGiayDeNghiNuoc", isNuoc);

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdnDMCCNuocId);
                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdnDMCCDienId);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiQuaTrinhCungCapViewModel>("Get_GiayDeNghiQuaTrinhCungCap_ByIsNuoc", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiQuaTrinhCungCapViewModel>()
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
