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
    public class GDNXuLyKiemDinhNuocService : IGDNXuLyKiemDinhNuocService
    {
        private readonly IConfiguration _configuration;

        public GDNXuLyKiemDinhNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GDNXuLyKiemDinhNuocViewModel> Get_GDNXuLyKiemDinhNuoc_ByGDNDMCCNuocId(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", id);

                var result = await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>("Get_GDNXuLyKiemDinhNuoc_ByGDNDMCCNuocId", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> CreateGDNXuLyKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", xlkdnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapBBYeuCauKiemDinh", xlkdnuoc.NgayLapBBYeuCauKiemDinh);
                dynamicParameters.Add("@TenNhanVienLapBBYeuCau1", xlkdnuoc.TenNhanVienLapBBYeuCau1);
                dynamicParameters.Add("@ChucVuNhanVienLapBBYeuCau1", xlkdnuoc.ChucVuNhanVienLapBBYeuCau1);
                dynamicParameters.Add("@TenNhanVienLapBBYeuCau2", xlkdnuoc.TenNhanVienLapBBYeuCau2);
                dynamicParameters.Add("@ChucVuNhanVienLapBBYeuCau2", xlkdnuoc.ChucVuNhanVienLapBBYeuCau2);
                dynamicParameters.Add("@TenDaiDienKhachHang", xlkdnuoc.TenDaiDienKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", xlkdnuoc.DanhSoKhachHang);
                dynamicParameters.Add("@NoiDungBBYeuCauKiemDinh", xlkdnuoc.NoiDungBBYeuCauKiemDinh);
                dynamicParameters.Add("@NgayLapBBKiemTraDongHoKHYC", xlkdnuoc.NgayLapBBKiemTraDongHoKHYC);
                dynamicParameters.Add("@TenNhanVienLapBBKiemTraDHKHYC1Id", xlkdnuoc.TenNhanVienLapBBKiemTraDHKHYC1Id);
                dynamicParameters.Add("@ChucVuNhanVienLapBBKiemTraDHKHYC1Id", xlkdnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC1Id);
                dynamicParameters.Add("@TenNhanVienLapBBKiemTraDHKHYC2Id", xlkdnuoc.TenNhanVienLapBBKiemTraDHKHYC2Id);
                dynamicParameters.Add("@ChucVuNhanVienLapBBKiemTraDHKHYC2Id", xlkdnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC2Id);
                dynamicParameters.Add("@TenDaiDienKhachHangKiemTra", xlkdnuoc.TenDaiDienKhachHangKiemTra);
                dynamicParameters.Add("@DanhSoKhachHangKiemTra", xlkdnuoc.DanhSoKhachHangKiemTra);
                dynamicParameters.Add("@HieuDongHo", xlkdnuoc.HieuDongHo);
                dynamicParameters.Add("@SoNo", xlkdnuoc.SoNo);
                dynamicParameters.Add("@NuocSanXuat", xlkdnuoc.NuocSanXuat);
                dynamicParameters.Add("@CoDongHo", xlkdnuoc.CoDongHo);
                dynamicParameters.Add("@ChiSoTichLuy", xlkdnuoc.ChiSoTichLuy);
                dynamicParameters.Add("@NgayLapDongHo", xlkdnuoc.NgayLapDongHo);
                dynamicParameters.Add("@HieuDongHoChoKiemDinh", xlkdnuoc.HieuDongHoChoKiemDinh);
                dynamicParameters.Add("@SoNoLapChoKiemDinh", xlkdnuoc.SoNoLapChoKiemDinh);
                dynamicParameters.Add("@NuocSanXuatChoKiemDinh", xlkdnuoc.NuocSanXuatChoKiemDinh);
                dynamicParameters.Add("@CoDongHoChoKiemDinh", xlkdnuoc.CoDongHoChoKiemDinh);
                dynamicParameters.Add("@SoTichLuyChoKiemDinh", xlkdnuoc.SoTichLuyChoKiemDinh);
                dynamicParameters.Add("@NgayLapChoKiemDinh", xlkdnuoc.NgayLapChoKiemDinh);
                dynamicParameters.Add("@ChieuCaoLapChoKiemDinh", xlkdnuoc.ChieuCaoLapChoKiemDinh);
                dynamicParameters.Add("@ViTriLapChoKiemDinh", xlkdnuoc.ViTriLapChoKiemDinh);
                dynamicParameters.Add("@KhoangCachLapChoKiemDinh", xlkdnuoc.KhoangCachLapChoKiemDinh);
                dynamicParameters.Add("@GhiChu", xlkdnuoc.GhiChu);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>(
                        "Create_GDNXuLyKiemDinhNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGDNXuLyKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", xlkdnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapBBYeuCauKiemDinh", xlkdnuoc.NgayLapBBYeuCauKiemDinh);
                dynamicParameters.Add("@TenNhanVienLapBBYeuCau1", xlkdnuoc.TenNhanVienLapBBYeuCau1);
                dynamicParameters.Add("@ChucVuNhanVienLapBBYeuCau1", xlkdnuoc.ChucVuNhanVienLapBBYeuCau1);
                dynamicParameters.Add("@TenNhanVienLapBBYeuCau2", xlkdnuoc.TenNhanVienLapBBYeuCau2);
                dynamicParameters.Add("@ChucVuNhanVienLapBBYeuCau2", xlkdnuoc.ChucVuNhanVienLapBBYeuCau2);
                dynamicParameters.Add("@TenDaiDienKhachHang", xlkdnuoc.TenDaiDienKhachHang);
                dynamicParameters.Add("@DanhSoKhachHang", xlkdnuoc.DanhSoKhachHang);
                dynamicParameters.Add("@NoiDungBBYeuCauKiemDinh", xlkdnuoc.NoiDungBBYeuCauKiemDinh);
                dynamicParameters.Add("@NgayLapBBKiemTraDongHoKHYC", xlkdnuoc.NgayLapBBKiemTraDongHoKHYC);
                dynamicParameters.Add("@TenNhanVienLapBBKiemTraDHKHYC1Id", xlkdnuoc.TenNhanVienLapBBKiemTraDHKHYC1Id);
                dynamicParameters.Add("@ChucVuNhanVienLapBBKiemTraDHKHYC1Id", xlkdnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC1Id);
                dynamicParameters.Add("@TenNhanVienLapBBKiemTraDHKHYC2Id", xlkdnuoc.TenNhanVienLapBBKiemTraDHKHYC2Id);
                dynamicParameters.Add("@ChucVuNhanVienLapBBKiemTraDHKHYC2Id", xlkdnuoc.ChucVuNhanVienLapBBKiemTraDHKHYC2Id);
                dynamicParameters.Add("@TenDaiDienKhachHangKiemTra", xlkdnuoc.TenDaiDienKhachHangKiemTra);
                dynamicParameters.Add("@DanhSoKhachHangKiemTra", xlkdnuoc.DanhSoKhachHangKiemTra);
                dynamicParameters.Add("@HieuDongHo", xlkdnuoc.HieuDongHo);
                dynamicParameters.Add("@SoNo", xlkdnuoc.SoNo);
                dynamicParameters.Add("@NuocSanXuat", xlkdnuoc.NuocSanXuat);
                dynamicParameters.Add("@CoDongHo", xlkdnuoc.CoDongHo);
                dynamicParameters.Add("@ChiSoTichLuy", xlkdnuoc.ChiSoTichLuy);
                dynamicParameters.Add("@NgayLapDongHo", xlkdnuoc.NgayLapDongHo);
                dynamicParameters.Add("@HieuDongHoChoKiemDinh", xlkdnuoc.HieuDongHoChoKiemDinh);
                dynamicParameters.Add("@SoNoLapChoKiemDinh", xlkdnuoc.SoNoLapChoKiemDinh);
                dynamicParameters.Add("@NuocSanXuatChoKiemDinh", xlkdnuoc.NuocSanXuatChoKiemDinh);
                dynamicParameters.Add("@CoDongHoChoKiemDinh", xlkdnuoc.CoDongHoChoKiemDinh);
                dynamicParameters.Add("@SoTichLuyChoKiemDinh", xlkdnuoc.SoTichLuyChoKiemDinh);
                dynamicParameters.Add("@NgayLapChoKiemDinh", xlkdnuoc.NgayLapChoKiemDinh);
                dynamicParameters.Add("@ChieuCaoLapChoKiemDinh", xlkdnuoc.ChieuCaoLapChoKiemDinh);
                dynamicParameters.Add("@ViTriLapChoKiemDinh", xlkdnuoc.ViTriLapChoKiemDinh);
                dynamicParameters.Add("@KhoangCachLapChoKiemDinh", xlkdnuoc.KhoangCachLapChoKiemDinh);
                dynamicParameters.Add("@GhiChu", xlkdnuoc.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>(
                        "Update_GDNXuLyKiemDinhNuoc_ByGDNDMId", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGDNXuLyKiemDinhNuocBBTT(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", xlkdnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapBBThoaThuan", xlkdnuoc.NgayLapBBThoaThuan);
                dynamicParameters.Add("@TenDaiDienKH", xlkdnuoc.TenDaiDienKH);
                dynamicParameters.Add("@NoiDungLapBBThoaThuan", xlkdnuoc.NoiDungLapBBThoaThuan);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>(
                        "Update_GDNXuLyKiemDinhNuoc_ByGDNDMIdBBTT", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGDNXuLyKiemDinhNuocBBTTUp(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", xlkdnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayLapBBThoaThuan", xlkdnuoc.NgayLapBBThoaThuan);
                dynamicParameters.Add("@TenDaiDienKH", xlkdnuoc.TenDaiDienKH);
                dynamicParameters.Add("@NoiDungLapBBThoaThuan", xlkdnuoc.NoiDungLapBBThoaThuan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>(
                        "Update_GDNXuLyKiemDinhNuoc_ByGDNDMIdBBTTUp", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpKetThucKiemDinhNuoc(GDNXuLyKiemDinhNuocViewModel xlkdnuoc, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", xlkdnuoc.GiayDeNghiDMCungCapNuocId);

                dynamicParameters.Add("@NgayKetThucHoSo", xlkdnuoc.NgayKetThucHoSo);
                dynamicParameters.Add("@TenNhanVienNhapKetThucHoSo", xlkdnuoc.TenNhanVienNhapKetThucHoSo);
                dynamicParameters.Add("@GhiChuKetThucHoSo", xlkdnuoc.GhiChuKetThucHoSo);
                
                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<GDNXuLyKiemDinhNuocViewModel>(
                        "Update_GDNXuLyKiemDinhNuoc_ByGDNDMIdKetThucHS", dynamicParameters, commandType: CommandType.StoredProcedure);
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
