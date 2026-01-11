import { ProductCard } from '../../components/product-card.ts/product-card';
import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import {MatSidenavContainer, MatSidenavContent, MatSidenav} from '@angular/material/sidenav'
import { from } from 'rxjs';
import {MatNavList, MatListItem} from '@angular/material/list'
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { MatIcon } from "@angular/material/icon";
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer,
    MatSidenavContent, MatNavList, MatListItem, RouterLink,
    TitleCasePipe, MatIcon, ToggleWishlistButton],
  template: `

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class= "text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
            @for(cat of categories(); track cat){
              <mat-list-item [activated]="cat === category()" class="my-2" [routerLink]="['/products', cat]">
                <span matListItemTitle class="font-medium" [class]="cat === category() ? '!text-white': null">
                  {{cat | titlecase}}
                </span>
              </mat-list-item>
            }

          </mat-nav-list>

        </div>


      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2x1 font-bold text-gray-900 mb-1">{{category() | titlecase}}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{store.filteredProducts().length}} products found
        </p>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
          <app-product-card [product]="product" >
            <app-toggle-wishlist-button class ="!absolute z-10 top-3 right-3 w-10 h-10 rounded-full"  [product]="product"></app-toggle-wishlist-button>
          </app-product-card>
        }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>


    <div class = "bg-gray-100 p-6 h-full">
      <h1 class="text-2x1 font-bold text-gray-900">{{category()}}</h1>
        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>

  `,
  styles: ``,
})
export default class ProductGrid {

  category = input<string>('all');

  store = inject(EcommerceStore);

  categories = signal<string[]>(['all','elektronik','aksesuar','mobilya','mutfak','ev','spor'])

  constructor(){
    this.store.setCategory(this.category);
  }

  addToCart(){

  }
//   filteredProducts = computed(() => {
//   const selected = this.category().toLowerCase();

//   if (selected === 'all') {
//     return this.products();
//   }

//   return this.products().filter(p =>
//     p.category.toLowerCase() === selected
//   );
// });

  //filteredProducts=computed(()=>this.products().filter(p=>p.category===this.category().toLowerCase()));
}
