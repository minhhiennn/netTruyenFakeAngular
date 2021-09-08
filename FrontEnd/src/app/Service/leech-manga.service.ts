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

  leechManga(page: number) {
    this.listTitle = [];
    this.listImgUrl = [];
    this.mangaService.leechManga().subscribe((data) => {
      let x = this.parser.parseFromString(data, "text/html");
      let x1 = x.body.getElementsByClassName('outsite ')[0].getElementsByClassName('main-content')[0].getElementsByTagName('div')[0].getElementsByTagName('nav')[0].getElementsByTagName('ul')[0].getElementsByTagName('li')[6];
      //link 228
      let x2: string = x1.getElementsByTagName('a')[0].href;
      let x3 = parseInt(x2.split('-')[4].split('.')[0]);
      this.addTitleImgUrlAndChap(page);
    })
  }
  addTitleImgUrlAndChap(i: number) {
    this.mangaService.getMangaByPage(i).subscribe((data) => {
      let y = this.parser.parseFromString(data, "text/html");
      let y1 = y.body.getElementsByClassName('outsite ')[0].getElementsByClassName('main-content')[0].getElementsByTagName('div')[0].getElementsByTagName('div')[2].getElementsByTagName('div')[0].getElementsByTagName('ul')[0].getElementsByTagName('li');
      for (let index = 0; index < y1.length; index++) {
        const title = y1[index].getElementsByTagName('div')[0].getElementsByTagName('a')[0].title;
        const imgSrc = y1[index].getElementsByTagName('div')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src;
        const chap = y1[index].getElementsByTagName('div')[0].getElementsByClassName('episode-book')[0].getElementsByTagName('a')[0].text;
        this.listTitle.push(title);
        this.listImgUrl.push(imgSrc);
        this.listfinalChap.push(chap);
      }
    })
  }
}
