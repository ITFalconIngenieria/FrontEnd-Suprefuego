import { ChangeDetectorRef, Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MotorService } from 'src/app/core/services/motor/motor.service';

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
  marca: string;
  unidadesUpdate: any[] = [];
  bombaPrincipal: FormGroup;
  constructor(
    private fb: FormBuilder,
    private motorService: MotorService,
    private ref: ChangeDetectorRef
  ) {
    this.marca = 'marca';
  }

  ngOnInit() {
    this.getMain();
    this.stateOptions = [{ label: 'Activo', value: 'off' }, { label: 'Inactivo', value: 'on' }];

    this.bombaPrincipal = this.fb.group({
      // Bomba
      bombaMarca: [null, [Validators.required]]
      , bombaTipo: [null, [Validators.required]]
      , bombaSerie: [null, [Validators.required]]
      , bombaPsi: [null, [Validators.required]]
      , bombaGpm: [null, [Validators.required]]
      , bombaRevoluciones: [null, [Validators.required]]
      , bombaDiametro: [null, [Validators.required]]
      , bombaPotencia: [null, [Validators.required]]
      // Controlador
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
        (data: any[]) => { this.showMotor(data) }
        , (err) => { console.log(err) }
      );
  }

  showMotor(data) {
    this.unidades = data;
  }

  submitForm(): void {

  }

  Guardar() {
    console.log('guardar');
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
    console.log(unidad);
    if (unidad.id === 0) {
      this.motorService.dataPost(unidad)
        .subscribe(
          (data: any[]) => {
            this.unidades.splice(index, 1, data);
            this.Message('Data saved');
            console.log(data);
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
