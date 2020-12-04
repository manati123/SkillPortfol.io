using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Repositories;
using System;
using System.Collections.Generic;
using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Utils;

namespace SkillPortofolio.Api.Providers
{
    public class ActionPointProvider : IActionPointProvider
    {
        private readonly IRepository _repo;

        public ActionPointProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
        }

        public ActionPoint AddActionPoint(ActionPoint actionPoint)
        {
            var apList = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.ACTION_POINTS_LIST);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = apList.AddItem(itemCreateInfo);
            var actionPointId = _repo.Add(this.ConverAPToListItem(actionPoint, newItem), ListNames.ACTION_POINTS_LIST).Id;
            actionPoint.Id = actionPointId;
            return actionPoint;
        }

        public ActionPoint GetActionPoint(int id)
        {
            return this.ConvertListItemToAP(_repo.GetById(id, ListNames.ACTION_POINTS_LIST));
        }

        public List<ActionPoint> GetActionPoints()
        {
           ListItemCollection apS = _repo.GetAll(ListNames.ACTION_POINTS_LIST);
           var result = new List<ActionPoint>();
           foreach(var listItem in apS)
           {
                result.Add(this.ConvertListItemToAP(listItem));
           }
             return result;
        }

        public void UpdateActionPoint(int id, ActionPoint actionPoint)
        {
            var actionPoints = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.ACTION_POINTS_LIST);
            ListItem newItem = actionPoints.GetItemById(id);
            _repo.Update(id, this.ConverAPToListItem(actionPoint, newItem), ListNames.ACTION_POINTS_LIST);
        }

        private ListItem ConverAPToListItem(ActionPoint actionPoint, ListItem newItem)
        {
            newItem[SiteColumnNames.TITLE] = actionPoint.Title;
            newItem[SiteColumnNames.DESCRIPTION] = actionPoint.Description;
            newItem[SiteColumnNames.RESOURCES] = actionPoint.Resources;
            newItem.Update();
            return newItem;
        }


        private ActionPoint ConvertListItemToAP(ListItem item)
        {
            ActionPoint actionPoint = new ActionPoint
            {
                Id = item.Id,
                Title = (string)item[SiteColumnNames.TITLE],
                Resources = (string)item[SiteColumnNames.RESOURCES],
                Description = (string)item[SiteColumnNames.DESCRIPTION]
            };
            return actionPoint;
        }
    }
}