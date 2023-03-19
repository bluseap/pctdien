using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using NiTiErp.Infrastructure.Interfaces;
using NiTiErp.Data.EF;
using Microsoft.EntityFrameworkCore;
using NiTiErp.Data.IRepositories;
using NiTiErp.Data.EF.Repositories;
using NiTiErp.Application.Interfaces;
using NiTiErp.Application.Implementation;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using NiTiErp.Application.Dapper.ViewModels;
using Microsoft.AspNetCore.Identity;
using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Localization.Routing;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Mvc.Razor;
using System.Reflection;
using NiTiErp.WebApi.Resources;
using NiTiErp.WebApi.Data;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using NiTiErp.WebApi.Extensions;
using System.Net.Http;

namespace NiTiErp.WebApi
{
    public class Startup
    {
        private readonly string PowaAPISpecificOrigins = "PowaAPISpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IUserStore<AppUserViewModel>, UserStore>();
            services.AddTransient<IRoleStore<AppRoleViewModel>, RoleStore>();
            services.AddTransient<IProductRepository, ProductRepository>();

            services.AddIdentity<AppUserViewModel, AppRoleViewModel>()
                .AddDefaultTokenProviders();

            services.AddCors(opt =>
            {
                opt.AddPolicy(PowaAPISpecificOrigins,
                builder =>
                {
                    builder.WithOrigins(Configuration["AllowOrigins"])                    
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });


            services.Configure<IdentityOptions>(opt =>
            {
                // Default Password settings.
                opt.Password.RequireDigit = true;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequiredLength = 6;
                opt.Password.RequiredUniqueChars = 1;
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1)
                .AddJsonOptions(opt =>
                {
                    opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });
            services.AddHttpClient("BackendApi").ConfigurePrimaryHttpMessageHandler(() =>
            {
                var handler = new HttpClientHandler();
                var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                //if (environment == Environments.Development)
                //{
                //    handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };
                //}
                handler.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; };
                return handler;
            });

            var supportedCultures = new[]
               {
                    new CultureInfo("en-US"),
                    new CultureInfo("vi-VN"),
                };

            var options = new RequestLocalizationOptions()
            {
                DefaultRequestCulture = new RequestCulture(culture: "vi-VN", uiCulture: "vi-VN"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            };
            options.RequestCultureProviders = new[]
            {
                 new RouteDataRequestCultureProvider() { Options = options }
            };
            services.AddSingleton(options);
            services.AddSingleton<LocService>();


            services.AddLocalization(otp => otp.ResourcesPath = "Resources");
            //Add authen fixbug cannot get Claims
            services.AddAuthentication(o =>
            {
                o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;

                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = Configuration["Tokens:Issuer"],
                    ValidAudience = Configuration["Tokens:Issuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
                };
            });

            services.AddAuthorization(o => 
            {
                o.AddPolicy("AdminOnly", policy => policy.RequireClaim("Admin"));

            });

            //Add mvc
            services.AddMvc()
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix)
                 .AddDataAnnotationsLocalization(otp =>
                 {
                     otp.DataAnnotationLocalizerProvider = (type, factory) =>
                     {
                         var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                         return factory.Create("SharedResource", assemblyName.Name);
                     };
                 });

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "POWACO-HRM Project",
                    Description = "POWACO-HRM API Swagger surface",
                    Contact = new Contact
                    {
                        Name = "lenguyen",
                        Email = "khoinguyenaglx@gmail.com",
                        Url = "http://powaco.ddns.net"
                    },
                    License = new License { Name = "MIT", Url = "http://powaco.ddns.net" }
                });

                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    In = "header",
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = "apiKey"
                });

                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile(Configuration.GetSection("Logging"));

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions.Value);

            app.UseExceptionHandler(options =>
            {
                options.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;
                    if (ex == null) return;

                    var error = new
                    {
                        message = ex.Message
                    };

                    context.Response.ContentType = "application/json";
                    context.Response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });
                    context.Response.Headers.Add("Access-Control-Allow-Origin", new[] { Configuration["AllowedHosts"] });

                    using (var writer = new StreamWriter(context.Response.Body))
                    {
                        new JsonSerializer().Serialize(writer, error);
                        await writer.FlushAsync().ConfigureAwait(false);
                    }
                });
            });

            app.Use(async (context, next) =>
            {
                //context.Response.Headers.Add("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'");
                context.Response.Headers.Add("Content-Security-Policy", "img-src 'self'; frame-src 'self'");
                await next();
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseHsts();
                app.UseHsts(hsts => hsts.MaxAge(365).IncludeSubdomains().Preload());

                app.UseXContentTypeOptions();
                app.UseReferrerPolicy(opts => opts.NoReferrer());
                app.UseXXssProtection(options => options.EnabledWithBlockMode());
                app.UseXfo(options => options.Deny());
            }

            app.UseErrorWrapping();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwagger(c =>
            {
                c.PreSerializeFilters.Add((document, request) =>
                {
                    var paths = document.Paths.ToDictionary(item => item.Key.ToLowerInvariant(), item => item.Value);
                    document.Paths.Clear();
                    foreach (var pathItem in paths)
                    {
                        document.Paths.Add(pathItem.Key, pathItem.Value);
                    }
                });
            });
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "POWACO-HRM REST API V1");
            });
           
            app.UseStaticFiles();

            //app.UseIdentityServer();           

            app.UseAuthentication();

            //app.UseAuthorization();

            app.UseHttpsRedirection();

            //app.UseRouting();

            //app.UseAuthorization();

            app.UseCors(PowaAPISpecificOrigins);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                   name: "swagger",
                   template: "swagger/{action=Index}/{id?}");        
                
            });
        }
        
    }
}
