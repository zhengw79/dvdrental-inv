import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '../layout/layout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LayoutModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
