import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    let x = document.getElementsByClassName("main-menu")[0];
    console.log(x);
    let childOfx = x.getElementsByClassName("child-main-menu");
    for (let i = 0; i < childOfx.length; i++) {
      childOfx[i].addEventListener("mouseover", () => {
        if (childOfx[i].classList.contains("dropdown")) {
          let y = childOfx[i].getElementsByClassName("main-menu-dropdown")[0] as HTMLElement;
          y.style.display = "block";
        }
        childOfx[i].classList.add("open");
        childOfx[0].classList.add("curr")
        childOfx[0].classList.remove("active");
      })
      childOfx[i].addEventListener("mouseout", () => {
        if (childOfx[i].classList.contains("dropdown")) {
          let y = childOfx[i].getElementsByClassName("main-menu-dropdown")[0] as HTMLElement;
          y.style.display = "none";
        }
        childOfx[i].classList.remove("open");
        childOfx[0].classList.remove("curr");
        childOfx[0].classList.add("active");
      })
    }
  }
}
