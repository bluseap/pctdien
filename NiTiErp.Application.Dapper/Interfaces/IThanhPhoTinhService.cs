using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IThanhPhoTinhService
    {
        Task<List<ThanhPhoTinhViewModel>> ThanhPhoTinhGetList(string bangId, string id2, string id3, string parameters);
        Task<ThanhPhoTinhViewModel> Get_ThanhPhoTinh_ById(int thanhphotinhid);

        Task<List<ThanhPhoTinhViewModel>> Get_ThanhPhoTinh_ByAll();
    }
}
