using Microsoft.SharePoint.Client;
using SkillPortofolio.Api.Models;
using System.Collections.Generic;

namespace SkillPortofolio.Api.Providers
{
    interface IJourneyProvider
    {
        Journey AddJourney(Journey journey);
        void UpdateJourney(int id, Journey journey);
        List<Journey> GetAllJourneys();
        Journey GetJourney(int id);
        bool DeleteJourney(int id);
        void SetEmail(string email);
        string GetEmail();
        ListItem ConvertJourneyToListItem(Journey journey, ListItem newItem);

    }
}
