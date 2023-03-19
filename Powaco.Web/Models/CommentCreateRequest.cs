using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Powaco.Web.Models
{
    public class CommentCreateRequest
    {
        public string Content { get; set; }

        public int KnowledgeBaseId { get; set; }

        public int? ReplyId { get; set; }

        public string CaptchaCode { get; set; }
    }
}
