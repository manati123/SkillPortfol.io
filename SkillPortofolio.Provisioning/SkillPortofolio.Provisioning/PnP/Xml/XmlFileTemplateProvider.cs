using OfficeDevPnP.Core.Framework.Provisioning.Connectors;
using OfficeDevPnP.Core.Framework.Provisioning.Providers.Xml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace SkillPortofolio.Provisioning.PnP.Xml
{
    public sealed class XmlFileTemplateProvider : XMLTemplateProvider
    {

        private readonly XmlFileTemplateValidator templateValidator;
        private static XNamespace PnpXmlNamespace { get; set; } = "http://schemas.dev.office.com/PnP/2018/05/ProvisioningSchema";

        public XmlFileTemplateProvider(string folderPath)
        {
            this.Connector = new FileSystemConnector(folderPath, string.Empty);

            this.templateValidator = new XmlFileTemplateValidator();
        }

        public List<OfficeDevPnP.Core.Framework.Provisioning.Model.ProvisioningTemplate> GetTemplates(string uri)
        {
            var results = new List<OfficeDevPnP.Core.Framework.Provisioning.Model.ProvisioningTemplate>();

            var fileStream = this.Connector.GetFileStream(uri);

            var sourceStream = new MemoryStream();
            fileStream.CopyTo(sourceStream);
            sourceStream.Position = 0;

            var xmlDocument = XDocument.Load(sourceStream);

            if (xmlDocument.Root == null)
            {
                return results;
            }

            var validationResult = this.templateValidator.IsValid(xmlDocument);
            if (!validationResult.IsValid)
            {
                Console.WriteLine("The provided template is not valid!");
                foreach (var message in validationResult.Messages)
                {
                    Console.WriteLine("Validation message: {0}", message);
                }

                return results;
            }

            if (xmlDocument.Root.Name != PnpXmlNamespace + "Provisioning")
            {
                return results;
            }

            Provisioning provisioning;
            var xmlSerializer = new XmlSerializer(typeof(Provisioning));
            using (var reader = xmlDocument.Root.CreateReader())
            {
                provisioning = xmlSerializer.Deserialize(reader) as Provisioning;
            }

            if (provisioning?.Templates == null)
            {
                return results;
            }

            foreach (var template in provisioning.Templates)
            {
                foreach (var provisioningTemplateFile in template.ProvisioningTemplateFile)
                {
                    var templateXml = this.GetTemplate(provisioningTemplateFile.File);
                    templateXml.Connector = this.Connector;
                    results.Add(templateXml);
                }
            }

            return results;
        }
    }
}
