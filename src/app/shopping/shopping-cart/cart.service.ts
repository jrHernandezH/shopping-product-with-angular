import { inject, Injectable, signal } from '@angular/core';
import { Cart } from './cart.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart = signal<Cart[]>([{
    "image": "./assets/images/image-waffle-thumbnail.jpg",
    "name": "Waffle with Berries",
    "quantity": 2,
    "price": 6.50
  }])

  private cartSubject = new BehaviorSubject<Cart[]>(this.productsInCart());

  productsUpdate = this.cartSubject.asObservable();

  productsViewCart = this.productsInCart.asReadonly();

  saveInCartProduct(newProduct: Cart) {
    this.productsInCart.update(cart => {
      const existingProduct = cart.find(product => product.name === newProduct.name);
      if (existingProduct) {
        return cart.map(product =>
          product.name === newProduct.name
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...cart, newProduct];
      }
    });
  }

  decrementQuantity(name: string, newQuantity: number) {
    this.productsInCart.update(cart => {
      const existingProduct = cart.find(product => product.name === name);
      if (existingProduct && newQuantity > 0) {
        return cart.map(product =>
          product.name === name
            ? { ...product, quantity: newQuantity }
            : product
        );
      } else {
        return cart.filter(product => product.name !== name);
      }
    });
  }

  removeProduct(name: string) {
    this.productsInCart.update((product) => product.filter((search) => search.name != name));
    this.cartSubject.next(this.productsInCart());
  }

  clearCart() {
    this.productsInCart.set([]);
    this.cartSubject.next(this.productsInCart());
  }
}
