import { Component, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';
import { MessageService } from 'primeng/api';

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
  deleteId: any;
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef,
    private messageService: MessageService
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
        (body: any) => { this.showMotor(body.data.details) }
        , (err) => { this.showError('Error al obtener los datos.') }
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
            console.log(err);
            this.showError('Error al eliminar el registro.');
          }
      );
  }

  onReject() {
    this.messageService.clear('c');
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
}
