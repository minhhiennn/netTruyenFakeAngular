import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
import { Manga } from '../Model/manga';
@Injectable({
  providedIn: 'root'
})
export class MangaService {

  url = environment.baseUrl + ApiPaths.Manga;

  constructor(private http: HttpClient) { }

  postManga(manga: Manga) {
    return this.http.post(this.url, manga);
  }
}
