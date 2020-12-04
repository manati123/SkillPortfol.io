using SkillPortofolio.Provisioning.Commands;
using System;

namespace SkillPortofolio.Provisioning
{
    class Program
    {
        static void Main(string[] args)
        {
            var command = new PnPTemplateCommands();

            try
            {
                command.Execute();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Console.ReadLine();
            }
        }
    }
}
