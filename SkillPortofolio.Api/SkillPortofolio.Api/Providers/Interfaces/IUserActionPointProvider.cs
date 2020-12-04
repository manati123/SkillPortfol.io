using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Providers
{
    interface IUserActionPointProvider
    {
        UserActionPoint AddUserActionPoint(UserActionPoint userActionPoint);
        string UpdateUserActionPoint(int id,UserActionPoint userActionPoint);
        List<UserActionPoint> GetUserActionPoints();
        UserActionPoint GetUserActionPoint(int id);
        void SetEmail(string email);
        string GetEmail();
    }
}
