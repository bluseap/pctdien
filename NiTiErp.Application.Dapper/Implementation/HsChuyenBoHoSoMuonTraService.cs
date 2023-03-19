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
    public class HsChuyenBoHoSoMuonTraService : IHsChuyenBoHoSoMuonTraService
    {
        private readonly IConfiguration _configuration;

        public HsChuyenBoHoSoMuonTraService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HsChuyenBoHoSoMuonTraViewModel> Get_HsChuyenBoHoSoMuonTra_ById(int hschuyenbohosomuontraid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", hschuyenbohosomuontraid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Get_HsChuyenBoHoSoMuonTra_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<HsChuyenBoHoSoMuonTraViewModel> Get_HsChuyenBoHoSoMuonTra_ByIdIsMuon(int hschuyenbohosomuontraid, 
            bool ismuon)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", hschuyenbohosomuontraid);
                dynamicParameters.Add("@IsMuon", ismuon);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Get_HsChuyenBoHoSoMuonTra_ByIdIsMuon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HsChuyenBoHoSoMuonTraViewModel>> Get_HsChuyenBoHoSoMuonTra_ByHsBoHoSoCuId(Int32 hsbohosocuid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoCuId", hsbohosocuid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Get_HsChuyenBoHoSoMuonTra_ByHsBoHoSoCuId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HsChuyenBoHoSoMuonTra_ByMuon(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra, 
            DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsBoHoSoCuId", chuyenbohosomuontra.HsBoHoSoCuId);

                dynamicParameters.Add("@TenNguoiMuon", chuyenbohosomuontra.TenNguoiMuon);
                dynamicParameters.Add("@NgayMuon", chuyenbohosomuontra.NgayMuon);
                dynamicParameters.Add("@GhiChuMuon", chuyenbohosomuontra.GhiChuMuon);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Create_HsChuyenBoHoSoMuonTra", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsChuyenBoHoSoMuonTra_ByMuon(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", chuyenbohosomuontra.Id);

                dynamicParameters.Add("@TenNguoiMuon", chuyenbohosomuontra.TenNguoiMuon);
                dynamicParameters.Add("@NgayMuon", chuyenbohosomuontra.NgayMuon);
                dynamicParameters.Add("@GhiChuMuon", chuyenbohosomuontra.GhiChuMuon);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Update_HsChuyenBoHoSoMuonTra_ByMuon", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra, 
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", chuyenbohosomuontra.Id);

                dynamicParameters.Add("@TenNguoiTra", chuyenbohosomuontra.TenNguoiTra);
                dynamicParameters.Add("@NgayTra", chuyenbohosomuontra.NgayTra);
                dynamicParameters.Add("@GhiChuTra", chuyenbohosomuontra.GhiChuTra);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Update_HsChuyenBoHoSoMuonTra_ByTra", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTraUpdate(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", chuyenbohosomuontra.Id);

                dynamicParameters.Add("@TenNguoiTra", chuyenbohosomuontra.TenNguoiTra);
                dynamicParameters.Add("@NgayTra", chuyenbohosomuontra.NgayTra);
                dynamicParameters.Add("@GhiChuTra", chuyenbohosomuontra.GhiChuTra);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Update_HsChuyenBoHoSoMuonTra_ByTraUpdate", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTraChuaTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", chuyenbohosomuontra.Id);

                dynamicParameters.Add("@TenNguoiTra", chuyenbohosomuontra.TenNguoiTra);
                dynamicParameters.Add("@NgayTra", chuyenbohosomuontra.NgayTra);
                dynamicParameters.Add("@GhiChuTra", chuyenbohosomuontra.GhiChuTra);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Update_HsChuyenBoHoSoMuonTra_ByTraChuaTra", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_HsChuyenBoHoSoMuonTra(int hschuyenbohosomuonctraId, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HsChuyenBoHoSoMuonTraId", hschuyenbohosomuonctraId);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<HsChuyenBoHoSoMuonTraViewModel>(
                        "Delete_HsChuyenBoHoSoMuonTra", dynamicParameters, commandType: CommandType.StoredProcedure);
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
