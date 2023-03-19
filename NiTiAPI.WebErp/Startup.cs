﻿using AutoMapper;
using DevExpress.AspNetCore;
using DevExpress.AspNetCore.Reporting;
using DevExpress.XtraReports.Web.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using NiTiAPI.Dapper.Models;
using NiTiAPI.Dapper.Repositories;
using NiTiAPI.Dapper.Repositories.Interfaces;
using NiTiAPI.WebErp.Data;
using NiTiAPI.WebErp.Extensions;
using NiTiAPI.WebErp.Helpers;
using NiTiAPI.WebErp.Hubs;
using NiTiAPI.WebErp.Resources;
using NiTiAPI.WebErp.Services;
using PaulMiami.AspNetCore.Mvc.Recaptcha;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;

namespace NiTiAPI.WebErp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<AppDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
            //    o => o.MigrationsAssembly("TeduCoreApp.Data.EF")));

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DbConnectionString")));

            services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            //services.AddDbContext<AppDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DbConnectionString")));

            //services.AddDbContext<AppDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DbConnectionString")));

            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<AppDbContext>()
            //    .AddDefaultTokenProviders();

            services.AddTransient<IUserStore<AppUser>, UserStore>();
            services.AddTransient<IRoleStore<AppRole>, RoleStore>();

            services.AddMemoryCache();

            services.AddMinResponse();

            // Configure Identity
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // User settings
                options.User.RequireUniqueEmail = true;
            });

            services.AddRecaptcha(new RecaptchaOptions()
            {
                SiteKey = Configuration["Recaptcha:SiteKey"],
                SecretKey = Configuration["Recaptcha:SecretKey"]
            });

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(1);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;
            });
            services.AddImageResizer();
            services.AddAutoMapper();

            //services.AddAuthentication()
            //    .AddFacebook(facebookOpts =>
            //    {
            //        facebookOpts.AppId = Configuration["Authentication:Facebook:AppId"];
            //        facebookOpts.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
            //    })
            //    .AddGoogle(googleOpts =>
            //    {
            //        googleOpts.ClientId = Configuration["Authentication:Google:ClientId"];
            //        googleOpts.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
            //    });
            services.AddAuthentication(options =>
            {
                //options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            })
                .AddFacebook(facebookOpts =>
                {
                    facebookOpts.AppId = Configuration["Authentication:Facebook:AppId"];
                    facebookOpts.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
                })
                .AddGoogle(googleOpts =>
                {
                    googleOpts.ClientId = Configuration["Authentication:Google:ClientId"];
                    googleOpts.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
                })
                .AddCookie(options =>
                {
                    options.LoginPath = "/Admin/Home/Index";
                })
                ;

            // Add application services.
            services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));

            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IViewRenderService, ViewRenderService>();

            //  services.AddTransient<DbInitializer>();
            services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, CustomClaimsPrincipalFactory>();

            // Register reporting services in the application's dependency injection container.
            services.AddDevExpressControls();
            services.AddScoped<ReportStorageWebExtension, CustomReportStorageWebExtension>();
            services.ConfigureReportingServices(configurator => {
                configurator.ConfigureReportDesigner(designerConfigurator => {
                    designerConfigurator.RegisterDataSourceWizardConfigFileConnectionStringsProvider();

                    // designerConfigurator.RegisterDataSourceWizardJsonConnectionStorage<CustomDataSourceWizardJsonDataConnectionStorage>(true);
                    //designerConfigurator.RegisterObjectDataSourceWizardTypeProvider<ObjectDataSourceWizardCustomTypeProvider>();

                });
                configurator.ConfigureWebDocumentViewer(viewerConfigurator => {
                    viewerConfigurator.UseCachedReportSourceBuilder();
                    //viewerConfigurator.RegisterJsonDataConnectionProviderFactory<CustomJsonDataConnectionProviderFactory>();
                });
            });

            //Add authen fixbug cannot get Claims
            //services.AddAuthentication(o =>
            //{
            //    o.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    o.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(cfg =>
            //{
            //    cfg.RequireHttpsMetadata = false;
            //    cfg.SaveToken = true;

            //    cfg.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidIssuer = Configuration["Tokens:Issuer"],
            //        ValidAudience = Configuration["Tokens:Issuer"],
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
            //    };
            //});

            services.AddLocalization(opts => { opts.ResourcesPath = "Resources"; });

            services.AddMvc(options =>
            {
                options.CacheProfiles.Add("Default",
                    new CacheProfile()
                    {
                        Duration = 60
                    });
                options.CacheProfiles.Add("Never",
                    new CacheProfile()
                    {
                        Location = ResponseCacheLocation.None,
                        NoStore = true
                    });
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_1)

            .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix,
                    opts => { opts.ResourcesPath = "Resources"; })
            //.AddDataAnnotationsLocalization()
            .AddDataAnnotationsLocalization(otp =>
            {
                otp.DataAnnotationLocalizerProvider = (type, factory) =>
                {
                    var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                    return factory.Create("SharedResource", assemblyName.Name);
                };
            })

            .AddRazorPagesOptions(options => options.AllowAreas = true)

            .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.AddCors(options => options.AddPolicy("CorsPolicy",
               builder =>
               {
                   builder.AllowAnyOrigin()                        
                       .AllowAnyHeader()
                       .WithOrigins("http://localhost:44342", "https://localhost:44342")
                       .AllowAnyMethod()
                       .AllowCredentials();
               }));

            services.Configure<RequestLocalizationOptions>(
             opts =>
             {
                 var supportedCultures = new List<CultureInfo>
                 {
                     new CultureInfo("vi-VN")
                     //new CultureInfo("vi-VN"),
                     //new CultureInfo("en-US")
                 };
                 opts.DefaultRequestCulture = new RequestCulture("vi-VN");
                 // Formatting numbers, dates, etc.
                 opts.SupportedCultures = supportedCultures;
                 // UI strings that we have localized.
                 opts.SupportedUICultures = supportedCultures;
             });

            services.AddTransient<IAppUserLoginRepository, AppUserLoginRepository>();
            services.AddTransient<IFunctionRepository, FunctionRepository>();

            services.AddTransient<ICorporationRepository, CorporationRepository>();
            services.AddTransient<IRoleRepository, RoleRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserRolesRepository, UserRolesRepository>();
            services.AddTransient<ICategoriesRepository, CategoriesRepository>();
            services.AddTransient<IAttributeOptionValueRepository, AttributeOptionValueRepository>();
            services.AddTransient<IAttributeRepository, AttributeRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<IProductImagesRepository, ProductImagesRepository>();
            services.AddTransient<IProductQuantitiesRepository, ProductQuantitiesRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<IOrderRepository, OrderRepository>();
            services.AddTransient<IOrderDetailsRepository, OrderDetailsRepository>();
            services.AddTransient<IUserOnlineRepository, UserOnlineRepository>();

            services.AddTransient<IProductWholePriceRepository, ProductWholePriceRepository>();

            services.AddTransient<ICategoryNewsRepository, CategoryNewsRepository>();
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<IPostsImagesRepository, PostsImagesRepository>();

            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/niti-{Date}.txt");

            var reportingLogger = loggerFactory.CreateLogger("DXReporting");
            DevExpress.XtraReports.Web.ClientControls.LoggerService.Initialize((exception, message) => {
                var logMessage = $"[{DateTime.Now}]: Exception occurred. Message: '{message}'. Exception Details:\r\n{exception}";
                reportingLogger.LogError(logMessage);
            });
            DevExpress.XtraReports.Configuration.Settings.Default.UserDesignerOptions.DataBindingMode = DevExpress.XtraReports.UI.DataBindingMode.Expressions;
            app.UseDevExpressControls();
            System.Net.ServicePointManager.SecurityProtocol |= System.Net.SecurityProtocolType.Tls12;

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseDevExpressControls();

            app.UseImageResizer();
            app.UseStaticFiles();
            app.UseMinResponse();
            app.UseAuthentication();
            app.UseSession();

            var options = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(options.Value);
            app.UseMvcWithDefaultRoute();

            app.UseCors("CorsPolicy");

            app.UseSignalR(routes =>
            {
                routes.MapHub<UserOnlineHub>("/useronlinehub");
            });

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                   name: "areaRoute",
                   template: "{area:exists}/{controller=Login}/{action=Index}/{id?}"); // localhost: login to admin
                routes.MapAreaRoute(
                    name: "default",
                    areaName: "Admin",
                    template: "{controller=Login}/{action=Index}/{id?}");         //  localhost/admin: login to admin

                //routes.MapRoute(
                //    name: "default5",
                //    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default55",
                //    areaName: "CPrice",
                //    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "default4",
                //    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default44",
                //    areaName: "CNews",
                //    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "default3",
                //    template: "{area:exists}/{controller=Login}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default33",
                //    areaName: "CShop",
                //    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "default",
                //    template: "{area:exists}/{controller=Login}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default2",
                //    areaName: "ClientShop",
                //    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "default",
                //    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default2",
                //    areaName: "Client",
                //    template: "{controller=Home}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "default",
                //    template: "{area:exists}/{controller=login}/{action=Index}/{id?}");
                //routes.MapAreaRoute(
                //    name: "default2",
                //    areaName: "admin",
                //    template: "{controller=login}/{action=Index}/{id?}");

                //routes.MapRoute(
                //   name: "areaRoute",
                //   template: "{area:exists}/{controller=Login}/{action=Index}/{id?}"); // localhost: login to admin

                //routes.MapAreaRoute(
                //    name: "default",
                //    areaName: "Admin",
                //    template: "{controller=Login}/{action=Index}/{id?}");         //  localhost/admin: login to admin

                //routes.MapAreaRoute(
                //    name: "ClientShop",
                //    areaName: "ClientShop",
                //    template: "{controller=Home}/{action=Index}/{id?}");         //  localhost/admin: login to client shop
            });
        }
    }
}