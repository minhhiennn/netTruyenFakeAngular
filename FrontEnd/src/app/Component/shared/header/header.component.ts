import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/Service/manga.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  inputSearch: string = '';

  inputSearchUpdate = new Subject<string>();

  object: any = {};

  constructor(private mangaService: MangaService) {

  }

  ngOnInit(): void {
    //////////////////////////////////////////////////
    let x = document.getElementsByClassName("main-menu")[0];
    let childOfx = x.getElementsByClassName("child-main-menu");
    for (let i = 0; i < childOfx.length; i++) {
      childOfx[i].addEventListener("mouseover", () => {
        if (childOfx[i].classList.contains("dropdown")) {
          let y = childOfx[i].getElementsByClassName("main-menu-dropdown")[0] as HTMLElement;
          y.style.display = "block";
        }
        childOfx[i].classList.add("open");
        childOfx[0].classList.add("curr")
        childOfx[0].classList.remove("active");
      })
      childOfx[i].addEventListener("mouseout", () => {
        if (childOfx[i].classList.contains("dropdown")) {
          let y = childOfx[i].getElementsByClassName("main-menu-dropdown")[0] as HTMLElement;
          y.style.display = "none";
        }
        childOfx[i].classList.remove("open");
        childOfx[0].classList.remove("curr");
        childOfx[0].classList.add("active");
      })
    }
    ///////////////////////
    console.log(this.object);

    // Debounce search.
    this.inputSearchUpdate
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.object = {};
        if (value != "") {
          this.mangaService.getSuccessSearch(value).subscribe(data => {
            let parser = new DOMParser();
            let x = parser.parseFromString(data, 'text/html');
            let listHref: string[] = [];
            let listImg: string[] = [];
            let listName: string[] = [];
            let listChapter: string[] = [];
            let listNameEng: string[] = [];
            let listCategory: string[] = [];
            let x1 = x.body.getElementsByTagName('ul')[0].getElementsByTagName('li');
            for (let i = 0; i < x1.length; i++) {
              console.log(x1[i]);
              listHref.push(x1[i].getElementsByTagName('a')[0].href);
              listImg.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('img')[0].src);
              listName.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('h3')[0].textContent as string);
              listChapter.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('h4')[0].getElementsByTagName('i')[0].textContent as string);
              if (x1[i].getElementsByTagName('a')[0].getElementsByTagName('h4')[0].getElementsByTagName('i')[2] !== undefined) {
                listNameEng.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('h4')[0].getElementsByTagName('i')[1].textContent as string);
                listCategory.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('h4')[0].getElementsByTagName('i')[2].textContent as string);
              } else {
                listNameEng.push("");
                listCategory.push(x1[i].getElementsByTagName('a')[0].getElementsByTagName('h4')[0].getElementsByTagName('i')[1].textContent as string);
              }
            }
            let obj = { listHref: listHref, listImg: listImg, listName: listName, listChapter: listChapter, listNameEng: listNameEng, listCategory: listCategory }
            this.object = obj;
          })
        }
      });
  }
}
