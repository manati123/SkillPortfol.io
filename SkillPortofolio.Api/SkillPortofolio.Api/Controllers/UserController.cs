using SkillPortofolio.Api.Filters;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SkillPortofolio.Api.Controllers
{
    [UserContextFilter]
    public class UserController : ApiController
    {
        private IUserProvider _userProvider;

        public UserController()
        {
            _userProvider = NinjectCommon.Get<IUserProvider>();
        }

        // GET api/{GroupName}
        [HttpGet]
        public HttpResponseMessage Get([FromUri] string GroupName)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK,
                    new GroupMembershipResponse
                    {
                        IsInGroup = _userProvider.CheckUser(GroupName)
                    });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}