using SkillPortofolio.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SkillPortofolio.Api.Providers
{
    interface IActionPointProvider
    {
        ActionPoint AddActionPoint(ActionPoint actionPoint);
        void UpdateActionPoint(int id, ActionPoint actionPoint);
        List<ActionPoint> GetActionPoints();
        ActionPoint GetActionPoint(int id);

    }
}
