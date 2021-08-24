import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chap-reader',
  templateUrl: './chap-reader.component.html',
  styleUrls: ['./chap-reader.component.scss']
})
export class ChapReaderComponent implements OnInit {

  constructor() { }

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
}
