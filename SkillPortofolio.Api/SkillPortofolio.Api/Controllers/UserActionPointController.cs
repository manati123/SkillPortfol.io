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
    public class UserActionPointController : ApiController
    {
        private IUserActionPointProvider _userActionPointProvider;

        public UserActionPointController()
        {
            _userActionPointProvider = NinjectCommon.Get<IUserActionPointProvider>();
        }

        public List<UserActionPoint> Get()
        {
            return _userActionPointProvider.GetUserActionPoints();
        }

     
        public UserActionPoint Get(int id)
        {
            return _userActionPointProvider.GetUserActionPoint(id);
        }
        public HttpResponseMessage Post([FromBody] UserActionPoint userActionPoint)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userActionPointProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, _userActionPointProvider.AddUserActionPoint(userActionPoint));
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

        public HttpResponseMessage Put(int id)
        {
            try
            {
                UserActionPoint userActionPoint = _userActionPointProvider.GetUserActionPoint(id);

                if (ModelState.IsValid)
                {
                    _userActionPointProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, _userActionPointProvider.UpdateUserActionPoint(id, userActionPoint));
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
