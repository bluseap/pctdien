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
    public class PoHopDongService : IPoHopDongService
    {
        private readonly IConfiguration _configuration;

        public PoHopDongService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<PoHopDongViewModel> Get_HopDong_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<PoHopDongViewModel>(
                        "Get_HopDong_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_HopDong(PoHopDongViewModel hopdong, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", hopdong.MADDK);
                dynamicParameters.Add("@CorporationId", hopdong.CorporationId);

                dynamicParameters.Add("@SONHA", hopdong.SONHA);
                dynamicParameters.Add("@MAHTTT", hopdong.MAHTTT);
                dynamicParameters.Add("@CODH", hopdong.CODH);
                dynamicParameters.Add("@NGAYTAO", hopdong.NGAYTAO);
                dynamicParameters.Add("@NGAYHL", hopdong.NGAYHL);
                dynamicParameters.Add("@HopDongLoaiId", hopdong.HopDongLoaiId);
                dynamicParameters.Add("@NgayHetHan", hopdong.NgayHetHan);

                dynamicParameters.Add("@MAMDSD", hopdong.MAMDSD);
                dynamicParameters.Add("@LOAIONG", hopdong.LOAIONG);
                dynamicParameters.Add("@DINHMUCSD", hopdong.DINHMUCSD);
                dynamicParameters.Add("@SOHO", hopdong.SOHO);
                dynamicParameters.Add("@SONHANKHAU", hopdong.SONHANKHAU);
                dynamicParameters.Add("@CMND", hopdong.CMND);

                dynamicParameters.Add("@MST", hopdong.MST); 
                dynamicParameters.Add("@DanhSo", hopdong.DanhSo);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<PoHopDongViewModel>(
                         "Create_HopDong", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_HopDong(PoHopDongViewModel hopdong, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", hopdong.MADDK);
                dynamicParameters.Add("@CorporationId", hopdong.CorporationId);

                dynamicParameters.Add("@SONHA", hopdong.SONHA);
                dynamicParameters.Add("@MAHTTT", hopdong.MAHTTT);
                dynamicParameters.Add("@CODH", hopdong.CODH);
                dynamicParameters.Add("@NGAYTAO", hopdong.NGAYTAO);
                dynamicParameters.Add("@NGAYHL", hopdong.NGAYHL);
                dynamicParameters.Add("@HopDongLoaiId", hopdong.HopDongLoaiId);
                dynamicParameters.Add("@NgayHetHan", hopdong.NgayHetHan);

                dynamicParameters.Add("@MAMDSD", hopdong.MAMDSD);
                dynamicParameters.Add("@LOAIONG", hopdong.LOAIONG);
                dynamicParameters.Add("@DINHMUCSD", hopdong.DINHMUCSD);
                dynamicParameters.Add("@SOHO", hopdong.SOHO);
                dynamicParameters.Add("@SONHANKHAU", hopdong.SONHANKHAU);
                dynamicParameters.Add("@CMND", hopdong.CMND);

                dynamicParameters.Add("@MST", hopdong.MST);
                dynamicParameters.Add("@DanhSo", hopdong.DanhSo);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<PoHopDongViewModel>(
                         "Update_HopDong", dynamicParameters, commandType: CommandType.StoredProcedure);
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
