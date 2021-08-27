import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stepCuarto',
  templateUrl: './stepCuarto.component.html',
  styleUrls: ['./stepCuarto.component.scss']
})
export class StepCuartoComponent implements OnInit {
  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  next: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.stateOptions = [{label: 'Activo', value: 'off'}, {label: 'Inactivo', value: 'on'}];

    this.validateForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  Guardar(){
   this.next = true;
  }

}
