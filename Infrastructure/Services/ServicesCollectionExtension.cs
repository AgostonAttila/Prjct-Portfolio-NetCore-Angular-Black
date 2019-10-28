using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Services
{
    public static class ServicesCollectionExtension
    {
        public static IServiceCollection AddInfrastructurServices(this IServiceCollection services)
        {
            //services.AddSingleton<IStringLocalizerFactory, EFStringLocalizerFactory>();
            //services.AddTransient<IEmailSender, AuthMessageSender>();
            //services.AddTransient<IApplicationDataService, ApplicationDataService>();
            services.AddScoped<IUnitOfWork, HttpUnitOfWork>();
            services.AddTransient<PortfolioDbContext>();
            //services.AddTransient<ISeedData, SeedData>();     
            services.AddTransient<IFundRepository, FundRepository>();
            services.AddTransient<IManagementRepository, ManagementRepository>();
     
            return services;
        }
    }
}
