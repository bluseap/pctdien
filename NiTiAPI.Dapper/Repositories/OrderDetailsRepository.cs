using Dapper;
using Microsoft.Extensions.Configuration;
using NiTiAPI.Dapper.Repositories.Interfaces;
using NiTiAPI.Dapper.ViewModels;
using NiTiAPI.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NiTiAPI.Dapper.Repositories
{
    public class OrderDetailsRepository : IOrderDetailsRepository
    {
        private readonly string _connectionString;

        public OrderDetailsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DbConnectionString");
        }

        public async Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListOrderId(string orderdetailsId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@OrderDetailsId", orderdetailsId);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByListOrderId", paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.AsList();
            }
        }

        public async Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListMaNhomLive(string manhomlive)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@MaNhomLive", manhomlive);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByListMaNhomLive", paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.AsList();
            }
        }

        public async Task<OrderDetailsViewModel> Get_OrderDetails_ByOrderDetailsId(string orderdetailsId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@OrderDetailsId", orderdetailsId);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByOrderDetailsId", paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.Single();
            }
        }

        public async Task<bool> Create_OrderDetails(OrderDetailsViewModel orderdetails, bool ckttlive, bool ckttdondi, 
            bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string createBy, DateTime createDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@OrderId", orderdetails.OrderId);

                paramaters.Add("@TenSanPhamMoi", tensanphammoi);
                //paramaters.Add("@ProductId", orderdetails.ProductId);
                paramaters.Add("@TienTong", orderdetails.TienTong);
                paramaters.Add("@TienCoc", orderdetails.TienCoc);

                paramaters.Add("@ckttLive", ckttlive);
                paramaters.Add("@MaDonLive", orderdetails.MaDonLive);
                paramaters.Add("@SoMaDonLive", orderdetails.SoMaDonLive);
                paramaters.Add("@NgayDatLive", orderdetails.NgayDatLive);
                paramaters.Add("@MaBuoiLve", orderdetails.MaBuoiLve);
                paramaters.Add("@GhiChuLive", orderdetails.GhiChuLive);

                paramaters.Add("@ckttDonDi", ckttdondi);
                paramaters.Add("@MaDonDi", orderdetails.MaDonDi);
                paramaters.Add("@NgayDonDi", orderdetails.NgayDonDi);
                paramaters.Add("@MaTienShipKhachHangTra", orderdetails.MaTienShipKhachHangTra);
                paramaters.Add("@GhiChuDonDi", orderdetails.GhiChuDonDi);

                paramaters.Add("@ckttDonDen", ckttdonden);
                paramaters.Add("@NgayDonDen", orderdetails.NgayDonDen);
                paramaters.Add("@GhiChuDonDen", orderdetails.GhiChuDonDen);

                paramaters.Add("@ckttDonDenHuy", ckttdonhuy);
                paramaters.Add("@NgayDonDenHuy", orderdetails.NgayDonDenHuy);
                paramaters.Add("@GhiChuDonDenHuy", orderdetails.GhiChuDonDenHuy);

                paramaters.Add("@CreateBy", createBy);
                paramaters.Add("@CreateDate", createDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Create_OrderDetails", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_OrderDetails_ByTrucTiep(OrderDetailsViewModel orderdetails, string TenSanPhamMoi, string createBy, DateTime createDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@OrderDetailsId", orderdetails.Id);

                paramaters.Add("@TenSanPhamMoi", TenSanPhamMoi);

                //paramaters.Add("@ProductId", orderdetails.ProductId);
                paramaters.Add("@TienTong", orderdetails.TienTong);
                paramaters.Add("@TienCoc", orderdetails.TienCoc);

                paramaters.Add("@MaTienShipKhachHangTra", orderdetails.MaTienShipKhachHangTra);                

                paramaters.Add("@CreateBy", createBy);
                paramaters.Add("@CreateDate", createDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Create_OrderDetails_ByTrucTiep", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_OrderDetails(OrderDetailsViewModel orderdetails, string orderdetailsId, string MaNhomLive,
            bool ckttlive, bool ckttdondi, bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string updateby, DateTime updateDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@Id", orderdetails.Id);
                paramaters.Add("@OrderDetailsId", orderdetailsId);

                paramaters.Add("@MaNhomLive", MaNhomLive);
                paramaters.Add("@TenSanPhamMoi", tensanphammoi);

                //paramaters.Add("@ProductId", orderdetails.ProductId);
                paramaters.Add("@TienTong", orderdetails.TienTong);
                paramaters.Add("@TienCoc", orderdetails.TienCoc);

                paramaters.Add("@ckttLive", ckttlive);
                paramaters.Add("@MaDonLive", orderdetails.MaDonLive);
                paramaters.Add("@SoMaDonLive", orderdetails.SoMaDonLive);
                paramaters.Add("@NgayDatLive", orderdetails.NgayDatLive);
                paramaters.Add("@MaBuoiLve", orderdetails.MaBuoiLve);
                paramaters.Add("@GhiChuLive", orderdetails.GhiChuLive);

                paramaters.Add("@ckttDonDi", ckttdondi);
                paramaters.Add("@MaDonDi", orderdetails.MaDonDi);
                paramaters.Add("@NgayDonDi", orderdetails.NgayDonDi);
                paramaters.Add("@MaTienShipKhachHangTra", orderdetails.MaTienShipKhachHangTra);
                paramaters.Add("@GhiChuDonDi", orderdetails.GhiChuDonDi);

                paramaters.Add("@ckttDonDen", ckttdonden);
                paramaters.Add("@NgayDonDen", orderdetails.NgayDonDen);
                paramaters.Add("@GhiChuDonDen", orderdetails.GhiChuDonDen);

                paramaters.Add("@ckttDonDenHuy", ckttdonhuy);
                paramaters.Add("@NgayDonDenHuy", orderdetails.NgayDonDenHuy);
                paramaters.Add("@GhiChuDonDenHuy", orderdetails.GhiChuDonDenHuy);

                paramaters.Add("@UpdateBy", updateby);
                paramaters.Add("@UpdateDate", updateDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Update_OrderDetails", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_OrderDetails_ByIdGomDon(Int32 Id, string updateby, DateTime updateDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@Id", Id);                

                paramaters.Add("@UpdateBy", updateby);
                paramaters.Add("@UpdateDate", updateDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Update_OrderDetails_ByIdGomDon", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_OrderDetails_ByIdGomDon(Int32 Id, string updateby, DateTime updateDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@Id", Id);

                paramaters.Add("@UpdateBy", updateby);
                paramaters.Add("@UpdateDate", updateDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Delete_OrderDetails_ByIdGomDon", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_OrderDetails(Int32 Id, string updateby, DateTime updateDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@Id", Id);

                paramaters.Add("@UpdateBy", updateby);
                paramaters.Add("@UpdateDate", updateDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Delete_OrderDetails", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_OrderDetails01(Int32 Id, string updateby, DateTime updateDate)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@Id", Id);

                paramaters.Add("@UpdateBy", updateby);
                paramaters.Add("@UpdateDate", updateDate);
                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Delete_OrderDetails01", paramaters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_AllPaging(int corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);
                paramaters.Add("@TuKhoa", tukhoa);
                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_AllPaging", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByGroupOrderAllPaging(int corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);
                paramaters.Add("@TuKhoa", tukhoa);
                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByGroupOrderAllPaging", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByTTOrderId(int corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);
                paramaters.Add("@TuKhoa", tukhoa);
                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByTTOrderId", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByTTLiveOrderId(int corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);
                paramaters.Add("@TuKhoa", tukhoa);
                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByTTLiveOrderId", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByGomDon(int corporationId,
            string tukhoa, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);
                paramaters.Add("@TuKhoa", tukhoa);
                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByGomDon", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByDieuKien(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);

                paramaters.Add("@DieuKien", DieuKien);
                paramaters.Add("@TuNgay", TuNgay);
                paramaters.Add("@DenNgay", DenNgay);

                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByDieuKien", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize,

                    TongTienHang = Convert.ToInt32(result.Sum(p => p.TienTong)).ToString(),
                    TongTienCoc = Convert.ToInt32(result.Sum(p => p.TienCoc)).ToString(),
                    TongTienConLai = Convert.ToInt32(result.Sum(p => p.TienTongKhachHangTra)).ToString()
                };
                return pagedResult;
            }
        }

        public async Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByDieuKien2(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);

                paramaters.Add("@DieuKien", DieuKien);
                paramaters.Add("@TuNgay", TuNgay);
                paramaters.Add("@DenNgay", DenNgay);

                paramaters.Add("@pageIndex", pageIndex);
                paramaters.Add("@pageSize", pageSize);

                paramaters.Add("@totalRow", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                paramaters.Add("@TongTienHang", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);
                paramaters.Add("@TongTienCoc", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);
                paramaters.Add("@TongTienConLai", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByDieuKien2", paramaters, null, null, System.Data.CommandType.StoredProcedure);

                int totalRow = paramaters.Get<int>("@totalRow");

                int tongtienhang = paramaters.Get<int>("@TongTienHang");
                int tongtiencoc = paramaters.Get<int>("@TongTienCoc");
                int tongtienconlai = paramaters.Get<int>("@TongTienConLai");

                var pagedResult = new PagedResult<OrderDetailsViewModel>()
                {
                    Items = result.ToList(),
                    TotalRow = totalRow,
                    PageIndex = pageIndex,
                    PageSize = pageSize,

                    TongTienHang = tongtienhang.ToString(),
                    TongTienCoc = tongtiencoc.ToString(),
                    TongTienConLai = tongtienconlai.ToString()
                };
                return pagedResult;
            }
        }

        public async Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListDieuKien(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@corporationId", corporationId);

                paramaters.Add("@DieuKien", DieuKien);
                paramaters.Add("@TuNgay", TuNgay);
                paramaters.Add("@DenNgay", DenNgay);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByListDieuKien", paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.AsList();
            }
        }

        public async Task<List<OrderDetailsViewModel>> GetListOrderByCreateDate(DateTime fromDate, DateTime toDate, string languageId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@fromDate ", fromDate);
                paramaters.Add("@toDate ", toDate); 
                paramaters.Add("@languageId ", languageId);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByCreateDate",
                    paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.AsList();
            }
        }

        public async Task<List<OrderDetailsViewModel>> GetListOrderDetails(long orderId, string languageId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                var paramaters = new DynamicParameters();
                paramaters.Add("@orderId ", orderId);
                paramaters.Add("@languageId ", languageId);

                var result = await conn.QueryAsync<OrderDetailsViewModel>("Get_OrderDetails_ByOrderId",
                    paramaters, null, null, System.Data.CommandType.StoredProcedure);
                return result.AsList();
            }
        }

        public async Task<bool> CreateOrderDetailsXML(string lisetOrderXML, string userName, string languageId)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();

                var paramaters = new DynamicParameters();

                paramaters.Add("@lisetOrderXML", lisetOrderXML);
                paramaters.Add("@CreateBy", userName);
                paramaters.Add("@languageId", languageId);

                try
                {
                    await conn.QueryAsync<OrderDetailsViewModel>(
                        "Create_OrderDetailsXML", paramaters, commandType: CommandType.StoredProcedure);
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
