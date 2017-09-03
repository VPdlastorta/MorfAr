using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MorfAr.Web.Startup))]
namespace MorfAr.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
