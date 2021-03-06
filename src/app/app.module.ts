import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


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
import { CheckoutComponent } from './checkout/checkout.component';
import { RegisterComponent } from './register/register.component'
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthInterceptor } from './auth.interceptor';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserSettingsDisplayComponent } from './user-settings-display/user-settings-display.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { PostsAndCommentsComponent } from './posts-and-comments/posts-and-comments.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ChangeFirstnameComponent } from './change-firstname/change-firstname.component';
import { ChangeLastnameComponent } from './change-lastname/change-lastname.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangeDobComponent } from './change-dob/change-dob.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { JwPaginationModule } from 'jw-angular-pagination';
import { environment } from 'src/environments/environment';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderAddressComponent } from './order-address/order-address.component';
import { OrderNotesComponent } from './order-notes/order-notes.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderPaymentComponent } from './order-payment/order-payment.component';
import { UsersDataComponent } from './users-data/users-data.component';
import { AllPostsAndCommentComponent } from './all-posts-and-comment/all-posts-and-comment.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';



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
    CheckoutComponent,
    RegisterComponent,
    UserSettingsComponent,
    UserSettingsDisplayComponent,
    AccountInfoComponent,
    PostsAndCommentsComponent,
    OrderHistoryComponent,
    ChangeFirstnameComponent,
    ChangeLastnameComponent,
    ChangePhoneComponent,
    ChangeDobComponent,
    ChangePasswordComponent,
    ChangeAddressComponent,
    ContactUsComponent,
    OrderSummaryComponent,
    OrderAddressComponent,
    OrderNotesComponent,
    OrderDetailsComponent,
    OrderPaymentComponent,
    UsersDataComponent,
    AllPostsAndCommentComponent,
    ManageMenuComponent,
    EditMenuComponent,
    AddMenuComponent,
    MenuNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    JwPaginationModule,
    FormsModule
  ],
  providers: [AuthService, ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
