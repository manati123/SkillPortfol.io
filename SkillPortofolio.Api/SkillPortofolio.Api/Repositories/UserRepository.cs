using Microsoft.SharePoint;
using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Filters;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Repositories
{
    [UserContextFilter]
    public class UserRepository: IUserRepository
    {
        private ClientContext _context;

        public UserRepository()
        {
            this.InitializeContext();
        }

        public bool CheckUser(string email, string groupName)
        {
            GroupCollection colGroup = _context.Web.SiteGroups;
            Group oGroup = colGroup.GetByName(groupName);
            UserCollection collUser = oGroup.Users;

            _context.Load(collUser);
            _context.ExecuteQuery();

            bool result = false;
            foreach (User oUser in collUser)
            {
                if (oUser.Email.ToString().Equals(email))
                {
                    result = true;
                    break;
                }
            }
            return result;
        }

        private void InitializeContext()
        {
            var webUri =
                new Uri(
                    ConfigurationManager.AppSettings["WebUri"]);

            var realm = TokenHelper.GetRealmFromTargetUrl(webUri);
            var accessToken = TokenHelper.GetAppOnlyAccessToken(
                TokenHelper.SharePointPrincipal,
                webUri.Authority, realm).AccessToken;

            _context = TokenHelper.GetClientContextWithAccessToken(
                new Uri(ConfigurationManager.AppSettings["WebUri"]).ToString(), accessToken);
        }
    }
}