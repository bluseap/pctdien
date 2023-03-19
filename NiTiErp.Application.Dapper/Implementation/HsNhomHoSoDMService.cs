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
    public class HsNhomHoSoDMService : IHsNhomHoSoDMService
    {
        private readonly IConfiguration _configuration;

        public HsNhomHoSoDMService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HsNhomHoSoDMViewModel> Get_HsNhomHoSoDM_ById(int hsnhomhosodmid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsNhomHoSoDMId", hsnhomhosodmid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsNhomHoSoDMViewModel>(
                        "Get_HsNhomHoSoDM_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<HsNhomHoSoDMViewModel>> Get_HsNhomHoSoDM_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<HsNhomHoSoDMViewModel>("Get_HsNhomHoSoDM_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<HsNhomHoSoDMViewModel>()
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

        public async Task<List<HsNhomHoSoDMViewModel>> Get_HsNhomHoSoDM_ByCor(string corporationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsNhomHoSoDMViewModel>(
                        "Get_HsNhomHoSoDM_ByCor", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HsNhomHoSoDM(HsNhomHoSoDMViewModel nhomhs,
            DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", nhomhs.CorporationId);

                dynamicParameters.Add("@Ten", nhomhs.Ten);
                dynamicParameters.Add("@SttNhom", nhomhs.SttNhom);                

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<HsNhomHoSoDMViewModel>(
                        "Create_HsNhomHoSoDM", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsNhomHoSoDM(HsNhomHoSoDMViewModel nhomhs, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", nhomhs.Id);

                dynamicParameters.Add("@CorporationId", nhomhs.CorporationId);

                dynamicParameters.Add("@Ten", nhomhs.Ten);
                dynamicParameters.Add("@SttNhom", nhomhs.SttNhom);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<HsNhomHoSoDMViewModel>(
                        "Update_HsNhomHoSoDM", dynamicParameters, commandType: CommandType.StoredProcedure);
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
