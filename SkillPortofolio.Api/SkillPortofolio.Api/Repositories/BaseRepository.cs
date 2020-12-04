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
    public class BaseRepository : IRepository
    {
        private ClientContext _context;

        public BaseRepository()
        {
            this.InitializeContext();
        }

        public ListItem Add(ListItem entity, string listName)
        {
            var skillsList =
                _context.Web.Lists.GetByTitle(listName);
        
            var list = _context.Web.Lists.GetByTitle(listName);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = list.AddItem(itemCreateInfo);
            newItem = entity;
            newItem.Update();
            _context.ExecuteQuery();
            return newItem;
        }

        public ClientContext GetClientContext()

        {
            return this._context;
        }

        public ListItemCollection GetAll(string listName)
        {
            List itemsList = _context.Web.Lists.GetByTitle(listName);
            CamlQuery query = CamlQuery.CreateAllItemsQuery();
            ListItemCollection items = itemsList.GetItems(query);
            _context.Load(items);
            _context.ExecuteQuery();
            return items;
        }

        public ListItem GetById(int id, string listName)
        {
            var list = _context.Web.Lists.GetByTitle(listName);
            ListItem itemById = list.GetItemById(id);
            _context.Load(itemById);
            _context.ExecuteQuery();
            return itemById;
        }

        public void Update(int id, ListItem entity, string listName)
        {
            ListItem updatedItem = this.GetById(id, listName);
            updatedItem = entity;
            updatedItem.Update();
            _context.Load(updatedItem);
            _context.ExecuteQuery();
        }

        public bool Delete(int id, string listName)
        {
            List list = _context.Web.Lists.GetByTitle(listName);
            ListItem listItem = list.GetItemById(id);
            if (listItem != null)
            {
                listItem.DeleteObject();
                _context.ExecuteQuery();
                return true;
            }
            return false;
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