import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BodyComponent } from './body/body.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FollowUsComponent } from './follow-us/follow-us.component';
import { FooterComponent } from './footer/footer.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ForumShortcutComponent } from './forum-shortcut/forum-shortcut.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { WantedPostComponent } from './wanted-post/wanted-post.component';
import { WantedComponent } from './wanted/wanted.component';

const routes: Routes = [
  {path: '', component: BodyComponent },
  {path: 'nav-bar', component: NavBarComponent},
  {path: 'follow-us', component: FollowUsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'forum-shortcut', component: ForumShortcutComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'wanted', component: WantedComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'wanted-post', component: WantedPostComponent},
  {path: 'forum-content', component: ForumContentComponent},
  {path: 'checkout', component: CheckoutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
