using NiTiAPI.Dapper.ViewModels;
using NiTiAPI.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiAPI.Dapper.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<OrderViewModel> Get_Order_ByOrderDetailsId(string orderdetails);

        Task<OrderViewModel> GetById(long id);

        Task<PagedResult<OrderViewModel>> Get_Order_AllPagingTenKH(int corporationId,
            string tenkhachhang, string sodienthoai, int pageIndex, int pageSize);

        Task<PagedResult<OrderViewModel>> GetAllPagingOrder(int corporationId,
            string keyword, int pageIndex, int pageSize);

        Task<bool> Create_Order(OrderViewModel order, string createBy, DateTime createDate);

        Task<bool> Update_Order_KhachHang(OrderViewModel order, string updateBy, DateTime updateDate);

        Task<bool> CreateOrder(string orderXML, string CreateBy);

        Task<bool> CreateOrderCorpoId(string orderXML, string CreateBy);

        Task<bool> UpdateOrder(OrderViewModel order);

        Task<bool> DeleteOrder(long id, string username);

    }
}
