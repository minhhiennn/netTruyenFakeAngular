import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/shared/header/header.component';
import { JwtModule } from "@auth0/angular-jwt";


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
<<<<<<< HEAD
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
=======
        whitelistedDomains : ['localhost:5001']
>>>>>>> a9d1e72961a407ffdbb2a000f86fde09763d3935
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
