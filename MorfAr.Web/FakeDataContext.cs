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

            if (search == null)
            {
                result = items.Where(f => f.place.locationId == locationId);
            }
            else
            {
                result = items.Where(f => f.itemTags.Contains(search) && f.place.locationId == locationId);
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
            if (search == null)
            {
                search = string.Empty;
            }

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

}