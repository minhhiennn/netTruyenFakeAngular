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
                        id = "00001",
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
                    }
                );
                context.Manga.AddRange(
                    new Manga
                    {
                        id = "00001",
                        lastUpdate = DateTime.Now,
                        detail = context.Detail.FirstOrDefault(detail => detail.MangaId.Equals("00001")),
                        chaps = context.Chap.Where(chap => chap.MangaId.Equals("00001")).ToList()
                    }
                );
                Console.WriteLine("asd");
                context.SaveChanges();
            }
        }
    }
}