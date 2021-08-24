import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  back: boolean = false;
  count: number = 0;
  wait: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // hover pagination
    let x1 = document.getElementsByClassName("pagination")[0];
    let childOfx1 = x1.getElementsByTagName("li");
    for (let i = 0; i < childOfx1.length; i++) {
      childOfx1[i].addEventListener('mouseover', () => {
        if (!childOfx1[i].classList.contains('active')) {
          childOfx1[i].style.backgroundColor = '#DCDCDC';
          let y1 = childOfx1[i].getElementsByTagName('a')[0];
          y1.style.color = 'blue';
        }
      });
      childOfx1[i].addEventListener('mouseout', () => {
        if (!childOfx1[i].classList.contains('active')) {
          childOfx1[i].style.backgroundColor = 'white';
          let y1 = childOfx1[i].getElementsByTagName('a')[0];
          y1.style.color = 'darkgray';
        }
      });
    }
  }
  TopComicsScrollLeft() {
    let y = document.getElementsByClassName("owl-wrapper-outer")[0];
    if (y.scrollLeft <= 0) {
      y.scroll({ left: 194 * 4, behavior: 'smooth' });
    } else {
      y.scroll({ left: y.scrollLeft - 194, behavior: 'smooth' });
    }
  }
  TopComicsScrollRight() {
    let y = document.getElementsByClassName("owl-wrapper-outer")[0];
    if (this.back == false) {
      if (y.scrollLeft >= 194 * 4 || y.scrollLeft > 194 * 3) {
        this.back = true;
        y.scroll({ left: 0, behavior: 'smooth' });
      } else {
        let x = y.scrollLeft;
        let fast = this.checkFastClick(x);
        if (fast == true) {
          let x1 = 194 - (x % 194);
          let x2 = 194 + x1 + x;
          y.scroll({ left: x2, behavior: 'smooth' })
        } else {
          y.scroll({ left: x + 194, behavior: 'smooth' });
        }
      }
    } else {
      this.count++;
      y.scroll({ left: 194 * this.count, behavior: 'smooth' });
      if (this.wait == false) {
        setTimeout(() => {
          this.back = false;
          this.count = 0;
          this.wait = false;
        }, 500);
      }
      this.wait = true;
    }
  }
  checkFastClick(scrollLeft: any) {
    if (scrollLeft % 194 != 0 && scrollLeft < 194 * 4) {
      return true;
    }
    return false;
  }
  auth() {
    this.http.post("https://localhost:5001/api/auth/login", {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("token", token);
    }, err => { console.log(err) });
  }
}
