using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class UserJourney
    {
        public int Id { set; get; }
        public string Title { set; get; }
        public string Description { set; get; }
        public Level Level { get; set; }
        public float Rating { get; set; }
        public int AverageDuration { get; set; }
        public List<UserSkill> Skills { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime DueDate { get; set; }
        public string Trainee { get; set; }
        public string Review { get; set; }
        public Journey JourneyRef { get; set; }
        public UserJourneyStatus Status { get; set; }
        public string Coach { get; set; }
    }
}