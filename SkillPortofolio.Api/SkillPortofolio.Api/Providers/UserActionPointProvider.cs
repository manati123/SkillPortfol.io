using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Repositories;
using SkillPortofolio.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Providers
{
    public class UserActionPointProvider : IUserActionPointProvider
    {
        private IRepository _repo;
        public string Email { get; set; }

        public UserActionPointProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
        }
        public string GetEmail()
        {
            return Email;
        }
        public void SetEmail(string email)
        {
            Email = email;
        }

        public UserActionPoint AddUserActionPoint(UserActionPoint userActionPoint)
        {
            var userActionPointId = _repo.Add(this.ConvertUserActionPointToListItem(userActionPoint), ListNames.USER_ACTION_POINTS_LIST).Id;
            userActionPoint.Id = userActionPointId;
            return userActionPoint;
        }

        public List<UserActionPoint> GetUserActionPoints()
        {
            ListItemCollection apS = _repo.GetAll(ListNames.USER_ACTION_POINTS_LIST);
            var result = new List<UserActionPoint>();
            foreach (var listItem in apS)
            {
                result.Add(this.ConvertListItemToUAP(listItem));
            }
            return result;
        }

        public string UpdateUserActionPoint(int id, UserActionPoint userActionPoint)
        {
            userActionPoint.Status.Value = ItemStatus.Done.Value;
           _repo.Update(id, this.ConvertUserActionPointToListItemUpdate(id,userActionPoint), ListNames.USER_ACTION_POINTS_LIST);
            return "Update succesful for user action point!";
        }

        private ListItem ConvertUserActionPointToListItemUpdate(int id,UserActionPoint userActionPoint)
        {
            var list =_repo.GetClientContext().Web.Lists.GetByTitle(ListNames.USER_ACTION_POINTS_LIST);

            ListItem newItem = list.GetItemById(id);
            newItem[SiteColumnNames.TITLE] = userActionPoint.Title;
            newItem[SiteColumnNames.DESCRIPTION] = userActionPoint.Description;
            newItem[SiteColumnNames.RESOURCES] = userActionPoint.Resources;
            newItem[SiteColumnNames.STATUS] = userActionPoint.Status.Value;
            newItem.Update();

            return newItem;
        }

        private ListItem ConvertUserActionPointToListItem(UserActionPoint userActionPoint)
        {
            var list =
           _repo.GetClientContext().Web.Lists.GetByTitle(
               ListNames.USER_ACTION_POINTS_LIST);

            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = list.AddItem(itemCreateInfo);
            newItem[SiteColumnNames.TITLE] = userActionPoint.Title;
            newItem[SiteColumnNames.DESCRIPTION] = userActionPoint.Description;
            newItem[SiteColumnNames.RESOURCES] = userActionPoint.Resources;
            newItem[SiteColumnNames.STATUS] = userActionPoint.Status.Value;
            newItem[SiteColumnNames.TRAINEE] = Email;
            newItem.Update();

            return newItem;
        }

        public UserActionPoint GetUserActionPoint(int id)
        {
            return this.ConvertListItemToUAP(_repo.GetById(id, ListNames.USER_ACTION_POINTS_LIST));
        }
        private UserActionPoint ConvertListItemToUAP(ListItem item)
        {
            UserActionPoint userActionPoint = new UserActionPoint
            {
                Id = item.Id,
                Title = (string)item[SiteColumnNames.TITLE],
                Resources = (string)item[SiteColumnNames.RESOURCES],
                Description = (string)item[SiteColumnNames.DESCRIPTION],
                Status= new ItemStatus(item[SiteColumnNames.STATUS].ToString())
            };
            return userActionPoint;
        }
    }
}