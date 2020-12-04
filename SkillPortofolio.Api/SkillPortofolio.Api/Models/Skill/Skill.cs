using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class Skill
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        public List<Skill> SubSkills { get; set; }
        public List<ActionPoint> ActionPoints { get; set; }
        public Level Level { get; set; }
    }
}