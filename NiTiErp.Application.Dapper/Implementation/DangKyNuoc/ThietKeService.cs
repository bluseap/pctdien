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
    public class ThietKeService : IThietKeService
    {
        private readonly IConfiguration _configuration;

        public ThietKeService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<ThietKeViewModel> Get_ThietKe_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();
                
                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<ThietKeViewModel>(
                        "Get_ThietKe_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_ThietKe(ThietKeViewModel thietke, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thietke.MADDK);

                dynamicParameters.Add("@CorporationId", thietke.CorporationId);

                dynamicParameters.Add("@TENTK", thietke.TENTK);
                dynamicParameters.Add("@MANVTK", thietke.MANVTK);

                dynamicParameters.Add("@SODB", thietke.SODB);
                dynamicParameters.Add("@TENNVTK", thietke.TENNVTK);
                dynamicParameters.Add("@NGAYLTK", thietke.NGAYLTK);
                dynamicParameters.Add("@THAMGIAONGCAI", thietke.THAMGIAONGCAI);
                dynamicParameters.Add("@MADPLX", thietke.MADPLX);

                dynamicParameters.Add("@DIACHITK", thietke.DIACHITK);
                dynamicParameters.Add("@DUONGHEMTK", thietke.DUONGHEMTK);
                dynamicParameters.Add("@PHUONGTK", thietke.PHUONGTK);
                dynamicParameters.Add("@SDTTK", thietke.SDTTK);
                dynamicParameters.Add("@VITRIDHTK", thietke.VITRIDHTK);
                dynamicParameters.Add("@DANHSOTK", thietke.DANHSOTK);
                dynamicParameters.Add("@ISKHTT100", thietke.ISKHTT100);

                dynamicParameters.Add("@CHUTHICH", thietke.CHUTHICH);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<ThietKeViewModel>(
                         "Create_ThietKe", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThietKe(ThietKeViewModel thietke, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thietke.MADDK);

                dynamicParameters.Add("@CorporationId", thietke.CorporationId);

                dynamicParameters.Add("@TENTK", thietke.TENTK);
                dynamicParameters.Add("@SODB", thietke.SODB);
                dynamicParameters.Add("@TENNVTK", thietke.TENNVTK);
                dynamicParameters.Add("@NGAYLTK", thietke.NGAYLTK);
                dynamicParameters.Add("@THAMGIAONGCAI", thietke.THAMGIAONGCAI);
                dynamicParameters.Add("@MADPLX", thietke.MADPLX);

                dynamicParameters.Add("@DIACHITK", thietke.DIACHITK);
                dynamicParameters.Add("@DUONGHEMTK", thietke.DUONGHEMTK);
                dynamicParameters.Add("@PHUONGTK", thietke.PHUONGTK);
                dynamicParameters.Add("@SDTTK", thietke.SDTTK);
                dynamicParameters.Add("@VITRIDHTK", thietke.VITRIDHTK);
                dynamicParameters.Add("@DANHSOTK", thietke.DANHSOTK);
                dynamicParameters.Add("@ISKHTT100", thietke.ISKHTT100);

                dynamicParameters.Add("@CHUTHICH", thietke.CHUTHICH);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThietKeViewModel>(
                         "Update_ThietKe", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThietKe_ByDuyetTK(ThietKeViewModel thietke, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thietke.MADDK);

                dynamicParameters.Add("@NGAYDTK", thietke.NGAYDTK);               
                dynamicParameters.Add("@CHUTHICH", thietke.CHUTHICH);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThietKeViewModel>(
                         "Update_ThietKe_ByDuyetTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThietKe_ByTuChoiTK(ThietKeViewModel thietke, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", thietke.MADDK);

                dynamicParameters.Add("@NGAYDTK", thietke.NGAYDTK);
                dynamicParameters.Add("@CHUTHICH", thietke.CHUTHICH);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThietKeViewModel>(
                         "Update_ThietKe_ByTuChoiTK", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_ThietKe_ByMauHinhThietKe(string MADDK, string TenKHBenPhai, string DanhSoKHBenPhai, 
            string TenKHBenTrai, string DanhSoKHBenTrai, string MauThietKe, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);

                dynamicParameters.Add("@TenKHBenPhai", TenKHBenPhai);
                dynamicParameters.Add("@DanhSoKHBenPhai", DanhSoKHBenPhai);
                dynamicParameters.Add("@TTenKHBenTrai", TenKHBenTrai);
                dynamicParameters.Add("@DanhSoKHBenTrai", DanhSoKHBenTrai);
                dynamicParameters.Add("@MauThietKe", MauThietKe);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<ThietKeViewModel>(
                         "Update_ThietKe_ByMauHinhThietKe", dynamicParameters, commandType: CommandType.StoredProcedure);
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
