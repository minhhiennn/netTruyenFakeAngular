import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimtruyenService } from 'src/app/Service/timtruyen.service';
@Component({
  selector: 'app-truyen-search',
  templateUrl: './truyen-search.component.html',
  styleUrls: ['./truyen-search.component.scss']
})
export class TruyenSearchComponent implements OnInit {

  defaultImage = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fjaypanda.in%2Fwp-content%2Fuploads%2F2016%2F10%2Fblank-img.jpg&imgrefurl=https%3A%2F%2Fjaypanda.in%2Fblank-img%2F&tbnid=KczDA8lIEwUxgM&vet=12ahUKEwiMkIPw__HyAhWJL6YKHdsODQ4QMygDegUIARCgAQ..i&docid=b1kLK9cYnbsv0M&w=330&h=200&itg=1&q=blank%20img&ved=2ahUKEwiMkIPw__HyAhWJL6YKHdsODQ4QMygDegUIARCgAQ';

  listSearchTruyen: any[] = []

  typePage: any;

  currentPage: number = 1;

  constructor(private route: ActivatedRoute, private TimtruyenService: TimtruyenService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryPara) => {
      this.typePage = queryPara['keyword'];
      if (queryPara['page'] != null) {
        this.currentPage = parseInt(queryPara['page']);
      }
      this.TimtruyenService.timTruyen(queryPara['keyword'], this.currentPage).subscribe((data) => {
        this.listSearchTruyen = data;
      })
    })
  }

  hiddenSuggestSearch() {
    let x = document.getElementsByClassName('suggestsearch')[0] as HTMLElement;
    if (x != undefined || x != null) {
      x.style.display = 'none';
    }
  }
}
