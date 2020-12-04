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
    [UserContextFilter]
    public class UserJourneyController : ApiController
    {
        private readonly IUserJourneyProvider _userJourneyProvider;

        public UserJourneyController()
        {
            _userJourneyProvider = NinjectCommon.Get<IUserJourneyProvider>();
        }

        [Route("api/userJourney/")]
        public List<UserJourney> Get()
        {
            return _userJourneyProvider.GetUserJourneys();
        }

        [Route("api/userJourney/{journeyId}")]
        public UserJourney Get(int journeyId)
        {
            return _userJourneyProvider.GetUserJourney(journeyId);
        }

        [Route("api/updateUserJourneyStatus/{newStatus}/{id}")]
        public HttpResponseMessage Put(string newStatus, int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, this._userJourneyProvider.UpdateStatus(id,newStatus));
        }

        [Route("api/userJourney/add")]
        public HttpResponseMessage Post([FromBody] UserJourney userJourney)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    this._userJourneyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK, this._userJourneyProvider.AddUserJourney(userJourney));
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

        [Route("api/userJourney/update/{id}")]
        public HttpResponseMessage Put(int id, [FromBody] UserJourney userJourney)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    this._userJourneyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    this._userJourneyProvider.UpdateUserJourney(id, userJourney);
                    return Request.CreateResponse(HttpStatusCode.OK, String.Format("User journey with id {0} was updated successfully!", id));
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

        [Route("api/userJourney/delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            _userJourneyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            return Request.CreateResponse(HttpStatusCode.OK, this._userJourneyProvider.DeleteUserJourney(id));
        }

        [HttpPost]
        [Route("api/userJourney/StartJouney/{id}")]
        public HttpResponseMessage StartJourney(int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _userJourneyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
                    return Request.CreateResponse(HttpStatusCode.OK,_userJourneyProvider.StartJourney(id));
                }

                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            catch (Exception exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, exception.Message);
            }
        }

        [HttpGet]
        [Route("api/userJourney/GetUserJourneys")]
        public List<UserJourney> GetJourneys()
        {
            _userJourneyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            return _userJourneyProvider.GetAllUserJourneys();
        }

    }
}