import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {
    path: "",
    "component": OrderComponent,
    "children": [
      {
        "path": "customer",
        "component": CustomersComponent
      },
      {
        "path": "customer/:customer_id",
        "component": CustomerComponent
      },
      {
        "path": "customer/create",
        "component": CustomerComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OrderRoutingModule { }
