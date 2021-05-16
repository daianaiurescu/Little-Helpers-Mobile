import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {OrganisationsService} from '../services/organisationsService';
import {Volunteer} from '../Models/Volunteer.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-viewVolunteersPopup',
  templateUrl: './viewVolunteersPopup.page.html',
  styleUrls: ['./viewVolunteersPopup.page.scss'],
})

export class ViewVolunteersPopupPage implements OnInit{
  organisation: any;
  getAllVolunteersSubscription: Subscription;
  volunteers: Volunteer[];
  constructor(private modalController: ModalController, private organisationsService: OrganisationsService) {
  }
  ngOnInit(): void {
    this.getAllVolunteersSubscription = this.organisationsService.getVolunteers().subscribe(response =>
      this.volunteers = response.filter(volunteer => volunteer.applied_at === this.organisation?.title));
  }
  viewVolunteers(): void {
    this.getAllVolunteersSubscription = this.organisationsService.getVolunteers().subscribe(response =>
      this.volunteers = response.filter(volunteer => volunteer.applied_at === this.organisation?.title));
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DeleteVolunteer(volunteer){
      const data = {
        email: volunteer.email
      };
    this.organisationsService.deleteVolunteer(data).subscribe(response => {
        console.log(response);
        this.viewVolunteers();
      },
      error => {
        console.log(error);
      });
  }
}
