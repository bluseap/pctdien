﻿using AutoMapper;
using DevExpress.AspNetCore;
using DevExpress.AspNetCore.Reporting;
using DevExpress.XtraReports.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using NiTiErp.Application.Dapper.Implementation;
using NiTiErp.Application.Dapper.Implementation.DangKyDien;
using NiTiErp.Application.Dapper.Implementation.DangKyNuoc;
using NiTiErp.Application.Dapper.Implementation.PhieuCongTacDien;
using NiTiErp.Application.Dapper.Interfaces;
using NiTiErp.Application.Dapper.Interfaces.DangKyDien;
using NiTiErp.Application.Dapper.Interfaces.DangKyNuoc;
using NiTiErp.Application.Dapper.Interfaces.PhieuCongTacDien;
using NiTiErp.Application.Implementation;
using NiTiErp.Application.Interfaces;
using NiTiErp.Authorization;
using NiTiErp.Data.EF;
using NiTiErp.Data.EF.Repositories;
using NiTiErp.Data.Entities;
using NiTiErp.Data.IRepositories;
using NiTiErp.Extensions;
using NiTiErp.Helpers;
using NiTiErp.Hubs;
using NiTiErp.Infrastructure.Interfaces;
using NiTiErp.Services;
using PaulMiami.AspNetCore.Mvc.Recaptcha;
using System;


