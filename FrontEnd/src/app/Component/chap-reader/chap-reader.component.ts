import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DetailService } from 'src/app/Service/detail.service';
import { Router } from '@angular/router';
import { VisitedComic } from 'src/app/Model/visited-comic';
@Component({
  selector: 'app-chap-reader',
  templateUrl: './chap-reader.component.html',
  styleUrls: ['./chap-reader.component.scss']
})
export class ChapReaderComponent implements OnInit {
  baseUrl = environment.baseUrl;
  imageToShow: any;
  listLinkHref: string[] = [];
  listChap: string[] = [];
  list: any[] = [];
  linkNextChap: string | null = "";
  linkPrevChap: string | null = "";
  mangaName: any;
  chap: any;

  constructor(private router: Router, private activeroute: ActivatedRoute, private detailService: DetailService, private http: HttpClient, private sanitizer: DomSanitizer) {
    this.activeroute.paramMap.subscribe((para) => {
      let parser = new DOMParser();
      //////////////////////////
      let id = para.get('idM') as string;
      let Linkimg = para.get('img') as string;
      ////////////////////////
      this.listLinkHref = [];
      this.listChap = [];
      this.list = [];
      this.linkNextChap = "";
      this.linkPrevChap = "";
      let x = para.get('nameMAndChap') as string;
      let maybeChap = x.split('-')[x.split('-').length - 2];
      let alwaysChap = x.split('-')[x.split('-').length - 1].split('.')[0];
      if (Number.isInteger(parseInt(maybeChap))) {
        this.chap = maybeChap + "." + alwaysChap;
      } else {
        this.chap = alwaysChap;
      }
      this.detailService.getNameManga(x).subscribe((nameManga) => {
        this.mangaName = nameManga;
        this.detailService.getDetailsLeechManga(Linkimg).subscribe((data) => {
          let qw = parser.parseFromString(data, "text/html");
          let imgUrl = qw.body.getElementsByClassName('left')[0].getElementsByTagName('img')[0].src;
          let visitedComic: VisitedComic = new VisitedComic(id, this.mangaName, `Chapter ${this.chap}`, para.get('nameMAndChap') as string, imgUrl);
          let listvisitedComic: VisitedComic[] = JSON.parse(localStorage.getItem('listvisitedComic') as string) as VisitedComic[];
          if (listvisitedComic != null) {
            if (listvisitedComic.length == 0) {
              listvisitedComic.push(visitedComic);
              localStorage.setItem('listvisitedComic', JSON.stringify(listvisitedComic));
            } else {
              let find: boolean = false;
              for (let i = 0; i < listvisitedComic.length; i++) {
                if (listvisitedComic[i].id == visitedComic.id) {
                  let index = listvisitedComic.indexOf(listvisitedComic[i]);
                  listvisitedComic.splice(index, 1);
                  listvisitedComic.push(visitedComic);
                  find = true;
                  break;
                }
              }
              if (find == false) {
                listvisitedComic.push(visitedComic);
              }
              localStorage.setItem('listvisitedComic', JSON.stringify(listvisitedComic));
            }
          } else {
            localStorage.setItem('listvisitedComic', JSON.stringify([]));
          }
        })
      })
      ////////////////////////////////////////////////////
      let visitedChap: string = id + '-' + this.chap;
      let listvisitedChap: string[] = JSON.parse(localStorage.getItem('listvisitedChap') as string) as string[];
      if (listvisitedChap != null) {
        if (listvisitedChap.length == 0) {
          listvisitedChap.push(visitedChap);
          localStorage.setItem('listvisitedChap', JSON.stringify(listvisitedChap));
        } else {
          let find: boolean = false;
          for (let i = 0; i < listvisitedChap.length; i++) {
            if (listvisitedChap[i] == visitedChap) {
              find = true;
              break;
            }
          }
          if (find == false) {
            listvisitedChap.push(visitedChap);
            localStorage.setItem('listvisitedChap', JSON.stringify(listvisitedChap));
          }
        }
      } else {
        localStorage.setItem('listvisitedChap', JSON.stringify([]));
      }
      ////////////////////////////////////////////////////
      this.detailService.getChapLeechManga(x).subscribe((data) => {
        let z = parser.parseFromString(data, "text/html");
        let z1 = z.body.getElementsByClassName('selectEpisode')[0].getElementsByTagName('option');
        for (let i = 0; i < z1.length; i++) {
          this.listLinkHref.push(z1[i].value);
          this.listChap.push(z1[i].textContent as string);
        }
        if (z.body.getElementsByClassName('prev level-left')[0] != null) {
          this.linkPrevChap = z.body.getElementsByClassName('prev level-left')[0].getElementsByTagName('a')[0].href;
        } else {
          this.linkPrevChap = null;
        }
        if (z.body.getElementsByClassName('next level-right')[0] != null) {
          this.linkNextChap = z.body.getElementsByClassName('next level-right')[0].getElementsByTagName('a')[0].href;
        } else {
          this.linkNextChap = null;
        }
      })
      ////////////////////////////////////////////////////////////////////////////////
      this.loadManga("http://truyenqqtop.com/truyen-tranh/" + x);
    })
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
  loadManga(url: string) {
    var realUrl = url.split('/').join('@');
    this.http.get(`http://localhost:5001/api/manga/getImgUrl/${realUrl}`).subscribe((data: any) => {
      data.forEach((element1: any) => {
        this.list.push(element1)
      });
      data.forEach((element: any) => {
        this.http.get(`http://localhost:5001/api/manga/leecher/${element.split('/').join('@')}`).subscribe(data1 => {
          var image: any;
          let objectURL = 'data:image/png;base64,' + data1;
          image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          var index = this.list.indexOf(element);
          this.list[index] = image;
        })
      });
    });
  }
  checkSelected(ele: string): boolean {
    if (parseInt(ele.split(' ')[1]) == parseInt(this.chap)) {
      return true;
    } else {
      return false;
    }
  }
  changeChapter(ele: any) {
    console.log('cac');
    let url = ele.value.split('//')[1].split('/')[1] + "/" + ele.value.split('//')[1].split('/')[2];
    this.router.navigateByUrl('/' + url, { skipLocationChange: false });
  }
  prevChap() {
    if (this.linkPrevChap != null) {
      let url = this.linkPrevChap.split('//')[1].split('/')[1] + "/" + this.linkPrevChap.split('//')[1].split('/')[2];
      this.router.navigateByUrl('/' + url, { skipLocationChange: false });
    }
  }
  nextChap() {
    if (this.linkNextChap != null) {
      let url = this.linkNextChap.split('//')[1].split('/')[1] + "/" + this.linkNextChap.split('//')[1].split('/')[2];
      this.router.navigateByUrl('/' + url, { skipLocationChange: false });
    }
  }
}