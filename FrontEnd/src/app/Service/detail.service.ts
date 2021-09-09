import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  url = environment.baseUrl + ApiPaths.Detail;

  url2 = environment.baseUrl + ApiPaths.Chap;
  constructor(private http: HttpClient) { }

  getDetailsLeechManga(nameAndId: string) {
    return this.http.get(`${this.url}/${nameAndId}`, { responseType: 'text' });
  }
  getChapLeechManga(nameMAndChap: string) {
    return this.http.get(`${this.url2}/all/${nameMAndChap}`, { responseType: 'text' });
  }
  getNameManga(nameMAndChap: string) {
    return this.http.get(`${this.url2}/${nameMAndChap}`, { responseType: 'text' });
  }
}
