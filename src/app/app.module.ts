import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import { HomePage } from './home/home.page';
import { WelcomePage } from './welcome/welcome.page';
import { ModalpopupPage } from './modalpopup/modalpopup.page';
import { OrganizationsPage } from './organizations/organizations.page';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ModalpopuporgPage } from './modalpopuporg/modalpopuporg.page';
import { ModalpopupvolPage } from './modalpopupvol/modalpopupvol.page';
import {UserPage} from './UserPage/userPage';
import {environment} from '../environments/environment';
import {AddProductsPopupPage} from './AddProductsPopup/addProductsPopup.page';
import {EditOrgInfoPopupPage} from './EditOrgInfoPopup/editOrgInfoPopup.page';
import {ForgotpasswordPage} from './ForgotPasswordPopup/forgotpassword.page';
import {LoggedOrgPage} from './LoggedOrganisationsPage/loggedOrg.page';
import {ShowOrgInfoPopupPage} from './ShowOrgInfoPopup/showOrgInfoPopup.page';
import {UserEditInfoPopupPage} from './UserEditInfoPopup/userEditInfoPopup.page';
import {UserShowOrgPopupPage} from './UserShowOrgPopup/userShowOrgPopup.page';
import {ViewProductsPopupPage} from './ViewProductsPopup/viewProductsPopup.page';
import {ViewVolunteersPopupPage} from './ViewVolunteersPopup/viewVolunteersPopup.page';
import {UserInformationPopupPage} from './UserInformationPopup/userInformationPopup.page';
import {AuthInterceptorService} from "./services/authInterceptorService";


@NgModule({
  declarations: [AppComponent,
    HomePage,
    WelcomePage,
    ModalpopupPage,
    OrganizationsPage,
    ModalpopuporgPage,
    ModalpopupvolPage,
    UserPage,
    AddProductsPopupPage,
    EditOrgInfoPopupPage,
    ForgotpasswordPage,
    LoggedOrgPage,
    ShowOrgInfoPopupPage,
    UserEditInfoPopupPage,
    UserPage,
    UserShowOrgPopupPage,
    ViewProductsPopupPage,
    ViewVolunteersPopupPage,
    UserInformationPopupPage
  ],
  entryComponents: [],
  // eslint-disable-next-line max-len
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule,IonicModule,FormsModule,RouterModule,HttpClientModule, AngularFireModule.initializeApp(environment.firebase)],
  providers: [{
    //provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true }],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})
export class AppModule {}
