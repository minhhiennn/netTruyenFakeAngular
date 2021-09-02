import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './Component/home/home.component';
import { TruyenDetailsComponent } from './Component/truyen-details/truyen-details.component';
import { ChapReaderComponent } from './Component/chap-reader/chap-reader.component';
import { UploadImgComponent } from './Component/upload-img/upload-img.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'truyen-tranh/:nameM', component: TruyenDetailsComponent },
  { path: 'truyen-tranh/:nameM/:nameC/:idC', component: ChapReaderComponent },
  { path: 'upload', component: UploadImgComponent }
];
@NgModule({
  declarations: [
    HomeComponent,
    TruyenDetailsComponent,
    ChapReaderComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
