import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CartService } from './cart.service';
import { CurrencyPipe } from '@angular/common';
import { ConfirmOrderComponent } from "../../shared/confirm-order/confirm-order.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, ConfirmOrderComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cartService = inject(CartService)
  productsInCart = this.cartService.productsViewCart;
  viewModal = signal(false);


  removeProduc(name: string) {
    this.cartService.removeProduct(name);
  }

  totalOrder = computed(() => {
    return this.productsInCart().reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  });

  confirmOrder() {
    this.viewModal.set(true)
  }

  closeModal() {
    this.viewModal.set(false);
  }

}
