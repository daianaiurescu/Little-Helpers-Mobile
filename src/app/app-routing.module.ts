import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { OrganizationsPage } from './organizations/organizations.page';
import { WelcomePage } from './welcome/welcome.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'welcome',
    component: WelcomePage
  },
  {
    path: 'modalpopup',
    component: HomePage
  },
  {
    path: 'organizations',
    component: OrganizationsPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }