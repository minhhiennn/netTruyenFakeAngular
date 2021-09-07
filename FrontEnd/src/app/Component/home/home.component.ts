import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MangaService } from 'src/app/Service/manga.service';
import { LeechMangaService } from 'src/app/Service/leech-manga.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  back: boolean = false;
  count: number = 0;
  wait: boolean = false;
  baseUrl = environment.baseUrl;
  listName: any = [];
  listnameM: any = [];
  listidM: any = [];
  listimgURL: any = [];
  currentPage: any;
  listPage: number[] = [];
  constructor(private mangaService: MangaService, private leechMangaService: LeechMangaService, private route: ActivatedRoute, private router: Router) {
    /////
    this.mangaService.getPage().subscribe((data) => {
      let page = data as number;
      for (let i = 1; i <= page; i++) {
        this.listPage.push(i);
      }
    })
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryPara) => {
      console.log('loz');
      let page = 1;
      if (queryPara.get('page') != null) {
        page = parseInt(queryPara.get('page') as string);
      }
      this.listName = [];
      this.listnameM = [];
      this.listidM = [];
      this.listimgURL = [];
      this.currentPage = page;
      console.log(this.currentPage);
      this.leechMangaService.leechManga(this.currentPage);
      setTimeout(() => {
        this.listName = this.leechMangaService.listTitle;
        this.listimgURL = this.leechMangaService.listImgUrl;
      }, 2000);
    });
  }
  TopComicsScrollLeft() {
    let y = document.getElementsByClassName("owl-wrapper-outer")[0];
    if (y.scrollLeft <= 0) {
      y.scroll({ left: 194 * 4, behavior: 'smooth' });
    } else {
      y.scroll({ left: y.scrollLeft - 194, behavior: 'smooth' });
    }
  }
  TopComicsScrollRight() {
    let y = document.getElementsByClassName("owl-wrapper-outer")[0];
    if (this.back == false) {
      if (y.scrollLeft >= 194 * 4 || y.scrollLeft > 194 * 3) {
        this.back = true;
        y.scroll({ left: 0, behavior: 'smooth' });
      } else {
        let x = y.scrollLeft;
        let fast = this.checkFastClick(x);
        if (fast == true) {
          let x1 = 194 - (x % 194);
          let x2 = 194 + x1 + x;
          y.scroll({ left: x2, behavior: 'smooth' })
        } else {
          y.scroll({ left: x + 194, behavior: 'smooth' });
        }
      }
    } else {
      this.count++;
      y.scroll({ left: 194 * this.count, behavior: 'smooth' });
      if (this.wait == false) {
        setTimeout(() => {
          this.back = false;
          this.count = 0;
          this.wait = false;
        }, 500);
      }
      this.wait = true;
    }
  }
  checkFastClick(scrollLeft: any) {
    if (scrollLeft % 194 != 0 && scrollLeft < 194 * 4) {
      return true;
    }
    return false;
  }
  checkActive(index: number): boolean {
    if (this.currentPage == index) {
      return true;
    } else {
      return false;
    }
  }
  changeCurrentPage(index: number) {
    this.router.navigateByUrl('/?page=' + index);
  }
  checkMoveOverAndOut(index: number) {
    if (this.currentPage != index) {
      return true;
    } else {
      return false;
    }
  }
}
