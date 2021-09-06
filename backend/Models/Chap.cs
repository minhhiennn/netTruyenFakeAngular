using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Chap
{



    [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity), Key()] public int id { get; set; }

    public int number { get; set; }

    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }
    public int views { get; set; }
    public int pageCount { get; set; }
    [ForeignKey("Manga")]
    public String MangaId { get; set; }


}