using SkillPortofolio.Api.Filters;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Providers;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SkillPortofolio.Api.Controllers
{
    [RoutePrefix("api/Journey")]
    [UserContextFilter]
    public class JourneyController : ApiController
    {
        private readonly IJourneyProvider _journeyProvider;

        public JourneyController()
        {
            _journeyProvider = NinjectCommon.Get<IJourneyProvider>();
        }

        [HttpPut]
        [Route("Update/{id}")]
        public HttpResponseMessage UpdateJourney(int id, [FromBody] Journey journey)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _journeyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    _journeyProvider.UpdateJourney(id, journey);
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
        public HttpResponseMessage CreateJourney([FromBody] Journey journey)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _journeyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    journey = _journeyProvider.AddJourney(journey);
                    return Request.CreateResponse(HttpStatusCode.OK, journey);
                }

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpGet]
        [Route("GetJourneys")]
        public List<Journey> GetJourneys()
        {
            return _journeyProvider.GetAllJourneys();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public Journey GetJourney(int id)
        {
            return _journeyProvider.GetJourney(id);
        }

        [HttpDelete]
        [Route("Remove/{id}")]
        public bool RemoveJourney(int id)
        {
            _journeyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            return _journeyProvider.DeleteJourney(id);
        }

    }
}
