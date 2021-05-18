import {Component, OnInit} from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from '@angular/router';
import {UserService} from '../services/userService';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit{

  ngOnInit(): void {
    console.log('Aici');
  }
  constructor(private router: Router, private userService: UserService) { }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  OpenPage(){

    if (this.userService.user.getValue().role === 'user') {
      this.router.navigate(['/userpage', this.userService.user.getValue().id]);
    }
    else{
      this.router.navigate(['loggedOrganisation', this.userService.user.getValue().id]);
    }
  }
  goToCart(){
    this.router.navigate(['cart']);
  }
}

