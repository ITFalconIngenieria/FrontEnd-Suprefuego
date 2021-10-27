import { ChangeDetectorRef, Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bombaPrincipal',
  templateUrl: './bombaPrincipal.component.html',
  styleUrls: ['./bombaPrincipal.component.scss']
})
export class BombaPrincipalComponent implements OnInit, AfterContentChecked {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  unidades: any[] = [];
  deleteId: any;
  unidadesUpdate: any[] = [];
  bombaPrincipal: FormGroup;
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getMain();
    this.stateOptions = [{ label: 'Activo', value: 'off' }, { label: 'Inactivo', value: 'on' }];

    this.bombaPrincipal = this.fb.group({
      bombaMarca: [null, [Validators.required]]
      , bombaTipo: [null, [Validators.required]]
      , bombaSerie: [null, [Validators.required]]
      , bombaPsi: [null, [Validators.required]]
      , bombaGpm: [null, [Validators.required]]
      , bombaRevoluciones: [null, [Validators.required]]
      , bombaDiametro: [null, [Validators.required]]
      , bombaPotencia: [null, [Validators.required]]
      , controllerMarca: [null, [Validators.required]]
      , controllerHp: [null, [Validators.required]]
      , controllerVoltaje: [null, [Validators.required]]
      , controllerFase: [null, [Validators.required]]
      , controllerHertz: [null, [Validators.required]]
      , controllerPsi: [null, [Validators.required]]
      , controllerBars: [null, [Validators.required]]
      , controllerCatalogo: [null, [Validators.required]]
      , controllerSerie: [null, [Validators.required]]
    });
  }

  ngAfterContentChecked(): void {
    this.ref.detectChanges();
  }

  getMain() {
    this.motorService.getMain()
      .subscribe(
        (body: any) => { this.showMotor(body.data.details) }
        , (err) => { this.showError('Error al obtener los datos.') }
      );
  }

  showMotor(data) {
    this.unidades = data;
  }

  postMain() {
    let body: any = {
      id: 0,
      tipo: 3,
      estado: 1,
      motor: {
        marca: '',
        tipoBomba: '',
        serie: '',
        psi: '',
        gpm: '',
        revoluciones: '',
        diametro: '',
        potencia: ''
      },
      controlador: {
        marca: '',
        hp: '',
        voltaje: '',
        fase: '',
        hertz: '',
        psi: '',
        bars: '',
        catalogo: '',
        serie: ''
    }
    };

    this.unidades.unshift(body);
  }

  onRowEditInit() {
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
          (body: any) => { this.successMessage('Datos actualizados.') }
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
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Eliminar', detail: '¿Desea eliminar el registro?' });
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
