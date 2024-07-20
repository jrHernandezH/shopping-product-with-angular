import { Component, inject } from '@angular/core';
import { ProductsService } from './products.service';
import { ProductItemComponent } from "./product-item/product-item.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  private productService = inject(ProductsService);

  listOfProducts = this.productService.listProducts;

}
