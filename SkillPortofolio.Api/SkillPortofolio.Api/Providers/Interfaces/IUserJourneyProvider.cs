using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Providers
{
    interface IUserJourneyProvider
    {
        UserJourney GetUserJourney(int id);
        List<UserJourney> GetUserJourneys();
        UserJourney AddUserJourney(UserJourney journey);
        UserJourney UpdateStatus(int id, string status);
        UserJourney StartJourney(int id);

        List<UserJourney> GetAllUserJourneys();
        string UpdateUserJourney(int id, UserJourney journey);
        string DeleteUserJourney(int id);
        void SetEmail(string email);
        string GetEmail();
    }
}
