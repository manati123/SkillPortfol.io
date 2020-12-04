using System;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;

namespace SkillPortofolio.Provisioning.PnP.Xml
{
    public class XmlFileTemplateValidator
    {
        public XmlFileTemplateValidationResult IsValid(XDocument xmlDocument)
        {
            if (xmlDocument == null)
            {
                throw new ArgumentNullException(nameof(xmlDocument));
            }

            var result = new XmlFileTemplateValidationResult();

            var schemas = new XmlSchemaSet();
            var referenceSchema = this.GetType()
                .Assembly
                .GetManifestResourceStream("SkillPortofolio.Provosioning.PnP.Xml.ProvisioningSchema-2018-05.xsd");
            if (referenceSchema != null)
            {
                referenceSchema.Seek(0, SeekOrigin.Begin);
                schemas.Add("http://schemas.dev.office.com/PnP/2018/05/ProvisioningSchema", new XmlTextReader(referenceSchema));
            }

            xmlDocument.Validate(schemas, (o, e) =>
            {
                result.Messages.Add(e.Message);
            });

            result.IsValid = result.Messages.Count == 0;

            return result;
        }
    }
}
