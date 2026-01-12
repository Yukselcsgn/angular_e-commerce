import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatDialogClose, 
    MatIcon,
    MatIconButton,
    MatFormField,
    MatSuffix,
    MatPrefix,
    MatButton,
    ReactiveFormsModule],
  template: `
    <div class="p-8 min-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <h2 class="text-xl font-medium mb-1">Sign Up</h2>
        <p class="text-sm text-gray-500">Join Us and start shopping today</p>
      </div>
      <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
        <mat-icon>Close</mat-icon>
      </button>


      <form [formGroup]="signUpForm" class="mt-6 flex flex-col" (ngSubmit)="signUp()">
        <mat-form-field class="mb-4">
          <input formControlName="name" matInput type="text" placeholder="Enter your name"/>
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input matInput type="email" placeholder="Enter your name"/>
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-4">
          <input formControlName="email" matInput type="password" placeholder="Enter your email"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input matInput formControlName="password" type="password" placeholder="Enter your password"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input matInput formControlName="confirmPassword" type="password" placeholder="Confirm your password"/>
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full" [disabled]="store.loading()">
          Create Account
        </button>
      </form>
        <p class="text-sm text-gray-500 mt-2 text-center">
          Already have an account?
          <a class="text-blue-600 cursor-pointer" (click)="openSignUpDialog()">Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef)
  store = inject(EcommerceStore);
  matDialog=inject(MatDialog);
  data = inject<{checkout:boolean}>(MAT_DIALOG_DATA);

  signUpForm = this.fb.group({
    name:['John D',Validators.required],
    email:['johnd@test.com',Validators.required],
    password:['johnd@test.com',Validators.required],
    confirmPassword:['johnd@test.com',Validators.required],
  })

  signUp(){
    if(!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched();
      return;
    }

    const{name, email, password}=this.signUpForm.value;

    this.store.signUp({
      name, 
      email,
      password,
      dialogId:this.dialogRef.id, 
      checkout:this.data?.checkout}as SignUpParams);
  }

  openSignUpDialog(){
    this.matDialog.open(SignInDialog,{
      disableClose:true,
      data:{
        checkout:this.data?.checkout
      }
    })
  }

}
