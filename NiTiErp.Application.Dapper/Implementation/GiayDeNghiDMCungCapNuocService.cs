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
    public class GiayDeNghiDMCungCapNuocService : IGiayDeNghiDMCungCapNuocService
    {
        private readonly IConfiguration _configuration;

        public GiayDeNghiDMCungCapNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<GiayDeNghiDMCungCapNuocViewModel> Get_GiayDeNghiDMCungCapNuoc_ById(Int32 id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);

                var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<GiayDeNghiDMCungCapNuocViewModel> Get_GiayDeNghiCungCapNuoc_ById(int giaydenghiid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@id", giaydenghiid);

                var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiCungCapNuoc_ById", dynamicParameters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiCungCapNuoc_AllPaging(string corporationId, string phongdanhmucId, 
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiCungCapNuoc_AllPaging", dynamicParameters, null, null, 
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_Tim(string corporationId,
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_Tim", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTTK(string corporationId, 
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_AllByTTTK", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTTC(string corporationId,
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_AllByTTTC", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTNT(string corporationId,
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_AllByTTNT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTKTKD(string corporationId,
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_AllByTTKTKD", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<PagedResult<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_AllByTTXLKD(string corporationId,
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
                    var result = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>("Get_GiayDeNghiDMCungCapNuoc_AllByTTXLKD", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<GiayDeNghiDMCungCapNuocViewModel>()
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

        public async Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByCodeXuLy(Guid codeXyLy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@codexuly", codeXyLy);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Get_GiayDeNghiDMCungCapNuoc_ByCodeXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByGDNId(int giaydenghiId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@giaydenghiId", giaydenghiId);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Get_GiayDeNghiDMCungCapNuoc_ByGDNId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<GiayDeNghiDMCungCapNuocViewModel>> Get_GiayDeNghiDMCungCapNuoc_ByGDNId1Top(int giaydenghiId)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@giaydenghiId", giaydenghiId);

                try
                {
                    var query = await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Get_GiayDeNghiDMCungCapNuoc_ByGDNId1Top", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }        

        public async Task<bool> CreateGiayDeNghiDMCungCapNuocByCodeXuLy(Guid CodeXuLy, int DMCungCapDichVuId, DateTime createDate, string createBy)
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
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Create_GiayDeNghiDMCungCapNuoc_ByCodeXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> CreateGiayDeNghiDMCungCapNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi, DateTime createDate, string createBy)
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

                dynamicParameters.Add("@KhachHangId", giaydenghi.KhachHangId);
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
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Create_GiayDeNghiCungCapNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> UpdateGiayDeNghiDMCungCapNuoc(GiayDeNghiDMCungCapNuocViewModel giaydenghi, DateTime updateDate, string updateBy)
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
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Update_GiayDeNghiCungCapNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_GiayDeNghiDMCungCapNuoc_ByIdXuLy(int giaydenghiId, Int32 giaydenghidmcungcapnuocId, DateTime ngayXuLy,
            string toNhaMay, string ghichuXuLy, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@GiayDeNghiId", giaydenghiId);
                dynamicParameters.Add("@GiayDeNghiDMCungCapNuocId", giaydenghidmcungcapnuocId);
                dynamicParameters.Add("@NgayXuLy", ngayXuLy);
                dynamicParameters.Add("@PhongDanhMucId", toNhaMay);
                dynamicParameters.Add("@GhiChuXuLy", ghichuXuLy);
                
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Update_GiayDeNghiDMCungCapNuoc_ByIdXuLy", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> DeleteGiayDeNghiDMCungCapNuocId(Int32 id, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", id);
                dynamicParameters.Add("@createBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<GiayDeNghiDMCungCapNuocViewModel>(
                        "Delete_GiayDeNghiDMCungCapNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
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
