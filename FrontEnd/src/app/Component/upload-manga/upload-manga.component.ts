import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD

import { Details } from 'src/app/Model/details';
=======
import { Detail } from 'src/app/Model/details';
>>>>>>> 62251f9aaa68bdaa075b73d53359da0a43b09fbf
import { Manga } from 'src/app/Model/manga';
import { DetailService } from 'src/app/Service/detail.service';
import { MangaService } from 'src/app/Service/manga.service';
@Component({
  selector: 'app-upload-manga',
  templateUrl: './upload-manga.component.html',
  styleUrls: ['./upload-manga.component.scss']
})
export class UploadMangaComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder, private detailService: DetailService, private mangaService: MangaService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      mangaID: ['', [Validators.required]],
      detailsID: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      Author: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      views: ['', [Validators.required]],
      follows: ['', [Validators.required]],
      summary: ['', [Validators.required]]
    });
  }
  submitss() {
    if (this.myForm.valid == true) {
      let mangaID = this.myForm.get('mangaID')?.value;
      let detailsID = this.myForm.get('detailsID')?.value;
      let title = this.myForm.get('Title')?.value;
      let Author = this.myForm.get('Author')?.value;
      let genre = this.myForm.get('genre')?.value;
      let stars = this.myForm.get('stars')?.value;
      let views = parseInt(this.myForm.get('views')?.value);
      let follows = parseInt(this.myForm.get('follows')?.value);
      let summary = this.myForm.get('summary')?.value;
      let manga = new Manga(mangaID);
      let detail = new Details(detailsID, Title, Author, Condition, genre, stars, views, follows, summary, mangaID);
      console.log(detail);
      this.mangaService.postManga(manga).subscribe(()=>{
         this.detailService.postDetail(detail).subscribe();
      });
    } else {
      alert('ghi ngu như cc');
    }
  }
}
