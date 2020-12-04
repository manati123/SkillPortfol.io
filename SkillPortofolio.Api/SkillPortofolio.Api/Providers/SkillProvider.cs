using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SkillPortofolio.Api.Repositories;
using SkillPortofolio.Api.Models;
using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Ninject;
using SkillPortofolio.Api.Utils;

namespace SkillPortofolio.Api.Providers
{
    public class SkillProvider : ISkillProvider
    {

        private readonly IRepository _repo;
        private readonly IActionPointProvider _actionPointProvider;
        public string Email { get; set; }

        public SkillProvider()
        {
            _repo = NinjectCommon.Get<IRepository>();
            _actionPointProvider = NinjectCommon.Get<IActionPointProvider>();
        }

        public Skill GetSkill(int id)
        {
            return this.ConvertListItemToSkill(_repo.GetById(id, ListNames.SKILLS_LIST));
        }

        public IEnumerable<Skill> GetSkills()
        {
            List<Skill> result = new List<Skill>();
            ListItemCollection items = _repo.GetAll(ListNames.SKILLS_LIST);
            foreach (ListItem item in items)
            {
                result.Add(this.ConvertListItemToSkill(item));
            }
            return result;
        }

        public Skill AddSkill(Skill skill)
        {
            var skillsList =
            _repo.GetClientContext().Web.Lists.GetByTitle(
                ListNames.SKILLS_LIST);

            ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
            ListItem newItem = skillsList.AddItem(itemCreateInfo);
            var skillId = _repo.Add(this.ConvertSkillToListItem(skill, newItem), ListNames.SKILLS_LIST).Id;
            skill.Id = skillId;
            return skill;
        }

        public void UpdateSkill(int id, Skill skill)
        {
            var skillsList =
            _repo.GetClientContext().Web.Lists.GetByTitle(
                ListNames.SKILLS_LIST);

            ListItem newItem = skillsList.GetItemById(id);
            _repo.Update(id, this.ConvertSkillToListItem(skill, newItem), ListNames.SKILLS_LIST);
        }

        public string GetEmail()
        {
            return this.Email;
        }

        public void SetEmail(string email)
        {
            Email = email;
        }

        private Skill ConvertListItemToSkill(ListItem listItem)
        {
            return new Skill()
            {
                Id = listItem.Id,
                Title = (string)listItem[SiteColumnNames.TITLE],
                Description = (string)listItem[SiteColumnNames.DESCRIPTION],
                SubSkills = ConvertListItemsToSkills(listItem[SiteColumnNames.SUBSKILLS] as FieldLookupValue[]),
                ActionPoints = ConvertListItemsToActionPoints(listItem[SiteColumnNames.ACTIONPOINTS] as FieldLookupValue[]),
                Level = (Level)Enum.Parse(typeof(Level), (string)listItem[SiteColumnNames.LEVEL])
            };
        }

        private ListItem ConvertSkillToListItem(Skill skill, ListItem newItem)
        {
            var lookupValuesActionPoints = new List<FieldLookupValue>();
            foreach (ActionPoint element in skill.ActionPoints)
            {
                lookupValuesActionPoints.Add(new FieldLookupValue { LookupId = element.Id });
            }

            var lookupValuesSubSkills = new List<FieldLookupValue>();
            foreach (Skill element in skill.SubSkills)
            {
                lookupValuesSubSkills.Add(new FieldLookupValue { LookupId = element.Id });
            }

            newItem[SiteColumnNames.TITLE] = skill.Title;
            newItem[SiteColumnNames.DESCRIPTION] = skill.Description;
            newItem[SiteColumnNames.SUBSKILLS] = lookupValuesSubSkills;
            newItem[SiteColumnNames.ACTIONPOINTS] = lookupValuesActionPoints;
            newItem[SiteColumnNames.LEVEL] = skill.Level;
            newItem.Update();

            return newItem;
        }

        private List<ActionPoint> ConvertListItemsToActionPoints(FieldLookupValue[] fields)
        {
            return fields.Select((actionPoint, index) => _actionPointProvider.GetActionPoint(actionPoint.LookupId)).ToList();
        }

        private List<Skill> ConvertListItemsToSkills(FieldLookupValue[] fields)
        {
            return fields.Select((subSkill, index) => this.GetSkill(subSkill.LookupId)).ToList();
        }
 
    }
}