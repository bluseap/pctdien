using Dapper;
using Microsoft.Extensions.Configuration;
using NiTiErp.Application.Dapper.Interfaces.KyThuatDien;
using NiTiErp.Application.Dapper.ViewModels.KyThuatDien;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Implementation.KyThuatDien
{
    public class KTDThayTheVatTuService : IKTDThayTheVatTuService
    {
        private readonly IConfiguration _configuration;

        public KTDThayTheVatTuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<KTDThayTheVatTuRequest> KTD_KTDThayTheVatTu_Get_ById(int ThayTheVatTuId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", ThayTheVatTuId);

                var result = await sqlConnection.QueryAsync<KTDThayTheVatTuRequest>("KTD_KTDThayTheVatTu_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<KTDPhatTrienLuoiDienRequest> KTD_KTDPhatTrienLuoiDien_Get_ById(int PhatTrienLuoiDienId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", PhatTrienLuoiDienId);

                var result = await sqlConnection.QueryAsync<KTDPhatTrienLuoiDienRequest>("KTD_KTDPhatTrienLuoiDien_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<List<KTDThayTheVatTuRequest>> KTD_KTDThayTheVatTu_Get_ByCorKy(string makhuvuc, int nam, int thang)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@CoporationId", makhuvuc);
                dynamicParameters.Add("@Nam", nam);
                dynamicParameters.Add("@Thang", thang);
                try
                {
                    var query = await sqlConnection.QueryAsync<KTDThayTheVatTuRequest>(
                        "KTD_KTDThayTheVatTu_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<KTDPhatTrienLuoiDienRequest>> KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(string makhuvuc, int nam, int thang)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                dynamicParameters.Add("@CoporationId", makhuvuc);
                dynamicParameters.Add("@Nam", nam);
                dynamicParameters.Add("@Thang", thang);
                try
                {
                    var query = await sqlConnection.QueryAsync<KTDPhatTrienLuoiDienRequest>(
                        "KTD_KTDPhatTrienLuoiDien_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm(string DmKhoiTao, string MaKhuVuc, int Nam, int Thang, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@DmKhoiTao", DmKhoiTao);
                dynamicParameters.Add("@MaKhuVuc", MaKhuVuc);
                dynamicParameters.Add("@Nam", Nam);
                dynamicParameters.Add("@Thang", Thang);                
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDThayTheVatTuRequest>(
                        "KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDThayTheVatTu_Update_ById(int ThayTheVatTuId, int SoLuongVatTu, int SoLuongLuyTuyen,
            string ChiTietVatTu, string ThietBiKhac, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", ThayTheVatTuId);
                dynamicParameters.Add("@SoLuongThayTheVatTu", SoLuongVatTu);
                dynamicParameters.Add("@SoLuongLuyTuyenThayTheVatTu", SoLuongLuyTuyen);
                dynamicParameters.Add("@ChiTietThayTheVatTu", ChiTietVatTu);
                dynamicParameters.Add("@ThietBiKhacThayTheVatTu", ThietBiKhac);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDThayTheVatTuRequest>(
                        "KTD_KTDThayTheVatTu_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDPhatTrienLuoiDien_Update_ById(int PhatTrienLuoiDienId, int ChieuDaiPhatTrienLuoiDien, int ChieuDaiLuyTuyenPhatTrienLuoiDien, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", PhatTrienLuoiDienId);
                dynamicParameters.Add("@ChieuDaiPhatTrienLuoiDien", ChieuDaiPhatTrienLuoiDien);
                dynamicParameters.Add("@ChieuDaiLuyTuyenPhatTrienLuoiDien", ChieuDaiLuyTuyenPhatTrienLuoiDien);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDPhatTrienLuoiDienRequest>(
                        "KTD_KTDPhatTrienLuoiDien_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
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
