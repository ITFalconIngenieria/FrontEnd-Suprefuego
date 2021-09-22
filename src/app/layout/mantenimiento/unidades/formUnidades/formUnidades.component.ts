import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';

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

  unidadesUpdate: any[] = [];
  formDiesel: FormGroup;
  formElectrico: FormGroup;
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef
  ) {}

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.getMotor();
    this.formElectrico = this.fb.group({
      // Motor
      electricoMotorMarca: [null, [Validators.required]]
      , electricoMotorModelo: [null, [Validators.required]]
      , electricoMotorSerie: [null, [Validators.required]]
      , electricoMotorNumero: [null, [Validators.required]]
      , electricoMotorHp: [null, [Validators.required]]
      , electricoMotorRpm: [null, [Validators.required]]
      // Controlador
      , electricoControllerMarca: [null, [Validators.required]]
      , electricoControllerHp: [null, [Validators.required]]
      , electricoControllerVoltaje: [null, [Validators.required]]
      , electricoControllerFase: [null, [Validators.required]]
      , electricoControllerFrecuencia: [null, [Validators.required]]
      , electricoControllerPresion: [null, [Validators.required]]
    });

    this.formDiesel = this.fb.group({
      // Motor
      dieselMotorMarca: [null, [Validators.required]]
      , dieselMotorModelo: [null, [Validators.required]]
      , dieselMotorSerie: [null, [Validators.required]]
      , dieselMotorNumero: [null, [Validators.required]]
      , dieselMotorHp: [null, [Validators.required]]
      , dieselMotorRpm: [null, [Validators.required]]
      // Controlador
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
        (data: any[]) => { this.showMotor(data) }
        , (err) => { console.log(err) }
      );
  }

  showMotor(data) {
    this.unidades = data;
  }

  postMotor(tipo) {
    let controller: any;
    switch (tipo) {
      case 1: // ELECTRICO
        controller = {
          marca: '',
          frecuencia: '',
          voltaje: '',
          presion: '',
          hp: '',
          fase: ''
        }
        break;
      case 2: // DIESEL
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
        // Error
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
          (data: any[]) => {
            this.unidades.splice(index, 1, data);
            this.Message('Data saved');
          }
          , (err) => { console.log(err) }
        );
    } else {
      this.motorService.dataPut(unidad)
        .subscribe(
          (data: any[]) => { this.Message('Data Update') }
          , (err) => { console.log(err) }
        );
    }
  }

  onRowEditDelete(id) {
    this.motorService.dataDelete({ id: id, estado: 0 })
      .subscribe(
        (data: any[]) => { this.onDelete(data); }
        , (err) => { console.log(err) }
      );
  }

  onDelete(unidad){
    let index = this.unidades.map((d) => { return d.id }).indexOf(unidad.id);
    this.unidades.splice(index, 1);
  }

  onRowBack(unidad) {
    if (unidad.id === 0) {
      let index = this.unidades.map((d) => { return d.id }).indexOf(unidad.id);
      this.unidades.splice(index, 1);
    }else{
      this.unidades = this.unidadesUpdate;
    }
  }

  Guardar() {
    console.log('guardar');
  }

  Message(text) {
    alert(text);
  }
}