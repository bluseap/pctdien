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
    public class GDNThietKeDienService : IGDNThietKeDienService
    {
        private readonly IConfiguration _configuration;

        public GDNThietKeDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNThietKeDienViewModel> Get_GDNThietKeDien_ByGDNDMCCDienId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", id);

                var result = await sqlConnection.QueryAsync<GDNThietKeDienViewModel>("Get_GDNThietKeDien_ByGDNDMCCDienId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntkdien.NgayLapBBKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntkdien.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntkdien.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntkdien.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntkdien.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntkdien.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntkdien.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntkdien.TenDaiDienKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntkdien.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntkdien.SoTichLuyTrenDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntkdien.MucDichSuDung);
                //dynamicParameters.Add("@TinhTrangDongHo", gdntkdien.TinhTrangDongHo);
                //dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntkdien.TinhTrangOngNhanhTruocDongHo);
                //dynamicParameters.Add("@CacVanDeKetLuan", gdntkdien.CacVanDeKetLuan);
                //dynamicParameters.Add("@GioYeuCauKHDenXN", gdntkdien.GioYeuCauKHDenXN);

                //dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntkdien.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntkdien.TenNhanVienLapBBKiemTra);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Create_GDNThietKeDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> CreateGDNThietKeDienKetThucDD(GDNThietKeDienViewModel gdntkdien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntkdien.NgayLapBBKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntkdien.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntkdien.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntkdien.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntkdien.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntkdien.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntkdien.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntkdien.TenDaiDienKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntkdien.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntkdien.SoTichLuyTrenDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntkdien.MucDichSuDung);
                //dynamicParameters.Add("@TinhTrangDongHo", gdntkdien.TinhTrangDongHo);
                //dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntkdien.TinhTrangOngNhanhTruocDongHo);
                //dynamicParameters.Add("@CacVanDeKetLuan", gdntkdien.CacVanDeKetLuan);
                //dynamicParameters.Add("@GioYeuCauKHDenXN", gdntkdien.GioYeuCauKHDenXN);
                //dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntkdien.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntkdien.TenNhanVienLapBBKiemTra);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Create_GDNThietKeDien_ByKetThucDD", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGDNThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntkdien.NgayLapBBKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntkdien.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntkdien.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntkdien.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntkdien.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntkdien.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntkdien.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntkdien.TenDaiDienKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntkdien.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntkdien.SoTichLuyTrenDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntkdien.MucDichSuDung);
                //dynamicParameters.Add("@TinhTrangDongHo", gdntkdien.TinhTrangDongHo);
                //dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntkdien.TinhTrangOngNhanhTruocDongHo);
                //dynamicParameters.Add("@CacVanDeKetLuan", gdntkdien.CacVanDeKetLuan);
                //dynamicParameters.Add("@GioYeuCauKHDenXN", gdntkdien.GioYeuCauKHDenXN);
               // dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntkdien.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntkdien.TenNhanVienLapBBKiemTra);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Update_GDNThietKeDien_ByGDNDMId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateKhaoSatThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@TenKhachHang", gdntkdien.TenKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntkdien.DanhSoKhachHang);
                dynamicParameters.Add("@DiaChiCuTru", gdntkdien.DiaChiCuTru);
                dynamicParameters.Add("@DiaChiLapDat", gdntkdien.DiaChiLapDat);
                dynamicParameters.Add("@LyDoThietKe", gdntkdien.LyDoThietKe);
                dynamicParameters.Add("@NgayLapThietKe", gdntkdien.NgayLapThietKe);
                dynamicParameters.Add("@TenNhanVienLapThietKe", gdntkdien.TenNhanVienLapThietKe);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Update_GDNThietKeDien_ByGDNDMIdKSTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpKhaoSatThietKeDienNoDuyet(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@TenKhachHang", gdntkdien.TenKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntkdien.DanhSoKhachHang);
                dynamicParameters.Add("@DiaChiCuTru", gdntkdien.DiaChiCuTru);
                dynamicParameters.Add("@DiaChiLapDat", gdntkdien.DiaChiLapDat);
                dynamicParameters.Add("@LyDoThietKe", gdntkdien.LyDoThietKe);
                dynamicParameters.Add("@NgayLapThietKe", gdntkdien.NgayLapThietKe);
                dynamicParameters.Add("@TenNhanVienLapThietKe", gdntkdien.TenNhanVienLapThietKe);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Update_GDNThietKeDien_ByGDNDMIdKSTKNoDuyet", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpDuyetThietKeDien(GDNThietKeDienViewModel gdntkdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", gdntkdien.GiayDeNghiDMCungCapDienId);

                dynamicParameters.Add("@NgayDuyet", gdntkdien.NgayDuyetTK);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntkdien.TenNhanVienDuyetTK);
                dynamicParameters.Add("@GhiChu", gdntkdien.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeDienViewModel>(
                        "Update_GDNThietKeDien_ByGDNDMIdDuyetTK", dynamicParameters, commandType: CommandType.StoredProcedure);
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
