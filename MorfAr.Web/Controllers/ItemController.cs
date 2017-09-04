using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MorfAr.Web.Models.Domain;

namespace MorfAr.Web.Controllers
{
    public class ItemController : ApiController
    {
        private readonly FakeDataContext dataCtx = null;

        public ItemController()
        {
            dataCtx = new FakeDataContext();
        }
        // GET: api/Item
        [HttpGet]
        [Route("api/Item")]
        public IList<Item> GetItem(string search, string location)
        {

            return dataCtx.GetItemsByFilter("", "");
        }

        [HttpGet]
        [Route("api/ItemTag")]
        public IList<ItemTag> GetItemTag(string type)
        {
            return dataCtx.GetItemsTag(type);
        }

        [HttpGet]
        [Route("api/Location")]
        public IList<Location> GetLocation()
        {
            return dataCtx.GetLocation();
        }

        // GET: api/Item/5
        [Route("api/Item/{id}")]
        public string Get(int id)
        {
            return "value";
        }
    }
}
