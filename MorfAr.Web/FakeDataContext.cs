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
            items = new List<Item>();

            items.Add(new Item()
            {
                itemId = 1,
                itemName = "Empanada Verdeo",
                itemTags = new List<string>()
                {
                    "empanada",
                    "casera"
                },
                place = new Place()
                {
                    locationId = 1
                }
            });


            items.Add(new Item()
            {
                itemId = 1,
                itemName = "Fideos con Mariscos",
                itemTags = new List<string>()
                {
                    "pasta",
                    "casera"
                },
                place = new Place()
                {
                    locationId = 1
                }
            });

        }


        public IList<Item> GetItemsByFilter(string search, int locationId)
        {
            IEnumerable<Item> result = null;

            if (search == "")
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