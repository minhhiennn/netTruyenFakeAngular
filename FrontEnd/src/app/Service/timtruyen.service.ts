import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimtruyenService {

  parser = new DOMParser();

  url = environment.baseUrl + ApiPaths.Timtruyen;

  constructor(private http: HttpClient) { }

  timTruyen(keyword: string, page: number) {

    return this.http.get(this.url + "/" + keyword + "/" + page, { responseType: 'text' }).pipe(
      map((data) => {
        let listObject: any[] = [];
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
          let obj = { title: title, img: imgUrl, view: countView, comment: countComment, heart: countHeart, listChap: listChap, listTimeUpdate: listTimeUpdate };
          listObject.push(obj);
        }
        return listObject;
      }));

  }

  timTruyenByPage(keyword: string) {

  }

}
