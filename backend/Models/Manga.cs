using System;
using System.Collections.Generic;


namespace backend.Models
{
    public class Manga
    {
        public String id { get; set; }
        // [DataType(DataType.Date)]
        // public DateTime ReleaseDate { get; set; }
        public DateTime lastUpdate { get; set; }
        public Detail detail { get; set; }
        public List<Chap> chaps { get; set; }

    }
   

   
}