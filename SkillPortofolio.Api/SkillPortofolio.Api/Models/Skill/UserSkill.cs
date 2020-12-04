using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class UserSkill
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<UserSkill> SubSkills { get; set; }
        public List<UserActionPoint> ActionPoints { get; set; }
        public Level Level { get; set; }
        public ItemStatus Status { get; set; }
    }
}