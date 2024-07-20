import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShoppingComponent } from "./shopping/shopping.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShoppingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isActived = signal(true)

  activated() {
    this.isActived.set(false)
  }

  desactivated() {
    this.isActived.set(true)
  }

}
