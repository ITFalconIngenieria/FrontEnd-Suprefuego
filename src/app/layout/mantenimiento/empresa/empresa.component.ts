import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  datas: any;
  displayForm: boolean;
  empresas: any[] = [];
  first = 0;
  rows = 1;
  displayModalBomba: boolean;

  bombas: any[] = [];
  nomEmpresa: any;

  constructor() {
    this.displayForm = false;
    this.datas = [];
  }

  ngOnInit(): void {

    this.empresas = [
      {
        nombre: 'Empresa 1',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      },
      {
        nombre: 'Empresa 2',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      },
      {
        nombre: 'Empresa 3',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      },
      {
        nombre: 'Empresa 4',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      },
      {
        nombre: 'Empresa 5',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      },
      {
        nombre: 'Empresa 6',
        descripcion: 'Empresa dedicada a brindar servicios',
        estado: true
      }
    ];

    this.bombas = [
      {
        descripcion: 'Cuarto de bomba 1 ',
        estado: true
      },
      {
        descripcion: 'Cuarto de bomba 2',
        estado: true
      },
      {
        descripcion: 'Cuarto de bomba 3',
        estado: true
      }
    ];

  }

  showModalDialogBomba(bomba: any) {
    this.displayModalBomba = true;
    this.nomEmpresa = bomba.nombre    
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.empresas ? this.first === (this.empresas.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.empresas ? this.first === 0 : true;
  }

  showForm() {
    this.displayForm = true;
  }

}
