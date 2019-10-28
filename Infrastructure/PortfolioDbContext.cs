using System.IO;
using Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Infrastructure
{
    public class PortfolioDbContext : DbContext
    {
        public string CurrentUserId { get; set; }
        public DbSet<Fund> Funds { get; set; }
        public DbSet<Management> Managements { get; set; }

        //IHostEnvironment _hostingEnvironment;
        //private string _contentDirectoryPath = "";

        //public PortfolioDbContext(IHostEnvironment environment)
        //{
        //    _hostingEnvironment = environment;
        //    _contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "App_Data", "portfolio.db");
        //}

        public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
        {
            //_hostingEnvironment = environment;
            //_contentDirectoryPath = Path.Combine(_hostingEnvironment.ContentRootPath, "fund.db");
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite("Data Source=" + _contentDirectoryPath);
        //}

    }
}
