import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
//component home and child component
import { HomeComponent } from './Component/home/home.component';
import { TopcomicsComponent } from './Component/home/topcomics/topcomics.component';
import { PaginationComponent } from './Component/shared/pagination/pagination.component';
// end component home
import { TruyenDetailsComponent } from './Component/truyen-details/truyen-details.component';
import { ChapReaderComponent } from './Component/chap-reader/chap-reader.component';
import { UploadImgComponent } from './Component/upload-img/upload-img.component';
import { UploadMangaComponent } from './Component/upload-manga/upload-manga.component';
import { TruyenSearchComponent } from './Component/truyen-search/truyen-search.component';

export function matcherTruyenDetail(url: UrlSegment[]) {
  if (url.length === 2) {
    let id = url[1].path.toString().split('-')[url[1].path.split('-').length - 1];
    return {
      consumed: url, posParams: { nameM: new UrlSegment(url[1].path, {}), idM: new UrlSegment(id, {}) }
    };
  } else {
    return null;
  }
}

export function matcherChapReader(url: UrlSegment[]) {
  //let id: string = '';
  // if (Number.isInteger(parseInt(url[1].path.toString().split('-')[url[1].path.split('-').length - 2]))) {
  //   id = url[1].path.toString().split('-')[url[1].path.split('-').length - 4];
  // } else {
  //   id = url[1].path.toString().split('-')[url[1].path.split('-').length - 3];
  // }
  // let urlGetImage = url[1].path.toString().substring(0, url[1].path.toString().indexOf(id)) + id;
  if (url.length === 4) {
    let chapName = url[1].path;
    let chapNumber = url[2].path;
    let idChap = url[3].path;
    return { consumed: url, posParams: { chapName: new UrlSegment(chapName, {}), chapNumber: new UrlSegment(chapNumber, {}), idChap: new UrlSegment(idChap, {}) } }
  } else {
    return null;
  }
}

export function mathcherTimTruyen(url: UrlSegment[]) {
  if (url.length === 1 && url[0].path.toString().includes("tim-truyen")) {
    return { consumed: url };
  } else {
    return null;
  }
}



const routes: Routes = [
  { path: '', component: HomeComponent },
  { matcher: matcherTruyenDetail, component: TruyenDetailsComponent },
  { matcher: matcherChapReader, component: ChapReaderComponent },
  { matcher: mathcherTimTruyen, component: TruyenSearchComponent },
  { path: 'upload', component: UploadImgComponent },
  { path: 'uploadManga', component: UploadMangaComponent }
];
@NgModule({
  declarations: [
    HomeComponent,
    TruyenDetailsComponent,
    ChapReaderComponent,
    UploadMangaComponent,
    TopcomicsComponent,
    PaginationComponent,
    TruyenSearchComponent
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }], // <-- Declare that you want to use ScrollHooks
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }), LazyLoadImageModule, CommonModule],
  exports: [RouterModule, FormsModule]
})
export class AppRoutingModule { }
