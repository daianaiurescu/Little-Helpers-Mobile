import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Organisation } from '../Models/Organisation.interface';
import { OrganizationsPage } from '../organizations/organizations.page';

@Component({
  selector: 'app-modalpopuporg',
  templateUrl: './modalpopuporg.page.html',
  styleUrls: ['./modalpopuporg.page.scss'],
})
@Injectable({
  providedIn: 'root'
})
export class ModalpopuporgPage implements OnInit {

  @Input()
  selectedOrganisation: Organisation;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.selectedOrganisation);
  
  }

  CloseModal() {
    this.modalController.dismiss();
  }
}
