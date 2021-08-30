import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepEmpresa',
  templateUrl: './stepEmpresa.component.html',
  styleUrls: ['./stepEmpresa.component.scss']
})
export class StepEmpresaComponent implements OnInit {
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
    this.validateForm = this.fb.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });

    this.stateOptions = [{label: 'Activo', value: 'off'}, {label: 'Inactivo', value: 'on'}];

  }

  submitForm(): void {

   }

   Guardar(){
    this.next = true;
   }

   siguiente(){
    this.router.navigate(['../stepSitios']);
    console.log(this.router.navigate(['stepSitios']));
    

   }

}
