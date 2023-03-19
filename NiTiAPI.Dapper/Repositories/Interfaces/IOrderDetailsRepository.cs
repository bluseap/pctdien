using NiTiAPI.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using NiTiAPI.Utilities.Dtos;

namespace NiTiAPI.Dapper.Repositories.Interfaces
{
    public interface IOrderDetailsRepository
    {
        Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListOrderId(string orderdetailsId);

        Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListMaNhomLive(string manhomlive);

        Task<bool> Update_OrderDetails(OrderDetailsViewModel orderdetails, string orderdetailsId, string MaNhomLive,
            bool ckttlive, bool ckttdondi, bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string updateby, DateTime updateDate);

        Task<OrderDetailsViewModel> Get_OrderDetails_ByOrderDetailsId(string orderdetailsId);

        Task<bool> Create_OrderDetails(OrderDetailsViewModel orderdetails, bool ckttlive, bool ckttdondi,
            bool ckttdonden, bool ckttdonhuy, string tensanphammoi, string createBy, DateTime createDate);

        Task<bool> Create_OrderDetails_ByTrucTiep(OrderDetailsViewModel orderdetails, string TenSanPhamMoi, string createBy, DateTime createDate);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_AllPaging(int corporationId,
            string tukhoa, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByGroupOrderAllPaging(int corporationId,
            string tukhoa, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByTTOrderId(int corporationId,
            string tukhoa, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByTTLiveOrderId(int corporationId,
            string tukhoa, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByGomDon(int corporationId,
            string tukhoa, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByDieuKien(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize);

        Task<PagedResult<OrderDetailsViewModel>> Get_OrderDetails_ByDieuKien2(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize);

        Task<List<OrderDetailsViewModel>> Get_OrderDetails_ByListDieuKien(int corporationId,
            string DieuKien, DateTime TuNgay, DateTime DenNgay, int pageIndex, int pageSize);

        Task<bool> Update_OrderDetails_ByIdGomDon(Int32 Id, string updateby, DateTime updateDate);

        Task<bool> Delete_OrderDetails(Int32 Id, string updateby, DateTime updateDate);

        Task<bool> Delete_OrderDetails01(Int32 Id, string updateby, DateTime updateDate);

        Task<bool> Delete_OrderDetails_ByIdGomDon(Int32 Id, string updateby, DateTime updateDate);

        Task<List<OrderDetailsViewModel>> GetListOrderByCreateDate(DateTime fromDate, DateTime toDate, string languageId);

        Task<List<OrderDetailsViewModel>> GetListOrderDetails(long orderId, string languageId);

        Task<bool> CreateOrderDetailsXML(string lisetOrderXML, string userName, string languageId);
    }
}
