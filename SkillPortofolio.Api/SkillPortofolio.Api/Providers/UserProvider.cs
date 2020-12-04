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
    public class UserProvider : IUserProvider
    {
        private IUserRepository _userRepository;

        public string Email { set; get; }

        public UserProvider()
        {
            _userRepository = NinjectCommon.Get<IUserRepository>();
        }

        public bool CheckUser(string groupName)
        {
            return _userRepository.CheckUser(Email, groupName);
        }

        public string GetEmail()
        {
            return this.Email;
        }

        public void SetEmail(string email)
        {
            Email = email;
        }
    }
}