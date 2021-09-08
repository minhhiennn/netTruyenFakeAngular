import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailService } from 'src/app/Service/detail.service';
@Component({
  selector: 'app-truyen-details',
  templateUrl: './truyen-details.component.html',
  styleUrls: ['./truyen-details.component.scss']
})
export class TruyenDetailsComponent implements OnInit {
  baseUrl = environment.baseUrl;
  name: any;
  imgURL: any;
  listChap: string[] = [];
  listLinkHref: string[] = [];
  listUpdateChap: string[] = [];

  constructor(private route: ActivatedRoute, private detailService: DetailService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((para) => {
      let nameM = para.get('nameM') as string;
      this.detailService.getDetailsLeechManga(nameM).subscribe((data) => {
        let parser = new DOMParser();
        let x = parser.parseFromString(data, "text/html");
        this.imgURL = x.body.getElementsByClassName('left')[0].getElementsByTagName('img')[0].src;
        this.name = x.body.getElementsByClassName('center')[0].getElementsByTagName('h1')[0].textContent;
        // thằng y là thằng giữ list chap vs list update
        let y = x.body.getElementsByClassName('works-chapter-list')[0];
        let childOfy = y.getElementsByClassName('works-chapter-item');
        for (let i = 0; i < childOfy.length; i++) {
          let z1 = childOfy[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].href.split('//')[1].split('/')[2];
          let z2 = childOfy[i].getElementsByTagName('div')[0].getElementsByTagName('a')[0].textContent as string;
          let z3 = childOfy[i].getElementsByTagName('div')[1].textContent as string;
          this.listLinkHref.push(z1);
          this.listChap.push(z2);
          this.listUpdateChap.push(z3);
        }
      });
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
