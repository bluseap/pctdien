using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Dapper.ViewModels.PhieuCongTacDien;

namespace NiTiErp.Application.Dapper.Implementation.PhieuCongTacDien
{
    public class PCTDienService : IPCTDienService
    {
        private readonly IConfiguration _configuration;

        public PCTDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PCTDienViewModel> PCTD_Get_PCTDien_UpdateDaKhoaSo_ById(int id, Guid PCTDienCode)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);
                dynamicParameters.Add("@PCTDienCode", PCTDienCode);

                var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_UpdateDaKhoaSo_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<PCTDienViewModel> PCTD_Get_PCTDien_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);

                var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<PagedResult<PCTDienViewModel>> PCTD_Get_PCTDien_AllTrangThaiTuDenNgay(string corporationid, string phongbandanhmucid,
            int trangthai, string chucdanh, DateTime TuNgayBaoCao, DateTime DenNgayBaoCao, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@PhongBanDanhMucId", phongbandanhmucid);
                dynamicParameters.Add("@TrangThaiPCT", trangthai);

                dynamicParameters.Add("@ChucDanhNhaVienCode", chucdanh);

                dynamicParameters.Add("@TuNgayBaoCao", TuNgayBaoCao);
                dynamicParameters.Add("@DenNgayBaoCao", DenNgayBaoCao);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_AllTrangThaiTuDenNgay", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<PCTDienViewModel>()
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

        public async Task<PagedResult<PCTDienViewModel>> PCTD_Get_PCTDien_AllTrangThai(string corporationid, string phongbandanhmucid,
            int trangthai, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@PhongBanDanhMucId", phongbandanhmucid);
                dynamicParameters.Add("@TrangThaiPCT", trangthai);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_AllTrangThai", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<PCTDienViewModel>()
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

        public async Task<List<PCTDienViewModel>> PCTD_Get_PCTDien_AllTrangThaiCount(string corporationid, string phongbandanhmucid,
            int trangthai)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@PhongBanDanhMucId", phongbandanhmucid);
                dynamicParameters.Add("@TrangThaiPCT", trangthai);

                try
                {
                    var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_AllTrangThaiCount", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);
                    
                    return result.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<PCTDienViewModel>> PCTD_Get_PCTDien_AllPaging(string corporationid, string phongbandanhmucid,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@PhongBanDanhMucId", phongbandanhmucid);

                dynamicParameters.Add("@Keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<PCTDienViewModel>("PCTD_Get_PCTDien_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<PCTDienViewModel>()
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

        public async Task<bool> PCTD_Create_PCTDien(PCTDienViewModel pctdien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Code", pctdien.Code);
                dynamicParameters.Add("@CorporationId", pctdien.CorporationId);
                dynamicParameters.Add("@PhongBanDanhMucId", pctdien.PhongBanDanhMucId);

                dynamicParameters.Add("@NguoiLanhDaoCongViecId", pctdien.NguoiLanhDaoCongViecId);
                dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdien.NguoiChiHuyTrucTiepId);
                dynamicParameters.Add("@NguoiGiamSatATDId", pctdien.NguoiGiamSatATDId);
                dynamicParameters.Add("@NguoiChoPhepId", pctdien.NguoiChoPhepId);
                dynamicParameters.Add("@TenNguoiCapPCTId", pctdien.TenNguoiCapPCTId);

                dynamicParameters.Add("@TenNguoiLanhDaoCongViec", pctdien.TenNguoiLanhDaoCongViec);
                dynamicParameters.Add("@BacATDNguoiLanhDaoCongViecId", pctdien.BacATDNguoiLanhDaoCongViecId);
                dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdien.TenNguoiChiHuyTrucTiep);
                dynamicParameters.Add("@BacATDNguoiChiHuyTrucTiepId", pctdien.BacATDNguoiChiHuyTrucTiepId);

                dynamicParameters.Add("@DiaDiemCongTac", pctdien.DiaDiemCongTac);

                dynamicParameters.Add("@GioBatDauKT", pctdien.GioBatDauKH);
                dynamicParameters.Add("@PhutBatDauKT", pctdien.PhutBatDauKH);
                dynamicParameters.Add("@NgayBatDauKH", pctdien.NgayBatDauKH);
                dynamicParameters.Add("@GioKetThucKT", pctdien.GioKetThucKH);
                dynamicParameters.Add("@PhutKetThucKT", pctdien.PhutKetThucKH);
                dynamicParameters.Add("@NgayKetThucKH", pctdien.NgayKetThucKH);

                dynamicParameters.Add("@CacCongTyDonVi", pctdien.CacCongTyDonVi);
                dynamicParameters.Add("@CacNoiDungCongTac", pctdien.CacNoiDungCongTac);
                dynamicParameters.Add("@CacDieuKiemATLD", pctdien.CacDieuKiemATLD);
                dynamicParameters.Add("@CacTrangBiATBHLDLamViec", pctdien.CacTrangBiATBHLDLamViec); 

                dynamicParameters.Add("@TongHangMucDaTrangCap", pctdien.TongHangMucDaTrangCap);
                dynamicParameters.Add("@CacDonViQLVHCoLienQuan", pctdien.CacDonViQLVHCoLienQuan);

                dynamicParameters.Add("@TenNguoiGiamSatATD", pctdien.TenNguoiGiamSatATD);
                dynamicParameters.Add("@BacATDNguoiGiamSatATD", pctdien.BacATDNguoiGiamSatATD);
                dynamicParameters.Add("@TenNguoiChoPhep", pctdien.TenNguoiChoPhep);
                dynamicParameters.Add("@BacNguoiChoPhep", pctdien.BacNguoiChoPhep);

                dynamicParameters.Add("@NgayCapPCT", pctdien.NgayCapPCT);
                dynamicParameters.Add("@TenNguoiCapPCT", pctdien.TenNguoiCapPCT);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Create_PCTDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien(PCTDienViewModel pctdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdien.Id);
                dynamicParameters.Add("@Code", pctdien.Code);

                dynamicParameters.Add("@CorporationId", pctdien.CorporationId);
                dynamicParameters.Add("@PhongBanDanhMucId", pctdien.PhongBanDanhMucId);

                dynamicParameters.Add("@NguoiLanhDaoCongViecId", pctdien.NguoiLanhDaoCongViecId);
                dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdien.NguoiChiHuyTrucTiepId);
                dynamicParameters.Add("@NguoiGiamSatATDId", pctdien.NguoiGiamSatATDId);
                dynamicParameters.Add("@NguoiChoPhepId", pctdien.NguoiChoPhepId);
                dynamicParameters.Add("@TenNguoiCapPCTId", pctdien.TenNguoiCapPCTId);

                dynamicParameters.Add("@TenNguoiLanhDaoCongViec", pctdien.TenNguoiLanhDaoCongViec);
                dynamicParameters.Add("@BacATDNguoiLanhDaoCongViecId", pctdien.BacATDNguoiLanhDaoCongViecId);
                dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdien.TenNguoiChiHuyTrucTiep);
                dynamicParameters.Add("@BacATDNguoiChiHuyTrucTiepId", pctdien.BacATDNguoiChiHuyTrucTiepId);

                dynamicParameters.Add("@DiaDiemCongTac", pctdien.DiaDiemCongTac);

                dynamicParameters.Add("@GioBatDauKT", pctdien.GioBatDauKH);
                dynamicParameters.Add("@PhutBatDauKT", pctdien.PhutBatDauKH);
                dynamicParameters.Add("@NgayBatDauKH", pctdien.NgayBatDauKH);
                dynamicParameters.Add("@GioKetThucKT", pctdien.GioKetThucKH);
                dynamicParameters.Add("@PhutKetThucKT", pctdien.PhutKetThucKH);
                dynamicParameters.Add("@NgayKetThucKH", pctdien.NgayKetThucKH);

                dynamicParameters.Add("@CacCongTyDonVi", pctdien.CacCongTyDonVi);
                dynamicParameters.Add("@CacNoiDungCongTac", pctdien.CacNoiDungCongTac);
                dynamicParameters.Add("@CacDieuKiemATLD", pctdien.CacDieuKiemATLD);
                dynamicParameters.Add("@CacTrangBiATBHLDLamViec", pctdien.CacTrangBiATBHLDLamViec);

                dynamicParameters.Add("@TongHangMucDaTrangCap", pctdien.TongHangMucDaTrangCap);
                dynamicParameters.Add("@CacDonViQLVHCoLienQuan", pctdien.CacDonViQLVHCoLienQuan);

                dynamicParameters.Add("@TenNguoiGiamSatATD", pctdien.TenNguoiGiamSatATD);
                dynamicParameters.Add("@BacATDNguoiGiamSatATD", pctdien.BacATDNguoiGiamSatATD);
                dynamicParameters.Add("@TenNguoiChoPhep", pctdien.TenNguoiChoPhep);
                dynamicParameters.Add("@BacNguoiChoPhep", pctdien.BacNguoiChoPhep);

                dynamicParameters.Add("@NgayCapPCT", pctdien.NgayCapPCT);
                dynamicParameters.Add("@TenNguoiCapPCT", pctdien.TenNguoiCapPCT);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien_ByIdChoPhepLamViec(PCTDienViewModel pctdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdien.Id);                

                dynamicParameters.Add("@ThietBiDuongDayDaCatDien", pctdien.ThietBiDuongDayDaCatDien);
                dynamicParameters.Add("@DaTiepDatTai", pctdien.DaTiepDatTai);
                dynamicParameters.Add("@DaLamRaoChanTreoBienBaoTai", pctdien.DaLamRaoChanTreoBienBaoTai);
                dynamicParameters.Add("@PhamViDuocPhepLamViec", pctdien.PhamViDuocPhepLamViec);
                dynamicParameters.Add("@CanhBaoChiDanNguyHiem", pctdien.CanhBaoChiDanNguyHiem);
                dynamicParameters.Add("@NguoiChiHuyTTKiemTraDamBaoAT", pctdien.NguoiChiHuyTTKiemTraDamBaoAT);
                dynamicParameters.Add("@LamTiepDatTai", pctdien.LamTiepDatTai);
                dynamicParameters.Add("@TongHangMucDaKiemTraBHLD", pctdien.TongHangMucDaKiemTraBHLD);
                dynamicParameters.Add("@CacGiayPhoiHopChoPhep", pctdien.CacGiayPhoiHopChoPhep);
                dynamicParameters.Add("@GioChoPhepDonViCT", pctdien.GioChoPhepDonViCT);
                dynamicParameters.Add("@PhutChoPhepDonViCT", pctdien.PhutChoPhepDonViCT);
                dynamicParameters.Add("@NgayChoPhepDonViCT", pctdien.NgayChoPhepDonViCT);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien_ByIdChoPhepLamViec", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien_ByIdKetThucCongViec(PCTDienViewModel pctdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdien.Id);

                dynamicParameters.Add("@TraLamViecTenOngBa", pctdien.TraLamViecTenOngBa);
                dynamicParameters.Add("@TraLamViecOngBaTenChucVu", pctdien.TraLamViecOngBaTenChucVu);
                dynamicParameters.Add("@TenDaiDienQuanLyVanHanh", pctdien.TenDaiDienQuanLyVanHanh);
                dynamicParameters.Add("@GioTraLamViec", pctdien.GioTraLamViec);
                dynamicParameters.Add("@PhutTraLamViec", pctdien.PhutTraLamViec);
                dynamicParameters.Add("@NgayTraLamViec", pctdien.NgayTraLamViec);
                dynamicParameters.Add("@LyDoTonChuaThucHien", pctdien.LyDoTonChuaThucHien);
                dynamicParameters.Add("@LyDoChuaThucHien", pctdien.LyDoChuaThucHien);
                dynamicParameters.Add("@NguoiChiHuyTrucTiepId", pctdien.NguoiChiHuyTrucTiepId);
                dynamicParameters.Add("@TenNguoiChiHuyTrucTiep", pctdien.TenNguoiChiHuyTrucTiep);
                dynamicParameters.Add("@GioKhoaPCT", pctdien.GioKhoaPCT);
                dynamicParameters.Add("@PhutKhoaPCT", pctdien.PhutKhoaPCT);
                dynamicParameters.Add("@NgayKhoaPCT", pctdien.NgayKhoaPCT);

                dynamicParameters.Add("@NguoiChoPhepId", pctdien.NguoiChoPhepId);
                dynamicParameters.Add("@TenNguoiChoPhep", pctdien.TenNguoiChoPhep);
                dynamicParameters.Add("@NgayKiemTraHoanThanhPCT", pctdien.NgayKiemTraHoanThanhPCT);
                dynamicParameters.Add("@TenNguoiCapPCTId", pctdien.TenNguoiCapPCTId);
                dynamicParameters.Add("@TenNguoiCapPCT", pctdien.TenNguoiCapPCT);

                dynamicParameters.Add("@NguoiKiemTraATLDTaiHienTruongId", pctdien.NguoiKiemTraATLDTaiHienTruongId);
                dynamicParameters.Add("@TenNguTenNguoiKiemTraATLDTaiHienTruongoiCapPCT", pctdien.TenNguoiKiemTraATLDTaiHienTruong);
                dynamicParameters.Add("@ChucVuNguoiKiemTraATLDTaiHienTruong", pctdien.ChucVuNguoiKiemTraATLDTaiHienTruong);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien_ByIdKetThucCongViec", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien_ByIdHuyCT(PCTDienViewModel pctdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdien.Id);                

                dynamicParameters.Add("@NgayHuyPCT", pctdien.NgayHuyPCT);
                dynamicParameters.Add("@GhiChuHuyPCT", pctdien.GhiChuHuyPCT);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien_ByIdHuyCT", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien_ByIdXacNhanDaCap(string username, int pctdienid, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdienid);

                dynamicParameters.Add("@UserName", username);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien_ByIdXacNhanDaCap", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> PCTD_Update_PCTDien_ByIdKiemTraThucHien(PCTDienViewModel pctdien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", pctdien.Id);

                dynamicParameters.Add("@NgayKiemTraThucHien", pctdien.NgayKiemTraThucHien);
                dynamicParameters.Add("@TrangThaiKiemTraThucHien", pctdien.TrangThaiKiemTraThucHien);
                dynamicParameters.Add("@GhiChuKiemTraThucHien", pctdien.GhiChuKiemTraThucHien);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<PCTDienViewModel>(
                        "PCTD_Update_PCTDien_ByIdKiemTraThucHien", dynamicParameters, commandType: CommandType.StoredProcedure);
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
