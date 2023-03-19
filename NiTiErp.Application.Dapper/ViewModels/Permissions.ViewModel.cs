
using System;


namespace NiTiErp.Application.Dapper.ViewModels
{
    public class Permissions
    {
        public int Id { get; set; }

        public bool CanCreate { get; set; }

        public bool CanDelete { get; set; }

        public bool CanRead { get; set; }

        public bool CanUpdate { get; set; }

        public string FunctionId { get; set; }

        public Guid RoleId { get; set; }
        
        public string FunctionPermission { get; set; }
       
    }
}
