using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using MorfAr.Web.Models.Domain;
using Newtonsoft.Json;

namespace MorfAr.Web
{
    public class FakeDataFromJson
    {
        public IList<Item> Items;
        public IList<ItemTag> ItemTags;

        public IList<Item> GetItemsData()
        {
            using (StreamReader r = new StreamReader("C:\\Projects\\MorfAr\\MorfAr.Web\\Jsons\\Items.json"))
            {
                string json = r.ReadToEnd();
                Items = JsonConvert.DeserializeObject<List<Item>>(json);
            }
            return Items;
        }

        public IList<ItemTag> GetTagsData()
        {
            using (StreamReader r = new StreamReader("C:\\Projects\\MorfAr\\MorfAr.Web\\Jsons\\Jsons\\Tags.json"))
            {
                string json = r.ReadToEnd();
                ItemTags = JsonConvert.DeserializeObject<List<ItemTag>>(json);
            }
            return ItemTags;
        }
    }
}