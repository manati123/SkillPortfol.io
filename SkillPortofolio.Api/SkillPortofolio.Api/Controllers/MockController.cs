using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Filters;
using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Description;
using System.Web;
using System.Web.Http;

namespace SkillPortofolio.Api.Controllers
{
    [UserContextFilter]
    public class MockController : ApiController
    {
        private string _accessToken;
        private string _currentUserEmail;
        private ClientContext _context;

        // GET: api/Mock
        public IEnumerable<MyMockList> Get()
        {
            this.InitializeContext();

            // The collection we will use to store and return 
            // all the records coming back from the SharePoint Online Custom List
            var response = new List<MyMockList>();

            // Create an object to access the SharePoint Online Custom List
            var myMockList =
                _context.Web.Lists.GetByTitle(
                    ConfigurationManager.AppSettings["ListTitle"]);

            // Create a new query to filter the list items. As we are looking to 
            // retrieve all items, you can leave the query blank
            var query = new CamlQuery();

            // Create an object to store the list items coming back from 
            // SharePoint Online and execute the query request
            var myMockListCollection = myMockList.GetItems(query);
            _context.Load(myMockListCollection);
            _context.ExecuteQuery();

            // Loop all list items coming back, and create a new object from our
            // model for each list item, so we can access and process them
            foreach (var item in myMockListCollection)
            {
                response.Add(
                    new MyMockList(
                        item["Title"].ToString()));
            }

            // Return the collection back to as the response 
            return response;
        }

        // GET: api/Mock/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Mock
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Mock/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Mock/5
        public void Delete(int id)
        {
        }

        private void InitializeContext()
        {
            _accessToken = (string)HttpContext.Current.Items["accessToken"];
            _currentUserEmail = (string)HttpContext.Current.Items["email"];

            _context = TokenHelper.GetClientContextWithAccessToken(
                new Uri(ConfigurationManager.AppSettings["WebUri"]).ToString(), _accessToken);
        }
    }


}
