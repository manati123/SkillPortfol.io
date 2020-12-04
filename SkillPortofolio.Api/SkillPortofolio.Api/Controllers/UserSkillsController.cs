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
    public class UserSkillsController : ApiController
    {
        private IUserSkillProvider _userSkillProvider;

        public UserSkillsController()
        {
            _userSkillProvider = NinjectCommon.Get<IUserSkillProvider>();

        }

        public List<UserSkill> Get()

        {
            return _userSkillProvider.GetUserSkills();
        }
        [HttpGet]
        [Route("api/UserSkills/{id}")]
        public UserSkill Get(int id)

        {
            return _userSkillProvider.GetUserSkill(id);
        }

        public HttpResponseMessage Post([FromBody] UserSkill userSkill)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userSkillProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, _userSkillProvider.AddUserSkill(userSkill));
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

        [HttpPut]
        [Route("api/UserSkills/{id}")]
        public HttpResponseMessage Put(int id)
        {
            try
            {
                UserSkill userSkill = _userSkillProvider.GetUserSkill(id);

                if (ModelState.IsValid)
                {
                    _userSkillProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, _userSkillProvider.UpdateUserSkill(id, userSkill));
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
