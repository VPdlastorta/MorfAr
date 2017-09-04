using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MorfAr.Web.Models.Domain;

namespace MorfAr.Web
{
    public class FakeDataContext
    {
        public IList<Item> items { get; set; }
        public IList<ItemTag> tags { get; set; }
        public IList<Location> locations { get; set; }

        private LoadDataFromJson jsonCtx = null;

        public FakeDataContext()
        {
            jsonCtx = new LoadDataFromJson();
            items = jsonCtx.GetItemsData();
            tags = jsonCtx.GetTagsData();
            locations = jsonCtx.GetLocations();
        }

        
        public IList<Item> GetItemsByFilter(string search, int locationId)
        {
            IEnumerable<Item> result = null;

            var c = new OrdinalIgnoreCase();
            if (search == null)
            {
                result = items.Where(f => f.place.locationId == locationId);
            }
            else
            {
                result = items.Where(f => f.itemTags.Contains<string>(search, c) && f.place.locationId == locationId);
            }

            return result.OrderBy(f => f.scoreAvg).ToList();
        }

        public IList<Location> GetLocation()
        {
            var result = locations;

            return result;
        }

        public IList<ItemTag> GetItemsTag(string search, string type)
        {
            IEnumerable<ItemTag> result = null;

            result = tags.Where(f => f.tagName.IndexOf(search, StringComparison.OrdinalIgnoreCase) >= 0).ToList();

            if (type == "all")
            {
                result = result.ToList();
            }
            else
            {
                result = result.Where(f => f.tagType == type).ToList();
            }

            return result.ToList();
        }
    }

    public class OrdinalIgnoreCase : IEqualityComparer<string>
    {
        public bool Equals(string x, string y)
        {
            return string.Equals(x, y, StringComparison.OrdinalIgnoreCase);
        }

        public int GetHashCode(string obj)
        {
            int hash = 13;
            hash = (hash * 7) + obj.GetHashCode();
            return hash;
        }
    }

}