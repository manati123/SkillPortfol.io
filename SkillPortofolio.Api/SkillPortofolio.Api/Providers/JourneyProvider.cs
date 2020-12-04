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
    public class JourneyProvider : IJourneyProvider
    {
        private readonly IRepository _repo;
        private readonly ISkillProvider _skillProvider;
        public string Email { get; set; }

        public JourneyProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
            _skillProvider = NinjectCommon.Get<ISkillProvider>();
        }
        public string GetEmail()
        {
            return this.Email;
        }

        public void SetEmail(string email)
        {
            Email = email;
        }

        public Journey AddJourney(Journey journey)
        {
            var journeysList =_repo.GetClientContext().Web.Lists.GetByTitle(ListNames.JOURNEYS_LIST);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = journeysList.AddItem(itemCreateInfo);
            var journeyId = _repo.Add(this.ConvertJourneyToListItem(journey, newItem), ListNames.JOURNEYS_LIST).Id;
            journey.Id = journeyId;
            return journey;
        }

        public bool DeleteJourney(int id)
        {
            return _repo.Delete(id, ListNames.JOURNEYS_LIST);
        }

        public List<Journey> GetAllJourneys()
        {
            List<Journey> result = new List<Journey>();
            ListItemCollection items = _repo.GetAll(ListNames.JOURNEYS_LIST);
            foreach (ListItem item in items)
            {
                result.Add(this.ConvertListItemToJourney(item));
            }

            return result;
        }

        public Journey GetJourney(int id)
        {
            return this.ConvertListItemToJourney(_repo.GetById(id, ListNames.JOURNEYS_LIST));
        }

        public void UpdateJourney(int id, Journey journey)
        {
            var journeysList = _repo.GetClientContext().Web.Lists.GetByTitle(
               ListNames.JOURNEYS_LIST);
            ListItem newItem = journeysList.GetItemById(id);
            _repo.Update(id, this.ConvertJourneyToListItem(journey, newItem), ListNames.JOURNEYS_LIST);
        }


        public ListItem ConvertJourneyToListItem(Journey journey, ListItem newItem)
        {
            List<FieldLookupValue> lookupValuesSkills = ConvertSkills(journey);
            newItem[SiteColumnNames.TITLE] = journey.Title;
            newItem[SiteColumnNames.DESCRIPTION] = journey.Description;
            newItem[SiteColumnNames.SKILLS] = lookupValuesSkills;
            newItem[SiteColumnNames.LEVEL] = journey.Level;
            newItem[SiteColumnNames.AVERAGEDURATION] = journey.AverageDuration;
            newItem[SiteColumnNames.COACH] = Email;
            newItem[SiteColumnNames.RATING] = journey.Rating;
            newItem.Update();

            return newItem;
        }

        private Journey ConvertListItemToJourney(ListItem listItem)
        {
            return new Journey()
            {
                Id = listItem.Id,
                Title = (string)listItem[SiteColumnNames.TITLE],
                Description = (string)listItem[SiteColumnNames.DESCRIPTION],
                Skills = ConvertListItemsToSkills(listItem[SiteColumnNames.SKILLS] as FieldLookupValue[]),
                Level = (Level)Enum.Parse(typeof(Level), (string)listItem[SiteColumnNames.LEVEL]),
                AverageDuration = Convert.ToInt32(listItem[SiteColumnNames.AVERAGEDURATION]),
                Coach = (string)listItem[SiteColumnNames.COACH],
                Rating = Convert.ToSingle(listItem[SiteColumnNames.RATING])
            };
        }

        private static List<FieldLookupValue> ConvertSkills(Journey journey)
        {
            var lookupValuesSkills = new List<FieldLookupValue>();
            foreach (Skill element in journey.Skills)
            {
                lookupValuesSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            return lookupValuesSkills;
        }

        private List<Skill> ConvertListItemsToSkills(FieldLookupValue[] fields)
        {
            return fields.Select((skill, index) => _skillProvider.GetSkill(skill.LookupId)).ToList();
        }

    
    }
}