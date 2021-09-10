import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { HomeComponent } from './Component/home/home.component';
import { TruyenDetailsComponent } from './Component/truyen-details/truyen-details.component';
import { ChapReaderComponent } from './Component/chap-reader/chap-reader.component';
import { UploadImgComponent } from './Component/upload-img/upload-img.component';
import { UploadMangaComponent } from './Component/upload-manga/upload-manga.component';

export function matcherTruyenDetail(url: UrlSegment[]) {
  if (url.length === 2 && !url[1].path.toString().includes(".html")) {
    return { consumed: url, posParams: { nameM: new UrlSegment(url[1].path, {}) } };
  } else {
    return null;
  }
}

export function matcherChapReader(url: UrlSegment[]) {
  let id: string = '';
  if (Number.isInteger(parseInt(url[1].path.toString().split('-')[url[1].path.split('-').length - 2]))) {
    id = url[1].path.toString().split('-')[url[1].path.split('-').length - 4];
  } else {
    id = url[1].path.toString().split('-')[url[1].path.split('-').length - 3];
  }
  let urlGetImage = url[1].path.toString().substring(0, url[1].path.toString().indexOf(id))+id;
  if (url.length === 2 && url[1].path.toString().includes(".html")) {
    return { consumed: url, posParams: { nameMAndChap: new UrlSegment(url[1].path, {}), idM: new UrlSegment(id, {}), img: new UrlSegment(urlGetImage, {}) } }
  } else {
    return null;
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { matcher: matcherTruyenDetail, component: TruyenDetailsComponent },
  { matcher: matcherChapReader, component: ChapReaderComponent },
  { path: 'upload', component: UploadImgComponent },
  { path: 'uploadManga', component: UploadMangaComponent }
];
@NgModule({
  declarations: [
    HomeComponent,
    TruyenDetailsComponent,
    ChapReaderComponent,
    UploadMangaComponent
  ],
  providers: [{ provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }], // <-- Declare that you want to use ScrollHooks
  imports: [FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), LazyLoadImageModule, CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
