import {Component, OnInit} from '@angular/core';
import {User} from '../Models/User.interface';
import {Organisation} from '../Models/Organisation.interface';
import {Subscription} from 'rxjs';
import {UserService} from '../services/userService';
import {ModalController} from '@ionic/angular';
import {UserShowOrgPopupPage} from '../UserShowOrgPopup/userShowOrgPopup.page';
import {OrganisationsService} from '../services/organisationsService';
import {ShowOrgInfoPopupPage} from '../ShowOrgInfoPopup/showOrgInfoPopup.page';
import {EditOrgInfoPopupPage} from '../EditOrgInfoPopup/editOrgInfoPopup.page';
import {ViewProductsPopupPage} from '../ViewProductsPopup/viewProductsPopup.page';
import {AddProductsPopupPage} from '../AddProductsPopup/addProductsPopup.page';
import {ViewVolunteersPopupPage} from '../ViewVolunteersPopup/viewVolunteersPopup.page';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-loggedOrgPage',
  templateUrl: './loggedOrg.page.html',
  styleUrls: ['./loggedOrg.page.scss'],
})

export class LoggedOrgPage implements  OnInit{
  organisation: User;
  loggedOrganisation: any;
  organisations: Organisation[];
  organisationSubscription: Subscription;
  subscriptionUserService: Subscription;
  constructor(private userService: UserService,
              private organisationsService: OrganisationsService,
              private modalController: ModalController
  ) {
  }

  ngOnInit(): void {
    this.subscriptionUserService = this.userService.user
      .subscribe(user => {
        this.organisation = user;
      });
    this.setLoggedOrganisation();
  }

  setLoggedOrganisation(): void{
    const title = this.organisation?.lastName + ' ' + this.organisation?.firstName;
    this.organisationSubscription = this.organisationsService.getLoggedInOrganisation(title).subscribe(response => {
      this.loggedOrganisation = response;
    });
  }
  async showInfo(){
    const modal = await  this.modalController.create({
      component: ShowOrgInfoPopupPage,
      componentProps: { organisation: this.loggedOrganisation }
    });
    return await modal.present();
  }
  async editInfo(){
    const modal = await  this.modalController.create({
      component: EditOrgInfoPopupPage,
      componentProps: { organisation: this.loggedOrganisation }
    });
    return await modal.present();
  }
  async viewVolunteers(){
    const modal = await  this.modalController.create({
      component: ViewVolunteersPopupPage,
      componentProps: { organisation: this.loggedOrganisation }
    });
    return await modal.present();
  }
  async viewProducts(){
    const modal = await  this.modalController.create({
      component: ViewProductsPopupPage,
      componentProps: { organisation: this.loggedOrganisation }
    });
    return await modal.present();
  }
  async addProducts(){
    const modal = await  this.modalController.create({
      component: AddProductsPopupPage,
      componentProps: { organisation: this.loggedOrganisation }
    });
    return await modal.present();
  }
}
