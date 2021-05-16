import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OrganisationsService} from '../services/organisationsService';
import {User} from '../Models/User.interface';
import {Subscription} from 'rxjs';
import {Organisation} from '../Models/Organisation.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-userShowOrgPopupPage',
  templateUrl: './userShowOrgPopup.page.html',
  styleUrls: ['./userShowOrgPopup.page.scss'],
})
export class UserShowOrgPopupPage implements OnInit{
  user: User;
  getAllOrganisationsSubscription: Subscription;
  organisations: Organisation[];
  constructor(private modalController: ModalController, private organisationsService: OrganisationsService) {}
  ngOnInit() {
    // eslint-disable-next-line max-len
    this.getAllOrganisationsSubscription = this.organisationsService.getOrganisationsForUser(this.user?.emailAddress).subscribe(response => {
      this.organisations = response;
    });
  }
  viewOrg(): void {
    this.getAllOrganisationsSubscription = this.organisationsService.getOrganisationsForUser(this.user.emailAddress).subscribe(response => {
      this.organisations = response;
    });
  }

  unsubscribe(organisation){
    this.organisationsService.deleteOrganisationForUser(this.user.emailAddress,organisation.title).subscribe(response => {
        console.log(response);
        this.viewOrg();
      },
      error => {
        console.log(error);
      });
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
}
