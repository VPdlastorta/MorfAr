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


        public FakeDataContext()
        {
            BuildItems();
            BuildTags();
            BuildLocations();

        }

        private void BuildLocations()
        {
            locations = new List<Location>();

            locations.Add(new Location()
            {
                locationId = 1,
                locationName = "Rosario, Sta Fe"
            });
            locations.Add(new Location()
            {
                locationId = 2,
                locationName = "CABA, Bs As"
            });

        }

        private void BuildTags()
        {
            tags = new List<ItemTag>();

            tags.Add(new ItemTag()
            {
                tagId = 4,
                tagName = "marisco",
                tagType = "comidad"
            });
        }

        private void BuildItems()
        {
            items = new List<Item>();

            items.Add(new Item()
            {
                itemId = 1,
                itemName = "Empanada Verdeo",
            });

            items.Add(new Item()
            {
                itemId = 2,
                itemName = "Fideos con Mariscos"
            });

        }


        public IList<Item> GetItemsByFilter(string search, string localtion)
        {
            var result = items;

            return result;
        }

        public IList<Location> GetLocation()
        {
            var result = locations;

            return result;
        }

        public IList<ItemTag> GetItemsTag(string type)
        {
            var result = tags;

            return result;
        }

    }
}