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
    public class DonDangKyService : IDonDangKyService
    {
        private readonly IConfiguration _configuration;

        public DonDangKyService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiThietKe(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByChuanBiThietKe", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiHopDong(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByChuanBiHopDong", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiThiCong(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByChuanBiThiCong", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThietKe(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByThietKe", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThietKeDsDieuKienTim(string khuvuc, string phongto, 
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@DanhSachDieuKienTimDK", DanhSachDieuKienTimDK);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByThietKeDsDieuKienTim", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByHopDong(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByHopDong", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThiCong(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByThiCong", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByThiCongDsDieuKienTim(string khuvuc, string phongto,
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@DanhSachDieuKienTimDK", DanhSachDieuKienTimDK);
                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByThiCongDsDieuKienTim", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByNghiemThu(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByNghiemThu", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_ByChuanBiNghiemThu(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_ByChuanBiNghiemThu", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_AllPaging(string khuvuc, string phongto, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<PagedResult<DonDangKyViewModel>> Get_DonDangKy_AllPagingDsDieuKienTim(string khuvuc, string phongto, 
            string DanhSachDieuKienTimDK, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CoporationId", khuvuc);
                dynamicParameters.Add("@PhongDanhMucId", phongto);
                dynamicParameters.Add("@DanhSachDieuKienTimDK", DanhSachDieuKienTimDK);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<DonDangKyViewModel>("Get_DonDangKy_AllPagingDsDieuKienTim", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyViewModel>()
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

        public async Task<List<DonDangKyViewModel>> Get_DonDangKy_ByLichSuDDK(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyViewModel>(
                        "Get_DonDangKy_ByLichSuDDK", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<DonDangKyViewModel> Get_DonDangKy_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyViewModel>(
                        "Get_DonDangKy_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_DonDangKy(DonDangKyViewModel dangky, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", dangky.CorporationId);

                dynamicParameters.Add("@TENKH", dangky.TENKH);
                dynamicParameters.Add("@NGAYSINH", dangky.NGAYSINH);
                dynamicParameters.Add("@DIENTHOAI", dangky.DIENTHOAI);
                dynamicParameters.Add("@MAMDSD", dangky.MAMDSD);
                dynamicParameters.Add("@TEN_DC_KHAC", dangky.TEN_DC_KHAC);
                dynamicParameters.Add("@SOHODN", dangky.SOHODN);

                dynamicParameters.Add("@SONK", dangky.SONK);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", dangky.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", dangky.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", dangky.PhuongXaIdLD);
                dynamicParameters.Add("@SoNhaTenDuongLD", dangky.SoNhaTenDuongLD);
                dynamicParameters.Add("@SONHA2", dangky.SONHA2);

                dynamicParameters.Add("@CMND", dangky.CMND);
                dynamicParameters.Add("@CAPNGAY", dangky.CAPNGAY);
                dynamicParameters.Add("@TAI", dangky.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", dangky.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", dangky.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", dangky.PhuongXaIdKH);

                dynamicParameters.Add("@TenDuongApToKH", dangky.TenDuongApToKH);
                dynamicParameters.Add("@SoNhaKH", dangky.SoNhaKH);

                dynamicParameters.Add("@MST", dangky.MST);
                dynamicParameters.Add("@NGAYDK", dangky.NGAYDK);
                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOILAPDHHN", dangky.NOILAPDHHN);

                dynamicParameters.Add("@MADPMADBKHGAN", dangky.MADPMADBKHGAN);

                dynamicParameters.Add("@TIENCOCLX", dangky.TIENCOCLX);
                dynamicParameters.Add("@TIENVATTULX", dangky.TIENVATTULX);
                dynamicParameters.Add("@TENDK", dangky.TENDK);
                dynamicParameters.Add("@TENCHUCVU", dangky.TENCHUCVU);

                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);
                //dynamicParameters.Add("@SOHD", dangky.SOHD);
                //dynamicParameters.Add("@SONO", dangky.SONO);
                //dynamicParameters.Add("@TenPhong", dangky.TenPhong);
                //dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyViewModel>(
                         "Create_DonDangKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKy(DonDangKyViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@TENKH", dangky.TENKH);
                dynamicParameters.Add("@NGAYSINH", dangky.NGAYSINH);
                dynamicParameters.Add("@DIENTHOAI", dangky.DIENTHOAI);
                dynamicParameters.Add("@MAMDSD", dangky.MAMDSD);
                dynamicParameters.Add("@TEN_DC_KHAC", dangky.TEN_DC_KHAC);
                dynamicParameters.Add("@SOHODN", dangky.SOHODN);

                dynamicParameters.Add("@SONK", dangky.SONK);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", dangky.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", dangky.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", dangky.PhuongXaIdLD);
                dynamicParameters.Add("@SoNhaTenDuongLD", dangky.SoNhaTenDuongLD);
                dynamicParameters.Add("@SONHA2", dangky.SONHA2);

                dynamicParameters.Add("@CMND", dangky.CMND);
                dynamicParameters.Add("@CAPNGAY", dangky.CAPNGAY);
                dynamicParameters.Add("@TAI", dangky.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", dangky.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", dangky.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", dangky.PhuongXaIdKH);

                dynamicParameters.Add("@TenDuongApToKH", dangky.TenDuongApToKH);
                dynamicParameters.Add("@SoNhaKH", dangky.SoNhaKH);

                dynamicParameters.Add("@MST", dangky.MST);
                dynamicParameters.Add("@NGAYDK", dangky.NGAYDK);
                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOILAPDHHN", dangky.NOILAPDHHN);

                dynamicParameters.Add("@MADPMADBKHGAN", dangky.MADPMADBKHGAN);

                dynamicParameters.Add("@TIENCOCLX", dangky.TIENCOCLX);
                dynamicParameters.Add("@TIENVATTULX", dangky.TIENVATTULX);
                dynamicParameters.Add("@TENDK", dangky.TENDK);
                dynamicParameters.Add("@TENCHUCVU", dangky.TENCHUCVU);

                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);
                //dynamicParameters.Add("@SOHD", dangky.SOHD);
                //dynamicParameters.Add("@SONO", dangky.SONO);
                //dynamicParameters.Add("@TenPhong", dangky.TenPhong);
                //dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyViewModel>(
                         "Update_DonDangKy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKy_ByXuLyDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@NGAYDUYETHS", dangky.NGAYDUYETHS);
                dynamicParameters.Add("@MaPhongBanDuyetQuyen", dangky.MaPhongBanDuyetQuyen);
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyViewModel>(
                         "Update_DonDangKy_ByXuLyDon", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKy_ByTuChoiDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@NGAYDUYETHS", dangky.NGAYDUYETHS);                
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyViewModel>(
                         "Update_DonDangKy_ByTuChoiDon", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKy_ByPhucHoiTuChoiDon(DonDangKyViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDK);

                dynamicParameters.Add("@NGAYDUYETHS", dangky.NGAYDUYETHS);
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyViewModel>(
                         "Update_DonDangKy_ByPhucHoiTuChoiDon", dynamicParameters, commandType: CommandType.StoredProcedure);
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
