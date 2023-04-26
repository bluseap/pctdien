using Dapper;
using Microsoft.Extensions.Configuration;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Implementation
{
    public class HoSoNhanVienService : IHoSoNhanVienService
    {
        private readonly IConfiguration _configuration;

        public HoSoNhanVienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<HoSoNhanVienViewModel> Get_HoSoNhanVien_ByUserName(string username)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@UserName", username);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Get_HoSoNhanVien_ByUserName", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HoSoNhanVienViewModel>> Get_HoSoNhanVien_ByCorId(string corporationid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Get_HoSoNhanVien_ByCorId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HoSoNhanVienViewModel>> Get_HoSoNhanVien_ByCorPhongId(string corporationid, string phongdanhmucid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", corporationid);
                dynamicParameters.Add("@PhongDanhMucId", phongdanhmucid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Get_HoSoNhanVien_ByCorPhongId", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HoSoNhanVienViewModel>> Get_HoSoNhanVien_ById(string hosonhanvienid)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HoSoNhanVienId", hosonhanvienid);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Get_HoSoNhanVien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<HoSoNhanVienViewModel>> Get_HoSoNhanVien_AllPaging(string corporationId, string phongdanhmucId,
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
                    var result = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>("Get_HoSoNhanVien_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<HoSoNhanVienViewModel>()
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

        public async Task<PagedResult<HoSoNhanVienViewModel>> GetAllHoSoNhanVienPaging(string corporationId, string phongId, string keyword, int page, int pageSize,
            string hosoId, string hosoId2, string hosoId3, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongId", phongId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@hosoId", hosoId);
                dynamicParameters.Add("@hosoId2", hosoId2);
                dynamicParameters.Add("@hosoId3", hosoId3);

                dynamicParameters.Add("@parameters", parameters);
                try
                {
                    var hoso = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "HoSoNhanVienGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    var query = hoso.AsQueryable();

                    int totalRow = query.Count();

                    query = query//.OrderByDescending(x => x.CreateDate)
                        .Skip((page - 1) * pageSize).Take(pageSize);

                    var data = query.ToList();

                    var paginationSet = new PagedResult<HoSoNhanVienViewModel>()
                    {
                        Results = data,
                        CurrentPage = page,
                        RowCount = totalRow,
                        PageSize = pageSize
                    };
                    return paginationSet;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<HoSoNhanVienViewModel>> HoSoNhanVienGetList(string corporationId, string phongId, string keyword,
            string hosoId, string hosoId2, string hosoId3, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongId", phongId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@hosoId", hosoId);
                dynamicParameters.Add("@hosoId2", hosoId2);
                dynamicParameters.Add("@hosoId3", hosoId3);

                dynamicParameters.Add("@parameters", parameters);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "HoSoNhanVienGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<IEnumerable<dynamic>> HoSoDataTable(string corporationId, string phongId, string keyword,
            string hosoId, string hosoId2, string hosoId3, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongId", phongId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@hosoId", hosoId);
                dynamicParameters.Add("@hosoId2", hosoId2);
                dynamicParameters.Add("@hosoId3", hosoId3);

                dynamicParameters.Add("@parameters", parameters);
                try
                {
                    var query = await sqlConnection.QueryAsync<dynamic>(
                        "HoSoNhanVienGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<IQueryable<HoSoNhanVienViewModel>> HoSoDataTableQuery(string corporationId, string phongId, string keyword,
            string hosoId, string hosoId2, string hosoId3, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@corporationId", corporationId);
                dynamicParameters.Add("@phongId", phongId);
                dynamicParameters.Add("@keyword", keyword);
                dynamicParameters.Add("@hosoId", hosoId);
                dynamicParameters.Add("@hosoId2", hosoId2);
                dynamicParameters.Add("@hosoId3", hosoId3);

                dynamicParameters.Add("@parameters", parameters);
                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "HoSoNhanVienGetList", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsQueryable();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<Boolean> HoSoNhanVienAUD(HoSoNhanVienViewModel hoso, string parameters)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", hoso.Id);
                dynamicParameters.Add("@Ten", hoso.Ten);
                dynamicParameters.Add("@CorporationId", hoso.CorporationId);
                dynamicParameters.Add("@PhongBanDanhMucId", hoso.PhongBanDanhMucId);
                dynamicParameters.Add("@ChucVuNhanVienId", hoso.ChucVuNhanVienId);
                dynamicParameters.Add("@SoDienThoai", hoso.SoDienThoai);
                dynamicParameters.Add("@SoTheNhanVien", hoso.SoTheNhanVien);
                //dynamicParameters.Add("@Email", hoso.Email);
                dynamicParameters.Add("@TenGoiKhac", hoso.TenGoiKhac);
                dynamicParameters.Add("@GioiTinh", hoso.GioiTinh);
                dynamicParameters.Add("@NgaySinh", hoso.NgaySinh);
                dynamicParameters.Add("@SoCMND", hoso.SoCMND);
                dynamicParameters.Add("@NgayCapCMND", hoso.NgayCapCMND);
                dynamicParameters.Add("@NoiCapCMND", hoso.NoiCapCMND);
                dynamicParameters.Add("@NoiSinh", hoso.NoiSinh);
                //dynamicParameters.Add("@QueQuan", hoso.QueQuan);
                //dynamicParameters.Add("@NoiOHienNay", hoso.NoiOHienNay);
                dynamicParameters.Add("@HonNhanDanhMucId", hoso.HonNhanDanhMucId);
                dynamicParameters.Add("@DanTocDanhMucId", hoso.DanTocDanhMucId);
                dynamicParameters.Add("@TonGiaoDanhMucId", hoso.TonGiaoDanhMucId);
                dynamicParameters.Add("@XuatThanDanhMucId", hoso.XuatThanDanhMucId);
                //dynamicParameters.Add("@IsDelete", hoso.IsDelete);
                //dynamicParameters.Add("@HoSoNhanVienXoaId", hoso.HoSoNhanVienXoaId);
                //dynamicParameters.Add("@NgayXoa", hoso.NgayXoa);
                dynamicParameters.Add("@HinhNhanVien", hoso.HinhNhanVien);

                dynamicParameters.Add("@SoNhaDuong", hoso.SoNhaDuong);
                dynamicParameters.Add("@ThanhPhoTinhId", hoso.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", hoso.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", hoso.PhuongXaId);

                dynamicParameters.Add("@SoNhaDuongQueQuan", hoso.SoNhaDuongQueQuan);
                dynamicParameters.Add("@ThanhPhoTinhQueQuanId", hoso.ThanhPhoTinhQueQuanId);
                dynamicParameters.Add("@QuanHuyenQueQuanId", hoso.QuanHuyenQueQuanId);
                dynamicParameters.Add("@PhuongXaQueQuanId", hoso.PhuongXaQueQuanId);

                dynamicParameters.Add("@Active", hoso.Active);
                dynamicParameters.Add("@Stt", hoso.Stt);
                dynamicParameters.Add("@CreateDate", hoso.CreateDate);
                dynamicParameters.Add("@CreateBy", hoso.CreateBy);
                dynamicParameters.Add("@UpdateDate", hoso.UpdateDate);
                dynamicParameters.Add("@UpdateBy", hoso.UpdateBy);

                dynamicParameters.Add("@parameters", parameters);

                try
                {
                    var query = await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "HoSoNhanVienAUD", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HoSoNhanVien_DaoTaoHV(HoSoNhanVienViewModel hosohocvien, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@Id", hosohocvien.Id);

                dynamicParameters.Add("@HinhNhanVien", hosohocvien.HinhNhanVien);

                dynamicParameters.Add("@MaSoBHXH", hosohocvien.MaSoBHXH);
                dynamicParameters.Add("@NgayThamGiaBHXH", hosohocvien.NgayThamGiaBHXH);
                dynamicParameters.Add("@SoCMND", hosohocvien.SoCMND);
                dynamicParameters.Add("@NgayCapCMND", hosohocvien.NgayCapCMND);
                dynamicParameters.Add("@SoDienThoai", hosohocvien.SoDienThoai);
                dynamicParameters.Add("@Email", hosohocvien.Email);
                dynamicParameters.Add("@NoiSinh", hosohocvien.NoiSinh);
                dynamicParameters.Add("@NoiOHienNay", hosohocvien.NoiOHienNay);

                dynamicParameters.Add("@NgayHieuLuc", hosohocvien.NgayHieuLuc);

                dynamicParameters.Add("@CorporationId", hosohocvien.CorporationId);
                dynamicParameters.Add("@ChucVuNhanVienId", hosohocvien.ChucVuNhanVienId);
                dynamicParameters.Add("@PhongBanDanhMucId", hosohocvien.PhongBanDanhMucId);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Update_HoSoNhanVien_DaoTaoHV", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HoSoNhanVien_ByBacATD(string HoSoNhanVienId, int BacAnToanDienId, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@HoSoNhanVienId", HoSoNhanVienId);

                dynamicParameters.Add("@BacAnToanDienId", BacAnToanDienId);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<HoSoNhanVienViewModel>(
                        "Update_HoSoNhanVien_ByBacATD", dynamicParameters, commandType: CommandType.StoredProcedure);
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