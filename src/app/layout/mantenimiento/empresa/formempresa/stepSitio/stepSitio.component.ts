import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepSitio',
  templateUrl: './stepSitio.component.html',
  styleUrls: ['./stepSitio.component.scss']
})
export class StepSitioComponent implements OnInit {
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
      direccion: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      latitud: [null, [Validators.required]],
      longitud: [null, [Validators.required]],
      altura: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
  }

  submitForm(): void {

  }

  Guardar(){
   this.next = true;
  }

  siguiente(){
   this.router.navigate(['./stepSitios']);

  }

}
