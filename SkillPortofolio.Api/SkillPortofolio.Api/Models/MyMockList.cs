using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SkillPortofolio.Api.Models
{
    public class MyMockList
    {
        public string Title { get; set; }

        public MyMockList(string title)
        {
            Title = title;
        }

        public MyMockList()
        {
        }
    }
}