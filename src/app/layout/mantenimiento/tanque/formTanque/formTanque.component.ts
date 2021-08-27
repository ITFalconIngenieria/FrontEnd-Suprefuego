import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formTanque',
  templateUrl: './formTanque.component.html',
  styleUrls: ['./formTanque.component.scss']
})
export class FormTanqueComponent implements OnInit {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  data: any;
  constructor(
    private fb: FormBuilder
  ) { 
    this.data=[];
  }

  ngOnInit() {
    this.stateOptions = [{ label: 'Activo', value: 'off' }, { label: 'Inactivo', value: 'on' }];
    this.data.push({value: 1});
    this.validateForm = this.fb.group({
      senal: [null, [Validators.required]],
      capmax: [null, [Validators.required]],
      setpoint: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  Guardar() {
    console.log('guardar');
  }
}
