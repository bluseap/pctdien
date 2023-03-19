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
    public class GiayDeNghiDMCungCapDienService : IGiayDeNghiDMCungCapDienService
    {
        private readonly IConfiguration _configuration;

        public GiayDeNghiDMCungCapDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GiayDeNghiDMCungCapDienViewModel> Get_GiayDeNghiDMCungCapDien_ById(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);

                var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<GiayDeNghiDMCungCapDienViewModel> Get_GiayDeNghiCungCapDien_ById(int giaydenghiid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@id", giaydenghiid);

                var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiCungCapDien_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiCungCapDien_AllPaging(string corporationId, string phongdanhmucId,
            string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiCungCapDien_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_Tim(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_Tim", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTTK(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_AllByTTTK", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTTC(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_AllByTTTC", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTNT(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_AllByTTNT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTKTKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_AllByTTKTKD", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_AllByTTXLKD(string corporationId,
            string phongdanhmucId, string keyword, int page, int pageSize)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongdanhmucId", phongdanhmucId);
                dynamicParameters.Add("@keyword", keyword);

                dynamicParameters.Add("@pageIndex", page);
                dynamicParameters.Add("@pageSize", pageSize);

                dynamicParameters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                try
                {
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>("Get_GiayDeNghiDMCungCapDien_AllByTTXLKD", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapDienViewModel>()
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

        public async Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByCodeXuLy(Guid codeXyLy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@codexuly", codeXyLy);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Get_GiayDeNghiDMCungCapDien_ByCodeXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByGDNId(int giaydenghiId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@giaydenghiId", giaydenghiId);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Get_GiayDeNghiDMCungCapDien_ByGDNId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<GiayDeNghiDMCungCapDienViewModel>> Get_GiayDeNghiDMCungCapDien_ByGDNId1Top(int giaydenghiId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@giaydenghiId", giaydenghiId);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Get_GiayDeNghiDMCungCapDien_ByGDNId1Top", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> CreateGiayDeNghiDMCungCapDienByCodeXuLy(Guid CodeXuLy, int DMCungCapDichVuId, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CodeXuLy", CodeXuLy);
                dynamicParameters.Add("@DMCungCapDichVuId", DMCungCapDichVuId);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Create_GiayDeNghiDMCungCapDien_ByCodeXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> CreateGiayDeNghiDMCungCapDien(GiayDeNghiDMCungCapDienViewModel giaydenghi, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@KhuvucId", giaydenghi.KhuVucId);
                dynamicParameters.Add("@TenKhachHang", giaydenghi.TenKhachHang);
                dynamicParameters.Add("@DongHoId", giaydenghi.DongHoId);
                dynamicParameters.Add("@DongHoMaLoai", giaydenghi.DongHoMaLoai);
                dynamicParameters.Add("@SoNo", giaydenghi.SoNo);

                dynamicParameters.Add("@KhachHangPoId", giaydenghi.KhachHangPoId);
                dynamicParameters.Add("@DiaChi", giaydenghi.DiaChi);
                dynamicParameters.Add("@SoDienThoai", giaydenghi.SoDienThoai);
                dynamicParameters.Add("@Email", giaydenghi.Email);
                dynamicParameters.Add("@DiaChiMuaNuoc", giaydenghi.DiaChiMuaNuoc);
                dynamicParameters.Add("@DanhSoKhachHang", giaydenghi.DanhSoKhachHang);
                dynamicParameters.Add("@MucDichSuDung", giaydenghi.MucDichSuDung);
                dynamicParameters.Add("@ThongTinHienTai", giaydenghi.ThongTinHienTai);
                dynamicParameters.Add("@ThongTinThayDoi", giaydenghi.ThongTinThayDoi);
                dynamicParameters.Add("@HoSoKhachHangCungCap", giaydenghi.HoSoKhachHangCungCap);
                dynamicParameters.Add("@HoSoKhachHangCanBoSung", giaydenghi.HoSoKhachHangCanBoSung);
                dynamicParameters.Add("@BenDeNghiCungCap", giaydenghi.BenDeNghiCungCap);
                dynamicParameters.Add("@NgayDeNghiCungCap", giaydenghi.NgayDeNghiCungCap);
                dynamicParameters.Add("@TenNhanVienTiepNhan", giaydenghi.TenNhanVienTiepNhan);
                dynamicParameters.Add("@NgayTiepNhan", giaydenghi.NgayTiepNhan);

                dynamicParameters.Add("@CodeXuLy", giaydenghi.CodeXuLy);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Create_GiayDeNghiCungCapDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGiayDeNghiDMCungCapDien(GiayDeNghiDMCungCapDienViewModel giaydenghi, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", giaydenghi.Id);
                dynamicParameters.Add("@CodeXuLy", giaydenghi.CodeXuLy);

                dynamicParameters.Add("@DiaChi", giaydenghi.DiaChi);
                dynamicParameters.Add("@SoDienThoai", giaydenghi.SoDienThoai);
                dynamicParameters.Add("@Email", giaydenghi.Email);
                dynamicParameters.Add("@DiaChiMuaNuoc", giaydenghi.DiaChiMuaNuoc);
                dynamicParameters.Add("@DanhSoKhachHang", giaydenghi.DanhSoKhachHang);
                dynamicParameters.Add("@ThongTinHienTai", giaydenghi.ThongTinHienTai);
                dynamicParameters.Add("@ThongTinThayDoi", giaydenghi.ThongTinThayDoi);
                dynamicParameters.Add("@HoSoKhachHangCungCap", giaydenghi.HoSoKhachHangCungCap);
                dynamicParameters.Add("@HoSoKhachHangCanBoSung", giaydenghi.HoSoKhachHangCanBoSung);
                dynamicParameters.Add("@BenDeNghiCungCap", giaydenghi.BenDeNghiCungCap);
                dynamicParameters.Add("@NgayDeNghiCungCap", giaydenghi.NgayDeNghiCungCap);
                dynamicParameters.Add("@TenNhanVienTiepNhan", giaydenghi.TenNhanVienTiepNhan);
                dynamicParameters.Add("@NgayTiepNhan", giaydenghi.NgayTiepNhan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Update_GiayDeNghiCungCapDien", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_GiayDeNghiDMCungCapDien_ByIdXuLy(int giaydenghiId, Int32 giaydenghidmcungcapdienId, DateTime ngayXuLy,
            string toNhaMay, string ghichuXuLy, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiId", giaydenghiId);
                dynamicParameters.Add("@GiayDeNghiDMCungCapDienId", giaydenghidmcungcapdienId);
                dynamicParameters.Add("@NgayXuLy", ngayXuLy);
                dynamicParameters.Add("@PhongDanhMucId", toNhaMay);
                dynamicParameters.Add("@GhiChuXuLy", ghichuXuLy);

                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Update_GiayDeNghiDMCungCapDien_ByIdXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> DeleteGiayDeNghiDMCungCapDienId(Int32 id, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);
                dynamicParameters.Add("@createBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapDienViewModel>(
                        "Delete_GiayDeNghiDMCungCapDien", dynamicParameters, commandType: CommandType.StoredProcedure);
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
