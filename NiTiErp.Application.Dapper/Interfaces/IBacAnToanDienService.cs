using System;
using System.Collections.Generic;
using System.Text;
using NiTiErp.Application.Dapper.ViewModels;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IBacAnToanDienService
    {
        Task<List<BacAnToanDienViewModel>> Get_BacAnToanDien_All(bool active);
    }
}
