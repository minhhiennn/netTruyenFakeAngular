import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
declare var myTest: any;

@Component({
  selector: 'app-chap-reader',
  templateUrl: './chap-reader.component.html',
  styleUrls: ['./chap-reader.component.scss']
})
export class ChapReaderComponent implements OnInit {
  imageToShow: any;
  list: any[] = [];
  manga: string = "";
  chap: number = 0;
  pageCount: number = 0;
  constructor(private http: HttpClient) {
    this.manga = "00001";
    this.chap = 97;
    this.loadManga();

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
  loadManga() {
    this.http.get("https://localhost:5001/api/manga/" + this.manga).subscribe((data: any) =>
      data["chaps"].forEach((element: any) => {
        if (element["number"] == this.chap) { this.pageCount = element["pageCount"] + 1; new myTest(`https://localhost:5001/${element["id"]}`, 0, element["pageCount"]) };
      }
      ));
  }
}
