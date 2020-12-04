using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SkillPortofolio.Api.Utils;

namespace SkillPortofolio.Api.Models
{
    public class ItemStatus
    {
        private ItemStatus() { }
        public ItemStatus(string value) { Value = value; }
        public string Value { get; set; }
        public static ItemStatus InProgress { get { return new ItemStatus(StatusNames.InProgress); } }
        public static ItemStatus Done { get { return new ItemStatus(StatusNames.Done); } }
    }
}