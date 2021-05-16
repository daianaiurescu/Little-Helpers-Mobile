import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {OrganisationsService} from '../services/organisationsService';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-editOrgInfoPopupPage',
  templateUrl: './editOrgInfoPopup.page.html',
  styleUrls: ['./editOrgInfoPopup.page.scss'],
})

export class EditOrgInfoPopupPage{
  organisation: any;
  constructor(private modalController: ModalController, private organisationsService: OrganisationsService){}
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CloseModal() {
    this.modalController.dismiss();
  }
  save(description): void {
    const data = {
      title: this.organisation.title,
      description: description.value
    };
    this.organisationsService.editDescription(data).subscribe(
      response => {
        console.log('Good' + response);
        this.organisation.description = description.value;
      },
      error => {
        console.log('Bad' + error);
      }
    );
  }
}
