using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MorfAr.Web.Models.Domain
{
    public class Item
    {
        public Item()
        {
            itemReviews = new List<Review>();
            itemTags = new List<string>();
        }

        public int itemId { get; set; }
        public string itemName { get; set; }
        public string itemUrlPhoto { get; set; }
        public IList<string> itemTags { get; set; }
        public IList<Review> itemReviews { get; set; }
        public int scoreAvg
        {
            get
            {
                return calculateReview();
            }
        }

        public Place place { get; set; }

        public int calculateReview()
        {
            int avg = 0;
            int sum = itemReviews.Sum(item => item.score);
            int count = itemReviews.Count();

            if (count == 0)
            {
                avg = 1;
            }
            else
            {
                avg = sum / count;
            }

            return avg;
        }
    }
}