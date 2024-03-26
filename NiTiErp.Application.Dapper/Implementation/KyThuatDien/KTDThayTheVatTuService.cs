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

        public async Task<KTDNangCongSuatCayMoiRequest> KTD_KTDNangCongSuatCayMoi_Get_ById(int NangCongSuatCayMoiId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", NangCongSuatCayMoiId);

                var result = await sqlConnection.QueryAsync<KTDNangCongSuatCayMoiRequest>("KTD_KTDNangCongSuatCayMoi_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<KTDPhatTrienKhachHangRequest> KTD_KTDPhatTrienKhachHang_Get_ById(int PhatTrienKhachHangId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", PhatTrienKhachHangId);

                var result = await sqlConnection.QueryAsync<KTDPhatTrienKhachHangRequest>("KTD_KTDPhatTrienKhachHang_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<KTDXuLyKhacRequest> KTD_KTDXuLyKhac_Get_ById(int XuLyKhacId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", XuLyKhacId);

                var result = await sqlConnection.QueryAsync<KTDXuLyKhacRequest>("KTD_KTDXuLyKhac_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<KTDDuyTuBaoDuongRequest> KTD_KTDDuyTuBaoDuong_Get_ById(int DuyTuBaoDuongId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", DuyTuBaoDuongId);

                var result = await sqlConnection.QueryAsync<KTDDuyTuBaoDuongRequest>("KTD_KTDDuyTuBaoDuong_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<KTDCaiTaoSuaChuaRequest> KTD_KTDCaiTaoSuaChua_Get_ById(int CaiTaoSuaChuaId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", CaiTaoSuaChuaId);

                var result = await sqlConnection.QueryAsync<KTDCaiTaoSuaChuaRequest>("KTD_KTDCaiTaoSuaChua_Get_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
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

        public async Task<List<KTDNangCongSuatCayMoiRequest>> KTD_KTDNangCongSuatCayMoi_Get_ByCorKy(string makhuvuc, int nam, int thang)
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
                    var query = await sqlConnection.QueryAsync<KTDNangCongSuatCayMoiRequest>(
                        "KTD_KTDNangCongSuatCayMoi_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<KTDPhatTrienKhachHangRequest>> KTD_KTDPhatTrienKhachHang_Get_ByCorKy(string makhuvuc, int nam, int thang)
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
                    var query = await sqlConnection.QueryAsync<KTDPhatTrienKhachHangRequest>(
                        "KTD_KTDPhatTrienKhachHang_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<KTDXuLyKhacRequest>> KTD_KTDXuLyKhac_Get_ByCorKy(string makhuvuc, int nam, int thang)
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
                    var query = await sqlConnection.QueryAsync<KTDXuLyKhacRequest>(
                        "KTD_KTDXuLyKhac_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<KTDDuyTuBaoDuongRequest>> KTD_KTDDuyTuBaoDuong_Get_ByCorKy(string makhuvuc, int nam, int thang)
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
                    var query = await sqlConnection.QueryAsync<KTDDuyTuBaoDuongRequest>(
                        "KTD_KTDDuyTuBaoDuong_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<KTDCaiTaoSuaChuaRequest>> KTD_KTDCaiTaoSuaChua_Get_ByCorKy(string makhuvuc, int nam, int thang)
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
                    var query = await sqlConnection.QueryAsync<KTDCaiTaoSuaChuaRequest>(
                        "KTD_KTDCaiTaoSuaChua_Get_ByCorKy", dynamicParameters, commandType: CommandType.StoredProcedure);
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

        public async Task<bool> KTD_KTDNangCongSuatCayMoi_Update_ById(int NangCongSuatCayMoiId, int SoLuongNangCongSuat,
            int SoLuongSoLuongNangCongSuat, string CuTheNangCongSuat, int SoLuongLuyTuyenNangCongSuat, int CongSuatSoLuongLuyTuyenNangCongSuat, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", NangCongSuatCayMoiId);
                dynamicParameters.Add("@SoLuongNangCongSuat", SoLuongNangCongSuat);
                dynamicParameters.Add("@SoLuongSoLuongNangCongSuat", SoLuongSoLuongNangCongSuat);
                dynamicParameters.Add("@CuTheNangCongSuat", CuTheNangCongSuat);
                dynamicParameters.Add("@SoLuongLuyTuyenNangCongSuat", SoLuongLuyTuyenNangCongSuat);
                dynamicParameters.Add("@CongSuatSoLuongLuyTuyenNangCongSuat", CongSuatSoLuongLuyTuyenNangCongSuat);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDNangCongSuatCayMoiRequest>(
                        "KTD_KTDNangCongSuatCayMoi_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDPhatTrienKhachHang_Update_ById(int PhatTrienKhachHangId,
            int SoLuongPhatTrienKhachHang, int LuyTuyenPhatTrienKhachHang, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", PhatTrienKhachHangId);
                dynamicParameters.Add("@SoLuongPhatTrienKhachHang", SoLuongPhatTrienKhachHang);
                dynamicParameters.Add("@LuyTuyenPhatTrienKhachHang", LuyTuyenPhatTrienKhachHang);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDPhatTrienKhachHangRequest>(
                        "KTD_KTDPhatTrienKhachHang_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDXuLyKhac_Update_ById(int XuLyKhacId, string NoiDungXuLyKhac, 
            string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", XuLyKhacId);
                dynamicParameters.Add("@NoiDungXuLyKhac", NoiDungXuLyKhac);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDXuLyKhacRequest>(
                        "KTD_KTDXuLyKhac_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDDuyTuBaoDuong_Update_ById(int DuyTuBaoDuongId,
            int SoLuongDuyTuBaoDuong, string CuTheDuyTuBaoDuong, int SoLuongLuyTuyenDuyTuBaoDuong, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", DuyTuBaoDuongId);
                dynamicParameters.Add("@SoLuongDuyTuBaoDuong", SoLuongDuyTuBaoDuong);
                dynamicParameters.Add("@CuTheDuyTuBaoDuong", CuTheDuyTuBaoDuong);
                dynamicParameters.Add("@SoLuongLuyTuyenDuyTuBaoDuong", SoLuongLuyTuyenDuyTuBaoDuong);
                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDDuyTuBaoDuongRequest>(
                        "KTD_KTDDuyTuBaoDuong_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> KTD_KTDCaiTaoSuaChua_Update_ById(KTDCaiTaoSuaChuaRequest caitaosuachua, string UpdateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", caitaosuachua.Id);
                dynamicParameters.Add("@SoLuongCaiTaoSuaChua", caitaosuachua.SoLuongCaiTaoSuaChua);
                dynamicParameters.Add("@DaiCaiTaoSuaChua", caitaosuachua.DaiCaiTaoSuaChua);
                dynamicParameters.Add("@CuTheCaiTaoSuaChua", caitaosuachua.CuTheCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongLuyTuyenCaiTaoSuaChua", caitaosuachua.SoLuongLuyTuyenCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongSoLuongLuyTuyenCaiTaoSuaChua", caitaosuachua.SoLuongSoLuongLuyTuyenCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongMuaCaiTaoSuaChua", caitaosuachua.SoLuongMuaCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongBanCaiTaoSuaChua", caitaosuachua.SoLuongBanCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongTyLeCaiTaoSuaChua", caitaosuachua.SoLuongTyLeCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongHaoHutCaiTaoSuaChua", caitaosuachua.SoLuongHaoHutCaiTaoSuaChua);

                dynamicParameters.Add("@SoLuongKHCaiTaoSuaChua", caitaosuachua.SoLuongKHCaiTaoSuaChua);
                dynamicParameters.Add("@SoLuongThucHienCaiTaoSuaChua", caitaosuachua.SoLuongThucHienCaiTaoSuaChua);

                dynamicParameters.Add("@UpdateBy", UpdateBy);
                try
                {
                    await sqlConnection.QueryAsync<KTDCaiTaoSuaChuaRequest>(
                        "KTD_KTDCaiTaoSuaChua_Update_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
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
