import { Injectable } from '@angular/core';
import { MangaService } from './manga.service';
@Injectable({
  providedIn: 'root'
})
export class LeechMangaService {
  parser = new DOMParser();

  listTopComics: any = [];
  listNewUpdateComics: any = [];
  listaHref: string[] = [];
  constructor(private mangaService: MangaService) { }

  leechManga(i: number) {
    this.listTopComics = [];
    this.listNewUpdateComics = [];
    this.listaHref = [];
    this.mangaService.getMangaByPage(i).subscribe((data) => {
      let y = this.parser.parseFromString(data, "text/html");
      let y1 = y.body.getElementsByClassName('items')[0].getElementsByClassName('row')[0].getElementsByClassName('item');
      for (let index = 0; index < y1.length; index++) {
        let title = y1[index].getElementsByClassName('title')[0].innerHTML;
        let imgUrl = y1[index].getElementsByClassName('image')[0].getElementsByTagName('a')[0].getElementsByTagName('img')[0].dataset.original as string;
        // đây là lấy ra list chapter ở trang home chính (có 3 thằng chapter ở thằng home)
        let y2 = y1[index].getElementsByTagName('figcaption')[0].getElementsByClassName('chapter');
        let listChap = [] as any;
        let listTimeUpdate = [] as any;
        for (let i = 0; i < y2.length; i++) {
          listChap.push(y2[i].getElementsByTagName('a')[0].innerHTML);
          listTimeUpdate.push(y2[i].getElementsByTagName('i')[0].innerHTML);
        }
        //
        // đây là lấy ra list lượt xem lượt comment vs lượt tim
        let countView = y1[index].getElementsByClassName('image')[0].getElementsByClassName('pull-left')[0].textContent?.split('  ')[0].split(' ')[1];
        let countComment = y1[index].getElementsByClassName('image')[0].getElementsByClassName('pull-left')[0].textContent?.split('  ')[1];
        let countHeart = y1[index].getElementsByClassName('image')[0].getElementsByClassName('pull-left')[0].textContent?.split('  ')[2];
        this.listaHref.push(y1[index].getElementsByClassName('image')[0].getElementsByTagName('a')[0].href.split('//')[1].split('/')[2]);
        let obj = { title: title, img: imgUrl, view:countView,comment:countComment,heart:countHeart ,listChap: listChap, listTimeUpdate: listTimeUpdate };
        this.listNewUpdateComics.push(obj);
      }
      let listTopComics = y.body.getElementsByClassName('top-comics')[0].getElementsByClassName('item');
      for (let index = 0; index < listTopComics.length; index++) {
        let imgUrl = listTopComics[index].getElementsByTagName('a')[0].getElementsByTagName('img')[0].dataset.src as string;
        let nameComic = listTopComics[index].getElementsByClassName('slide-caption')[0].getElementsByTagName('h3')[0].getElementsByTagName('a')[0].innerHTML;
        let chap = listTopComics[index].getElementsByClassName('slide-caption')[0].getElementsByTagName('a')[1].innerHTML;
        let timeUpdate = listTopComics[index].getElementsByClassName('time')[0].textContent;
        let obj = { img: imgUrl, name: nameComic, chap: chap, timeUpdate: timeUpdate };
        this.listTopComics.push(obj);
      }
    })
  }
}
