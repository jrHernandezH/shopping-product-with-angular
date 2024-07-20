import { Component } from '@angular/core';
import { ProductListComponent } from "./product-list/product-list.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [ProductListComponent, ShoppingCartComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss'
})
export class ShoppingComponent {

}