namespace NiTiErp
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
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                o => o.MigrationsAssembly("NiTiErp.Data.EF"))                
                );

            services.AddDbContext<AppDbContext>(options => options.UseSqlServer(
                this.Configuration.GetConnectionString("DefaultConnection"),
                //o => o.CommandTimeout(300))
                opts => opts.CommandTimeout((int)TimeSpan.FromMinutes(30).TotalSeconds) )
            );

            services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

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

            services.Configure<MvcJsonOptions>(config =>
            {
                config.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                // dung cho devexpress parameter session context
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddDistributedMemoryCache();

            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(1);
                options.Cookie.HttpOnly = true;
                // Make the session cookie essential
                options.Cookie.IsEssential = true;

                //options.Cookie.SameSite = SameSiteMode.Strict;
                //options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });
            services.AddImageResizer();
            services.AddAutoMapper();
            services.AddAuthentication()
                .AddFacebook(facebookOpts =>
                {
                    facebookOpts.AppId = Configuration["Authentication:Facebook:AppId"];
                    facebookOpts.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
                })
                .AddGoogle(googleOpts =>
                {
                    googleOpts.ClientId = Configuration["Authentication:Google:ClientId"];
                    googleOpts.ClientSecret = Configuration["Authentication:Google:ClientSecret"];
                });
            // Add application services.
            services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));

            services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<IViewRenderService, ViewRenderService>();

            services.AddTransient<DbInitializer>();

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
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

            services.Configure<FormOptions>(o =>  // currently all set to max, configure it to your needs!
            {
                o.MultipartBodyLengthLimit = 2147483647;
                //o.ValueLengthLimit = int.MaxValue;
                //o.MultipartBodyLengthLimit = long.MaxValue; // <-- !!! long.MaxValue
                //o.MultipartBoundaryLengthLimit = int.MaxValue;
                //o.MultipartHeadersCountLimit = int.MaxValue;
                //o.MultipartHeadersLengthLimit = int.MaxValue;
            });

            services.AddSignalR();

            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IRepository<,>), typeof(EFRepository<,>));

            //Repositories
            services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();
            services.AddTransient<IFunctionRepository, FunctionRepository>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<IProductTagRepository, ProductTagRepository>();
            services.AddTransient<IPermissionRepository, PermissionRepository>();
            services.AddTransient<IBillRepository, BillRepository>();
            services.AddTransient<IBillDetailRepository, BillDetailRepository>();
            services.AddTransient<IColorRepository, ColorRepository>();
            services.AddTransient<ISizeRepository, SizeRepository>();
            services.AddTransient<IProductQuantityRepository, ProductQuantityRepository>();
            services.AddTransient<IProductImageRepository, ProductImageRepository>();
            services.AddTransient<IWholePriceRepository, WholePriceRepository>();
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<IPageRepository, PageRepository>();

            services.AddTransient<IBlogTagRepository, BlogTagRepository>();
            services.AddTransient<ISlideRepository, SlideRepository>();
            services.AddTransient<ISystemConfigRepository, SystemConfigRepository>();

            services.AddTransient<IFooterRepository, FooterRepository>();

            services.AddTransient<ICorporationRepository, CorporationRepository>();
            services.AddTransient<ICorporationServiceRepository, CorporationServiceRepository>();

            //Serrvices
            services.AddTransient<IProductCategoryService, ProductCategoryService>();
            services.AddTransient<Application.Interfaces.IFunctionService, Application.Implementation.FunctionService>();
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IBillService, BillService>();
            services.AddTransient<IBlogService, BlogService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IFeedbackService, FeedbackService>();
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<Application.Interfaces.ICorporationService, Application.Implementation.CorporationService>();
            services.AddTransient<ICorporationServiceService, Application.Implementation.CorporationServiceService>();

            services.AddTransient<IPageService, PageService>();

            //Dapper
            services.AddTransient<NiTiErp.Application.Dapper.Interfaces.IFunctionService,
                NiTiErp.Application.Dapper.Implementation.FunctionService>();
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IAppUserRolesService, AppUserRolesService>();
            services.AddTransient<IProductsImagesService, ProductsImagesService>();

            services.AddTransient<Application.Dapper.Interfaces.ICorporationService, Application.Dapper.Implementation.CorporationService>();
            services.AddTransient<IPhongDanhMucService, PhongDanhMucService>();
            services.AddTransient<IHonNhanService, HonNhanService>();

            services.AddTransient<IDanTocService, DanTocService>();
            services.AddTransient<ITonGiaoService, TonGiaoService>();
            services.AddTransient<IXuatThanService, XuatThanService>();
            services.AddTransient<ILoaiBangService, LoaiBangService>();
            services.AddTransient<ILoaiDaoTaoService, LoaiDaoTaoService>();
            services.AddTransient<IXepLoaiService, XepLoaiService>();
            services.AddTransient<ILoaiHopDongService, LoaiHopDongService>();
            services.AddTransient<IChucVuDangService, ChucVuDangService>();
            services.AddTransient<IChucVuDoanService, ChucVuDoanService>();
            services.AddTransient<IChucVuCongDoanService, ChucVuCongDoanService>();
            services.AddTransient<IChucVuQuanDoiService, ChucVuQuanDoiService>();
            services.AddTransient<ICapBacQuanDoiService, CapBacQuanDoiService>();
            services.AddTransient<IChucVuNhanVienService, ChucVuNhanVienService>();
            services.AddTransient<IHoSoNhanVienService, HoSoNhanVienService>();
            services.AddTransient<ITrinhDoService, TrinhDoService>();
            services.AddTransient<IHopDongService, HopDongService>();
            services.AddTransient<IDangDoanService, DangDoanService>();
            services.AddTransient<ICongViecService, CongViecService>();
            services.AddTransient<IDieuKienTimService, DieuKienTimService>();
            services.AddTransient<ILockService, LockService>();
            services.AddTransient<ILoaiQuyetDinhService, LoaiQuyetDinhService>();
            services.AddTransient<IHinhThucKhenThuongService, HinhThucKhenThuongService>();
            services.AddTransient<IHinhThucKyLuatService, HinhThucKyLuatService>();
            services.AddTransient<IBacLuongService, BacLuongService>();
            services.AddTransient<IHeSoLuongService, HeSoLuongService>();
            services.AddTransient<IHeSoNhanVienService, HeSoNhanVienService>();
            services.AddTransient<IChucDanhService, ChucDanhService>();
            services.AddTransient<IThongBaoService, ThongBaoService>();
            services.AddTransient<IHisQuyetDinhService, HisQuyetDinhService>();
            services.AddTransient<IPhanLoaiSucKhoeService, PhanLoaiSucKhoeService>();

            services.AddTransient<IThanhPhoTinhService, ThanhPhoTinhService>();
            services.AddTransient<IQuanHuyenService, QuanHuyenService>();
            services.AddTransient<IPhuongXaService, PhuongXaService>();
            services.AddTransient<IMucLuongToiThieuService, MucLuongToiThieuService>();
            services.AddTransient<ISucKhoeNoiKhamService, SucKhoeNoiKhamService>();
            services.AddTransient<ISucKhoeService, SucKhoeService>();
            services.AddTransient<IDaoTaoNoiService, DaoTaoNoiService>();
            services.AddTransient<IAppUserLoginService, AppUserLoginService>();
            services.AddTransient<IDaoTaoLopService, DaoTaoLopService>();
            services.AddTransient<IDaoTaoGiaoVienService, DaoTaoGiaoVienService>();
            services.AddTransient<IDaoTaoNhanVienService, DaoTaoNhanVienService>();
            services.AddTransient<ILuongBaoHiemService, LuongBaoHiemService>();
            services.AddTransient<ILuongKyHieuService, LuongKyHieuService>();
            services.AddTransient<ILuongDotInKyService, LuongDotInKyService>();
            services.AddTransient<ILockLuongDotInService, LockLuongDotInService>();
            services.AddTransient<IChiPhiLoaiService, ChiPhiLoaiService>();
            services.AddTransient<IChiPhiBangDanhMucService, ChiPhiBangDanhMucService>();
            services.AddTransient<IChiPhiService, ChiPhiService>();
            services.AddTransient<IChiPhiKhoiTaoService, ChiPhiKhoiTaoService>();
            services.AddTransient<IChiPhiLuongService, ChiPhiLuongService>();
            services.AddTransient<IHoSoNghiViecService, HoSoNghiViecService>();
            services.AddTransient<IHoSoFileService, HoSoFileService>();

            services.AddTransient<IQDKhenThuongService, QDKhenThuongService>();
            services.AddTransient<IQDKyLuatService, QDKyLuatService>();
            services.AddTransient<IQDNangNgachService, QDNangNgachService>();
            services.AddTransient<IQDDieuDongService, QDDieuDongService>();
            services.AddTransient<IQDBoNhiemService, QDBoNhiemService>();
            services.AddTransient<IQDNghiHuuService, QDNghiHuuService>();
            services.AddTransient<IQDThoiViecService, QDThoiViecService>();
            services.AddTransient<IQDThuTuyenService, QDThuTuyenService>();

            services.AddTransient<IQuanLyVanBanService, QuanLyVanBanService>();

            services.AddTransient<IVanBanLoaiService, VanBanLoaiService>();
            services.AddTransient<IVanBanKhanService, VanBanKhanService>();
            services.AddTransient<IVanBanMatService, VanBanMatService>();
            services.AddTransient<IVanBanLinhVucService, VanBanLinhVucService>();
            services.AddTransient<IVanBanCoQuanService, VanBanCoQuanService>();
            services.AddTransient<IVanBanDenSoService, VanBanDenSoService>();
            services.AddTransient<IVanBanDiSoService, VanBanDiSoService>();
            services.AddTransient<IVanBanDenFileService, VanBanDenFileService>();
            services.AddTransient<IVanBanDenDuyetFileService, VanBanDenDuyetFileService>();
            services.AddTransient<IVanBanDiFileService, VanBanDiFileService>();
            services.AddTransient<IVanBanNhomXuLyService, VanBanNhomXuLyService>();
            services.AddTransient<IVanBanDenService, VanBanDenService>();
            services.AddTransient<IVanBanDienTuService, VanBanDienTuService>();
            services.AddTransient<IVanBanDenDuyetService, VanBanDenDuyetService>();
            services.AddTransient<IVanBanDenDuyetNVXLService, VanBanDenDuyetNVXLService>();
            services.AddTransient<IVanBanPHXLService, VanBanPHXLService>();
            services.AddTransient<IVBDQuaTrinhXuLyService, VBDQuaTrinhXuLyService>();
            services.AddTransient<IVBDiQuaTrinhXuLyService, VBDiQuaTrinhXuLyService>();
            services.AddTransient<IVanBanDenXuLyService, VanBanDenXuLyService>();
            services.AddTransient<IVanBanDenXuLyFileService, VanBanDenXuLyFileService>();
            services.AddTransient<IVanBanDiSoService, VanBanDiSoService>();
            services.AddTransient<IVanBanDiService, VanBanDiService>();

            services.AddTransient<IMessageService, MessageService>();

            services.AddTransient<IEmailNoiBoService, EmailNoiBoService>();
            services.AddTransient<IEmailNoiBoNhanService, EmailNoiBoNhanService>();
            services.AddTransient<IEmailNoiBoNhanFileService, EmailNoiBoNhanFileService>();

            services.AddTransient<IGiayDiDuongService, GiayDiDuongService>();

            services.AddTransient<IRegisterDocService, RegisterDocService>();
            services.AddTransient<IRegisterDocSendService, RegisterDocSendService>();

            services.AddTransient<IVBAutocompleteService, VBAutocompleteService>();

            services.AddTransient<IAuthorizationHandler, BaseResourceAuthorizationHandler>();

            services.AddTransient<IDMCungCapDichVuService, DMCungCapDichVuService>();
            services.AddTransient<IGiayDeNghiDMCungCapNuocService, GiayDeNghiDMCungCapNuocService>();
            services.AddTransient<IGDNThietKeNuocService, GDNThietKeNuocService>();
            services.AddTransient<IGDNThiCongNuocService, GDNThiCongNuocService>();
            services.AddTransient<IGDNNghiemThuNuocService, GDNNghiemThuNuocService>();
            services.AddTransient<IGiayDeNghiQuaTrinhCungCapService, GiayDeNghiQuaTrinhCungCapService>();

            services.AddTransient<IGiayDeNghiDMCungCapDienService, GiayDeNghiDMCungCapDienService>();
            services.AddTransient<IGDNThietKeDienService, GDNThietKeDienService>();
            services.AddTransient<IGDNThiCongDienService, GDNThiCongDienService>();
            services.AddTransient<IGDNNghiemThuDienService, GDNNghiemThuDienService>();

            services.AddTransient<IGDNXuLyKiemDinhNuocService, GDNXuLyKiemDinhNuocService>();
            services.AddTransient<IGDNXuLyKiemDinhDienService, GDNXuLyKiemDinhDienService>();

            services.AddTransient<IHsKeTuBaoService, HsKeTuBaoService>();
            services.AddTransient<IHsBoHoSoService, HsBoHoSoService>();
            services.AddTransient<IHsNhomHoSoDMService, HsNhomHoSoDMService>();
            services.AddTransient<IHsThoiHanBaoQuanDMService, HsThoiHanBaoQuanDMService>();
            services.AddTransient<IHsBoHoSoFileService, HsBoHoSoFileService>();
            services.AddTransient<IHsChuyenBoHoSoMuonTraService, HsChuyenBoHoSoMuonTraService>();

            services.AddTransient<ITTDangKyDienService, TTDangKyDienService>();
            services.AddTransient<ITTDangKyNuocService, TTDangKyNuocService>();
            services.AddTransient<ITTCacDichVuDienService, TTCacDichVuDienService>();
            services.AddTransient<ITTCacDichVuNuocService, TTCacDichVuNuocService>();
            services.AddTransient<ITTCountDangKyService, TTCountDangKyService>();
            services.AddTransient<ITTDangKyFileService, TTDangKyFileService>();

            services.AddTransient<IQuanHuyenService, QuanHuyenService>();
            services.AddTransient<IThanhPhoTinhService, ThanhPhoTinhService>();
            services.AddTransient<IPhuongXaService, PhuongXaService>();
            services.AddTransient<ITTDMDangKyService, TTDMDangKyService>();

            services.AddTransient<IDonDangKyService, DonDangKyService>();
            services.AddTransient<IThayHopDongService, ThayHopDongService>();
            services.AddTransient<IMDSDService, MDSDService>();
            services.AddTransient<IKhachHangService, KhachHangService>();
            services.AddTransient<IPoDMDieuKienService, PoDMDieuKienService>();
            services.AddTransient<ILockStatusService, LockStatusService>();
            services.AddTransient<IDotInHDService, DotInHDService>();
            services.AddTransient<IDMThuHoService, DMThuHoService>();

            services.AddTransient<IDonDangKyPoService, DonDangKyPoService>();
            services.AddTransient<IThayHopDongPoService, ThayHopDongPoService>();
            services.AddTransient<ILockStatusPoService, LockStatusPoService>();
            services.AddTransient<IKhachHangPoService, KhachHangPoService>();
            services.AddTransient<IMDSDPOService, MDSDPOService>();
            services.AddTransient<IMauBocVatTuService, MauBocVatTuService>();
            services.AddTransient<IMauThietKeService, MauThietKeService>();
            services.AddTransient<IChiTietThietKeService, ChiTietThietKeService>();
            services.AddTransient<IDaoLapTKService, DaoLapTKService>();
            services.AddTransient<IKhoDanhMucService, KhoDanhMucService>();
            services.AddTransient<IVatTuService, VatTuService>();

            services.AddTransient<IHsChiTietBoHoSoService, HsChiTietBoHoSoService>();

            services.AddTransient<IThietKeService, ThietKeService>();
            services.AddTransient<IPoHopDongService, PoHopDongService>();
            services.AddTransient<IThiCongService, ThiCongService>();
            services.AddTransient<IBBNghiemThuService, BBNghiemThuService>();
            services.AddTransient<IDongHoService, DongHoService>();
            services.AddTransient<INhanVienService, NhanVienService>();

            services.AddTransient<IDuongPhoService, DuongPhoService>();

            services.AddTransient<IBacAnToanDienService, BacAnToanDienService>();
            services.AddTransient<IPCTDanhMucService, PCTDanhMucService>();
            services.AddTransient<IPCTDienService, PCTDienService>();
            services.AddTransient<IPCTNhanVienCongTacService, PCTNhanVienCongTacService>();
            services.AddTransient<IPCTDiaDiemCongTacService, PCTDiaDiemCongTacService>();
            services.AddTransient<IPCTDDCTHinhService, PCTDDCTHinhService>();
           
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/powa-{Date}.txt");

            var reportingLogger = loggerFactory.CreateLogger("DXReporting");
            DevExpress.XtraReports.Web.ClientControls.LoggerService.Initialize((exception, message) => {
                var logMessage = $"[{DateTime.Now}]: Exception occurred. Message: '{message}'. Exception Details:\r\n{exception}";
                reportingLogger.LogError(logMessage);
            });
            DevExpress.XtraReports.Configuration.Settings.Default.UserDesignerOptions.DataBindingMode = DevExpress.XtraReports.UI.DataBindingMode.Expressions;
            //app.UseDevExpressControls();
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

            //app.UseHttpsRedirection();

            app.UseSession();
            app.UseStaticFiles();
            app.UseMinResponse();

            //app.UseCookiePolicy(new CookiePolicyOptions
            //{
            //    HttpOnly = HttpOnlyPolicy.Always,
            //    Secure = CookieSecurePolicy.Always,
            //    MinimumSameSitePolicy = SameSiteMode.None
            //});

            app.Use(async (context, next) =>
            {
                context.Features.Get<IHttpMaxRequestBodySizeFeature>().MaxRequestBodySize = null; // unlimited I guess
                await next.Invoke();
            });

            app.UseFileServer();
            app.UseSignalR(routes =>
            {
                routes.MapHub<ChatHub>("/chat");
                routes.MapHub<VanBanHub>("/vanban");
                routes.MapHub<TinNhanHub>("/tinnhan");
                routes.MapHub<ChatUserHub>("/chatuser");
            });

            //app.UseCors(x => x
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()
            //    .SetIsOriginAllowed(origin => true) // allow any origin
            //    .AllowCredentials()); // allow credentials

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                //routes.MapRoute(
                //    name: "default2",
                //    template: "{controller=Home}/{action=Index}/{id?}");       // localhost: home to product
                //routes.MapRoute(
                //   name: "areaRoute",
                //   template: "{area:exists}/{controller=Login}/{action=Index}/{id?}"); // localhost/admin: login to admin


                routes.MapRoute(
                   name: "areaRoute",
                   template: "{area:exists}/{controller=Login}/{action=Index}/{id?}"); // localhost: login to admin
                routes.MapAreaRoute(
                    name: "default",
                    areaName: "Admin",
                    template: "{controller=Login}/{action=Index}/{id?}");         //  localhost/admin: login to admin


                //routes.MapRoute(
                //    name: "default",
                //    template: "{controller=HomeNews}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "areaRoute",
                //    template: "{area:exists}/{controller=Login}/{action=Index}/{id?}");

                //routes.MapRoute(
                //    name: "areaClientRoute",
                //    template: "{area:exists}/{controller=CorporationClient}/{action=Index}/{id?}");
            });
        }
    }
}