import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';

@Component({
  selector: 'app-bombaJockey',
  templateUrl: './bombaJockey.component.html',
  styleUrls: ['./bombaJockey.component.scss']
})
export class BombaJockeyComponent implements OnInit, AfterContentChecked {
  nombre: any;
  bombaJockey: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  unidades: any[] = [];
  unidadesUpdate: any[] = [];
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef
  ) {

  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  ngOnInit() {
    this.getJockey();

    this.stateOptions = [{ label: 'Activo', value: 'off' }, { label: 'Inactivo', value: 'on' }];

    this.bombaJockey = this.fb.group({
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      fase: [null, [Validators.required]],
      voltaje: [null, [Validators.required]],
      hp: [null, [Validators.required]],
      serie: [null, [Validators.required]],
      caudal: [null, [Validators.required]],
      presion: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  getJockey() {
    this.motorService.getJockey()
      .subscribe(
        (data: any[]) => { this.showMotor(data) }
        , (err) => { console.log(err) }
      );
  }
  showMotor(data) {
    this.unidades = data;
  }

  postMotor() {
    let body: any = {
      id: 0,
      tipo: 4,
      estado: 1,
      motor: {
        marca: '',
        modelo: '',
        fase: '',
        voltaje: '',
        hp: '',
        serie: '',
        caudal: '',
        presion: ''
      },
      controlador: {}
    };

    this.unidades.unshift(body);
  }

  onRowEditInit(unidad) {
    this.unidadesUpdate = this.unidades;
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

  Message(text) {
    alert(text);
  }
}
