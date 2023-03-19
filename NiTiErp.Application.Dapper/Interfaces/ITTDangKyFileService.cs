using NiTiErp.Application.Dapper.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml;

namespace NiTiErp.Application.Dapper.Interfaces
{
    public interface ITTDangKyFileService
    {
        Task<TTDangKyFileViewModel> Get_TTDangKyFile_ById(Int64 id);

        Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByDangKyId(int ttdangkyId, Guid codeid);

        Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByDangKy(int ttdangkyId, string ttdangkyCode);

        Task<List<TTDangKyFileViewModel>> Get_TTDangKyFile_ByAll();

        Task<bool> Update_TTDangKyFile_ByImageFile64(Int64 ttdangkyfileId, string imagefile);

        Task<bool> Create_TTDangKyFile(Guid codeId, string dangkyfileXML, DateTime createDate, string createBy);

        Task<bool> Create_TTDangKyFile2(Guid codeId, string dangkyfileXML, byte[] imgebyte, DateTime createDate, string createBy);

        Task<bool> Create_TTDangKyFileImage(string ImageFile, Guid NewGuid, string Tenfile);

        Task<bool> Update_TTDangKyFile_ByCodeId(Guid codeId, string filename, DateTime updateDate, string updateBy);

        Task<bool> Delete_TTDangKyFile_ByCodeIdFileName(Guid codeId, string filename, DateTime updateDate, string updateBy);

    }
}
