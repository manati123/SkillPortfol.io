using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace SkillPortofolio.Api.Filters
{
    public class UserContextFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            base.OnActionExecuting(actionContext);

            //get the app principal token 
            // Get the URL to the SharePoint Online site
            var webUri =
                new Uri(
                    ConfigurationManager.AppSettings["WebUri"]);

            // Get the access token. The web toolkit will do all the work
            // for you. Remember, you will need ClientId and ClientSecret in the Web.config

            var realm = TokenHelper.GetRealmFromTargetUrl(webUri);
            var accessToken = TokenHelper.GetAppOnlyAccessToken(
                TokenHelper.SharePointPrincipal,
                webUri.Authority, realm).AccessToken;

            if (!string.IsNullOrEmpty(accessToken))
            {
                HttpContext.Current.Items["accessToken"] = accessToken;
            }

            //get the email of the current user:
            var currentUserEmail = actionContext.Request.Headers.SingleOrDefault(x => x.Key == "email").Value?.First();
            if (!string.IsNullOrEmpty(currentUserEmail))
            {
                HttpContext.Current.Items["email"] = currentUserEmail;
            }
        }

    }
}