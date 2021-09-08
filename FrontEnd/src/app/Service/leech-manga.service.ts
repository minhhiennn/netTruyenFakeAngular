import { Injectable } from '@angular/core';
import { MangaService } from './manga.service';
@Injectable({
  providedIn: 'root'
})
export class LeechMangaService {
  parser = new DOMParser();
  listImgUrl: string[] = [];
  listTitle: string[] = [];
  listfinalChap: string[] = [];
  constructor(private mangaService: MangaService) { }

  leechManga(i: number) {
    this.listTitle = [];
    this.listImgUrl = [];
    this.listfinalChap = [];
    this.mangaService.getMangaByPage(i).subscribe((data) => {
      let y = this.parser.parseFromString(data, "text/html");
      let y1 = y.body.getElementsByClassName('outsite ')[0].getElementsByClassName('main-content')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[2].getElementsByTagName('div')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
      for (let index = 0; index < y1.length; index++) {
        const title = y1[index].getElementsByTagName('div')[0].getElementsByTagName('a')[0].title;
        const imgSrc = y1[index].getElementsByTagName('div')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src;
        const chap = y1[index].getElementsByTagName('div')[0].getElementsByClassName('episode-book')[0].getElementsByTagName('a')[0].text.split(' ')[2];
        this.listTitle.push(title);
        this.listImgUrl.push(imgSrc);
        this.listfinalChap.push(chap);
      }
    })
  }
}
