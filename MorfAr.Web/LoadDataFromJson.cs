using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using MorfAr.Web.Models.Domain;
using Newtonsoft.Json;

namespace MorfAr.Web
{
    public class LoadDataFromJson
    {
        public IList<Item> Items;
        public IList<ItemTag> ItemTags;
        public IList<Location> Locations { get; set; }

        public IList<Item> GetItemsData()
        {
            var currentPath = HttpContext.Current.Server.MapPath("~/");

            using (StreamReader r = new StreamReader(Path.Combine(currentPath, "Jsons\\Items.json")))
            {
                string json = r.ReadToEnd();
                Items = JsonConvert.DeserializeObject<List<Item>>(json);
            }
            return Items;
        }

        public IList<ItemTag> GetTagsData()
        {
            var currentPath = HttpContext.Current.Server.MapPath("~/");

            using (StreamReader r = new StreamReader(Path.Combine(currentPath, "Jsons\\Tags.json")))
            {
                string json = r.ReadToEnd();
                ItemTags = JsonConvert.DeserializeObject<List<ItemTag>>(json);
            }
            return ItemTags;
        }

        public IList<Location> GetLocations()
        {
            var currentPath = HttpContext.Current.Server.MapPath("~/");

            using (StreamReader r = new StreamReader(Path.Combine(currentPath, "Jsons\\Locations.json")))
            {
                string json = r.ReadToEnd();
                Locations = JsonConvert.DeserializeObject<List<Location>>(json);
            }
            return Locations;
        }

        
    }
}