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
  pageMax: number = 0;
  listPage: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private mangaService: MangaService) { }


  ngOnChanges(): void {
    this.mangaService.getPage().subscribe((data) => {
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
    this.router.navigateByUrl('/?page=' + index);
  }
  goToMinimunPage() {
    this.router.navigateByUrl('/?page=' + 1);
  }
  goToMaxPage() {
    this.router.navigateByUrl('/?page=' + this.pageMax);
  }
  checkMoveOverAndOut(index: number) {
    if (this.currentPage != index) {
      return true;
    } else {
      return false;
    }
  }
}
