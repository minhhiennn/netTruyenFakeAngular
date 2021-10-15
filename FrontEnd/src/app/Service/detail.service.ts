import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  url = environment.baseUrl + ApiPaths.Detail;

  url2 = environment.baseUrl + ApiPaths.Chap;
  constructor(private http: HttpClient) { }
  
  getDetailsLeechManga(nameAndId: string) {
    return this.http.get(`${this.url}/${nameAndId}`, { responseType: 'text' }).pipe(
      map((data) => {
        let parser = new DOMParser();
        let x = parser.parseFromString(data, "text/html");
        const imgURL = x.body.getElementsByClassName('col-image')[0].getElementsByTagName('img')[0].src;
        const name = x.body.getElementsByClassName('title-detail')[0].textContent;
        const detailsManga = x.body.getElementsByClassName('detail-content')[0].getElementsByTagName('p')[0].textContent as string;
        // thằng y là thằng giữ list chap vs list update
        let y = x.body.getElementsByClassName('list-chapter')[0];
        let childOfy = y.getElementsByClassName('row');
        let listLinkHref: any = [];
        let listChap: any = [];
        let listUpdateChap: any = [];
        let listViewChap: any = [];
        for (let i = 1; i < childOfy.length; i++) {
          let z1 = childOfy[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].href;
          let z2 = childOfy[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].textContent as string;
          let z3 = childOfy[i].getElementsByTagName('div')[1].textContent as string;
          let z4 = childOfy[i].getElementsByTagName('div')[2].textContent as string;
          listLinkHref.push(z1.split('//')[1].substring(z1.split('//')[1].indexOf('/')));
          listChap.push(z2);
          listUpdateChap.push(z3);
          listViewChap.push(z4);
        }
        const obj: any = { img: imgURL, name: name, detailsManga: detailsManga, listLinkHref: listLinkHref, listChap: listChap, listUpdateChap: listUpdateChap, listViewChap: listViewChap };
        return obj;
      })
    );
  }
  getChapLeechManga(nameMAndChap: string) {
    return this.http.get(`${this.url2}/all/${nameMAndChap}`, { responseType: 'text' });
  }
  getNameManga(nameMAndChap: string) {
    return this.http.get(`${this.url2}/${nameMAndChap}`, { responseType: 'text' });
  }
  getAllNewChap(nameMAndChap: string){
    return this.http.get(`${this.url2}/new/${nameMAndChap}`, { responseType: 'text' });
  }
  getUrlImgChapReader(url: string) {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(data => {
        let parser = new DOMParser();
        let x = parser.parseFromString(data, "text/html");
        let pageChapter = x.body.getElementsByClassName('page-chapter');
        let listLinkImg = [];
        for (let i = 0; i < pageChapter.length; i++) {
          let linkImg = `http:${pageChapter[i].getElementsByTagName('img')[0].dataset.original}`;
          listLinkImg.push(linkImg);
        }
        let obj = { listLinkImg: listLinkImg };
        return obj;
      })
    )
  }
}
