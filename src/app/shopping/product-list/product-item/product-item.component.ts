import { Component, computed, inject, input, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent implements OnInit {
  product = input.required<Product>();

  private breakpointObserver = inject(BreakpointObserver);

  screenSize?: string;


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
  }



}
