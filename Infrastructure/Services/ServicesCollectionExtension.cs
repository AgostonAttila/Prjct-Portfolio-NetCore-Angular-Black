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
            services.AddTransient<ApplicationDbContext>();
            //services.AddTransient<ISeedData, SeedData>();
            //services.AddTransient<ICustomerRepository, CustomerRepository>();
            //services.AddTransient<IOrdersRepository, OrdersRepository>();
            //services.AddTransient<IProductRepository, ProductRepository>();
            //services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();

            return services;
        }
    }
}
