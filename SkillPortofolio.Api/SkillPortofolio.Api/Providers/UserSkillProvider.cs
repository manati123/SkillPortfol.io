using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Models;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Repositories;
using SkillPortofolio.Api.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SkillPortofolio.Api.Providers
{
    public class UserSkillProvider : IUserSkillProvider
    {
        private IRepository _repo;
        private IUserActionPointProvider _userActionPointProvider;
        public string Email { get; set; }

        public UserSkillProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
            _userActionPointProvider = NinjectCommon.Get<IUserActionPointProvider>();
        }


        public UserSkill AddUserSkill(UserSkill userSkill)
        {
            var userSkillId = _repo.Add(this.ConvertUserSkillToListItem(userSkill), ListNames.USER_SKILLS_LIST).Id;
            userSkill.Id = userSkillId;
            return userSkill;
        }

        public string UpdateUserSkill(int id, UserSkill userSkill)
        {
            userSkill.Status.Value = ItemStatus.Done.Value;
            _repo.Update(id, this.ConvertUserSkillToListItemUpdate(id, userSkill), ListNames.USER_SKILLS_LIST);
            return "Update succesful for user skill!";
        }

        public ListItem ConvertUserSkillToListItem(UserSkill userSkill)
        {
            var userSkillsList =
            _repo.GetClientContext().Web.Lists.GetByTitle(
                ListNames.USER_SKILLS_LIST);

            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = userSkillsList.AddItem(itemCreateInfo);

            var lookupValuesActionPoints = new List<FieldLookupValue>();
            foreach (UserActionPoint element in userSkill.ActionPoints)
            {
                lookupValuesActionPoints.Add(new FieldLookupValue { LookupId = element.Id });
            }

            var lookupValuesSubSkills = new List<FieldLookupValue>();
            foreach (UserSkill element in userSkill.SubSkills)
            {
                lookupValuesSubSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            newItem[SiteColumnNames.TITLE] = userSkill.Title;
            newItem[SiteColumnNames.DESCRIPTION] = userSkill.Description;
            newItem[SiteColumnNames.USERSUBSKILLS] = lookupValuesSubSkills;
            newItem[SiteColumnNames.USERACTIONPOINTS] = lookupValuesActionPoints;
            newItem[SiteColumnNames.LEVEL] = userSkill.Level;
            newItem[SiteColumnNames.STATUS] = userSkill.Status.Value;
            newItem[SiteColumnNames.TRAINEE] = Email;
            newItem.Update();

            return newItem;
        }

        private ListItem ConvertUserSkillToListItemUpdate(int id, UserSkill userSkill)
        {
            var list = _repo.GetClientContext().Web.Lists.GetByTitle(ListNames.USER_SKILLS_LIST);
            ListItem newItem = list.GetItemById(id);

            var lookupValuesActionPoints = new List<FieldLookupValue>();
            foreach (UserActionPoint element in userSkill.ActionPoints)
            {
                lookupValuesActionPoints.Add(new FieldLookupValue { LookupId = element.Id });
            }

            var lookupValuesSubSkills = new List<FieldLookupValue>();
            foreach (UserSkill element in userSkill.SubSkills)
            {
                lookupValuesSubSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            newItem[SiteColumnNames.TITLE] = userSkill.Title;
            newItem[SiteColumnNames.DESCRIPTION] = userSkill.Description;
            newItem[SiteColumnNames.USERSUBSKILLS] = lookupValuesSubSkills;
            newItem[SiteColumnNames.USERACTIONPOINTS] = lookupValuesActionPoints;
            newItem[SiteColumnNames.LEVEL] = userSkill.Level;
            newItem[SiteColumnNames.STATUS] = userSkill.Status.Value;
            newItem.Update();

            return newItem;
        }

        public UserSkill GetUserSkill(int id)
        {
            return this.ConvertListItemToUserSkill(_repo.GetById(id, ListNames.USER_SKILLS_LIST));
        }


        private List<UserSkill> ConvertListItemsToUserSkills(FieldLookupValue[] fields)
        {
            return fields.Select((subSkill, index) => this.GetUserSkill(subSkill.LookupId)).ToList();
        }

        private List<UserActionPoint> ConvertListItemsToUserActionPoints(FieldLookupValue[] fields)
        {
            return fields.Select((actionPoint, index) => _userActionPointProvider.GetUserActionPoint(actionPoint.LookupId)).ToList();
        }

        private UserSkill ConvertListItemToUserSkill(ListItem listItem)
        {
            return new UserSkill()
            {
                Id = listItem.Id,
                Title = (string)listItem[SiteColumnNames.TITLE],
                Description = (string)listItem[SiteColumnNames.DESCRIPTION],
                SubSkills = ConvertListItemsToUserSkills(listItem[SiteColumnNames.USERSUBSKILLS] as FieldLookupValue[]),
                ActionPoints = ConvertListItemsToUserActionPoints(listItem[SiteColumnNames.USERACTIONPOINTS] as FieldLookupValue[]),
                Level = (Level)Enum.Parse(typeof(Level), (string)listItem[SiteColumnNames.LEVEL]),
                Status = new ItemStatus(listItem[SiteColumnNames.STATUS].ToString())
            };

        }

        public List<UserSkill> GetUserSkills()
        {
            List<UserSkill> result = new List<UserSkill>();
            ListItemCollection items = _repo.GetAll(ListNames.USER_SKILLS_LIST);
            foreach (ListItem item in items)
            {
                result.Add(this.ConvertListItemToUserSkill(item));
            }
            return result;
        }

        public string GetEmail()
        {
            return Email;
        }

        public void SetEmail(string email)
        {
            Email = email;
        }

    }
}