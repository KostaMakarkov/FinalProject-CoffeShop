import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FollowUsComponent } from './follow-us/follow-us.component';
import { ForumComponent } from './forum/forum.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { WantedComponent } from './wanted/wanted.component';
import { ForumShortcutComponent } from './forum-shortcut/forum-shortcut.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MenuComponent } from './menu/menu.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ShortDatePipe } from './short-date.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WantedPostComponent } from './wanted-post/wanted-post.component';
import { CheckoutComponent } from './checkout/checkout.component'


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    NavBarComponent,
    FollowUsComponent,
    ForumComponent,
    ReservationsComponent,
    WantedComponent,
    ForumShortcutComponent,
    BodyComponent,
    LoginComponent,
    AboutUsComponent,
    MenuComponent,
    ForumContentComponent,
    ShortDatePipe,
    WantedPostComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
