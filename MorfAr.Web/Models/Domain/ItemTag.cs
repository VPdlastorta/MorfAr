using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MorfAr.Web.Models.Domain
{
    public class ItemTag
    {
        public int tagId { get; set; }
        public string tagName { get; set; }
        public string tagType { get; set; }
    }
}