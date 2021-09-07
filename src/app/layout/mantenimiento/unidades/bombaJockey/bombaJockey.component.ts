import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bombaJockey',
  templateUrl: './bombaJockey.component.html',
  styleUrls: ['./bombaJockey.component.scss']
})
export class BombaJockeyComponent implements OnInit {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  unidades: any[] = [];
  marca: string;

  constructor(
    private fb: FormBuilder
  ) {
    this.marca = 'marca';
  }

  ngOnInit() {

    this.unidades = [
      {
        nombre: 'Cuarto 1',
        descripcion: 'Cuarto principal',
        ubicacion: 'Planta alta',
        empresa: 'Empresa 1'
      },
      {
        nombre: 'Cuarto 2',
        descripcion: 'Cuarto secundario',
        ubicacion: 'Planta alta',
        empresa: 'Empresa 2'
      }
    ];

    this.stateOptions = [{ label: 'Activo', value: 'off' }, { label: 'Inactivo', value: 'on' }];

    this.validateForm = this.fb.group({
      bomba: [null, [Validators.required]],
      motor: [null, [Validators.required]],
      marca: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      gmp: [null, [Validators.required]],
      psi: [null, [Validators.required]],
      hp: [null, [Validators.required]],
      rpm: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  Guardar() {
    console.log('guardar');
  }

}
