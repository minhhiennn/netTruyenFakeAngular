import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
import { Detail } from '../Model/details';
@Injectable({
  providedIn: 'root'
})
export class DetailService {

  url = environment.baseUrl + ApiPaths.Detail;
  constructor(private http: HttpClient) { }

  postDetail(detail: Detail) {
    return this.http.post(this.url, detail);
  }

  getDetailByIdManga(id: any) {
    return this.http.get(this.url + "/" + id);
  }
}
