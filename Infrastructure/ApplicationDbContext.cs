using Core;
using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Infrastructure
{
    class ApplicationDbContext : DbContext
    {
  
        public DbSet<Fund> Funds { get; set; }
        public DbSet<Management> Managements { get; set; }


        //public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        //{
        //}

        IHostingEnvironment _hostingEnvironment;
        private string _contentDirectoryPath = "";

        public void PortfolioContext(IHostingEnvironment environment)
        {
            _hostingEnvironment = environment;
            _contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data", "portfolio.db");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=" + _contentDirectoryPath);
        }

    }
}
