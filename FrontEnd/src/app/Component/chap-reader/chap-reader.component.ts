import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';
declare var myTest: any;

@Component({
  selector: 'app-chap-reader',
  templateUrl: './chap-reader.component.html',
  styleUrls: ['./chap-reader.component.scss']
})
export class ChapReaderComponent implements OnInit {
  baseUrl = environment.baseUrl;
  imageToShow: any;
  list: any[] = [];
  manga: any;
  chap: any;
  pageCount: number = 0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private sanitizer: DomSanitizer) {
    console.log('loz');
    // this.manga = this.route.snapshot.paramMap.get('nameM')?.split("-").pop();
    // this.chap = this.route.snapshot.paramMap.get('nameC')?.replace('chap', '');
    this.loadManga("http://truyenqqtop.com/truyen-tranh/anh-sang-cuoi-con-duong-6799-chap-119-5.html");
  }
  ngOnInit(): void {
    this.createBeforeContentHeader();
  }

  createBeforeContentHeader() {
    let x = document.getElementById('header-menu') as HTMLElement;
    let childOfX = x.getElementsByTagName('li');
    for (let i = 0; i < childOfX.length; i++) {
      if (i != 0) {
        let y = document.createElement('span');
        y.style.padding = '0 5px';
        y.style.color = '#ccc';
        y.textContent = '»';
        childOfX[i].before(y);
      }
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  loadManga(url:string) {
    // this.http.get(`${this.baseUrl}${ApiPaths.Manga}/` + this.manga).subscribe((data: any) =>
    //   data["chaps"].forEach((element: any) => {
    //     if (element["number"] == this.chap) { this.pageCount = element["pageCount"] + 1; new myTest(`${this.baseUrl}${ApiPaths.Storage}/${element["id"]}`, 1, element["pageCount"]) };
    //   }
    //   ));
    var realUrl = url.split("//")[1].split("/")[2];
    this.http.get(`http://localhost:5001/api/manga/leecher/${realUrl}`).subscribe((data: any) => {
      data.forEach((element: any) => {
        var image: any;
        let objectURL = 'data:image/png;base64,' + element;
        image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        console.log(image);
        this.list.push(image)
      });
    });
  }
}