import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formUnidades',
  templateUrl: './formUnidades.component.html',
  styleUrls: ['./formUnidades.component.scss']
})
export class FormUnidadesComponent implements OnInit {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
