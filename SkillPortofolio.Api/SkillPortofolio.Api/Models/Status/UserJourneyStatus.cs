using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class UserJourneyStatus
    {
        public UserJourneyStatus(string value) { Value = value; }
        public string Value { get; set; }
        public static UserJourneyStatus InProgress { get { return new UserJourneyStatus("In progress"); } }
        public static UserJourneyStatus Done { get { return new UserJourneyStatus("Done"); } }
        public static UserJourneyStatus Canceled { get { return new UserJourneyStatus("Canceled"); } }
    }
}