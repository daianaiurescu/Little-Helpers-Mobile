import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomePage } from './home/home.page';
import { WelcomePage } from './welcome/welcome.page';
import { ModalpopupPage } from './modalpopup/modalpopup.page';
import { OrganizationsPage } from './organizations/organizations.page';
import { HttpClientModule } from '@angular/common/http';
import { ModalpopuporgPage } from './modalpopuporg/modalpopuporg.page';
import { ModalpopupvolPage } from './modalpopupvol/modalpopupvol.page';


@NgModule({
  declarations: [AppComponent,HomePage,WelcomePage,ModalpopupPage,OrganizationsPage,ModalpopuporgPage,ModalpopupvolPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule,IonicModule,FormsModule,RouterModule,HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})
export class AppModule {}
