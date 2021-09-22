import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
// PRIMENG - MENU
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { DockModule } from 'primeng/dock';
import { TmotorPipe } from './pipe/tmotor.pipe';
import { SenialPipe } from './pipe/senial.pipe';
import { TanquePipe } from './pipe/tanque.pipe';
// FONT AWESOME
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    TmotorPipe,
    SenialPipe,
    TanquePipe
  ],
  exports: [
    FooterComponent,
    MenuComponent,
    TmotorPipe,
    SenialPipe,
    TanquePipe
  ],
  imports: [
    CommonModule,
    TabViewModule,
    DialogModule,
    ButtonModule,
    SidebarModule,
    DockModule
  ]
})
export class SharedModule { }