using NiTiErp.Application.Dapper.ViewModels.KyThuatDien;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces.KyThuatDien
{
    public interface IKTDThayTheVatTuService
    {
        Task<KTDThayTheVatTuRequest> KTD_KTDThayTheVatTu_Get_ById(int ThayTheVatTuId);

        Task<List<KTDThayTheVatTuRequest>> KTD_KTDThayTheVatTu_Get_ByCorKy(string makhuvuc, int nam, int thang);
        Task<List<KTDPhatTrienLuoiDienRequest>> KTD_KTDPhatTrienLuoiDien_Get_ByCorKy(string makhuvuc, int nam, int thang);

        Task<bool> KTD_KTDThayTheVatTu_Create_KhoiTaoBCByDm(string DmKhoiTao, string MaKhuVuc, int Nam, int Thang, string createBy);

    }
}
