import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '../product.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../shopping-cart/cart.service';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  product = input.required<Product>();
  cartService = inject(CartService)
  private breakpointObserver = inject(BreakpointObserver);
  screenSize?: string;
  added = signal<boolean>(false)
  quantity = signal<number>(0);

  imgView = computed(() => {
    if (this.screenSize === 'desktop') {
      return this.product().image.desktop
    } else if (this.screenSize === 'tablet') {
      return this.product().image.tablet;
    }
    return this.product().image.mobile
  })

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait,
    Breakpoints.HandsetLandscape,
    Breakpoints.TabletPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.Web,
    Breakpoints.WebLandscape]).subscribe({
      next: (result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.HandsetLandscape]) {
            this.screenSize = 'mobile';
          } else if (result.breakpoints[Breakpoints.TabletPortrait] || result.breakpoints[Breakpoints.TabletLandscape]) {
            this.screenSize = 'tablet';
          } else if (result.breakpoints[Breakpoints.Web] || result.breakpoints[Breakpoints.WebLandscape]) {
            this.screenSize = 'desktop';
          }
        }
      }
    })

    this.cartService.productsUpdate.subscribe({
      next: (cart) => {
        const productInCart = cart.find(item => item.name === this.product.name);

        if (!productInCart) {
          this.quantity.set(0);
          this.added.set(false);
        }
      }
    })

    const initialCart = this.cartService.productsViewCart();
    const productInCart = initialCart.find(item => item.name === this.product().name);

    if (productInCart) {
      this.quantity.set(productInCart.quantity);
      this.added.set(true);
    }
  }

  willAdded() {
    this.added.set(true);
    this.quantity.set(1);
    this.cartService.saveInCartProduct({
      image: this.product().image.thumbnail,
      name: this.product().name,
      price: this.product().price,
      quantity: this.quantity()
    })

  }

  decrement() {
    this.quantity.update((oldVal) => {
      if (oldVal > 1) {
        return oldVal - 1
      } else {
        this.added.set(false)
        return oldVal - 1;
      }
    })

    this.cartService.decrementQuantity(this.product().name, this.quantity())
  }

  increment() {
    this.quantity.update((oldVal) => oldVal + 1)
    this.cartService.saveInCartProduct({
      image: this.product().image.thumbnail,
      name: this.product().name,
      price: this.product().price,
      quantity: this.quantity()
    })
  }


}
