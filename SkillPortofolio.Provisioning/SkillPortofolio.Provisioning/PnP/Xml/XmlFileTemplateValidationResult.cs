using System.Collections.Generic;

namespace SkillPortofolio.Provisioning.PnP.Xml
{
    public class XmlFileTemplateValidationResult
    {
        public XmlFileTemplateValidationResult()
        {
            this.Messages = new List<string>();
        }

        public bool IsValid { get; set; }

        public List<string> Messages { get; set; }
    }
}