using Autofac;
using Autofac.Extras.DynamicProxy;
using Bussiness.Abstract;
using Bussiness.Concrete;
using Castle.DynamicProxy;
using Core.Utilities.Interceptors;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Bussiness.Constans.DependencyResolvers.AutoFac
{
    public class AutoFacBussinessModule:Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<GatewayManager>().As<IGatewayService>().SingleInstance();
            builder.RegisterType<EfGatewayDal>().As<IGatewayDal>().SingleInstance();

            builder.RegisterType<BeaconManager>().As<IBeaconService>().SingleInstance();
            builder.RegisterType<EfBeaconDal>().As<IBeaconDal>().SingleInstance();

            var assembly = System.Reflection.Assembly.GetExecutingAssembly();
            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces()
                .EnableInterfaceInterceptors(new ProxyGenerationOptions()
                {
                    Selector = new AspectInterceptorSelector()
                }).SingleInstance();
        }
    }
}
