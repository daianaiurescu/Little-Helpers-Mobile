import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/productService';
import {Subscription} from 'rxjs';
import {Product} from '../Models/Product.interface';
import {CartService} from '../services/cartService';
import { UserService } from '../services/userService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})

export class ShopPage implements OnInit {

  constructor(private userService: UserService,private router: Router,private productService: ProductService, private cartService: CartService) {
    this.cartService.cartSubject.subscribe(data => typeof data === "number" ? this.cartNumber = data : data);

  }
  getAllProductsSubscription: Subscription;
  products: Product[];

  itemsCart: any = [];

  cartNumber = 0;

  ngOnInit(): void {
    this.getAllProductsSubscription = this.productService.getProducts().subscribe(response => {
      this.products = response;
      this.products.forEach(product => product.quantity = 1);

      this.cartNumberFunc2();
    });
  }

  inc(product: Product): void{
    console.log('aaa');
    if (product.quantity < product.stock){
      product.quantity += 1;
    }
  }

  dec(product: Product): void{
    console.log('bbb');
    if (product.quantity >= 1){
      product.quantity -= 1;
    }
  }
  addToCart(category): void{ 
    console.log('sss');
    const cartDataNull =
      localStorage.getItem('localCart');
    if (cartDataNull == null){
      const storeDataGet: any = [];
      storeDataGet.push(category);
      localStorage.setItem
      ('localCart',
        JSON.stringify(storeDataGet));
    }
    else{
      const id = category.prodId;
      let index = -1;
      this.itemsCart =
        JSON.parse
        (localStorage.getItem
        ('localCart'));
      for
      (let i = 0; i < this.itemsCart.length;
       i++){
        if (parseInt(id) === parseInt(this.itemsCart[i].prodId))
        {
          this.itemsCart[i].qnt =
            category.qnt;
          index = i;
          break;
        }
      }
      if (index === -1){
        this.itemsCart.push(category);
        localStorage.setItem
        ('localCart', JSON.stringify
        (this.itemsCart));
      }
      else{
        localStorage.setItem
        ('localCart', JSON.stringify
        (this.itemsCart));
      }
    }
   
    this.cartNumberFunc();
  }
  cartNumberFunc(): void{
    const cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }



  goToCart(): void{
    this.router.navigate(['cart']);
  }
 
  cartNumberFunc2(): void {
    if
    (localStorage.getItem
    ('localCart') != null) {
      const cartCount = JSON.parse(localStorage.getItem('localCart'));
      this.cartNumber = cartCount.length;
    }
  }
  
}
