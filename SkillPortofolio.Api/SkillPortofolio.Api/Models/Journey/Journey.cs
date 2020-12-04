using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class Journey
    {
        public int Id { set; get; }
        public string Title { set; get; }
        public string Description { set; get; }
        public Level Level { get; set; }
        public float Rating { get; set; }
        public int AverageDuration { get; set; }
        public List<Skill> Skills { get; set; }
        public string Coach { get; set; }
    }
}