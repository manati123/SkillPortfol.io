using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Providers
{
    interface IUserSkillProvider
    {
        UserSkill AddUserSkill(UserSkill userSkill);
        string UpdateUserSkill(int id, UserSkill userSkill);
        List<UserSkill> GetUserSkills();
        UserSkill GetUserSkill(int id);
        void SetEmail(string email);
        string GetEmail();
    }
}
