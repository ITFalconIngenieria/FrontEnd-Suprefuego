import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formMotor',
  templateUrl: './formMotor.component.html',
  styleUrls: ['./formMotor.component.scss']
})
export class FormMotorComponent implements OnInit {
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
