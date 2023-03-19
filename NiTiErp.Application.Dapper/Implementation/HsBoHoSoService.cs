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
    public class HsBoHoSoService : IHsBoHoSoService
    {
        private readonly IConfiguration _configuration;

        public HsBoHoSoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HsBoHoSoViewModel> Get_HsBoHoSo_ById(int hsbohosoid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoId", hsbohosoid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsBoHoSoViewModel>(
                        "Get_HsBoHoSo_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<HsBoHoSoViewModel>> Get_HsBoHoSo_AllPaging(string corporationId, string phongdanhmucId,
            string phongdanhmucquanlyId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@phongdanhmucquanlyId", phongdanhmucquanlyId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<HsBoHoSoViewModel>("Get_HsBoHoSo_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<HsBoHoSoViewModel>()
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

        public async Task<bool> Create_HsBoHoSo(HsBoHoSoViewModel bohoso, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsKeTuBaoId", bohoso.HsKeTuBaoId);
                dynamicParameters.Add("@PhongDanhMucQuanLyId", bohoso.PhongDanhMucQuanLyId);

                dynamicParameters.Add("@HsNhomHoSoId", bohoso.HsNhomHoSoId);
                dynamicParameters.Add("@HsThoiHanBaoQuanDMId", bohoso.HsThoiHanBaoQuanDMId);
                dynamicParameters.Add("@MaBoHoSo", bohoso.MaBoHoSo);
                dynamicParameters.Add("@TieuDeBoHoSo", bohoso.TieuDeBoHoSo);
                dynamicParameters.Add("@SoTTHoSoTrenKe", bohoso.SoTTHoSoTrenKe);
                dynamicParameters.Add("@ThoiGianBatDau", bohoso.ThoiGianBatDau);
                dynamicParameters.Add("@SoTTHoSoTrenKe", bohoso.SoTTHoSoTrenKe);
                dynamicParameters.Add("@TenNhanVienNhapHoSo", bohoso.TenNhanVienNhapHoSo);
                dynamicParameters.Add("@ChuGiaiBoHoSo", bohoso.ChuGiaiBoHoSo);                

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsBoHoSoViewModel>(
                        "Create_HsBoHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsBoHoSo(HsBoHoSoViewModel bohoso, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", bohoso.Id);

                dynamicParameters.Add("@HsKeTuBaoId", bohoso.HsKeTuBaoId);
                dynamicParameters.Add("@PhongDanhMucQuanLyId", bohoso.PhongDanhMucQuanLyId);

                dynamicParameters.Add("@HsNhomHoSoId", bohoso.HsNhomHoSoId);
                dynamicParameters.Add("@HsThoiHanBaoQuanDMId", bohoso.HsThoiHanBaoQuanDMId);
                dynamicParameters.Add("@MaBoHoSo", bohoso.MaBoHoSo);
                dynamicParameters.Add("@TieuDeBoHoSo", bohoso.TieuDeBoHoSo);
                dynamicParameters.Add("@SoTTHoSoTrenKe", bohoso.SoTTHoSoTrenKe);
                dynamicParameters.Add("@ThoiGianBatDau", bohoso.ThoiGianBatDau);
                dynamicParameters.Add("@SoTTHoSoTrenKe", bohoso.SoTTHoSoTrenKe);
                dynamicParameters.Add("@TenNhanVienNhapHoSo", bohoso.TenNhanVienNhapHoSo);
                dynamicParameters.Add("@ChuGiaiBoHoSo", bohoso.ChuGiaiBoHoSo);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsBoHoSoViewModel>(
                        "Update_HsBoHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);
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
