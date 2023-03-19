using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NiTiErp.WebApi.Helpers;

namespace NiTiErp.WebApi.Extensions
{
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseErrorWrapping(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorWrappingMiddleware>();
        }
    }
}
