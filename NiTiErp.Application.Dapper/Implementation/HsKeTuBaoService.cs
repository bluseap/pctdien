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
    public class HsKeTuBaoService : IHsKeTuBaoService
    {
        private readonly IConfiguration _configuration;

        public HsKeTuBaoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HsKeTuBaoViewModel> Get_HsChuyenKeTu_ById(int hschuyenketuid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenKeTuId", hschuyenketuid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Get_HsChuyenKeTu_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HsKeTuBaoViewModel>> Get_HsChuyenKeTu_ByHsKeTuBaoId(int ketubaoid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@KeTuBaoId", ketubaoid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Get_HsChuyenKeTu_ByHsKeTuBaoId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<HsKeTuBaoViewModel> Get_HsKeTuBao_ById(int ketubaoid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@KeTuBaoId", ketubaoid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Get_HsKeTuBao_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HsKeTuBaoViewModel>> Get_HsKeTuBao_ByCor(string corporationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Get_HsKeTuBao_ByCor", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<HsKeTuBaoViewModel>> Get_HsKeTuBao_AllPaging(string corporationId, string phongdanhmucId,
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
                    var result = await sqlConnection.QueryAsync<HsKeTuBaoViewModel>("Get_HsKeTuBao_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<HsKeTuBaoViewModel>()
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

        public async Task<bool> Create_HsKeTuBao(HsKeTuBaoViewModel ketubao, string chieudai, string chieucao, 
            DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", ketubao.CorporationId);
                dynamicParameters.Add("@PhongDanhMucId", ketubao.PhongDanhMucId);

                dynamicParameters.Add("@MaKeTuBao", ketubao.MaKeTuBao);
                dynamicParameters.Add("@Ten", ketubao.Ten);
                dynamicParameters.Add("@ChieuDai", chieudai);
                dynamicParameters.Add("@ChieuCao", chieucao);
                dynamicParameters.Add("@SoLuongTrenKe", ketubao.SoLuongTrenKe);
                dynamicParameters.Add("@SoLuongThucTe", ketubao.SoLuongThucTe);
                dynamicParameters.Add("@SttKeTuBao", ketubao.SttKeTuBao);
                dynamicParameters.Add("@GhiChuThongTinCanThiet", ketubao.GhiChuThongTinCanThiet);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Create_HsKeTuBao", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsKeTuBao(HsKeTuBaoViewModel ketubao, string chieudai, string chieucao,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsKeTuBaoId", ketubao.Id);

                dynamicParameters.Add("@CorporationId", ketubao.CorporationId);
                dynamicParameters.Add("@PhongDanhMucId", ketubao.PhongDanhMucId);

                dynamicParameters.Add("@MaKeTuBao", ketubao.MaKeTuBao);
                dynamicParameters.Add("@Ten", ketubao.Ten);
                dynamicParameters.Add("@ChieuDai", chieudai);
                dynamicParameters.Add("@ChieuCao", chieucao);
                dynamicParameters.Add("@SoLuongTrenKe", ketubao.SoLuongTrenKe);
                dynamicParameters.Add("@SoLuongThucTe", ketubao.SoLuongThucTe);
                dynamicParameters.Add("@SttKeTuBao", ketubao.SttKeTuBao);
                dynamicParameters.Add("@GhiChuThongTinCanThiet", ketubao.GhiChuThongTinCanThiet);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Update_HsKeTuBao", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HsChuyenKeTu(HsKeTuBaoViewModel ketubao,  DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsKeTuBaoId", ketubao.HsKeTuBaoId);

                dynamicParameters.Add("@CorporationCuId", ketubao.CorporationCuId);
                dynamicParameters.Add("@PhongDanhMucCuId", ketubao.PhongDanhMucCuId);
                dynamicParameters.Add("@CorporationMoiId", ketubao.CorporationMoiId);
                dynamicParameters.Add("@PhongDanhMucMoiId", ketubao.PhongDanhMucMoiId);
                dynamicParameters.Add("@NgayChuyen", ketubao.NgayChuyen);
                dynamicParameters.Add("@LyDoChuyen", ketubao.LyDoChuyen);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Create_HsChuyenKeTu", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsChuyenKeTu(HsKeTuBaoViewModel ketubao, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenKeTuId", ketubao.Id);
                dynamicParameters.Add("@HsKeTuBaoId", ketubao.HsKeTuBaoId);

                //dynamicParameters.Add("@CorporationCuId", ketubao.CorporationCuId);
                //dynamicParameters.Add("@PhongDanhMucCuId", ketubao.PhongDanhMucCuId);
                //dynamicParameters.Add("@CorporationMoiId", ketubao.CorporationMoiId);
                //dynamicParameters.Add("@PhongDanhMucMoiId", ketubao.PhongDanhMucMoiId);

                dynamicParameters.Add("@NgayChuyen", ketubao.NgayChuyen);
                dynamicParameters.Add("@LyDoChuyen", ketubao.LyDoChuyen);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsKeTuBaoViewModel>(
                        "Update_HsChuyenKeTu", dynamicParameters, commandType: CommandType.StoredProcedure);
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
