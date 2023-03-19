using System;
using System.Collections.Generic;
using System.Text;

using Dapper;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;
using NiTiErp.Utilities.Dtos;
using System.Linq;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;

namespace NiTiErp.Application.Dapper.Implementation.DangKyDien
{
    public class DonDangKyPoService : IDonDangKyPoService
    {
        private readonly IConfiguration _configuration;

        public DonDangKyPoService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<DonDangKyPoViewModel> Get_DonDangKyPo_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                        "Get_DonDangKyPo_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<DonDangKyPoViewModel>> Get_DonDangKyPo_AllPaging(string khuvuc, string phongto, string keyword,
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
                    var result = await sqlConnection.QueryAsync<DonDangKyPoViewModel>("Get_DonDangKyPo_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<DonDangKyPoViewModel>()
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

        public async Task<List<DonDangKyPoViewModel>> Get_DonDangKyPo_ByLichSuDDKPo(string maddkPo)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDKPO", maddkPo);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                        "Get_DonDangKyPo_ByLichSuDDKPo", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_DonDangKyPo(DonDangKyPoViewModel dangky, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", dangky.CorporationId);

                dynamicParameters.Add("@TENKH", dangky.TENKH);
                dynamicParameters.Add("@NGAYSINH", dangky.NGAYSINH);
                dynamicParameters.Add("@DIENTHOAI", dangky.DIENTHOAI);
                dynamicParameters.Add("@MAMDSDPO", dangky.MAMDSDPO);
                dynamicParameters.Add("@TEN_DC_KHAC", dangky.TEN_DC_KHAC);
                dynamicParameters.Add("@SOHODN", dangky.SOHODN);

                dynamicParameters.Add("@SONK", dangky.SONK);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", dangky.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", dangky.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", dangky.PhuongXaIdLD);
                dynamicParameters.Add("@TenDuongLD", dangky.TenDuongLD);
                dynamicParameters.Add("@SONHA2", dangky.SONHA2);

                dynamicParameters.Add("@CMND", dangky.CMND);
                dynamicParameters.Add("@CAPNGAY", dangky.CAPNGAY);
                dynamicParameters.Add("@TAI", dangky.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", dangky.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", dangky.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", dangky.PhuongXaIdKH);

                dynamicParameters.Add("@TenDuongKH", dangky.TenDuongKH);
                dynamicParameters.Add("@SoNhaKH", dangky.SoNhaKH);

                dynamicParameters.Add("@MST", dangky.MST);
                dynamicParameters.Add("@NGAYDK", dangky.NGAYDK);
                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOILAPDHHN", dangky.NOILAPDHHN);

                //dynamicParameters.Add("@MADPMADBKHGAN", dangky.MADPMADBKHGAN);
              
                dynamicParameters.Add("@TENDK", dangky.TENDK);
                dynamicParameters.Add("@TENCHUCVU", dangky.TENCHUCVU);

                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@SOTRUPO", dangky.SOTRUPO);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                         "Create_DonDangKyPo", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKyPo(DonDangKyPoViewModel dangky, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDKPO);               

                dynamicParameters.Add("@TENKH", dangky.TENKH);
                dynamicParameters.Add("@NGAYSINH", dangky.NGAYSINH);
                dynamicParameters.Add("@DIENTHOAI", dangky.DIENTHOAI);
                dynamicParameters.Add("@MAMDSDPO", dangky.MAMDSDPO);
                dynamicParameters.Add("@TEN_DC_KHAC", dangky.TEN_DC_KHAC);
                dynamicParameters.Add("@SOHODN", dangky.SOHODN);

                dynamicParameters.Add("@SONK", dangky.SONK);
                dynamicParameters.Add("@ThanhPhoTinhIdLD", dangky.ThanhPhoTinhIdLD);
                dynamicParameters.Add("@QuanHuyenIdLD", dangky.QuanHuyenIdLD);
                dynamicParameters.Add("@PhuongXaIdLD", dangky.PhuongXaIdLD);
                dynamicParameters.Add("@TenDuongLD", dangky.TenDuongLD);
                dynamicParameters.Add("@SONHA2", dangky.SONHA2);

                dynamicParameters.Add("@CMND", dangky.CMND);
                dynamicParameters.Add("@CAPNGAY", dangky.CAPNGAY);
                dynamicParameters.Add("@TAI", dangky.TAI);
                dynamicParameters.Add("@ThanhPhoTinhIdKH", dangky.ThanhPhoTinhIdKH);
                dynamicParameters.Add("@QuanHuyenIdKH", dangky.QuanHuyenIdKH);
                dynamicParameters.Add("@PhuongXaIdKH", dangky.PhuongXaIdKH);

                dynamicParameters.Add("@TenDuongKH", dangky.TenDuongKH);
                dynamicParameters.Add("@SoNhaKH", dangky.SoNhaKH);

                dynamicParameters.Add("@MST", dangky.MST);
                dynamicParameters.Add("@NGAYDK", dangky.NGAYDK);
                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOILAPDHHN", dangky.NOILAPDHHN);

                //dynamicParameters.Add("@MADPMADBKHGAN", dangky.MADPMADBKHGAN);

                dynamicParameters.Add("@TENDK", dangky.TENDK);
                dynamicParameters.Add("@TENCHUCVU", dangky.TENCHUCVU);

                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@SOTRUPO", dangky.SOTRUPO);

                dynamicParameters.Add("@UpdateDate", createDate);
                dynamicParameters.Add("@UpdateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                         "Update_DonDangKyPo", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKyPo_ByXuLyDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDKPO);

                dynamicParameters.Add("@NGAYDUYETHS", dangky.NGAYHKS);
                dynamicParameters.Add("@MaPhongBanDuyetQuyen", dangky.MaPhongBanDuyetQuyen);
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                         "Update_DonDangKyPo_ByXuLyDon", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKyPo_ByTuChoiDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDKPO);

                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                         "Update_DonDangKyPo_ByTuChoiDon", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_DonDangKyPo_ByPhucHoiTuChoiDon(DonDangKyPoViewModel dangky, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", dangky.MADDKPO);

                dynamicParameters.Add("@NGAYKS", dangky.NGAYKS);
                dynamicParameters.Add("@NOIDUNG", dangky.NOIDUNG);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                         "Update_DonDangKyPo_ByPhucHoiTuChoiDon", dynamicParameters, commandType: CommandType.StoredProcedure);
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
