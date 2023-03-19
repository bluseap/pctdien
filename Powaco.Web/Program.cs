using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using NiTiErp.Data.EF;

namespace Powaco.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)

            .UseKestrel(options =>
            {
                options.Limits.KeepAliveTimeout = TimeSpan.FromMinutes(120);
                options.Limits.RequestHeadersTimeout = TimeSpan.FromMinutes(120);
                options.Limits.MaxRequestBodySize = 524288000; //500Mb
                //options.Limits.MaxRequestBufferSize = null;
                //options.Limits.MaxResponseBufferSize = null;
                
            })
            .UseIISIntegration()
            
                .UseStartup<Startup>();

    }
}
