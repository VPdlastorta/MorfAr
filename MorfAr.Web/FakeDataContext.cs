using System;
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
            BuildItems();
            BuildTags();
            BuildLocations();

        }

        private void BuildLocations()
        {
            locations = jsonCtx.GetLocations();
        }

        private void BuildTags()
        {
            tags = new List<ItemTag>();

            tags.Add(new ItemTag()
            {
                tagId = 4,
                tagName = "marisco",
                tagType = "comida"
            });

            tags.Add(new ItemTag()
            {
                tagId = 1,
                tagName = "cerveza ip",
                tagType = "beverage"
            });
        }

        private void BuildItems()
        {
            items = jsonCtx.GetItemsData();
            tags = jsonCtx.GetTagsData();
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

        public IList<ItemTag> GetItemsTag(string type)
        {
            var result = new List<ItemTag>();

            if (type == "all")
            {
                result = tags.ToList();
            }
            else
            {
                result = tags.Where(f => f.tagType == type).ToList();
            }

            return result;
        }

    }
}