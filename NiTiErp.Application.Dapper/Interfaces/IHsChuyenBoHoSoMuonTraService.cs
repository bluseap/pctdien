using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IHsChuyenBoHoSoMuonTraService
    {
        Task<HsChuyenBoHoSoMuonTraViewModel> Get_HsChuyenBoHoSoMuonTra_ById(int hschuyenbohosomuontraid);

        Task<HsChuyenBoHoSoMuonTraViewModel> Get_HsChuyenBoHoSoMuonTra_ByIdIsMuon(int hschuyenbohosomuontraid, bool istra);

        Task<List<HsChuyenBoHoSoMuonTraViewModel>> Get_HsChuyenBoHoSoMuonTra_ByHsBoHoSoCuId(Int32 hsbohosocuid);

        Task<bool> Create_HsChuyenBoHoSoMuonTra_ByMuon(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra, DateTime createDate, string createBy);

        Task<bool> Update_HsChuyenBoHoSoMuonTra_ByMuon(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy);

        Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra, DateTime updateDate, string updateBy);

        Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTraUpdate(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy);

        Task<bool> Update_HsChuyenBoHoSoMuonTra_ByTraChuaTra(HsChuyenBoHoSoMuonTraViewModel chuyenbohosomuontra,
            DateTime updateDate, string updateBy);

        Task<bool> Delete_HsChuyenBoHoSoMuonTra(int hschuyenbohosomuonctraId, DateTime updateDate, string updateBy);
    }
}
