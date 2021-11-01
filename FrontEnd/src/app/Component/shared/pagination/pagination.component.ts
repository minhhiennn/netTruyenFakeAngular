import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/Service/manga.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() currentPage: any;
  @Input() typePage: any;
  pageMax: number = 0;
  listPage: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private mangaService: MangaService) { }


  ngOnChanges(): void {
    this.mangaService.getPage(this.typePage).subscribe((data) => {
      console.log(data);
      this.listPage = [];
      this.pageMax = data as number;
      let x = this.currentPage - 2;
      let y = this.currentPage + 2;
      if (x <= 0) {
        for (let i = 1; i <= 5; i++) {
          this.listPage.push(i);
        }
      } else if (y >= this.pageMax) {
        for (let i = this.pageMax - 5; i <= this.pageMax; i++) {
          this.listPage.push(i);
        }
      } else {
        for (let i = x; i <= this.currentPage + 2; i++) {
          this.listPage.push(i);
        }
      }
    })
  }

  ngOnInit(): void {

  }
  checkActive(index: number): boolean {
    if (this.currentPage == index) {
      return true;
    } else {
      return false;
    }
  }
  changeCurrentPage(index: number) {
    if (this.typePage == 'mainPage') {
      this.router.navigateByUrl('/?page=' + index);
    } else {
      this.router.navigate(['/tim-truyen'], { queryParams: { keyword: this.typePage, page: index } });
    }
  }
  goToMinimunPage() {
    if (this.typePage == 'mainPage') {
      this.router.navigateByUrl('/?page=' + 1);
    } else {
      this.router.navigate(['/tim-truyen'], { queryParams: { keyword: this.typePage, page: 1 } });
    }
  }
  goToMaxPage() {
    if (this.typePage == 'mainPage') {
      this.router.navigateByUrl('/?page=' + this.pageMax);
    } else {
      this.router.navigate(['/tim-truyen'], { queryParams: { keyword: this.typePage, page: this.pageMax } });
    }
  }
  checkMoveOverAndOut(index: number) {
    if (this.currentPage != index) {
      return true;
    } else {
      return false;
    }
  }
}
