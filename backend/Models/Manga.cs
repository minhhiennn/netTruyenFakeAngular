using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Manga
    {
        public int Id { get; set; }
        public string Title { get; set; }

        [DataType(DataType.Date)]
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; }
        
    }
}