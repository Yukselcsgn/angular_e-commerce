import { ProductCard } from '../../components/product-card.ts/product-card';
import { Component, computed, input, signal } from '@angular/core';
import { Product } from '../../models/products';
import {MatSidenavContainer, MatSidenavContent, MatSidenav} from '@angular/material/sidenav'
import { from } from 'rxjs';
import {MatNavList, MatListItem} from '@angular/material/list'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  imports: [ProductCard, MatSidenav, MatSidenavContainer,
     MatSidenavContent, MatNavList,MatListItem, RouterLink],
  template: `

    <mat-sidenav-container>
      <mat-sidenav mode="side" opened="true">
        <div class="p-6">
          <h2 class= "text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
            @for(category of categories(); track category){
              <mat-list-item class="my-2" [routerLink]="['/products', category]">
                <span matListItemTitle>
                  {{category}}
                </span>
              </mat-list-item>
            }

          </mat-nav-list>

        </div>


      </mat-sidenav>
      <mat-sidenav-content class="bg-gray-100 p-6 h-full">
        <h1 class="text-2x1 font-bold text-gray-900">{{category()}}</h1>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
          <app-product-card [product]="product" />
        }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>


    <div class = "bg-gray-100 p-6 h-full">
      <h1 class="text-2x1 font-bold text-gray-900">{{category()}}</h1>
        <div class="responsive-grid">
          @for (product of filteredProducts(); track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>
    
  `,
  styles: ``,
})
export default class ProductGrid {

  category = input<string>('all');

  products = signal<Product[]>([
    {
    id: '1',
    name: 'Modern Kablosuz Kulaklık',
    description: 'Aktif gürültü engelleme ve 40 saat pil ömrü ile yüksek kaliteli ses deneyimi.',
    price: 2499,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    rating: 4.8,
    reviewCount: 1250,
    inStock: true,
    category: 'Elektronik'
  },
  {
    id: '2',
    name: 'Mekanik Oyuncu Klavyesi',
    description: 'RGB aydınlatmalı, Blue switch mekanik tuş takımı ve özelleştirilebilir makro tuşları.',
    price: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    rating: 4.5,
    reviewCount: 840,
    inStock: true,
    category: 'Aksesuar'
  },
  {
    id: '3',
    name: 'Akıllı Saat Pro',
    description: 'Kalp ritmi, uyku takibi ve dahili GPS ile sporcular için ideal yol arkadaşı.',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    rating: 4.2,
    reviewCount: 560,
    inStock: false,
    category: 'Elektronik'
  },
  {
    id: '4',
    name: 'Minimalist Sırt Çantası',
    description: 'Su geçirmez kumaş ve 15.6 inç laptop bölmesi ile günlük kullanım için tasarlandı.',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    rating: 4.7,
    reviewCount: 320,
    inStock: true,
    category: 'Aksesuar'
  },
  {
    id: '5',
    name: '4K Ultra HD Monitör',
    description: '144Hz yenileme hızı ve %99 sRGB renk doğruluğu ile profesyonel tasarımcı ekranı.',
    price: 7400,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    rating: 4.9,
    reviewCount: 150,
    inStock: true,
    category: 'Elektronik'
  },
  {
    id: '6',
    name: 'Ergonomik Ofis Koltuğu',
    description: 'Bel destekli, nefes alabilen file kumaş ve 4D ayarlanabilir kolçaklar.',
    price: 4100,
    imageUrl: 'https://images.unsplash.com/photo-1505797149-4510f9268965?w=800',
    rating: 4.4,
    reviewCount: 210,
    inStock: true,
    category: 'Mobilya'
  },
  {
    id: '7',
    name: 'Taşınabilir Bluetooth Hoparlör',
    description: 'IPX7 su geçirmezlik sertifikası ve derin bas performansı ile dış mekan partileri için.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1608156639585-34a072755c96?w=800',
    rating: 4.6,
    reviewCount: 430,
    inStock: true,
    category: 'Elektronik'
  },
  {
    id: '8',
    name: 'Kahve Demleme Seti',
    description: 'V60 demleme aparatı, hassas terazi ve 600ml cam sürahi dahil profesyonel set.',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2211d44b565a?w=800',
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    category: 'Mutfak'
  },
  {
    id: '9',
    name: 'Kablosuz Mouse Ergo',
    description: 'Bilek yorgunluğunu azaltan dikey tasarım ve ayarlanabilir DPI seçenekleri.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    rating: 4.3,
    reviewCount: 275,
    inStock: true,
    category: 'Aksesuar'
  },
  {
    id: '10',
    name: 'Akıllı Ev Ampul Seti',
    description: '16 milyon renk seçeneği, Wi-Fi bağlantısı ve sesli komut desteği (3\'lü paket).',
    price: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=800',
    rating: 4.5,
    reviewCount: 180,
    inStock: true,
    category: 'Ev'
  },
  {
    id: '11',
    name: 'Profesyonel Grafik Tablet',
    description: '8192 basınç hassasiyeti seviyesi ve pilsiz kalem teknolojisi ile çizim keyfi.',
    price: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800',
    rating: 4.7,
    reviewCount: 115,
    inStock: false,
    category: 'Elektronik'
  },
  {
    id: '12',
    name: 'Yoga ve Egzersiz Matı',
    description: 'Kaymaz yüzey, 6mm kalınlık ve taşıma askısı ile konforlu spor deneyimi.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800',
    rating: 4.6,
    reviewCount: 540,
    inStock: true,
    category: 'Spor'
  }
  ]);

  filteredProducts = computed(()=>{
    const selected = this.category().toLowerCase();
    if(this.category()=== 'all'){
      return this.products();
    }

    if (selected === 'all') {
     return this.products();
   }

   return this.products().filter(p =>
     p.category.toLowerCase() === selected
   );

    
  })

  categories = signal<string[]>(['all','elektronik','aksesuar','mobilya','mutfak','ev','spor'])

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
