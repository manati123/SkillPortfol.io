using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Repositories
{
    interface IUserRepository
    {
        bool CheckUser(string email, string groupName);
    }
}
