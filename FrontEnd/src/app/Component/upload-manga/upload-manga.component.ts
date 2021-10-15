import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/Service/manga.service';
@Component({
  selector: 'app-upload-manga',
  templateUrl: './upload-manga.component.html',
  styleUrls: ['./upload-manga.component.scss']
})
export class UploadMangaComponent implements OnInit {


  constructor(private mangaService: MangaService) { }
  
  ngOnInit(): void {
      this.mangaService.leechManga().subscribe((data)=>{
         let x = new DOMParser();
         let x1 = x.parseFromString(data,'text/html');
         console.log(x1.getElementsByClassName('page-chapter')[0].getElementsByTagName('img')[0].src);
        });
  }

}
