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
    public class BBNghiemThuService : IBBNghiemThuService
    {
        private readonly IConfiguration _configuration;

        public BBNghiemThuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<BBNghiemThuViewModel>> Get_BBNghiemThu_ByDSNhanHoSo(string MADDK, string CorporationId,
            string PhongDanhMucId, DateTime TuNgay, DateTime DenNgay)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@CorporationId", CorporationId);
                dynamicParameters.Add("@PhongDanhMucId", PhongDanhMucId);
                dynamicParameters.Add("@TuNgay", TuNgay);
                dynamicParameters.Add("@DenNgay", DenNgay);

                try
                {
                    var query = await sqlConnection.QueryAsync<BBNghiemThuViewModel>(
                        "Get_BBNghiemThu_ByDSNhanHoSo", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<List<BBNghiemThuViewModel>> Get_BBNghiemThu_ByDSChuyenKeToan(string MADDK, string CorporationId,
            string PhongDanhMucId, DateTime TuNgay, DateTime DenNgay)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", MADDK);
                dynamicParameters.Add("@CorporationId", CorporationId);
                dynamicParameters.Add("@PhongDanhMucId", PhongDanhMucId);
                dynamicParameters.Add("@TuNgay", TuNgay);
                dynamicParameters.Add("@DenNgay", DenNgay);

                try
                {
                    var query = await sqlConnection.QueryAsync<BBNghiemThuViewModel>(
                        "Get_BBNghiemThu_ByDSChuyenKeToan", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<BBNghiemThuViewModel> Get_BBNghiemThu_ByMaDon(string maddk)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", maddk);

                try
                {
                    var query = await sqlConnection.QueryAsync<BBNghiemThuViewModel>(
                        "Get_BBNghiemThu_ByMaDon", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.Single();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Create_BBNghiemThu(BBNghiemThuViewModel nghiemthu, DateTime createDate, string createBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", nghiemthu.MADDK);
                dynamicParameters.Add("@CorporationId", nghiemthu.CorporationId);

                dynamicParameters.Add("@NGAYNHANHSTC", nghiemthu.NGAYNHANHSTC);
                dynamicParameters.Add("@NGAYLAPBB", nghiemthu.NGAYLAPBB);
                dynamicParameters.Add("@HETHONGCN", nghiemthu.HETHONGCN);

                dynamicParameters.Add("@MANV1", nghiemthu.MANV1);
                dynamicParameters.Add("@MANV2", nghiemthu.MANV2);
                dynamicParameters.Add("@MANV3", nghiemthu.MANV3);
                dynamicParameters.Add("@HOTEN1", nghiemthu.HOTEN1);
                dynamicParameters.Add("@HOTEN2", nghiemthu.HOTEN2);
                dynamicParameters.Add("@HOTEN3", nghiemthu.HOTEN3);

                dynamicParameters.Add("@MADH", nghiemthu.MADH);
                dynamicParameters.Add("@CHIEUCAO", nghiemthu.CHIEUCAO);
                dynamicParameters.Add("@KHOANGCACH", nghiemthu.KHOANGCACH);

                dynamicParameters.Add("@VITRI", nghiemthu.VITRI);

                dynamicParameters.Add("@CHINIEMM1", nghiemthu.CHINIEMM1);
                dynamicParameters.Add("@CHINIEMM2", nghiemthu.CHINIEMM2);
                dynamicParameters.Add("@KETLUAN", nghiemthu.KETLUAN);

                dynamicParameters.Add("@NGAYCHUYENHSKTOAN", nghiemthu.NGAYCHUYENHSKTOAN);
                dynamicParameters.Add("@GHICHU", nghiemthu.GHICHU);

                dynamicParameters.Add("@CreateDate", createDate);
                dynamicParameters.Add("@CreateBy", createBy);

                try
                {
                    await sqlConnection.QueryAsync<BBNghiemThuViewModel>(
                         "Create_BBNghiemThu", dynamicParameters, commandType: CommandType.StoredProcedure);
                    return true;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public async Task<bool> Update_BBNghiemThu(BBNghiemThuViewModel nghiemthu, DateTime updateDate, string updateBy)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@MADDK", nghiemthu.MADDK);
                dynamicParameters.Add("@CorporationId", nghiemthu.CorporationId);

                dynamicParameters.Add("@NGAYNHANHSTC", nghiemthu.NGAYNHANHSTC);
                dynamicParameters.Add("@NGAYLAPBB", nghiemthu.NGAYLAPBB);
                dynamicParameters.Add("@HETHONGCN", nghiemthu.HETHONGCN);

                dynamicParameters.Add("@MANV1", nghiemthu.MANV1);
                dynamicParameters.Add("@MANV2", nghiemthu.MANV2);
                dynamicParameters.Add("@MANV3", nghiemthu.MANV3);
                dynamicParameters.Add("@HOTEN1", nghiemthu.HOTEN1);
                dynamicParameters.Add("@HOTEN2", nghiemthu.HOTEN2);
                dynamicParameters.Add("@HOTEN3", nghiemthu.HOTEN3);

                dynamicParameters.Add("@MADH", nghiemthu.MADH);
                dynamicParameters.Add("@CHIEUCAO", nghiemthu.CHIEUCAO);
                dynamicParameters.Add("@KHOANGCACH", nghiemthu.KHOANGCACH);

                dynamicParameters.Add("@VITRI", nghiemthu.VITRI);

                dynamicParameters.Add("@CHINIEMM1", nghiemthu.CHINIEMM1);
                dynamicParameters.Add("@CHINIEMM2", nghiemthu.CHINIEMM2);
                dynamicParameters.Add("@KETLUAN", nghiemthu.KETLUAN);

                dynamicParameters.Add("@NGAYCHUYENHSKTOAN", nghiemthu.NGAYCHUYENHSKTOAN);
                dynamicParameters.Add("@GHICHU", nghiemthu.GHICHU);

                dynamicParameters.Add("@UpdateDate", updateDate);
                dynamicParameters.Add("@UpdateBy", updateBy);

                try
                {
                    await sqlConnection.QueryAsync<BBNghiemThuViewModel>(
                         "Update_BBNghiemThu", dynamicParameters, commandType: CommandType.StoredProcedure);
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
