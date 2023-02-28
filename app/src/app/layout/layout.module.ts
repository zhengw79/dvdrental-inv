import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TopbarComponent,
    MainComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [MainComponent, TopbarComponent, SidebarComponent, FooterComponent]
})
export class LayoutModule { }
