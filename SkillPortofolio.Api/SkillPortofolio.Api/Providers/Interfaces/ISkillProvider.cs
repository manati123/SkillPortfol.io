using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace SkillPortofolio.Api.Providers
{
    interface ISkillProvider
    {
        Skill GetSkill(int id);
        IEnumerable<Skill> GetSkills();
        Skill AddSkill(Skill skill);
        void UpdateSkill(int id, Skill skill);
        void SetEmail(string email);
        string GetEmail();
    }
}
