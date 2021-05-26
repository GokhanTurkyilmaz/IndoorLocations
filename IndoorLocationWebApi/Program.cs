using Autofac;
using Autofac.Extensions.DependencyInjection;
using Bussiness.Constans.DependencyResolvers.AutoFac;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IndoorLocationWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
           Host.CreateDefaultBuilder(args)
               //.net core in kendi alt yapisindaki IOC yerine bizim kendi yazdigimiz AutoFac i kullan diyoruz
               .UseServiceProviderFactory(new AutofacServiceProviderFactory())
               .ConfigureContainer<ContainerBuilder>(builder =>
               {
                   builder.RegisterModule(new AutoFacBussinessModule());

               })
               //end
               .ConfigureWebHostDefaults(webBuilder =>
               {
                   webBuilder.UseStartup<Startup>();
               });
    }
}
