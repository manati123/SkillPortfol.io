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
    public class UserJourneyProvider : IUserJourneyProvider
    {
        private readonly IRepository _repo;
        private readonly IUserSkillProvider _userSkillProvider;
        private readonly IJourneyProvider _journeyProvider;
        private readonly IUserActionPointProvider _userActionPointProvider;

        public string Email { get; set; }

        public UserJourneyProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
            _userSkillProvider = NinjectCommon.Get<IUserSkillProvider>();
            _journeyProvider = NinjectCommon.Get<IJourneyProvider>();
            _userActionPointProvider = NinjectCommon.Get<IUserActionPointProvider>();
        }

        public string UpdateUserJourney(int id, UserJourney journey)
        {
            var userJourneysList = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.USER_JOURNEYS_LIST);
            ListItem updatedItem = userJourneysList.GetItemById(id);
            updatedItem = this.ConvertUserJourneyToListItem(journey);
            _repo.Update(id, updatedItem, ListNames.USER_JOURNEYS_LIST);
            return "Update succesful for user journey!";
        }


        public string DeleteUserJourney(int id)
        {
            var deleted = this._repo.Delete(id, ListNames.USER_JOURNEYS_LIST);
            if ((deleted))
                return "Delete worked!";
            else
                return "Delete did not work!";
        }

        public UserJourney AddUserJourney(UserJourney journey)
        {
            var userJourneyId = _repo.Add(this.ConvertUserJourneyToListItem(journey), ListNames.USER_JOURNEYS_LIST).Id;
            journey.Id = userJourneyId;
            return journey;
        }

        public UserJourney UpdateStatus(int id, string status)
        {
            ListItem updatedJourney = this._repo.GetById(id, ListNames.USER_JOURNEYS_LIST);
            updatedJourney[SiteColumnNames.JOURNEYSTATUS] = new UserJourneyStatus(status);

            updatedJourney.Update();
            _repo.Update(id, updatedJourney, ListNames.USER_JOURNEYS_LIST);
            return ConvertListItemToUserJourney(updatedJourney);
        }

        public string GetEmail()
        {
            return Email;
        }

        public UserJourney GetUserJourney(int id)
        {
            return ConvertListItemToUserJourney(this._repo.GetById(id, ListNames.USER_JOURNEYS_LIST));
        }

        private List<UserSkill> ConvertListItemsLookupValuesToUserSkills(FieldLookupValue[] fields)
        {
            return fields.Select((userSkill, index) => _userSkillProvider.GetUserSkill(userSkill.LookupId)).ToList();

        }

       
        public List<UserJourney> GetUserJourneys()
        {
            var result = new List<UserJourney>();
            ListItemCollection items = _repo.GetAll(ListNames.USER_JOURNEYS_LIST);
            foreach (ListItem item in items)
            {
                result.Add(ConvertListItemToUserJourney(item));
            }

            return result;
        }

        public void SetEmail(string email)
        {
            Email = email;
        }

        private UserJourney ConvertListItemToUserJourney(ListItem listItem)
        {
            var Id = listItem.Id;
            var Title = (string)listItem[SiteColumnNames.TITLE];
            string Description = (string)listItem[SiteColumnNames.DESCRIPTION];
            Enum.TryParse((string)listItem[SiteColumnNames.LEVEL], out Level Level);
            var Rating = Int32.Parse(listItem[SiteColumnNames.RATING].ToString());
            var AverageDuration = Int32.Parse(listItem[SiteColumnNames.AVERAGEDURATION].ToString());
            var Skills = ConvertListItemsLookupValuesToUserSkills(listItem[SiteColumnNames.USERSKILLS] as FieldLookupValue[]);
            DateTime.TryParse(listItem[SiteColumnNames.START_DATE].ToString(), out DateTime StartDate);
            DateTime.TryParse(listItem[SiteColumnNames.END_DATE].ToString(), out DateTime EndDate);
            DateTime.TryParse(listItem[SiteColumnNames.DUE_DATE].ToString(), out DateTime DueDate);
            var Trainee = listItem[SiteColumnNames.TRAINEE].ToString();
            var Review = listItem[SiteColumnNames.REVIEW].ToString();
            var journeyLookup = listItem[SiteColumnNames.JOURNEY_REF] as FieldLookupValue;
            Journey journeyRef = _journeyProvider.GetJourney(journeyLookup.LookupId);
            var Status = new UserJourneyStatus(listItem[SiteColumnNames.JOURNEYSTATUS].ToString());
            var Coach = (string)listItem[SiteColumnNames.COACH];
            return new UserJourney()
            {
                Id = Id,
                Title = Title,
                Description = Description,
                Level = Level,
                Rating = Rating,
                AverageDuration = AverageDuration,
                Skills = Skills,
                StartDate = StartDate,
                EndDate = EndDate,
                DueDate = DueDate,
                Trainee = Trainee,
                Review = Review,
                Status = Status,
                Coach = Coach, 
                JourneyRef = journeyRef
            };
        }

        private List<FieldLookupValue> GetLookupValuesUserSkills(UserJourney journey)
        {
            var lookupValuesUserSkills = new List<FieldLookupValue>();

            foreach (UserSkill element in journey.Skills)
            {
                lookupValuesUserSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            return lookupValuesUserSkills;
        }

        private ListItem ConvertUserJourneyToListItem(UserJourney journey)
        {
            var userJourneysList = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.USER_JOURNEYS_LIST);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = userJourneysList.AddItem(itemCreateInfo);
            var lookupValuesUserSkills = GetLookupValuesUserSkills(journey);
            newItem[SiteColumnNames.TITLE] = journey.Title;
            newItem[SiteColumnNames.DESCRIPTION] = journey.Description;
            newItem[SiteColumnNames.LEVEL] = journey.Level;
            newItem[SiteColumnNames.RATING] = journey.Rating;
            newItem[SiteColumnNames.START_DATE] = journey.StartDate;
            newItem[SiteColumnNames.END_DATE] = journey.EndDate;
            newItem[SiteColumnNames.DUE_DATE] = journey.DueDate;
            newItem[SiteColumnNames.TRAINEE] = journey.Trainee;
            newItem[SiteColumnNames.REVIEW] = journey.Review;
            newItem[SiteColumnNames.JOURNEY_REF] = journey.JourneyRef;
            newItem[SiteColumnNames.JOURNEYSTATUS] = journey.Status.Value;
            newItem[SiteColumnNames.AVERAGEDURATION] = journey.AverageDuration;
            newItem[SiteColumnNames.COACH] = journey.Coach;
            newItem.Update();
            return newItem;
        }

        public UserJourney StartJourney(int id)
        {
            _journeyProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            _userActionPointProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            _userSkillProvider.SetEmail((string)HttpContext.Current.Items["email"]);
            UserJourney userJourney = new UserJourney();
            Journey refJourney = _journeyProvider.GetJourney(id);
            userJourney.Title = refJourney.Title;
            userJourney.Description = refJourney.Description;
            userJourney.Level = refJourney.Level;
            userJourney.Rating = 0;
            userJourney.AverageDuration = refJourney.AverageDuration;
            userJourney.StartDate = DateTime.Now;
            userJourney.DueDate = DateTime.Now.AddYears(1);
            userJourney.Trainee = Email;
            userJourney.Review = "No review";
            userJourney.JourneyRef = refJourney;
            userJourney.Coach = refJourney.Coach;
            userJourney.Status = UserJourneyStatus.InProgress;
            userJourney.Skills = ConvertSkillsToUserSkills(refJourney.Skills);
            var userJourneyId = _repo.Add(ConvertToListItem(userJourney), ListNames.USER_JOURNEYS_LIST).Id;
            userJourney.Id = userJourneyId;
            return userJourney;
        }
        public List<UserJourney> GetAllUserJourneys()
        {
            return GetUserJourneys().Where((userJ) => userJ.Trainee.Equals(Email)).ToList();
        }

        private List<UserSkill> ConvertSkillsToUserSkills(List<Skill> skills)
        {
            var lookupValuesSkills = new List<UserSkill>();
            foreach(Skill skill in skills)
            {
                UserSkill userSkill = new UserSkill();
                var actionPoints = skill.ActionPoints;
                var subSkills = skill.SubSkills;
                var userActionPoints = new List<UserActionPoint>();
                foreach(ActionPoint ap in actionPoints){
                    var uAp = new UserActionPoint
                    {
                        Title = ap.Title,
                        Resources = ap.Resources,
                        Status = ItemStatus.InProgress,
                        Description = ap.Description
                    };

                    uAp = _userActionPointProvider.AddUserActionPoint(uAp);
                    userActionPoints.Add(uAp);
                }

                var userSkills = ConvertSkillsToUserSkills(subSkills);
                userSkill.Title = skill.Title;
                userSkill.Status = ItemStatus.InProgress;
                userSkill.Level = skill.Level;
                userSkill.SubSkills = userSkills;
                userSkill.ActionPoints = userActionPoints;
                userSkill.Description = skill.Description;
                userSkill.Id = _userSkillProvider.AddUserSkill(userSkill).Id;
                lookupValuesSkills.Add(userSkill);
            }

            return lookupValuesSkills;
        }


        private ListItem ConvertToListItem(UserJourney journey)
        {
            var userJourneysList = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.USER_JOURNEYS_LIST);
            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = userJourneysList.AddItem(itemCreateInfo);
            newItem[SiteColumnNames.TITLE] = journey.Title;
            newItem[SiteColumnNames.DESCRIPTION] = journey.Description;
            newItem[SiteColumnNames.LEVEL] = journey.Level;
            newItem[SiteColumnNames.RATING] = journey.Rating;
            newItem[SiteColumnNames.START_DATE] = journey.StartDate.ToString();
            newItem[SiteColumnNames.END_DATE] = journey.EndDate.ToString();
            newItem[SiteColumnNames.DUE_DATE] = journey.DueDate.ToString();
            newItem[SiteColumnNames.TRAINEE] = journey.Trainee;
            newItem[SiteColumnNames.REVIEW] = journey.Review;
            newItem[SiteColumnNames.JOURNEY_REF] = new FieldLookupValue { LookupId = journey.JourneyRef.Id };
            newItem[SiteColumnNames.JOURNEYSTATUS] = journey.Status.Value;
            newItem[SiteColumnNames.AVERAGEDURATION] = journey.AverageDuration;
            newItem[SiteColumnNames.COACH] = journey.Coach;
            var lookupValuesSkills = ConvertUserSkills(journey);
            newItem[SiteColumnNames.USERSKILLS] = lookupValuesSkills;
            newItem.Update();

            return newItem;
        }

        private static List<FieldLookupValue> ConvertUserSkills(UserJourney journey)
        {
            var lookupValuesSkills = new List<FieldLookupValue>();
            foreach (UserSkill element in journey.Skills)
            {
                lookupValuesSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            return lookupValuesSkills;
        }

    
    }
}