import { Component, input } from '@angular/core';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-card',
  imports: [],
  template: `
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">

      <img [src]="product().imageUrl" class="w-full h-[300px] object-cover rounded"/>
          
      <div class="p-5 flex flex-col flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight"></h3>
          {{product().name}}
      </div>

    </div>
  `,
  styles: ``,
})


export class ProductCard {
  product = input.required<Product>()
}
