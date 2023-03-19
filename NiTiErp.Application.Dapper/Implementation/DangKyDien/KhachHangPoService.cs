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
    public class KhachHangPoService : IKhachHangPoService
    {
        private readonly IConfiguration _configuration;

        public KhachHangPoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PagedResult<KhachHangPoViewModel>> Get_KhachHangPo_AllPaging(string khuvuc, string phongto,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongTo", phongto);
                dynamicParameters.Add("@keyword", keyword);                

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<KhachHangPoViewModel>("Get_KhachHangPo_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<KhachHangPoViewModel>()
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

        public async Task<List<KhachHangPoViewModel>> Get_KhachHangPo_ByDieuKien(string KhuVuc, string DieuKien)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", KhuVuc);
                dynamicParameters.Add("@DieuKien", DieuKien);

                try
                {
                    var query = await sqlConnection.QueryAsync<KhachHangPoViewModel>(
                        "Get_KhachHangPo_ByDieuKien", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<KhachHangPoViewModel> Get_KhachHangPo_ByMaKhachHang(string MaKhachHang)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MaKhachHang", MaKhachHang);

                try
                {
                    var query = await sqlConnection.QueryAsync<KhachHangPoViewModel>(
                        "Get_KhachHangPo_ByMaKhachHang", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<KhachHangPoViewModel>> Get_KhachHangPo_AllPagingSttHs(string khuvuc, string keyword, int sttbohoso,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@SttBoHoSo", sttbohoso);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<KhachHangPoViewModel>("Get_KhachHangPo_AllPagingSttHs", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<KhachHangPoViewModel>()
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

        public async Task<bool> Update_KhachHangPo_BySTTBoHoSo(string MaKhachHang, int SoThuTu,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MaKhachHang", MaKhachHang);
                dynamicParameters.Add("@SoThuTu", SoThuTu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<KhachHangPoViewModel>(
                        "Update_KhachHangPo_BySTTBoHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);
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
