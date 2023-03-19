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
using NiTiErp.Application.Dapper.ViewModels.DangKyDien;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class TTDangKyDienService : ITTDangKyDienService
    {
        private readonly IConfiguration _configuration;

        public TTDangKyDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region Get list Lich su dang ky
        public async Task<List<DonDangKyPoViewModel>> Get_DonDangKyPo_ByLichSuTTDangKyDienId(int TTDangKyDienId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", TTDangKyDienId);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyPoViewModel>(
                        "Get_DonDangKyPo_ByLichSuTTDangKyDienId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        #endregion

        public async Task<TTDangKyDienViewModel> Get_TTDangKyDien_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Get_TTDangKyDien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<TTDangKyDienViewModel> Get_TTDangKyDien_ByIdNoTest(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Get_TTDangKyDien_ByIdNoTest", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTDangKyDienViewModel>> Get_TTDangKyDien_AllPaging(int tinh, int quanhuyen, string keyword,
            int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThanhPhoTinhId", tinh);
                dynamicParameters.Add("@QuanHuyenId", quanhuyen);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<TTDangKyDienViewModel>("Get_TTDangKyDien_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTDangKyDienViewModel>()
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

        public async Task<PagedResult<TTDangKyDienViewModel>> Get_TTDangKyDien_AllPagingTT(int tinh, int quanhuyen, string theotrangthai,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@ThanhPhoTinhId", tinh);
                dynamicParameters.Add("@QuanHuyenId", quanhuyen);
                dynamicParameters.Add("@TheoTrangThai", theotrangthai);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<TTDangKyDienViewModel>("Get_TTDangKyDien_AllPagingTT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTDangKyDienViewModel>()
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

        public async Task<List<TTDangKyDienViewModel>> Get_TTDangKyDien_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo, 
            DateTime TuNgay, DateTime DenNgay)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@XiNghiep", XiNghiep);
                dynamicParameters.Add("@DanhSachTheo", DanhSachTheo);
                dynamicParameters.Add("@TuNgay", TuNgay);
                dynamicParameters.Add("@DenNgay", DenNgay);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Get_TTDangKyDien_ByDsTheoTuNgay", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTDangKyDienViewModel>> Create_TTDangKyDien(Guid codeid, TTDangKyDienViewModel dangkydien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileCodeId", codeid);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dangkydien.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dangkydien.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dangkydien.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dangkydien.NgayCap);
                dynamicParameters.Add("@NoiCap", dangkydien.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dangkydien.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dangkydien.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dangkydien.PhuongXaId);
                dynamicParameters.Add("@SoNha", dangkydien.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dangkydien.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyMucDichSuDung", dangkydien.TTDMDangKyMucDichSuDung);
                dynamicParameters.Add("@TTDMDangKyLoaiHinhDichVu", dangkydien.TTDMDangKyLoaiHinhDichVu);
                dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkydien.TTDMDangKyGiayToTuyThan);
                dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkydien.TTDMDangKyGiayToXacDinhChuThe);
                dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkydien.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@TTDangKyDienId", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                
                try
                {
                    var result = await sqlConnection.QueryAsync<TTDangKyDienViewModel>("Create_TTDangKyDien", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@TTDangKyDienId");

                    var pagedResult = new PagedResult<TTDangKyDienViewModel>()
                    {
                        Results = result.ToList(),
                        CurrentPage = 1,
                        RowCount = totalRow,
                        PageSize = 10
                    };
                    return pagedResult;                    
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyDien_ById(TTDangKyDienViewModel dangkydien,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", dangkydien.Id);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dangkydien.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dangkydien.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dangkydien.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dangkydien.NgayCap);
                dynamicParameters.Add("@NoiCap", dangkydien.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dangkydien.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dangkydien.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dangkydien.PhuongXaId);
                dynamicParameters.Add("@SoNha", dangkydien.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dangkydien.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyMucDichSuDung", dangkydien.TTDMDangKyMucDichSuDung);
                dynamicParameters.Add("@TTDMDangKyLoaiHinhDichVu", dangkydien.TTDMDangKyLoaiHinhDichVu);

                //dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkydien.TTDMDangKyGiayToTuyThan);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkydien.TTDMDangKyGiayToXacDinhChuThe);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkydien.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@GhiChu", dangkydien.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Update_TTDangKyDien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;                    
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyDien_ByTuChoi(int dangkydienId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", dangkydienId);

                dynamicParameters.Add("@NgayTuChoi", NgayTuChoi);
                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Update_TTDangKyDien_ByTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyDien_ByPhucHoiTuChoi(int dangkydienId, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", dangkydienId);
                
                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Update_TTDangKyDien_ByPhucHoiTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_TTDangKyDien(int id, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", id);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Delete_TTDangKyDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyDien_ByXacNhanDien(int dangkydienId, DateTime NgayChuyenTK, string LyDoChuyenTK,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyDienId", dangkydienId);

                dynamicParameters.Add("@NgayChuyenTK", NgayChuyenTK);
                dynamicParameters.Add("@LyDoChuyenTK", LyDoChuyenTK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Update_TTDangKyDien_ByXacNhanDienToDDKPo", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        

        public async Task<bool> Update_TTDangKyDien_ByAllDienNuocDichVu(DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();               

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyDienViewModel>(
                        "Update_TTDangKyDien_ByAllDienNuocDichVu", dynamicParameters, commandType: CommandType.StoredProcedure);
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
