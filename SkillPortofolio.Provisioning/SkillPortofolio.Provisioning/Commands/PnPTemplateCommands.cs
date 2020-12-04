using Microsoft.SharePoint.Client;
using OfficeDevPnP.Core.Framework.Provisioning.ObjectHandlers;
using SkillPortofolio.Provisioning.PnP.Xml;
using System;
using System.Collections.Generic;
using System.Security;

namespace SkillPortofolio.Provisioning.Commands
{
    public class PnPTemplateCommands
    {
        private const string TemplateFilename = "SkillPortofolioProvisioning.Global.xml";
        private const string TemplateFolder = "PnP\\Templates";

        public int Execute()
        {
            string templatesFolderPath = $"C:\\Users\\Silviu\\Documents\\FINAL_STAND\\finalProj\\Apollo11-SkillPortofol.io\\SkillPortofolio.Provisioning\\SkillPortofolio.Provisioning\\PnP\\Templates";
            SecureString securedPassword = GetSecurePassword();
            string username = "theon@accesadw.onmicrosoft.com";
            string siteUrl = "https://accesadw.sharepoint.com/sites/SilviuPreoteasa2020";

            List<OfficeDevPnP.Core.Framework.Provisioning.Model.ProvisioningTemplate> provisioningTemplates = new List<OfficeDevPnP.Core.Framework.Provisioning.Model.ProvisioningTemplate>();

            XmlFileTemplateProvider provider = new XmlFileTemplateProvider(templatesFolderPath);

            provisioningTemplates.AddRange(provider.GetTemplates(TemplateFilename));
            Console.WriteLine("Found {0} provisioning templates.", provisioningTemplates.Count);

            using (ClientContext context = new ClientContext(siteUrl)
            {
                Credentials = new SharePointOnlineCredentials(username: username, password: securedPassword)
            })
            {
                ProvisioningTemplateApplyingInformation applyingInformation = new ProvisioningTemplateApplyingInformation
                {
                    ProgressDelegate = (message, progress, total) =>
                    {
                        Console.WriteLine("{0:00}/{1:00} - {2}", progress, total, message);
                    },
                };

                foreach (OfficeDevPnP.Core.Framework.Provisioning.Model.ProvisioningTemplate provisioningTemplate in provisioningTemplates)
                {
                    Console.WriteLine("\nApplying template: {0}", provisioningTemplate.Id);
                    context.Web.ApplyProvisioningTemplate(provisioningTemplate, applyingInformation);
                }
            }

            return 0;
        }

        private static SecureString GetSecurePassword()
        {
            string password = "HadesUser0!";
            var securedPassword = new SecureString();

            foreach (char c in password.ToCharArray())
            {
                securedPassword.AppendChar(c);
            }

            return securedPassword;
        }
    }
}