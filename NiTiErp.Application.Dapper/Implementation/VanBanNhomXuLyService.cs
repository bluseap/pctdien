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
    public class VanBanNhomXuLyService : IVanBanNhomXuLyService
    {
        private readonly IConfiguration _configuration;

        public VanBanNhomXuLyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PagedResult<VanBanNhomXuLyViewModel>> GetAllVanBanNhomXuLyPaging(string tennhom, Guid hosonhanvienId,
            string keyword, int page, int pageSize, int vanbannhomxulyid, string ghichu,  string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", vanbannhomxulyid);

                dynamicParameters.Add("@tennhom", tennhom);
                dynamicParameters.Add("@hosonhanvienId", hosonhanvienId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@vanbannhomxulyid", vanbannhomxulyid);
                dynamicParameters.Add("@ghichu", ghichu);

                dynamicParameters.Add("@parameters", parameters);
                try
                {
                    var hoso = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "VanBanNhomXuLyGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    var query = hoso.AsQueryable();

                    int totalRow = query.Count();

                    query = query.OrderByDescending(x => x.CreateDate)
                        .Skip((page - 1) * pageSize).Take(pageSize);

                    var data = query.ToList();

                    var paginationSet = new PagedResult<VanBanNhomXuLyViewModel>()
                    {
                        Results = data,
                        CurrentPage = page,
                        RowCount = totalRow,
                        PageSize = pageSize
                    };
                    return paginationSet;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<Boolean> VanBanNhomXuLyAUD(VanBanNhomXuLyViewModel vanbannhomxuly, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", vanbannhomxuly.Id);

                dynamicParameters.Add("@Ten", vanbannhomxuly.Ten);
                dynamicParameters.Add("@MoTa", vanbannhomxuly.MoTa);
                dynamicParameters.Add("@Stt", vanbannhomxuly.Stt);
                dynamicParameters.Add("@stringHoSoNhanVienId", vanbannhomxuly.StringHoSoId);             

                dynamicParameters.Add("@parameters", parameters);

                try
                {
                    var query = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "VanBanNhomXuLyAUD", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<VanBanNhomXuLyViewModel>> VanBanNhomXuLyGetList(string tennhom, Guid hosonhanvienId,
            string keyword, int vanbannhomxulyid, string ghichu, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", vanbannhomxulyid);

                dynamicParameters.Add("@tennhom", tennhom);
                dynamicParameters.Add("@hosonhanvienId", hosonhanvienId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@vanbannhomxulyid", vanbannhomxulyid);
                dynamicParameters.Add("@ghichu", ghichu);

                dynamicParameters.Add("@parameters", parameters);
                try
                {
                    var query = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "VanBanNhomXuLyGetList", dynamicParameters, commandType: CommandType.StoredProcedure); // @parameter: ChiPhiLoaiGetList

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomXuLy_ByCorCodeNhomXL(string corporationid, string codenhomxuly)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@Code", codenhomxuly);

                try
                {
                    var query = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Get_VanBanNhomXuLy_ByCorCodeNhomXL", dynamicParameters, commandType: CommandType.StoredProcedure); 

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomNhanVien_ByCorCodeNhomXL(string corporationid, string codenhomxuly)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@Code", codenhomxuly);

                try
                {
                    var query = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Get_VanBanNhomNhanVien_ByCorCodeNhomXL", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<VanBanNhomXuLyViewModel>> Get_VanBanNhomNhanVien_ByNhomXuLyId(int nhomxulyid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@VanBanNhomXuLyId", nhomxulyid);

                try
                {
                    var query = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Get_VanBanNhomNhanVien_ByNhomXuLyId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_VanBanNhomXuLy_ByCorCode(VanBanNhomXuLyViewModel nhomxuly, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", nhomxuly.CorporationId);
                dynamicParameters.Add("@CodeNhomXuLy", nhomxuly.Code);
                dynamicParameters.Add("@TenNhomXuLy", nhomxuly.Ten);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Create_VanBanNhomXuLy_ByCorCode", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<VanBanNhomXuLyViewModel>> Get_VanBanNhomXuLy_AllPaging(string corporationId,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);                
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>("Get_VanBanNhomXuLy_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<VanBanNhomXuLyViewModel>()
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

        public async Task<VanBanNhomXuLyViewModel> Get_VanBanNhomXuLy_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@VanBanNhomXuLyId", id);

                var result = await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>("Get_VanBanNhomXuLy_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> Update_VanBanNhomXuLy_ById(VanBanNhomXuLyViewModel nhomxuly, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", nhomxuly.Id);
                dynamicParameters.Add("@CorporationId", nhomxuly.CorporationId);
                dynamicParameters.Add("@CodeNhomXuLy", nhomxuly.Code);
                dynamicParameters.Add("@TenNhomXuLy", nhomxuly.Ten);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Update_VanBanNhomXuLy_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_VanBanNhomNhanVien(int nhomxulyId, Guid hosonhanvienId, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@VanBanNhomXuLyId", nhomxulyId);
                dynamicParameters.Add("@HoSoNhanVienId", hosonhanvienId);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Delete_VanBanNhomNhanVien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_VanBanNhomNhanVien(int nhomxulyid, Guid hosonhanvienId, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@VanBanNhomXuLyId", nhomxulyid);
                dynamicParameters.Add("@HoSoNhanVienId", hosonhanvienId);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<VanBanNhomXuLyViewModel>(
                        "Create_VanBanNhomNhanVien", dynamicParameters, commandType: CommandType.StoredProcedure);
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
