import { Component, computed, EventEmitter, inject, Output } from '@angular/core';
import { CartService } from '../../shopping/shopping-cart/cart.service';
import { Cart } from '../../shopping/shopping-cart/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.scss'
})
export class ConfirmOrderComponent {

  @Output() complete = new EventEmitter();

  private cartService = inject(CartService);

  productsInCart = this.cartService.productsViewCart;

  totalOrder = computed(() => {
    return this.productsInCart().reduce((acc, product) => {
      return acc + (product.price * product.quantity);
    }, 0);
  });

  shop() {
    this.cartService.clearCart();

    this.complete.emit();
  }
}
