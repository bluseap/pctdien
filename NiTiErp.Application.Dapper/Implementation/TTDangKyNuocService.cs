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
using NiTiErp.Application.Dapper.ViewModels.DangKyNuoc;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class TTDangKyNuocService : ITTDangKyNuocService
    {
        private readonly IConfiguration _configuration;

        public TTDangKyNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region Get list Lich su dang ky
        public async Task<List<DonDangKyViewModel>> Get_DonDangKy_ByLichSuTTDangKyNuocId(int TTDangKyNuocId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", TTDangKyNuocId);

                try
                {
                    var query = await sqlConnection.QueryAsync<DonDangKyViewModel>(
                        "Get_DonDangKy_ByLichSuTTDangKyNuocId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
        #endregion

        public async Task<TTDangKyNuocViewModel> Get_TTDangKyNuoc_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Get_TTDangKyNuoc_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<TTDangKyNuocViewModel> Get_TTDangKyNuoc_ByIdNoTest(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Get_TTDangKyNuoc_ByIdNoTest", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_AllPaging(int tinh, int quanhuyen, string keyword,
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
                    var result = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>("Get_TTDangKyNuoc_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTDangKyNuocViewModel>()
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

        public async Task<PagedResult<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_AllPagingTT(int tinh, int quanhuyen, string theotrangthai,
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
                    var result = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>("Get_TTDangKyNuoc_AllPagingTT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTDangKyNuocViewModel>()
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

        public async Task<List<TTDangKyNuocViewModel>> Get_TTDangKyNuoc_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
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
                    var query = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Get_TTDangKyNuoc_ByDsTheoTuNgay", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTDangKyNuocViewModel>> Create_TTDangKyNuoc(Guid codeid, TTDangKyNuocViewModel dangkynuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileCodeId", codeid);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dangkynuoc.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dangkynuoc.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dangkynuoc.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dangkynuoc.NgayCap);
                dynamicParameters.Add("@NoiCap", dangkynuoc.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dangkynuoc.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dangkynuoc.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dangkynuoc.PhuongXaId);
                dynamicParameters.Add("@SoNha", dangkynuoc.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dangkynuoc.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyMucDichSuDung", dangkynuoc.TTDMDangKyMucDichSuDung);
                dynamicParameters.Add("@TTDMDangKyLoaiHinhDichVu", dangkynuoc.TTDMDangKyLoaiHinhDichVu);
                dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkynuoc.TTDMDangKyGiayToTuyThan);
                dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkynuoc.TTDMDangKyGiayToXacDinhChuThe);
                dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkynuoc.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@TTDangKyNuocId", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<TTDangKyNuocViewModel>("Create_TTDangKyNuoc", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@TTDangKyNuocId");

                    var pagedResult = new PagedResult<TTDangKyNuocViewModel>()
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

        public async Task<bool> Update_TTDangKyNuoc_ById(TTDangKyNuocViewModel dangkynuoc,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", dangkynuoc.Id);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dangkynuoc.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dangkynuoc.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dangkynuoc.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dangkynuoc.NgayCap);
                dynamicParameters.Add("@NoiCap", dangkynuoc.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dangkynuoc.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dangkynuoc.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dangkynuoc.PhuongXaId);
                dynamicParameters.Add("@SoNha", dangkynuoc.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dangkynuoc.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyMucDichSuDung", dangkynuoc.TTDMDangKyMucDichSuDung);
                dynamicParameters.Add("@TTDMDangKyLoaiHinhDichVu", dangkynuoc.TTDMDangKyLoaiHinhDichVu);

                //dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkydien.TTDMDangKyGiayToTuyThan);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkydien.TTDMDangKyGiayToXacDinhChuThe);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkydien.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@GhiChu", dangkynuoc.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Update_TTDangKyNuoc_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyNuoc_ByTuChoi(int dangkynuocId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", dangkynuocId);

                dynamicParameters.Add("@NgayTuChoi", NgayTuChoi);
                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Update_TTDangKyNuoc_ByTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyNuoc_ByPhucHoiTuChoi(int dangkynuocId, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", dangkynuocId);

                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Update_TTDangKyNuoc_ByPhucHoiTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_TTDangKyNuoc(int id, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", id);                

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Delete_TTDangKyNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTDangKyNuoc_ByXacNhanNuoc(int dangkynuocId, DateTime NgayChuyenTK, string LyDoChuyenTK,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyNuocId", dangkynuocId);

                dynamicParameters.Add("@NgayChuyenTK", NgayChuyenTK);
                dynamicParameters.Add("@LyDoChuyenTK", LyDoChuyenTK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTDangKyNuocViewModel>(
                        "Update_TTDangKyNuoc_ByXacNhanNuocToDDK", dynamicParameters, commandType: CommandType.StoredProcedure);
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
