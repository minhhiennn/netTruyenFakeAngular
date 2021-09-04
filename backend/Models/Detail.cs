

using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Detail
{
    [Key]    
    public String id { get; set; }
    public string title { get; set; }
    public string author { get; set; }
    // [DataType(DataType.Date)]
    // public DateTime ReleaseDate { get; set; }
    public bool condition { get; set; }
    public String genre { get; set; }
    public string stars { get; set; }
    public int views { get; set; }
    public int follows { get; set; }
    public string summary { get; set; }
    [ForeignKey("Manga")]
    public String MangaId { get; set; }
}