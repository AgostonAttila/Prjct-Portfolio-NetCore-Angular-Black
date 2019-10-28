using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using PortfolioNetCoreAngularBlack.Data;
using PortfolioNetCoreAngularBlack.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AutoMapper;
using Core;
using Infrastructure;
using PortfolioNetCoreAngularBlack.Extensions;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace PortfolioNetCoreAngularBlack
{
    public class Startup
    {

        public static IConfiguration Configuration { get; set; }
        private IHostEnvironment HostEnvironment { get; }

        public Startup(IConfiguration configuration, IHostEnvironment env)
        {
            Configuration = configuration;
            HostEnvironment = env;
        }


        public void ConfigureServices(IServiceCollection services)
        {
            //old
            //services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer(
            //        Configuration.GetConnectionString("DefaultConnection")));


            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //services.AddPreRenderDebugging(HostingEnvironment);

            services.AddOptions();
            services.AddResponseCompression();
            services.AddMemoryCache();
            services.AddHealthChecks();
            services.RegisterCustomServices();
            //services.AddSignalR()
            //   .AddMessagePackProtocol();
            services.AddCustomLocalization(HostEnvironment);

            //old
            services.AddDefaultIdentity<ApplicationUser>()
                .AddEntityFrameworkStores<ApplicationDbContext>();
            //old
            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

            services.AddCustomDbContext();                         
            //old
            services.AddAuthentication()
                .AddIdentityServerJwt();
            //old
            services.AddControllersWithViews();
            //old
            services.AddRazorPages();

            services.AddCustomizedMvc();
            //old
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddAntiforgery();

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "AspNetCore - Angular Portfolio", Version = "v1" });
            //});

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info { Title = "AspNetCoreSpa", Version = "v1" });

            //    // Swagger 2.+ support
            //    var security = new Dictionary<string, IEnumerable<string>>
            //    {
            //        {"Bearer", new string[] { }},
            //    };

            //    c.AddSecurityDefinition("Bearer", new ApiKeyScheme
            //    {
            //        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            //        Name = "Authorization",
            //        In = "header",
            //        Type = "apiKey"
            //    });
            //    c.AddSecurityRequirement(security);

            //});

            //Mapper.Initialize(cfg =>
            //{
            //    cfg.AddProfile<AutoMapperProfile>();
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //new
            app.UseHealthChecks("/health");

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseDatabaseErrorPage();
                app.AddDevMiddlewares();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.            
                app.UseHsts();
                app.UseResponseCompression();
            }

            //new
            app.AddCustomLocalization();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<Chat>("/chathub");
            //    routes.MapHub<ShapeHub>("/shapeHub");
            //});

            //// https://github.com/openiddict/openiddict-core/issues/518
            //// And
            //// https://github.com/aspnet/Docs/issues/2384#issuecomment-297980490
            //var forwarOptions = new ForwardedHeadersOptions
            //{
            //    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            //};
            //forwarOptions.KnownNetworks.Clear();
            //forwarOptions.KnownProxies.Clear();

            //app.UseForwardedHeaders(forwarOptions);

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
