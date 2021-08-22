import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './Component/home/home.component';
import { TruyenDetailsComponent } from './Component/truyen-details/truyen-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'truyen-tranh/toan-chuc-phap-su-17023', component: TruyenDetailsComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TruyenDetailsComponent
  ],
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
