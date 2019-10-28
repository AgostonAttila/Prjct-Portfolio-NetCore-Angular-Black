using PortfolioNetCoreAngularBlack.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.Hosting;

namespace PortfolioNetCoreAngularBlack.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        //IHostEnvironment _hostingEnvironment;
        //private string _contentDirectoryPath = "";

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            //_hostingEnvironment = environment;
            // _contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "users.db");
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlite("Data Source=" + _contentDirectoryPath);

            string useSqLite = Startup.Configuration["Data:useSqLite"];
            string useInMemory = Startup.Configuration["Data:useInMemory"];
            if (useInMemory.ToLower() == "true")
            {
                optionsBuilder.UseInMemoryDatabase("users"); // Takes database name
            }
            else if (useSqLite.ToLower() == "true")
            {
                var connection = Startup.Configuration["Data:SqlLiteConnectionStringId"];
                optionsBuilder.UseSqlite(connection, b =>
                {
                    b.MigrationsAssembly("PortfolioNetCoreAngularBlack");
                    //b.UseNetTopologySuite();
                });
            }
            else
            {
                var connection = Startup.Configuration["Data:SqlServerConnectionString"];
                optionsBuilder.UseSqlServer(connection, b =>
                {
                    b.MigrationsAssembly("PortfolioNetCoreAngularBlack");
                    // Add foolowing package to enable net topology suite for sql server:
                    // <PackageReference Include = "Microsoft.EntityFrameworkCore.SqlServer.NetTopologySuite" Version = "2.2.0" />
                    //b.UseNetTopologySuite();
                });
            }

        }
    }
}
