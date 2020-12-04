using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Filters;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Utils;
using SkillPortofolio.Api.Providers;
using System.Web.Http.Cors;

namespace SkillPortofolio.Api.Controllers
{
    [UserContextFilter]
    public class SkillsController : ApiController
    {
        private ISkillProvider _skillProvider;
        
        public SkillsController()
        {
            _skillProvider = NinjectCommon.Get<ISkillProvider>();
        }

        public IEnumerable<Skill> Get()

        {
            return _skillProvider.GetSkills();
        }

        public Skill Get(int id)

        {
            return _skillProvider.GetSkill(id);
        }
        public HttpResponseMessage Post([FromBody]Skill skill)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _skillProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, _skillProvider.AddSkill(skill));
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError, ModelState);
                }
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        // PUT api/skills/5
        public HttpResponseMessage Put(int id, [FromBody]Skill skill)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _skillProvider.UpdateSkill(id, skill);
                    return Request.CreateResponse(HttpStatusCode.OK, String.Format("Skill with id ${0} was updated successfully!", id));
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

        // DELETE api/skills/5
        public void Delete(int id)
        {
        }
    }
}