import {Organisation} from '../Models/Organisation.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Volunteer} from '../Models/Volunteer.interface';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  }
)
export class OrganisationsService{
  private apiUrl = environment.api;

  constructor(private httpClient: HttpClient){}
  // tslint:disable-next-line:typedef
   getOrganisations(){
    return this.httpClient.get<Array<Organisation>>(this.apiUrl + 'Organisations');
  }

  // tslint:disable-next-line:typedef
  editDescription(data: any){
    console.log(data);
    return this.httpClient.post(this.apiUrl + 'ChangeOrganisationDetails', data);
  }

  addVolunteer(data: any): Observable<any> {
    return this.httpClient.post(this.apiUrl + 'SaveVolunteer', data);
  }

  getOrganisationsForUser(data: any): Observable<any> {
    return this.httpClient.get<Array<Organisation>>(this.apiUrl + 'UserOrganisations/' + data);
  }
  // tslint:disable-next-line:typedef
  getLoggedInOrganisation(title){
    return this.httpClient.get(this.apiUrl + 'Organisations/' + title);
  }
  deleteOrganisationForUser(email: any , organisationName: any ) {
    console.log(email);
    console.log(organisationName);
    return this.httpClient.delete(this.apiUrl + 'DeleteOrganisation/' + email + '/' + organisationName);
  }
  // tslint:disable-next-line:typedef
  getVolunteers(){
    return this.httpClient.get<Array<Volunteer>>(this.apiUrl + 'GetVolunteers');
  }
  // tslint:disable-next-line:typedef
  deleteVolunteer(data: any){
    return this.httpClient.delete(this.apiUrl + 'DeleteVolunteer/' + data.email).pipe(tap(() => {
    }));
  }
}
