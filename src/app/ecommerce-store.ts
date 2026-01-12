import { computed, inject } from "@angular/core";
import { Product } from "./models/products";
import { patchState, signalMethod, signalStore,
  withComputed, withMethods, withState} from '@ngrx/signals'
import {produce} from 'immer';
import { Toaster } from "./services/toaster";
import { CartItem } from "./models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./models/user";
import { Router } from "@angular/router";

export type EcommerceState = {
  products:Product[];
  category:String;
  wishlistItems:Product[];
  cartItems: CartItem[];
  user: User | undefined;
};

export const EcommerceStore = signalStore(
  {
    providedIn: 'root',
  },

  withState({
    products: [
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
    ],
    category:'all',
    wishlistItems:[],
    cartItems: [],
    user:undefined
  } as EcommerceState),
  withComputed(({category, products,wishlistItems})=>({
    filteredProducts: computed(()=>{
      const selected = category().toLowerCase();
      if(category()=== 'all'){
        return products();
      }

      if (selected === 'all') {
      return products();
      }

      return products().filter(p =>
        p.category.toLowerCase() === selected
      );
    }),
    wishlistCount: computed(()=> wishlistItems().length),
    cartCount: computed(()=>cartItems().reduce((acc,item)=> acc + item.quantity, 0)),
  })),
  withMethods((store, toaster=inject(Toaster),matDialog=inject(MatDialog), router=inject(Router))=>({
    setCategory: signalMethod<string>((category:string)=>{
      patchState(store, {category})
    }),
    addToWishlist: (product:Product)=>{
      const updatedWishlistItems = produce(store.wishlistItems(),(draft)=>{
        if(!draft.find(p=>p.id===product.id)){
          draft.push(product);
        }
      });

      patchState(store, {wishlistItems: updatedWishlistItems});
      toaster.success("Product added to wishlist")
    },

    removeFromWishlist:(product: Product)=>{
      patchState(store ,{
        wishlistItems:store.wishlistItems().filter((p)=>p.id!==product.id),
      });
      toaster.success('Product removed from wiahlist')
    },

    clearWishlist:()=>{
      patchState(store,{wishlistItems:[]});
    },

    addToCart: signalMethod<{ product: Product; quantity?: number }>(
      ({ product, quantity = 1 }) => {
        const existingItemIndex = store.cartItems().findIndex(
          i => i.product.id === product.id
        );

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }

          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });

        toaster.success(
          existingItemIndex !== -1
            ? 'Product added again'
            : 'Product added to the cart'
        );
      }
    ),

    setItemQuantity(params : {productId:string, quantity:number}){
      const index = store.cartItems().findIndex(c=>c.product.id===params.productId);
      const updated=produce(store.cartItems(),(draft)=>{
        draft[index].quantity=params.quantity
      })
      patchState(store,{cartItems:updated})
    },

    addAllWishlistToCart:()=>{
      const updatedCartItems = produce(store.cartItems(), (draft)=>{
        store.wishlistItems().forEach(p=>{
          if(!draft.find(c=>c.product.id===p.id)){
            draft.push({product: p, quantity:1});
          }
        })
      })

      patchState(store, {cartItems:updatedCartItems, wishlistItems:[]})
    },

    moveToWishlist:(product: Product)=>{
      const updatedCartItems = store.cartItems().filter((p)=>p.product.id !==product.id);
      const updatedWishlistItems=produce(store.wishlistItems(),(draft)=>{
        draft.push(product);
      });

      patchState(store,{cartItems:updatedCartItems,wishlistItems:updatedWishlistItems});
    },

    removeFromCart:(product:Product)=>{
      patchState(store, {cartItems:store.cartItems().filter(c=>c.product.id!==product.id),

      });
    },

    proceedToCheckout:()=>{
      if(!store.user()){
        matDialog.open(SignInDialog,{
          disableClose:true,
          data:{
            checkout:true,
          }
        });
        return;
      }
      router.navigate(['/checkout']);
    },

    signIn:({email, password, checkout,dialogId, }:SignInParams)=>{
      patchState(store,{
        user:{
          id:'1',
          email,
          name:'John Doe',
          imageUrl:'https://randomuser.me/api/portraits/men/1.jpg',
        }
      });

      matDialog.getDialogById(dialogId)?.close;

      if(checkout){
        router.navigate(['/checkout'])
      }
    },

    signUp:({email, password,name, checkout,dialogId, }:SignUpParams)=>{
      patchState(store,{
        user:{
          id:'1',
          email,
          name:'John Doe',
          imageUrl:'https://randomuser.me/api/portraits/men/1.jpg',
        }
      });

      matDialog.getDialogById(dialogId)?.close;

      if(checkout){
        router.navigate(['/checkout'])
      }
    },

    signOut:()=>{
      patchState(store,{user:undefined});
    }

    // addToCart(product: Product, quantity=1)=>{
    //   const existingItemIndex = store.cartItems().findIndex(i=>i.product.id=== product.id);

    //   const updatedCartItems = produce(store.cartItems(), (draft)=>{
    //     if(existingItemIndex !== -1 ){
    //       draft[existingItemIndex].quantity += quantity;
    //       return;
    //     }
    //     draft.push({
    //       product, quantity
    //     })
    //   });

    //   patchState(store, { cartItems:updatedCartItems})
    //   toaster.success(existingItemIndex ? 'Product added again':'Product added to the car')
    // }
  }))

)


