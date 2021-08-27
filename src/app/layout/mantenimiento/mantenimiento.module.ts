import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ROUTING
import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
// PRIMENG
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { SpeedDialModule } from 'primeng/speeddial';
import { SidebarModule } from 'primeng/sidebar';
import { StepsModule } from 'primeng/steps';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';


//COMPONENTES
import { EmpresaComponent } from './empresa/empresa.component';
import { UnidadesComponent } from './unidades/unidades.component';
import { TipomotorComponent } from './tipomotor/tipomotor.component';
import { SenialesComponent } from './seniales/seniales.component';
import { TanqueComponent } from './tanque/tanque.component';
import { MantenimientoComponent } from './mantenimiento.component';
import { FormempresaComponent } from './empresa/formempresa/formempresa.component';
import { FormSenialesComponent } from './seniales/formSeniales/formSeniales.component';
import { FormTanqueComponent } from './tanque/formTanque/formTanque.component';
import { FormUnidadesComponent } from './unidades/formUnidades/formUnidades.component';
import { FormMotorComponent } from './tipomotor/formMotor/formMotor.component';
import { StepEmpresaComponent } from './empresa/formempresa/stepEmpresa/stepEmpresa.component';
import { StepCuartoComponent } from './empresa/formempresa/stepCuarto/stepCuarto.component';
import { StepSitioComponent } from './empresa/formempresa/stepSitio/stepSitio.component';

@NgModule({
  declarations: [
    MantenimientoComponent,
    EmpresaComponent,
    UnidadesComponent,
    TipomotorComponent,
    SenialesComponent,
    TanqueComponent,
    FormempresaComponent,
    FormSenialesComponent,
    FormMotorComponent,
    FormUnidadesComponent,
    FormTanqueComponent,
    StepEmpresaComponent,
    StepCuartoComponent,
    StepSitioComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LayoutModule,
    MantenimientoRoutingModule,
    CardModule,
    TableModule,
    SpeedDialModule,
    SidebarModule,
    StepsModule,
    MenuModule,
    ToastModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    InputSwitchModule,
    DialogModule,
    TagModule

  ],
  providers: [
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class MantenimientoModule { }
