import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netTruyenFake';
  constructor(){
     // for window scroll
     window.onscroll = () => {
      if (window.pageYOffset >= 60) {
        let x = document.getElementsByClassName("main-nav")[0];
        let y = document.getElementsByClassName("none-name")[0];
        let z = document.getElementById("back-to-top") as HTMLElement;
        x.classList.add("scroll-nav");
        y.classList.add("smooth-div");
        z.style.visibility = 'visible'
        z.style.opacity = '1';
      } else {
        let x = document.getElementsByClassName("main-nav")[0];
        let y = document.getElementsByClassName("none-name")[0];
        let z = document.getElementById("back-to-top") as HTMLElement;
        x.classList.remove("scroll-nav");
        y.classList.remove("smooth-div");
        z.style.visibility = 'hidden';
        z.style.opacity = '0';
      }
    }
    // end
  }
  // back to top
  backToTop(){
    window.scroll({ top: 0, behavior: 'smooth' });
  }
  // end
}
