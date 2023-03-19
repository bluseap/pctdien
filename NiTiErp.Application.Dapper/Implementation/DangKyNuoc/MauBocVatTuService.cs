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
    public class MauBocVatTuService : IMauBocVatTuService
    {
        private readonly IConfiguration _configuration;

        public MauBocVatTuService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByLoaiMBVT(string CorporationId, string loaimbvt)
        {
            using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await sqlConnection.OpenAsync();
                var dynamicParameters = new DynamicParameters();

                dynamicParameters.Add("@CorporationId", CorporationId);
                dynamicParameters.Add("@LoaiMBVT", loaimbvt);

                try
                {
                    var query = await sqlConnection.QueryAsync<MauBocVatTuViewModel>(
                        "Get_MauBocVatTu_ByLoaiMBVT", dynamicParameters, commandType: CommandType.StoredProcedure);

                    return query.AsList();
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        //public async Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByMakvLoaiMBVT(string makv, string loaimbvt)
        //{
        //    using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        await sqlConnection.OpenAsync();
        //        var dynamicParameters = new DynamicParameters();

        //        dynamicParameters.Add("@Makv", makv);
        //        dynamicParameters.Add("@LoaiMBVT", loaimbvt);

        //        try
        //        {
        //            var query = await sqlConnection.QueryAsync<MauBocVatTuViewModel>(
        //                "Get_MauBocVatTu_ByMakvLoaiMBVT", dynamicParameters, commandType: CommandType.StoredProcedure);

        //            return query.AsList();
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        //}

        //public async Task<List<MauBocVatTuViewModel>> Get_MauBocVatTu_ByLoaiMBVTMauCuaAi(string loaimbvt, string maucuaai)
        //{
        //    using (var sqlConnection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        await sqlConnection.OpenAsync();
        //        var dynamicParameters = new DynamicParameters();

        //        dynamicParameters.Add("@LoaiMBVT", loaimbvt);
        //        dynamicParameters.Add("@MauCuaAi", maucuaai);

        //        try
        //        {
        //            var query = await sqlConnection.QueryAsync<MauBocVatTuViewModel>(
        //                "Get_MauBocVatTu_ByLoaiMBVTMauCuaAi", dynamicParameters, commandType: CommandType.StoredProcedure);

        //            return query.AsList();
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        //}

    }
}
