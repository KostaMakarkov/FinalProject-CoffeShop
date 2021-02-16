import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { AllPostsAndCommentComponent } from './all-posts-and-comment/all-posts-and-comment.component';
import { AuthGuard } from './auth.guard';
import { BodyComponent } from './body/body.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ChangeDobComponent } from './change-dob/change-dob.component';
import { ChangeFirstnameComponent } from './change-firstname/change-firstname.component';
import { ChangeLastnameComponent } from './change-lastname/change-lastname.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { FireAuthGuard } from './fire-auth.guard';
import { FollowUsComponent } from './follow-us/follow-us.component';
import { FooterComponent } from './footer/footer.component';
import { ForumContentComponent } from './forum-content/forum-content.component';
import { ForumShortcutComponent } from './forum-shortcut/forum-shortcut.component';
import { ForumComponent } from './forum/forum.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { MenuComponent } from './menu/menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderNotesComponent } from './order-notes/order-notes.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PostsAndCommentsComponent } from './posts-and-comments/posts-and-comments.component';
import { RegisterComponent } from './register/register.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UsersDataComponent } from './users-data/users-data.component';
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
  {path: 'register', component: RegisterComponent},
  {path: 'contactUs', component: ContactUsComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'order-details', component: OrderDetailsComponent},
  {path: 'order-address', component: OrderAddressComponent},
  {path: 'order-notes', component: OrderNotesComponent},
  {path: 'order-payment', component: OrderPaymentComponent},

  {path: 'user-settings', canActivate:[AuthGuard], component: UserSettingsComponent, children:[
    {path: '', canActivate:[AuthGuard], component: AccountInfoComponent, children:[
      {path: 'change-firstname', canActivate:[AuthGuard], component: ChangeFirstnameComponent},
      {path: 'change-lastname', canActivate:[AuthGuard], component: ChangeLastnameComponent},
      {path: 'change-phone', canActivate:[AuthGuard], component: ChangePhoneComponent},
      {path: 'change-dob', canActivate:[AuthGuard], component: ChangeDobComponent},
      {path: 'change-password', canActivate:[AuthGuard], component: ChangePasswordComponent},
      {path: 'change-address', canActivate:[AuthGuard], component: ChangeAddressComponent}
    ]},
    {path: 'posts-and-comments', canActivate:[AuthGuard], component: PostsAndCommentsComponent},
    {path: 'all-posts-and-comments', canActivate:[AuthGuard], component: AllPostsAndCommentComponent},
    {path: 'order-history', canActivate:[AuthGuard], component: OrderHistoryComponent},
    {path: 'users-data', canActivate:[AuthGuard], component: UsersDataComponent},
    {path: 'manage-menu', canActivate:[AuthGuard], component: MenuNavComponent, children:[
      {path: '', canActivate:[AuthGuard], component: ManageMenuComponent},
      {path: 'edit-menu', canActivate:[AuthGuard], component: EditMenuComponent},
      {path: 'add-menu', canActivate:[AuthGuard], component: AddMenuComponent}
    ]},
  ]},

  {path: 'user-settings-fireGuard',  canActivate:[FireAuthGuard], component: UserSettingsComponent, children:[
    {path: 'posts-and-comments', canActivate:[FireAuthGuard], component: PostsAndCommentsComponent},
    {path: 'all-posts-and-comments', canActivate:[FireAuthGuard], component: AllPostsAndCommentComponent},
    {path: 'order-history', canActivate:[FireAuthGuard], component: OrderHistoryComponent}
  ]},

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
