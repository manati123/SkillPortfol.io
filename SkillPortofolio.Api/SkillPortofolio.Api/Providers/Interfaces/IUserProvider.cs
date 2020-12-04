using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Providers
{
    public interface IUserProvider
    {
        bool CheckUser(string groupName);
        void SetEmail(string email);
        string GetEmail();
    }
}