using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IQuanHuyenService
    {
        Task<List<QuanHuyenViewModel>> QuanHuyenGetList(string bangId, string id2, string id3, string parameters);

        Task<List<QuanHuyenViewModel>> Get_QuanHuyen_ByTinh(int tinh);

        Task<QuanHuyenViewModel> Get_QuanHuyen_ById(int quanhuyenid);

        Task<List<QuanHuyenViewModel>> Get_QuanHuyen_ByAll();
    }
}
