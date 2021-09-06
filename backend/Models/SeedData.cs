using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using backend.Data;
using System;
using System.Linq;
using System.Collections.Generic;

namespace backend.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<ApplicationDbContext>>()))
            {
                // Look for any Mangas.
                if (context.Manga.Any() && context.Chap.Any() && context.Detail.Any())
                {
                    return;
                }
                context.Chap.AddRange(
                    new Chap
                    {
                        number = 97,
                        ReleaseDate = DateTime.Now,
                        views = 0,
                        pageCount = 108,
                        MangaId = "00001"
                    }
                );
                context.Detail.AddRange(
                    new Detail
                    {
                        id = "00001",
                        title = "Bắc Kiếm Giang Hồ-Legend of the Northern Blade",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00001"
                    },
                    new Detail
                    {
                        id = "00002",
                        title = "Tu La Võ Thần",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00002"
                    },
                    new Detail
                    {
                        id = "00003",
                        title = "Ta có chín nữ đồ đệ",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00003"
                    },
                    new Detail
                    {
                        id = "00004",
                        title = "Thể thao cực hạn",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00004"
                    }, 
                    new Detail
                    {
                        id = "00005",
                        title = "Tôn Thượng",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00005"
                    },
                    new Detail
                    {
                        id = "00006",
                        title = "Toàn chức pháp sư",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00006"
                    },
                    new Detail
                    {
                        id = "00007",
                        title = "Độc y đích nữ",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00007"
                    },
                    new Detail
                    {
                        id = "00008",
                        title = "Đại Vương Tha Mạng",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00008"
                    },
                    new Detail
                    {
                        id = "00009",
                        title = "Blue Box",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00009"
                    },
                    new Detail
                    {
                        id = "00010",
                        title = "Thiện Lương Tử Thần",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00010"
                    },
                    new Detail
                    {
                        id = "00011",
                        title = "Thế giới Hoàn Mỹ",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00011"
                    },new Detail
                    {
                        id = "00012",
                        title = "Câu lạc bộ trường sinh",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00012"
                    }, new Detail
                    {
                        id = "00013",
                        title = "Câu lạc bộ trường sinh",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00013"
                    }, new Detail
                    {
                        id = "00014",
                        title = "Câu lạc bộ trường sinh",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00014"
                    }, new Detail
                    {
                        id = "00015",
                        title = "Câu lạc bộ trường sinh",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00015"
                    }, new Detail
                    {
                        id = "00016",
                        title = "Câu lạc bộ trường sinh",
                        author = "",
                        condition = false,
                        genre = "Action-Adventure-Cultivation-Fantasy-Manhwa-Martial Arts",
                        stars = "0-0-0-0-0",
                        views = 0,
                        follows = 0,
                        summary = "",
                        MangaId = "00016"
                    }
                );
                context.Manga.AddRange(
                    new Manga
                    {
                        id = "00001",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00001")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00001")).ToList()
                    },
                    new Manga
                    {
                        id = "00002",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00002")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00002")).ToList()
                    },
                    new Manga
                    {
                        id = "00003",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00003")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00003")).ToList()
                    },
                    new Manga
                    {
                        id = "00004",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00004")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00004")).ToList()
                    },
                    new Manga
                    {
                        id = "00005",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00005")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00005")).ToList()
                    },
                    new Manga
                    {
                        id = "00006",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00006")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00006")).ToList()
                    },
                    new Manga
                    {
                        id = "00007",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00007")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00007")).ToList()
                    },
                    new Manga
                    {
                        id = "00008",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00008")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00008")).ToList()
                    },
                    new Manga
                    {
                        id = "00009",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00009")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00009")).ToList()
                    },new Manga
                    {
                        id = "00010",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00010")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00010")).ToList()
                    },new Manga
                    {
                        id = "00011",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00011")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00011")).ToList()
                    },new Manga
                    {
                        id = "00012",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00012")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("000012")).ToList()
                    }, new Manga
                    {
                        id = "00013",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00013")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00012")).ToList()
                    }, new Manga
                    {
                        id = "00014",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00014")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00014")).ToList()
                    }, new Manga
                    {
                        id = "00015",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00015")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00015")).ToList()
                    }, new Manga
                    {
                        id = "00016",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00016")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00016")).ToList()
                    }
                );
                Console.WriteLine("asd");
                context.SaveChanges();
            }
        }
    }
}