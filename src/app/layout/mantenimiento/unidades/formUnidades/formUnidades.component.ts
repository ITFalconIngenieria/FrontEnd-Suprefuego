import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formUnidades',
  templateUrl: './formUnidades.component.html',
  styleUrls: ['./formUnidades.component.scss']
})
export class FormUnidadesComponent implements OnInit, AfterContentChecked {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  unidades: any[] = [];
  marca: string;
  deleteId: any;
  unidadesUpdate: any[] = [];
  formDiesel: FormGroup;
  formElectrico: FormGroup;
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef,
    private messageService: MessageService
  ) { }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.getMotor();
    this.formElectrico = this.fb.group({
      electricoMotorMarca: [null, [Validators.required]]
      , electricoMotorModelo: [null, [Validators.required]]
      , electricoMotorSerie: [null, [Validators.required]]
      , electricoMotorNumero: [null, [Validators.required]]
      , electricoMotorHp: [null, [Validators.required]]
      , electricoMotorRpm: [null, [Validators.required]]
      , electricoControllerMarca: [null, [Validators.required]]
      , electricoControllerHp: [null, [Validators.required]]
      , electricoControllerVoltaje: [null, [Validators.required]]
      , electricoControllerFase: [null, [Validators.required]]
      , electricoControllerFrecuencia: [null, [Validators.required]]
      , electricoControllerPresion: [null, [Validators.required]]
    });

    this.formDiesel = this.fb.group({
      dieselMotorMarca: [null, [Validators.required]]
      , dieselMotorModelo: [null, [Validators.required]]
      , dieselMotorSerie: [null, [Validators.required]]
      , dieselMotorNumero: [null, [Validators.required]]
      , dieselMotorHp: [null, [Validators.required]]
      , dieselMotorRpm: [null, [Validators.required]]
      , dieselControllerMarca: [null, [Validators.required]]
      , dieselControllerModelo: [null, [Validators.required]]
      , dieselControllerNumero: [null, [Validators.required]]
      , dieselControllerDc: [null, [Validators.required]]
      , dieselControllerAc: [null, [Validators.required]]
      , dieselControllerPSI: [null, [Validators.required]]
      , dieselControllerCatalogo: [null, [Validators.required]]
      , dieselControllerPresion: [null, [Validators.required]]
      , dieselControllerFase: [null, [Validators.required]]
    });
  }

  onRowEditInit() {
    this.unidadesUpdate = this.unidades;
  }

  getMotor() {
    this.motorService.getMotor()
      .subscribe(
        (body: any) => { this.showMotor(body.data.details) }
        , (err) => { this.showError('Error al obtener los datos.') }
      );
  }

  showMotor(data) {
    this.unidades = data;
  }

  postMotor(tipo) {
    let controller: any;
    switch (tipo) {
      case 1:
        controller = {
          marca: '',
          frecuencia: '',
          voltaje: '',
          presion: '',
          hp: '',
          fase: ''
        }
        break;
      case 2:
        controller = {
          marca: '',
          modelo: '',
          serie: '',
          dc: '',
          ac: '',
          psi: '',
          catalogo: '',
          presion: '',
          fase: ''
        }
        break;
      default:

        break;
    }
    let body: any = {
      id: 0,
      tipo: tipo,
      estado: 1,
      motor: {
        marca: '',
        modelo: '',
        serie: '',
        numero: '',
        hp: '',
        rpm: ''
      },
      controlador: controller
    };

    this.unidades.unshift(body);
  }

  onRowEditSave(unidad) {
    let index = this.unidades.map((d) => { return d.id }).indexOf(unidad.id);

    if (unidad.id === 0) {
      this.motorService.dataPost(unidad)
        .subscribe(
          (body: any) => {
            this.unidades.splice(index, 1, body.data.details);
            this.successMessage('Datos guardados.');
          }
          , (err) => { this.showError('Error al guardar el registro.') }
        );
    } else {
      this.motorService.dataPut(unidad)
        .subscribe(
          (data: any[]) => { this.successMessage('Datos actualizados.') }
          , (err) => { this.showError('Error al actualizar el registro.') }
        );
    }
  }

  onRowEditDelete(id) {
    this.deleteId = id;
    this.showConfirm();
  }

  onDelete(unidad) {
    let index = this.unidades.map((d) => { return d.id }).indexOf(unidad.id);
    this.unidades.splice(index, 1);
  }

  onRowBack(unidad) {
    if (unidad.id === 0) {
      let index = this.unidades.map((d) => { return d.id }).indexOf(unidad.id);
      this.unidades.splice(index, 1);
    } else {
      this.unidades = this.unidadesUpdate;
    }
  }

  successMessage(detail) {
    this.messageService.add({ key: 's', severity: 'success', summary: 'Correcto', detail: detail });
  }

  infoMessage(detail) {
    this.messageService.add({ key: 'i', severity: 'info', summary: 'Info', detail: detail });
  }

  showError(detail) {
    this.messageService.add({ key: 'e', sticky: true, severity: 'error', summary: 'Error', detail: detail });
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirm() {
    this.messageService.clear('c');
    this.motorService.dataDelete({ id: this.deleteId, estado: 0 })
      .subscribe(
        (body: any) => { 
            this.onDelete(body.data.details);
            this.infoMessage('El registro fue eliminado.');
          }
        , (err) => { 
            this.showError('Error al eliminar el registro.');
          }
      );
  }

  onReject() {
    this.messageService.clear('c');
  }
}