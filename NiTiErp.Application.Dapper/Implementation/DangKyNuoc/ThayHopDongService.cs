using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;

namespace NiTiErp.Application.Dapper.Implementation.DangKyNuoc
{
    public class ThayHopDongService : IThayHopDongService
    {
        private readonly IConfiguration _configuration;

        public ThayHopDongService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<ThayHopDongViewModel> Get_ThayHopDong_ByIdMakv(string thayhopdongidmakv)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThayHopDongIdMakv", thayhopdongidmakv);

                try
                {
                    var query = await sqlConnection.QueryAsync<ThayHopDongViewModel>(
                        "Get_ThayHopDong_ByIdMakv", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }   

        public async Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_AllPaging(string khuvuc, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<ThayHopDongViewModel>("Get_ThayHopDong_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<ThayHopDongViewModel>()
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

        public async Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_ByLoaiHopDongPaging(string khuvuc, string loaihopdong,
            string keyword,  int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@LoaiHopDongId", loaihopdong);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<ThayHopDongViewModel>("Get_ThayHopDong_ByLoaiHopDongPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<ThayHopDongViewModel>()
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

        public async Task<PagedResult<ThayHopDongViewModel>> Get_ThayHopDong_ByDsHopDongTheoPaging(string khuvuc, string dshopdongtheo,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@DsHopDongTheo", dshopdongtheo);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<ThayHopDongViewModel>("Get_ThayHopDong_ByDsHopDongTheoPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<ThayHopDongViewModel>()
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

        public async Task<bool> Create_ThayHopDong(ThayHopDongViewModel thayhopdong, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MaKhachHang", thayhopdong.MaKhachHang);

                dynamicParameters.Add("@ThayHopDongTheoTDCT", thayhopdong.ThayHopDongTheoTDCT);
                dynamicParameters.Add("@HopDongLoaiId", thayhopdong.HopDongLoaiId);

                dynamicParameters.Add("@NAM", thayhopdong.NAM);
                dynamicParameters.Add("@THANG", thayhopdong.THANG);
                dynamicParameters.Add("@NGAYKT", thayhopdong.NGAYKT);
                dynamicParameters.Add("@NGAYHL", thayhopdong.NGAYHL);
                dynamicParameters.Add("@NgayHetHan", thayhopdong.NgayHetHan);
                dynamicParameters.Add("@TENKHMOI", thayhopdong.TENKHMOI);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", thayhopdong.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", thayhopdong.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", thayhopdong.PhuongXaIdLD);                
                dynamicParameters.Add("@TenDuongLD", thayhopdong.TenDuongLD);
                dynamicParameters.Add("@SoNhaLD", thayhopdong.SoNhaLD);
                dynamicParameters.Add("@MaMDSDMoi", thayhopdong.MaMDSDMoi);
                dynamicParameters.Add("@MaSoThueMoi", thayhopdong.MaSoThueMoi);
                dynamicParameters.Add("@UYQUYEN", thayhopdong.UYQUYEN);
                dynamicParameters.Add("@TENCHUCVU", thayhopdong.TENCHUCVU);
                dynamicParameters.Add("@SoGiayUyQuyen", thayhopdong.SoGiayUyQuyen);
                dynamicParameters.Add("@NgayUyQuyen", thayhopdong.NgayUyQuyen);
                dynamicParameters.Add("@DonViUyQuyen", thayhopdong.DonViUyQuyen);
                dynamicParameters.Add("@NGAYSINH", thayhopdong.NGAYSINH);
                dynamicParameters.Add("@CMND", thayhopdong.CMND);
                dynamicParameters.Add("@CAPNGAY", thayhopdong.CAPNGAY);
                dynamicParameters.Add("@TAI", thayhopdong.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", thayhopdong.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", thayhopdong.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", thayhopdong.PhuongXaIdKH);
                dynamicParameters.Add("@TenDuongApToKH", thayhopdong.TenDuongApToKH);
                dynamicParameters.Add("@SoNhaKH", thayhopdong.SoNhaKH);
                dynamicParameters.Add("@DIENTHOAI", thayhopdong.DIENTHOAI);
                dynamicParameters.Add("@LYDO", thayhopdong.LYDO);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    await sqlConnection.QueryAsync<ThayHopDongViewModel>(
                        "Create_ThayHopDong", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThayHopDong(ThayHopDongViewModel thayhopdong, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThayHopDongIdMaKv", thayhopdong.ThayHopDongIdMaKv);

                dynamicParameters.Add("@ThayHopDongTheoTDCT", thayhopdong.ThayHopDongTheoTDCT);
                dynamicParameters.Add("@HopDongLoaiId", thayhopdong.HopDongLoaiId);

                dynamicParameters.Add("@NAM", thayhopdong.NAM);
                dynamicParameters.Add("@THANG", thayhopdong.THANG);
                dynamicParameters.Add("@NGAYKT", thayhopdong.NGAYKT);
                dynamicParameters.Add("@NGAYHL", thayhopdong.NGAYHL);
                dynamicParameters.Add("@NgayHetHan", thayhopdong.NgayHetHan);
                dynamicParameters.Add("@TENKHMOI", thayhopdong.TENKHMOI);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", thayhopdong.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", thayhopdong.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", thayhopdong.PhuongXaIdLD);
                dynamicParameters.Add("@TenDuongLD", thayhopdong.TenDuongLD);
                dynamicParameters.Add("@SoNhaLD", thayhopdong.SoNhaLD);
                dynamicParameters.Add("@MaMDSDMoi", thayhopdong.MaMDSDMoi);
                dynamicParameters.Add("@MaSoThueMoi", thayhopdong.MaSoThueMoi);
                dynamicParameters.Add("@UYQUYEN", thayhopdong.UYQUYEN);
                dynamicParameters.Add("@TENCHUCVU", thayhopdong.TENCHUCVU);
                dynamicParameters.Add("@SoGiayUyQuyen", thayhopdong.SoGiayUyQuyen);
                dynamicParameters.Add("@NgayUyQuyen", thayhopdong.NgayUyQuyen);
                dynamicParameters.Add("@DonViUyQuyen", thayhopdong.DonViUyQuyen);
                dynamicParameters.Add("@NGAYSINH", thayhopdong.NGAYSINH);
                dynamicParameters.Add("@CMND", thayhopdong.CMND);
                dynamicParameters.Add("@CAPNGAY", thayhopdong.CAPNGAY);
                dynamicParameters.Add("@TAI", thayhopdong.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", thayhopdong.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", thayhopdong.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", thayhopdong.PhuongXaIdKH);
                dynamicParameters.Add("@TenDuongApToKH", thayhopdong.TenDuongApToKH);
                dynamicParameters.Add("@SoNhaKH", thayhopdong.SoNhaKH);
                dynamicParameters.Add("@DIENTHOAI", thayhopdong.DIENTHOAI);
                dynamicParameters.Add("@LYDO", thayhopdong.LYDO);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<ThayHopDongViewModel>(
                        "Update_ThayHopDong", dynamicParameters, commandType: CommandType.StoredProcedure);
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
