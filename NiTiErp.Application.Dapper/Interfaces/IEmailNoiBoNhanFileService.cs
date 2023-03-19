﻿using NiTiErp.Application.Dapper.ViewModels;
using NiTiErp.Utilities.Dtos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface IEmailNoiBoNhanFileService
    {
        Task<PagedResult<EmailNoiBoNhanFileViewModel>> GetPagingByCodeNhanFile(
            Guid CodeEmailNoiBoNhanFile, int pageIndex, int pageSize);

        Task<List<EmailNoiBoNhanFileViewModel>> GetListEmailFileNoiBoNhanId(long id);

        Task<EmailNoiBoNhanFileViewModel> GetEmailFileId(long id);

        Boolean AddEmailNhanFileByCodeNhanFile(Guid CodeEmailNoiBoNhanFile,
            string TenFile, string DuongDan, DateTime CreateDate, string CreateBy);

        Boolean DeleteEmailNhanFileById(long Id, DateTime CreateDate, string CreateBy);
        
    }
}
