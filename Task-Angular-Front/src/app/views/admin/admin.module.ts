import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    MatIconModule ,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
