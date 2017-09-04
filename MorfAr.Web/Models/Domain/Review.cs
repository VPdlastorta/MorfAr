using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MorfAr.Web.Models.Domain
{
    public class Review
    {
        public int reviewId { get; set; }
        public int score { get; set; }
        public string  comment { get; set; }
    }
}