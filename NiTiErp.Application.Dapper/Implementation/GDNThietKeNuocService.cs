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
    public class GDNThietKeNuocService : IGDNThietKeNuocService
    {
        private readonly IConfiguration _configuration;

        public GDNThietKeNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNThietKeNuocViewModel> Get_GDNThietKeNuoc_ByGDNDMCCNuocId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", id);

                var result = await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>("Get_GDNThietKeNuoc_ByGDNDMCCNuocId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntknuoc.NgayLapKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntknuoc.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntknuoc.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntknuoc.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntknuoc.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntknuoc.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntknuoc.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntknuoc.TenDaiDienKH);
                dynamicParameters.Add("@DanhSoKhachHang", gdntknuoc.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntknuoc.ChiSoDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntknuoc.MucDichSuDung);
                dynamicParameters.Add("@TinhTrangDongHo", gdntknuoc.TinhTrangDongHo);
                dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntknuoc.TinhTrangOngNhanhTruocDongHo);
                dynamicParameters.Add("@CacVanDeKetLuan", gdntknuoc.CacVanDeKetLuan);
                dynamicParameters.Add("@GioYeuCauKHDenXN", gdntknuoc.GioYeuCauKHDenXN);
                dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntknuoc.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntknuoc.TenNhanVienLapKiemTra);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Create_GDNThietKeNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> CreateGDNThietKeNuocKetThucDD(GDNThietKeNuocViewModel gdntknuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntknuoc.NgayLapKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntknuoc.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntknuoc.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntknuoc.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntknuoc.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntknuoc.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntknuoc.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntknuoc.TenDaiDienKH);
                dynamicParameters.Add("@DanhSoKhachHang", gdntknuoc.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntknuoc.ChiSoDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntknuoc.MucDichSuDung);
                dynamicParameters.Add("@TinhTrangDongHo", gdntknuoc.TinhTrangDongHo);
                dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntknuoc.TinhTrangOngNhanhTruocDongHo);
                dynamicParameters.Add("@CacVanDeKetLuan", gdntknuoc.CacVanDeKetLuan);
                dynamicParameters.Add("@GioYeuCauKHDenXN", gdntknuoc.GioYeuCauKHDenXN);
                dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntknuoc.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntknuoc.TenNhanVienLapKiemTra);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Create_GDNThietKeNuoc_ByKetThucDD", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGDNThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapKiemTra", gdntknuoc.NgayLapKiemTra);
                dynamicParameters.Add("@TenKhachHang", gdntknuoc.TenKhachHang);
                dynamicParameters.Add("@DiaChiLapDat", gdntknuoc.DiaChiLapDat);
                dynamicParameters.Add("@TenNhanVien1", gdntknuoc.TenNhanVien1);
                dynamicParameters.Add("@ChucVu1", gdntknuoc.ChucVu1);
                dynamicParameters.Add("@TenNhanVien2", gdntknuoc.TenNhanVien2);
                dynamicParameters.Add("@ChucVu2", gdntknuoc.ChucVu2);
                dynamicParameters.Add("@TenDaiDienKH", gdntknuoc.TenDaiDienKH);
                dynamicParameters.Add("@DanhSoKhachHang", gdntknuoc.DanhSoKhachHang);
                dynamicParameters.Add("@ChiSoDongHo", gdntknuoc.ChiSoDongHo);
                dynamicParameters.Add("@MucDichSuDung", gdntknuoc.MucDichSuDung);
                dynamicParameters.Add("@TinhTrangDongHo", gdntknuoc.TinhTrangDongHo);
                dynamicParameters.Add("@TinhTrangOngNhanhTruocDongHo", gdntknuoc.TinhTrangOngNhanhTruocDongHo);
                dynamicParameters.Add("@CacVanDeKetLuan", gdntknuoc.CacVanDeKetLuan);
                dynamicParameters.Add("@GioYeuCauKHDenXN", gdntknuoc.GioYeuCauKHDenXN);
                dynamicParameters.Add("@NgayGioYeuCauKHDenXN", gdntknuoc.NgayGioYeuCauKHDenXN);
                dynamicParameters.Add("@TenNhanVienLapKiemTra", gdntknuoc.TenNhanVienLapKiemTra);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Update_GDNThietKeNuoc_ByGDNDMId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateKhaoSatThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@TenKhachHang", gdntknuoc.TenKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntknuoc.DanhSoKhachHang);
                dynamicParameters.Add("@DiaChiCuTru", gdntknuoc.DiaChiCuTru);
                dynamicParameters.Add("@DiaChiLapDat", gdntknuoc.DiaChiLapDat);
                dynamicParameters.Add("@LyDoThietKe", gdntknuoc.LyDoThietKe);
                dynamicParameters.Add("@NgayLapThietKe", gdntknuoc.NgayLapThietKe);
                dynamicParameters.Add("@TenNhanVienLapThietKe", gdntknuoc.TenNhanVienLapThietKe);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Update_GDNThietKeNuoc_ByGDNDMIdKSTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpKhaoSatThietKeNuocNoDuyet(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@TenKhachHang", gdntknuoc.TenKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", gdntknuoc.DanhSoKhachHang);
                dynamicParameters.Add("@DiaChiCuTru", gdntknuoc.DiaChiCuTru);
                dynamicParameters.Add("@DiaChiLapDat", gdntknuoc.DiaChiLapDat);
                dynamicParameters.Add("@LyDoThietKe", gdntknuoc.LyDoThietKe);
                dynamicParameters.Add("@NgayLapThietKe", gdntknuoc.NgayLapThietKe);
                dynamicParameters.Add("@TenNhanVienLapThietKe", gdntknuoc.TenNhanVienLapThietKe);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Update_GDNThietKeNuoc_ByGDNDMIdKSTKNoDuyet", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpDuyetThietKeNuoc(GDNThietKeNuocViewModel gdntknuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", gdntknuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayDuyet", gdntknuoc.NgayDuyet);
                dynamicParameters.Add("@TenNhanVienDuyet", gdntknuoc.TenNhanVienDuyet);
                dynamicParameters.Add("@GhiChu", gdntknuoc.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNThietKeNuocViewModel>(
                        "Update_GDNThietKeNuoc_ByGDNDMIdDuyetTK", dynamicParameters, commandType: CommandType.StoredProcedure);
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
