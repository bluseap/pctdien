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
    public class TTCacDichVuNuocService : ITTCacDichVuNuocService
    {
        private readonly IConfiguration _configuration;

        public TTCacDichVuNuocService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<TTCacDichVuNuocViewModel> Get_TTCacDichVuNuoc_ById(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Get_TTCacDichVuNuoc_ById", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<TTCacDichVuNuocViewModel> Get_TTCacDichVuNuoc_ByIdNoTest(int id)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", id);

                try
                {
                    var query = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Get_TTCacDichVuNuoc_ByIdNoTest", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_ByDsTheoTuNgay(int XiNghiep, string DanhSachTheo,
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
                    var query = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Get_TTCacDichVuNuoc_ByDsTheoTuNgay", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<PagedResult<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_AllPaging(int tinh, int quanhuyen, 
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
                    var result = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>("Get_TTCacDichVuNuoc_AllPaging", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTCacDichVuNuocViewModel>()
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

        public async Task<PagedResult<TTCacDichVuNuocViewModel>> Get_TTCacDichVuNuoc_AllPagingTT(int tinh, int quanhuyen,
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
                    var result = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>("Get_TTCacDichVuNuoc_AllPagingTT", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@totalRow");

                    var pagedResult = new PagedResult<TTCacDichVuNuocViewModel>()
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

        public async Task<PagedResult<TTCacDichVuNuocViewModel>> Create_TTCacDichVuNuoc(Guid codeid, TTCacDichVuNuocViewModel cacdichvunuoc, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTDangKyFileCodeId", codeid);

                dynamicParameters.Add("@HoTenNguoiYeuCau", cacdichvunuoc.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", cacdichvunuoc.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", cacdichvunuoc.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", cacdichvunuoc.NgayCap);
                dynamicParameters.Add("@NoiCap", cacdichvunuoc.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", cacdichvunuoc.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", cacdichvunuoc.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", cacdichvunuoc.PhuongXaId);
                dynamicParameters.Add("@SoNha", cacdichvunuoc.SoNha);
                dynamicParameters.Add("@TenDuongApTo", cacdichvunuoc.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyDichVu", cacdichvunuoc.TTDMDangKyDichVu);
                dynamicParameters.Add("@TTDMDangKyThayDoiViTri", cacdichvunuoc.TTDMDangKyThayDoiViTri);
                dynamicParameters.Add("@TTDMDangKyThayDoiMDSD", cacdichvunuoc.TTDMDangKyThayDoiMDSD);
                dynamicParameters.Add("@TTDMDangKyThayDoiDMSD", cacdichvunuoc.TTDMDangKyThayDoiDMSD);
                dynamicParameters.Add("@TTDMDangKyHopDongGiayToTuyThan", cacdichvunuoc.TTDMDangKyHopDongGiayToTuyThan);
                dynamicParameters.Add("@TTDMDangKyHopDongChuThe", cacdichvunuoc.TTDMDangKyHopDongChuThe);

                dynamicParameters.Add("@TTDichVuNuocId", dbType: System.Data.DbType.Int32, direction: System.Data.ParameterDirection.Output);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);
                try
                {
                    var result = await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>("Create_TTCacDichVuNuoc", dynamicParameters, null, null,
                        System.Data.CommandType.StoredProcedure);

                    int totalRow = dynamicParameters.Get<int>("@TTDichVuNuocId");

                    var pagedResult = new PagedResult<TTCacDichVuNuocViewModel>()
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

        public async Task<bool> Update_TTCacDichVuNuoc_ById(TTCacDichVuNuocViewModel dichvunuoc,
           DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", dichvunuoc.Id);

                dynamicParameters.Add("@HoTenNguoiYeuCau", dichvunuoc.HoTenNguoiYeuCau);
                dynamicParameters.Add("@DienThoai", dichvunuoc.DienThoai);
                dynamicParameters.Add("@SoTheCCCD", dichvunuoc.SoTheCCCD);
                dynamicParameters.Add("@NgayCap", dichvunuoc.NgayCap);
                dynamicParameters.Add("@NoiCap", dichvunuoc.NoiCap);
                dynamicParameters.Add("@ThanhPhoTinhId", dichvunuoc.ThanhPhoTinhId);
                dynamicParameters.Add("@QuanHuyenId", dichvunuoc.QuanHuyenId);
                dynamicParameters.Add("@PhuongXaId", dichvunuoc.PhuongXaId);
                dynamicParameters.Add("@SoNha", dichvunuoc.SoNha);
                dynamicParameters.Add("@TenDuongApTo", dichvunuoc.TenDuongApTo);

                dynamicParameters.Add("@TTDMDangKyDichVu", dichvunuoc.TTDMDangKyDichVu);

                //dynamicParameters.Add("@TTDMDangKyGiayToTuyThan", dangkydien.TTDMDangKyGiayToTuyThan);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhChuThe", dangkydien.TTDMDangKyGiayToXacDinhChuThe);
                //dynamicParameters.Add("@TTDMDangKyGiayToXacDinhMucDich", dangkydien.TTDMDangKyGiayToXacDinhMucDich);

                dynamicParameters.Add("@GhiChu", dichvunuoc.GhiChu);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Update_TTCacDichVuNuoc_ById", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }        

        public async Task<bool> Update_TTCacDichVuNuoc_ByTuChoi(int dichvunuocId, DateTime NgayTuChoi, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", dichvunuocId);

                dynamicParameters.Add("@NgayTuChoi", NgayTuChoi);
                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Update_TTCacDichVuNuoc_ByTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTCacDichVuNuoc_ByPhucHoiTuChoi(int dichvunuocId, string LyDoTuChoi,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", dichvunuocId);

                dynamicParameters.Add("@LyDoTuChoi", LyDoTuChoi);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Update_TTCacDichVuNuoc_ByPhucHoiTuChoi", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_TTCacDichVuNuoc_ByXacNhan(int dichvunuocId, DateTime NgayXacNhan, string LyDoXacNhan,
            DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", dichvunuocId);

                dynamicParameters.Add("@NgayXacNhan", NgayXacNhan);
                dynamicParameters.Add("@LyDoXacNhan", LyDoXacNhan);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Update_TTCacDichVuNuoc_ByXacNhan", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Delete_TTCacDichVuNuoc(int id, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@TTCacDichVuNuocId", id);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);
                try
                {
                    await sqlConnection.QueryAsync<TTCacDichVuNuocViewModel>(
                        "Delete_TTCacDichVuNuoc", dynamicParameters, commandType: CommandType.StoredProcedure);
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
