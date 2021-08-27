import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formSeniales',
  templateUrl: './formSeniales.component.html',
  styleUrls: ['./formSeniales.component.scss']
})
export class FormSenialesComponent implements OnInit {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.stateOptions = [{label: 'Activo', value: 'off'}, {label: 'Inactivo', value: 'on'}];

    this.validateForm = this.fb.group({
      unidad: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      etiqueta: [null, [Validators.required]],
      servidor: [null, [Validators.required]],
      fuente: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  Guardar(){
    console.log('guardar');
    
  }

}
