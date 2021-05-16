import { Component, OnInit } from '@angular/core';
import {Organisation} from '../Models/Organisation.interface';
import {OrganisationsService} from '../services/organisationsService';
import {Subscription} from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalpopuporgPage } from '../modalpopuporg/modalpopuporg.page';
import { ModalpopupvolPage } from '../modalpopupvol/modalpopupvol.page';
import {UserService} from '../services/userService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.page.html',
  styleUrls: ['./organizations.page.scss'],
})

export class OrganizationsPage implements OnInit {
  static getOrganization(): Organisation {
    throw new Error('Method not implemented.');
  }

  organisationPopupVisible: boolean;
  voluteeringPopupVisible: boolean;
  now: Date = new Date();
  organisations: Organisation[];
  getAllOrganisationsSubscription: Subscription;
  selectedOrganisation: Organisation;

  constructor(private organisationsService: OrganisationsService, private modalController: ModalController, private modalPopupOrgPage: ModalpopuporgPage, private userService: UserService, private router: Router) {
  }

   ngOnInit(): void {
     this.getAllOrganisationsSubscription = this.organisationsService.getOrganisations().subscribe( response => {
       this.organisations = response;
    });
   }
   getSelectedOrganisation(organisation): Organisation{
      this.selectedOrganisation = organisation;
      return this.selectedOrganisation;
   }

   saveVolunteer(fName, lName, bday, phone, email, desc): void{
     const data = {
       firstName: fName.value,
       lastName: lName.value,
       birthday: bday.value,
       phone: phone.value,
       email: email.value,
       description: desc.value,
       applied_at: this.selectedOrganisation.title
     };
     this.organisationsService.addVolunteer(data)
       .subscribe(
         response => {
           console.log(response);
         },
         error => {
           console.log(error);
         });
   }

   async OpenModal(){
    const modal = await  this.modalController.create({
      component: ModalpopuporgPage,
      componentProps: { selectedOrganisation: this.selectedOrganisation }
    });
    return await modal.present();
  }
  OpenPage(){

      if (this.userService.user.getValue().role === 'user') {
        this.router.navigate(['/userpage', this.userService.user.getValue().id]);
      }
      else{
        this.router.navigate(['loggedOrganisation', this.userService.user.getValue().id]);
      }
  }

}
