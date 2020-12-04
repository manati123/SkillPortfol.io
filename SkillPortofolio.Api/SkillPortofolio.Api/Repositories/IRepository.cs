using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Repositories
{
    public interface IRepository
    {
        ListItemCollection GetAll(string listName);
        ListItem Add(ListItem entity, string listName);
        ListItem GetById(int id, string listName);
        void Update(int id,ListItem entity, string listName);
       // void Delete(ListItem entity, string listName);
        bool Delete(int id, string listName);
        ClientContext GetClientContext();
    }
}
