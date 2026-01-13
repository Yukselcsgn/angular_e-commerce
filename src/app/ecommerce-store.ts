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
import { Order } from "./models/order";
import { withStorageSync } from '@angular-architects/ngrx-toolkit'
import { AddReviewParams, UserReview } from "./models/user-review";

export type EcommerceState = {
  products:Product[];
  category:String;
  wishlistItems:Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading:boolean;
  selectedProductId: string|undefined;

  writeReview:boolean;
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
    reviewCount: 2,
    inStock: true,
    category: 'Elektronik',
    reviews: [
      {
        id: 'r1',
        productId: '1',
        userName: 'Ahmet Yılmaz',
        userImageUrl: 'https://i.pravatar.cc/150?img=1',
        rating: 5,
        title: 'Muhteşem ses',
        comment: 'Gürültü engelleme çok başarılı.',
        reviewDate: new Date('2025-01-10')
      },
      {
        id: 'r2',
        productId: '1',
        userName: 'Elif Demir',
        userImageUrl: 'https://i.pravatar.cc/150?img=2',
        rating: 4.6,
        title: 'Fiyat performans',
        comment: 'Biraz pahalı ama değer.',
        reviewDate: new Date('2025-01-14')
      }
    ]
  },

  {
    id: '2',
    name: 'Mekanik Oyuncu Klavyesi',
    description: 'RGB aydınlatmalı, Blue switch mekanik tuş takımı.',
    price: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800',
    rating: 4.5,
    reviewCount: 1,
    inStock: true,
    category: 'Aksesuar',
    reviews: [
      {
        id: 'r3',
        productId: '2',
        userName: 'Mert Kaya',
        userImageUrl: 'https://i.pravatar.cc/150?img=3',
        rating: 4.5,
        title: 'Oyuncular için iyi',
        comment: 'Tuş hissi çok başarılı.',
        reviewDate: new Date('2025-01-09')
      }
    ]
  },

  {
    id: '3',
    name: 'Akıllı Saat Pro',
    description: 'Kalp ritmi ve GPS özellikli akıllı saat.',
    price: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    rating: 4.2,
    reviewCount: 2,
    inStock: false,
    category: 'Elektronik',
    reviews: [
      {
        id: 'r4',
        productId: '3',
        userName: 'Can Özkan',
        userImageUrl: 'https://i.pravatar.cc/150?img=4',
        rating: 4,
        title: 'Fonksiyonel',
        comment: 'Biraz ağır ama özellikleri iyi.',
        reviewDate: new Date('2024-12-28')
      },
      {
        id: 'r5',
        productId: '3',
        userName: 'Zeynep Arslan',
        userImageUrl: 'https://i.pravatar.cc/150?img=5',
        rating: 4.4,
        title: 'Spor için ideal',
        comment: 'GPS oldukça hassas.',
        reviewDate: new Date('2025-01-04')
      }
    ]
  },

  {
    id: '4',
    name: 'Minimalist Sırt Çantası',
    description: 'Su geçirmez kumaş, laptop bölmeli.',
    price: 950,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    rating: 4.7,
    reviewCount: 1,
    inStock: true,
    category: 'Aksesuar',
    reviews: [
      {
        id: 'r6',
        productId: '4',
        userName: 'Burak Koç',
        userImageUrl: 'https://i.pravatar.cc/150?img=6',
        rating: 5,
        title: 'Çok kullanışlı',
        comment: 'Laptop için birebir.',
        reviewDate: new Date('2025-01-11')
      }
    ]
  },

  {
    id: '5',
    name: '4K Ultra HD Monitör',
    description: '144Hz ve yüksek renk doğruluğu.',
    price: 7400,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    rating: 4.9,
    reviewCount: 1,
    inStock: true,
    category: 'Elektronik',
    reviews: [
      {
        id: 'r7',
        productId: '5',
        userName: 'Selin Aksoy',
        userImageUrl: 'https://i.pravatar.cc/150?img=7',
        rating: 5,
        title: 'Profesyonel',
        comment: 'Renkler mükemmel.',
        reviewDate: new Date('2025-01-06')
      }
    ]
  },

  {
    id: '6',
    name: 'Ergonomik Ofis Koltuğu',
    description: 'Bel destekli ergonomik tasarım.',
    price: 4100,
    imageUrl: 'https://images.unsplash.com/photo-1505797149-4510f9268965?w=800',
    rating: 4.4,
    reviewCount: 1,
    inStock: true,
    category: 'Mobilya',
    reviews: [
      {
        id: 'r8',
        productId: '6',
        userName: 'Hakan Şahin',
        userImageUrl: 'https://i.pravatar.cc/150?img=8',
        rating: 4.4,
        title: 'Rahat',
        comment: 'Uzun süre oturunca fark ediyor.',
        reviewDate: new Date('2025-01-13')
      }
    ]
  },

  {
    id: '7',
    name: 'Taşınabilir Bluetooth Hoparlör',
    description: 'IPX7 su geçirmez bluetooth hoparlör.',
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1608156639585-34a072755c96?w=800',
    rating: 4.6,
    reviewCount: 1,
    inStock: true,
    category: 'Elektronik',
    reviews: [
      {
        id: 'r9',
        productId: '7',
        userName: 'Ece Polat',
        userImageUrl: 'https://i.pravatar.cc/150?img=9',
        rating: 4.6,
        title: 'Ses güçlü',
        comment: 'Dış mekan için ideal.',
        reviewDate: new Date('2025-01-07')
      }
    ]
  },

  {
    id: '8',
    name: 'Kahve Demleme Seti',
    description: 'Profesyonel V60 kahve seti.',
    price: 650,
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2211d44b565a?w=800',
    rating: 4.8,
    reviewCount: 1,
    inStock: true,
    category: 'Mutfak',
    reviews: [
      {
        id: 'r10',
        productId: '8',
        userName: 'Ayşe Korkmaz',
        userImageUrl: 'https://i.pravatar.cc/150?img=10',
        rating: 5,
        title: 'Kahve severler için',
        comment: 'Demleme çok keyifli.',
        reviewDate: new Date('2025-01-02')
      }
    ]
  },

  {
    id: '9',
    name: 'Kablosuz Mouse Ergo',
    description: 'Dikey ergonomik mouse.',
    price: 850,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    rating: 4.3,
    reviewCount: 1,
    inStock: true,
    category: 'Aksesuar',
    reviews: [
      {
        id: 'r11',
        productId: '9',
        userName: 'Onur Çelik',
        userImageUrl: 'https://i.pravatar.cc/150?img=11',
        rating: 4.3,
        title: 'Bilek dostu',
        comment: 'Uzun kullanımda fark yaratıyor.',
        reviewDate: new Date('2025-01-12')
      }
    ]
  },

  {
    id: '10',
    name: 'Akıllı Ev Ampul Seti',
    description: 'Wi-Fi bağlantılı akıllı ampul.',
    price: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?w=800',
    rating: 4.5,
    reviewCount: 1,
    inStock: true,
    category: 'Ev',
    reviews: [
      {
        id: 'r12',
        productId: '10',
        userName: 'Deniz Uçar',
        userImageUrl: 'https://i.pravatar.cc/150?img=12',
        rating: 4.5,
        title: 'Kurulumu kolay',
        comment: 'Mobil uygulama sorunsuz.',
        reviewDate: new Date('2025-01-03')
      }
    ]
  },

  {
    id: '11',
    name: 'Profesyonel Grafik Tablet',
    description: 'Pilsiz kalem teknolojisi.',
    price: 2900,
    imageUrl: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800',
    rating: 4.7,
    reviewCount: 1,
    inStock: false,
    category: 'Elektronik',
    reviews: [
      {
        id: 'r13',
        productId: '11',
        userName: 'Melis Aydın',
        userImageUrl: 'https://i.pravatar.cc/150?img=13',
        rating: 4.7,
        title: 'Çizim için harika',
        comment: 'Basınç hassasiyeti çok iyi.',
        reviewDate: new Date('2025-01-08')
      }
    ]
  },

  {
    id: '12',
    name: 'Yoga ve Egzersiz Matı',
    description: 'Kaymaz yüzeyli yoga matı.',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800',
    rating: 4.6,
    reviewCount: 1,
    inStock: true,
    category: 'Spor',
    reviews: [
      {
        id: 'r14',
        productId: '12',
        userName: 'Seda Karaca',
        userImageUrl: 'https://i.pravatar.cc/150?img=14',
        rating: 4.6,
        title: 'Kaymıyor',
        comment: 'Yoga için çok rahat.',
        reviewDate: new Date('2025-01-01')
      }
    ]
  }
    ],
    category:'all',
    wishlistItems:[],
    cartItems: [],
    user:undefined,

    loading:false,
    selectedProductId:undefined,

    writeReview:false,
  } as EcommerceState),
  withStorageSync({key:'modern-store', select:({wishlistItems,cartItems,user})=>({wishlistItems,cartItems,user})}),
  withComputed(({category, products, wishlistItems,cartItems,selectedProductId})=>({
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
    selectedProduct:computed(()=>products().find((p)=>p.id===selectedProductId()))
  })),
  withMethods((store, toaster=inject(Toaster),matDialog=inject(MatDialog), router=inject(Router))=>({
    setCategory: signalMethod<string>((category:string)=>{
      patchState(store, {category})
    }),
    setProductId:signalMethod<string>((productId:string)=>{
      patchState(store,{selectedProductId:productId})
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

    placeOrder:async()=>{
      patchState(store, { loading:true});

      const user=store.user();

      if(!user){
        toaster.error('Please login before continuing order');
        patchState(store, { loading:false});
        return;
      }
      const order:Order = {
        id: crypto.randomUUID(),
        userId:user.id,
        total:Math.round(store
          .cartItems()
          .reduce((acc,item)=>acc+item.quantity*item.product.price,0)),
        items:store.cartItems(),
        paymentStatus:'success',
      };

      await new Promise((resolve)=>setTimeout(resolve,1000));
      patchState(store,{loading:false, cartItems:[]});
      router.navigate(['order-success']);
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
    },

    showWriteReview:()=>{
      patchState(store,{writeReview:true});
    },

    hideWriteReview:()=>{
      patchState(store, { writeReview:false});
    },

    addReview:async({title,comment,rating}:AddReviewParams)=>{
      patchState(store,{loading:true});
      const product=store.products().find((p)=>p.id===store.selectedProductId())

      if(!product){
        patchState(store, {loading:false});
        return;
      }

      const review:UserReview={
        id:crypto.randomUUID(),
        title,
        comment,
        rating,
        productId:product.id,
        userName:store.user()?.name||'',
        userImageUrl:store.user()?.imageUrl||'',
        reviewDate:new Date(),

      };

      const updatedProducts = produce(store.products(),(draft)=>{
        const index = draft.findIndex((p)=>p.id===product.id)
        draft[index].reviews.push(review);
        draft[index].rating=
          Math.round(
            (draft[index].reviews.reduce((acc,r)=>acc+r.rating,0)/
              draft[index].reviews.length)*
              10,
          )/10;
          draft[index].reviewCount=draft[index].reviews.length;
      });
      await new Promise((resolve)=>setTimeout(resolve,1000));
      patchState(store,{loading:false,products:updatedProducts,writeReview:false});
    },

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


