using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MorfAr.Web.Models.Domain
{
    public class Place
    {
        public int placeId { get; set; }
        public string placeName { get; set; }
        public bool placeIsDelivery { get; set; }
        public bool placeIsTakeAway { get; set; }
        public string googleMapsUrl { get; set; }
        public int locationId { get; set; }
    }
}