import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MangaService {

  url = environment.baseUrl + ApiPaths.Manga;

  constructor(private http: HttpClient) { }

  getPage(urlPage: string) {
    return this.http.get(this.url + "/page" + "/" + urlPage);
  }

  getMangaById(id: any) {
    return this.http.get(this.url + "/" + id);
  }

  leechManga() {
    return this.http.get(this.url + "/leechManga/" + 1, { responseType: 'text' });
  }

  getMangaByPage(page: number) {
    return this.http.get(this.url + "/leechManga/" + page, { responseType: 'text' });
  }

  getSuccessSearch(search: string) {
    return this.http.get(`http://www.nettruyenpro.com/Comic/Services/SuggestSearch.ashx?q=${search}`, { responseType: 'text' });
  }

}
