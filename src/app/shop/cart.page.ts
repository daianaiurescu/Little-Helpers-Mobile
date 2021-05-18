import {Component, OnInit} from '@angular/core';
import {Product} from '../Models/Product.interface';
import {CartService} from '../services/cartService';
import {UserService} from '../services/userService';
import {Router} from '@angular/router';
import {UserEditInfoPopupPage} from '../UserEditInfoPopup/userEditInfoPopup.page';
import {ModalController} from '@ionic/angular';
import {ClientDetailsPopupPage} from '../clientDetailsPopup/clientDetailsPopup.page';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})

export class CartPage implements OnInit{
  cartDetails: Product[];
  total: number;
  cartNumber = 0;
  constructor(private cartService: CartService, private userService: UserService, private router: Router, private modalController: ModalController) {
  }
  ngOnInit(): void {
    if (localStorage.getItem('localCart')) {
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
    }
    this.loadCart();
  }
  loadCart(): any{
    if (localStorage.getItem('localCart')){
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
      // tslint:disable-next-line:only-arrow-functions typedef
      this.total = this.cartDetails.reduce(function(acc, val){
          return acc + (val.price * val.quantity);
        }, 0);
    }
  }
  incQnt(prodId, qnt): void{
    for (let i = 0; i < this.cartDetails.length; i++){
      if (this.cartDetails[i].id === prodId){
        if (qnt <= this.cartDetails[i].stock) {
          this.cartDetails[i].quantity = parseInt(qnt) + 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
    this.loadCart();
  }

  decQnt(prodId, qnt): void{
    for (let i = 0; i < this.cartDetails.length; i++){
      if (this.cartDetails[i].id === prodId){
        if (qnt !== 1) {
          this.cartDetails[i].quantity = parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
    this.loadCart();
  }

  deleteProduct(cartDetail): void{
    if (localStorage.getItem('localCart')){
      this.cartDetails = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.cartDetails.length; i++){
        if (this.cartDetails[i].id === cartDetail){
          this.cartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }
  cartNumberFunc(): void{
    const cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }
  removeAll(): void{
    localStorage.removeItem('localCart');
    this.cartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  OpenPage(){

    if (this.userService.user.getValue().role === 'user') {
      this.router.navigate(['/userpage', this.userService.user.getValue().id]);
    }
    else{
      this.router.navigate(['loggedOrganisation', this.userService.user.getValue().id]);
    }
  }
  async openClientDetails(){
    const modal = await  this.modalController.create({
      component: ClientDetailsPopupPage,
      componentProps: { total: this.total,
                        cartDetails: this.cartDetails,
                        cartNumber: this.cartNumber}
    });
    return await modal.present();
  }

}
