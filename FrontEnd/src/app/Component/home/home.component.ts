import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MangaService } from 'src/app/Service/manga.service';
import { LeechMangaService } from 'src/app/Service/leech-manga.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { VisitedComic } from 'src/app/Model/visited-comic';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  defaultImage = 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fjaypanda.in%2Fwp-content%2Fuploads%2F2016%2F10%2Fblank-img.jpg&imgrefurl=https%3A%2F%2Fjaypanda.in%2Fblank-img%2F&tbnid=KczDA8lIEwUxgM&vet=12ahUKEwiMkIPw__HyAhWJL6YKHdsODQ4QMygDegUIARCgAQ..i&docid=b1kLK9cYnbsv0M&w=330&h=200&itg=1&q=blank%20img&ved=2ahUKEwiMkIPw__HyAhWJL6YKHdsODQ4QMygDegUIARCgAQ';
  baseUrl = environment.baseUrl;
  listTopComics : any = [];
  listNewUpdateComics: any = [];
  listNameMandIdM: string[] = [];
  listVisitedComics: VisitedComic[] = [];
  currentPage: any;
  constructor(private mangaService: MangaService, private leechMangaService: LeechMangaService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryPara) => {
      let page = 1;
      if (queryPara.get('page') != null) {
        page = parseInt(queryPara.get('page') as string);
      }
      this.currentPage = page;
      this.leechMangaService.leechManga(this.currentPage);
      setTimeout(() => {
        this.listNameMandIdM = this.leechMangaService.listaHref;
        this.listTopComics = this.leechMangaService.listTopComics;
        this.listNewUpdateComics = this.leechMangaService.listNewUpdateComics;
        let listVisitedComics = localStorage.getItem('listvisitedComic') ? (JSON.parse(localStorage.getItem('listvisitedComic') as string) as VisitedComic[]).reverse() : []; 
        this.listVisitedComics = listVisitedComics;
      }, 500);
    });
  }
  
  linkChapInManga(ele: string) {

  }
  hiddenSuggestSearch(){
    let x = document.getElementsByClassName('suggestsearch')[0] as HTMLElement;
    if (x != undefined || x != null) {
      x.style.display = 'none';
    }
  }
}
