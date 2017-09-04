﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MorfAr.Web.Models.Domain
{
    public class Item
    {
        public int itemId { get; set; }
        public string itemName { get; set; }

        public IList<string> itemTags { get; set; }
    }
}