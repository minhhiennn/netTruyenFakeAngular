import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { HomeComponent } from './Component/home/home.component';
import { TruyenDetailsComponent } from './Component/truyen-details/truyen-details.component';
import { ChapReaderComponent } from './Component/chap-reader/chap-reader.component';
import { UploadImgComponent } from './Component/upload-img/upload-img.component';
import { UploadMangaComponent } from './Component/upload-manga/upload-manga.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'truyen-tranh/:nameM', component: TruyenDetailsComponent },
  { path: 'truyen-tranh/truyen/:nameMAndChap', component: ChapReaderComponent },
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
