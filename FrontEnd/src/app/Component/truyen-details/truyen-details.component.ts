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
  idM: string = "";
  listVisitedChap: string[] = [];
  detailComics: any = {};

  constructor(private route: ActivatedRoute, private detailService: DetailService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((para) => {
      this.idM = para.get('idM') as string;
      let nameM = para.get('nameM') as string;
      console.log(this.idM + "-" + nameM);
      /////////////////////////////////////////////////
      let listvisitedChap: string[] = JSON.parse(localStorage.getItem('listvisitedChap') as string) as string[];
      if (listvisitedChap != null) {
        this.listVisitedChap = listvisitedChap;
      }
      /////////////////////////////////////////////////
      this.detailService.getDetailsLeechManga(nameM).subscribe((obj) => {
        this.detailComics = obj;
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

  checkHeight(p: HTMLElement): boolean {
    if (p.offsetHeight != 0) {
      if (p.offsetHeight >= 60) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }
  checkVisitedChap(ele: HTMLElement) {
    let idChap = ele.id.split('/')[4];  
    for (let i = 0; i < this.listVisitedChap.length; i++) {
      if (this.listVisitedChap[i] == idChap) {
        return true;
      }
    }
    return false;
  }
}
