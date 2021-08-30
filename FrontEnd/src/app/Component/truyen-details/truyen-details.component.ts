import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPaths } from 'src/app/Enum/ApiPaths.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-truyen-details',
  templateUrl: './truyen-details.component.html',
  styleUrls: ['./truyen-details.component.scss']
})
export class TruyenDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  chap: any;
  chapID: number = 0;
  chapNumber: number = 0;
  routerPara : any;
  ngOnInit(): void {
    this.routerPara = this.route.snapshot.paramMap.get('nameM');
    var id = (this.routerPara?.split("-").pop());
    this.http.get(`${this.baseUrl}${ApiPaths.Manga}/` + id).subscribe((data: any) => {
      console.log(data);
      this.chap = data['chaps'][0];
      this.chapID = this.chap['id'];
      this.chapNumber = this.chap['number'];
    });

    let x = document.getElementsByClassName("breadcrumb")[0];
    let y = x.getElementsByTagName("li");
    for (let i = 0; i < y.length; i++) {
      if (i != 0) {
        let z = y[i].getElementsByTagName("a")[0];
        let z1 = document.createElement("span");
        z1.textContent = "»";
        z1.style.padding = "0 0 0 5px";
        z1.style.color = "#ccc";
        z.before(z1);
      }
    }
  }
  showMoreOrLess(eleA: HTMLElement) {
    if (!eleA.classList.contains('less')) {
      let x = document.getElementsByClassName('shortened')[0];
      x.classList.remove('shortened');
      eleA.classList.add('less');
      eleA.textContent = '\u2039' + ' Thu gọn';
    } else {
      let x = document.getElementsByClassName('detail-content')[0];
      let y = x.getElementsByTagName('p')[0];
      y.classList.add('shortened');
      eleA.classList.remove('less');
      eleA.textContent = 'Xem thêm ' + '\u203a';
    }
  }
}
