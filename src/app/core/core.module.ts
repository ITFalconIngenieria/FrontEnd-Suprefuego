import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorService } from './services/motor/motor.service';
import { SenialService } from './services/senial/senial.service';
import { WebsocketService } from './services/websocket/websocket.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [MotorService
  , SenialService
  , WebsocketService]
})
export class CoreModule { }
