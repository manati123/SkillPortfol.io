using SkillPortofolio.Api.Filters;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SkillPortofolio.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);
           // Web API routes
            config.MapHttpAttributeRoutes();

            config.Filters.Add(new UserContextFilterAttribute());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
