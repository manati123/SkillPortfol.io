using SkillPortofolio.Api.Filters;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Providers;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SkillPortofolio.Api.Controllers
{
    [RoutePrefix("api/ActionPoint")]
    [UserContextFilter]
    public class ActionPointController : ApiController
    {
        private readonly IActionPointProvider _actionPointProvider;

        public ActionPointController()
        {
            _actionPointProvider = NinjectCommon.Get<IActionPointProvider>();
        }

      
        [HttpPut]
        [Route("Update/{id}")]
        public HttpResponseMessage UpdateActionPoint(int id, [FromBody] ActionPoint actionPoint)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _actionPointProvider.UpdateActionPoint(id, actionPoint);
                    return Request.CreateResponse(HttpStatusCode.OK, "Successfully updated!");

                }
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpPost]
        [Route("Create")]
        public HttpResponseMessage CreateActionPoint([FromBody] ActionPoint actionPoint)
        {
            try
            {
                if (ModelState.IsValid)
            {
                actionPoint = _actionPointProvider.AddActionPoint(actionPoint);
                return Request.CreateResponse(HttpStatusCode.OK, actionPoint);

            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpGet]
        [Route("GetActionPoints")]
        public List<ActionPoint> GetActionPoints()
        {
            return _actionPointProvider.GetActionPoints();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public ActionPoint GetActionPoint(int id)
        {
            return _actionPointProvider.GetActionPoint(id);
        }
    }
}