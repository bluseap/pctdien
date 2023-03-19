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
    public class TTCacDichVuDienService : ITTCacDichVuDienService
    {
        private readonly IConfiguration _configuration;

        public TTCacDichVuDienService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TTCacDichVuDienViewModel> Get_TTCacDichVuDien_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Get_TTCacDichVuDien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<TTCacDichVuDienViewModel> Get_TTCacDichVuDien_ByIdNoTest(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Get_TTCacDichVuDien_ByIdNoTest", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
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
                    var query = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Get_TTCacDichVuDien_ByDsTheoTuNgay", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_AllPaging(int tinh, int quanhuyen, 
            string keyword, int page, int pageSize)
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
                    var result = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>("Get_TTCacDichVuDien_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTCacDichVuDienViewModel>()
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

        public async Task<PagedResult<TTCacDichVuDienViewModel>> Get_TTCacDichVuDien_AllPagingTT(int tinh, int quanhuyen,
            string theotrangthai, string keyword, int page, int pageSize)
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
                    var result = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>("Get_TTCacDichVuDien_AllPagingTT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTCacDichVuDienViewModel>()
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

        public async Task<PagedResult<TTCacDichVuDienViewModel>> Create_TTCacDichVuDien(Guid codeid, TTCacDichVuDienViewModel cacdichvudien, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileCodeId", codeid);

                dynamicParameters.Add("@HoTenNguoiYeuCau", cacdichvudien.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", cacdichvudien.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", cacdichvudien.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", cacdichvudien.NgayCap);
                dynamicParameters.Add("@NoiCap", cacdichvudien.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", cacdichvudien.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", cacdichvudien.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", cacdichvudien.PhuongXaId);
                dynamicParameters.Add("@SoNha", cacdichvudien.SoNha);
                dynamicParameters.Add("@TenDuongApTo", cacdichvudien.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyDichVu", cacdichvudien.TTDMDangKyDichVu);
                dynamicParameters.Add("@TTDMDangKyThayDoiViTri", cacdichvudien.TTDMDangKyThayDoiViTri);                
                dynamicParameters.Add("@TTDMDangKyThayDoiMDSD", cacdichvudien.TTDMDangKyThayDoiMDSD);
                dynamicParameters.Add("@TTDMDangKyThayDoiDMSD", cacdichvudien.TTDMDangKyThayDoiDMSD);
                dynamicParameters.Add("@TTDMDangKyHopDongGiayToTuyThan", cacdichvudien.TTDMDangKyHopDongGiayToTuyThan);
                dynamicParameters.Add("@TTDMDangKyHopDongChuThe", cacdichvudien.TTDMDangKyHopDongChuThe);

                dynamicParameters.Add("@TTDichVuDienId", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>("Create_TTCacDichVuDien", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@TTDichVuDienId");

                    var pagedResult = new PagedResult<TTCacDichVuDienViewModel>()
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

        public async Task<bool> Update_TTCacDichVuDien_ById(TTCacDichVuDienViewModel dichvudien,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", dichvudien.Id);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dichvudien.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dichvudien.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dichvudien.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dichvudien.NgayCap);
                dynamicParameters.Add("@NoiCap", dichvudien.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dichvudien.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dichvudien.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dichvudien.PhuongXaId);
                dynamicParameters.Add("@SoNha", dichvudien.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dichvudien.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyDichVu", dichvudien.TTDMDangKyDichVu);

                //dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkydien.TTDMDangKyGiayToTuyThan);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkydien.TTDMDangKyGiayToXacDinhChuThe);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkydien.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@GhiChu", dichvudien.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Update_TTCacDichVuDien_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTCacDichVuDien_ByTuChoi(int dichvudienId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", dichvudienId);

                dynamicParameters.Add("@NgayTuChoi", NgayTuChoi);
                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Update_TTCacDichVuDien_ByTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTCacDichVuDien_ByPhucHoiTuChoi(int dichvudienId, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", dichvudienId);

                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Update_TTCacDichVuDien_ByPhucHoiTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTCacDichVuDien_ByXacNhan(int dichvudienId, DateTime NgayXacNhan, string LyDoXacNhan,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", dichvudienId);

                dynamicParameters.Add("@NgayXacNhan", NgayXacNhan);
                dynamicParameters.Add("@LyDoXacNhan", LyDoXacNhan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Update_TTCacDichVuDien_ByXacNhan", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_TTCacDichVuDien(int id, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuDienId", id);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuDienViewModel>(
                        "Delete_TTCacDichVuDien", dynamicParameters, commandType: CommandType.StoredProcedure);
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
