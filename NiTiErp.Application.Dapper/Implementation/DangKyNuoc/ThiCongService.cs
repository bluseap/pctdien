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
    public class ThiCongService : IThiCongService
    {
        private readonly IConfiguration _configuration;

        public ThiCongService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<ThiCongViewModel> Get_ThiCong_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<ThiCongViewModel>(
                        "Get_ThiCong_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_ThiCong(ThiCongViewModel thicong, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thicong.MADDK);
                dynamicParameters.Add("@CorporationId", thicong.CorporationId);

                dynamicParameters.Add("@MANV", thicong.MANV);
                dynamicParameters.Add("@MANV2", thicong.MANV2);
                dynamicParameters.Add("@NGAYGTC", thicong.NGAYGTC);

                dynamicParameters.Add("@TenNhanVienPhuTrach1", thicong.TenNVPhuTrach1);
                dynamicParameters.Add("@TenNhanVienPhuTrach2", thicong.TenNVPhuTrach2);
                dynamicParameters.Add("@MaNhanVienPhuTrach1", thicong.MaNhanVienPhuTrach1);
                dynamicParameters.Add("@MaNhanVienPhuTrach2", thicong.MaNhanVienPhuTrach2);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<ThiCongViewModel>(
                         "Create_ThiCong", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThiCong(ThiCongViewModel thicong, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thicong.MADDK);
                dynamicParameters.Add("@CorporationId", thicong.CorporationId);

                dynamicParameters.Add("@MANV", thicong.MANV);
                dynamicParameters.Add("@MANV2", thicong.MANV2);
                dynamicParameters.Add("@NGAYGTC", thicong.NGAYGTC);

                dynamicParameters.Add("@TenNhanVienPhuTrach1", thicong.TenNVPhuTrach1);
                dynamicParameters.Add("@TenNhanVienPhuTrach2", thicong.TenNVPhuTrach2);
                dynamicParameters.Add("@MaNhanVienPhuTrach1", thicong.MaNhanVienPhuTrach1);
                dynamicParameters.Add("@MaNhanVienPhuTrach2", thicong.MaNhanVienPhuTrach2);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThiCongViewModel>(
                         "Update_ThiCong", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThiCong_BySoNoDH(ThiCongViewModel thicong, DateTime updateDate, string updateBy)
        {     
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {              
                await sqlConnection.OpenAsync();                

                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thicong.MADDK);
                dynamicParameters.Add("@DongHoId", thicong.DongHoId);

                dynamicParameters.Add("@NGAYGTC", thicong.NGAYGTC);
                dynamicParameters.Add("@NGAYHT", thicong.NGAYHT);
                dynamicParameters.Add("@NGAYBD", thicong.NGAYBD);

                dynamicParameters.Add("@CSDAU", thicong.CSDAU);
                dynamicParameters.Add("@TTQT", thicong.TTQT);
                dynamicParameters.Add("@CHIKDM1", thicong.CHIKDM1);
                dynamicParameters.Add("@CHIKDM2", thicong.CHIKDM2);
                dynamicParameters.Add("@HDKEMTHEO", thicong.HDKEMTHEO);
                dynamicParameters.Add("@LYDOTRAHSTK", thicong.LYDOTRAHSTK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThiCongViewModel>(
                         "Update_ThiCong_BySoNoDH", dynamicParameters, commandTimeout: 1200
                         , commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThiCong_BySuaSoNoDH(ThiCongViewModel thicong, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thicong.MADDK);
                dynamicParameters.Add("@DongHoId", thicong.DongHoId);

                dynamicParameters.Add("@NGAYGTC", thicong.NGAYGTC);
                dynamicParameters.Add("@NGAYHT", thicong.NGAYHT);
                dynamicParameters.Add("@NGAYBD", thicong.NGAYBD);

                dynamicParameters.Add("@CSDAU", thicong.CSDAU);
                dynamicParameters.Add("@TTQT", thicong.TTQT);
                dynamicParameters.Add("@CHIKDM1", thicong.CHIKDM1);
                dynamicParameters.Add("@CHIKDM2", thicong.CHIKDM2);
                dynamicParameters.Add("@HDKEMTHEO", thicong.HDKEMTHEO);
                dynamicParameters.Add("@LYDOTRAHSTK", thicong.LYDOTRAHSTK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThiCongViewModel>(
                         "Update_ThiCong_BySuaSoNoDH", dynamicParameters, commandTimeout: 1200, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThiCong_ByTraVeTK(ThiCongViewModel thicong, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thicong.MADDK);

                dynamicParameters.Add("@NGAYTRAHSTC", thicong.NGAYTRAHSTC);
                dynamicParameters.Add("@LYDOTRAHSTK", thicong.LYDOTRAHSTK);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThiCongViewModel>(
                         "Update_ThiCong_ByTraVeTK", dynamicParameters, commandType: CommandType.StoredProcedure);
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
