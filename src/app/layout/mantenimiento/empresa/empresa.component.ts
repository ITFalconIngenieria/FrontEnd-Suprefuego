import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  datas: any;
  dataSitio: any;
  displayForm: boolean;
  empresas: any[] = [];
  first = 0;
  rows = 1;
  displayModalSitios: boolean;
  displayModalBomba: boolean;

  sitios: any[] = [];
  bombas: any[] = [];
  nomEmpresa: any;
  nomSitio: any;

  constructor() {
    this.displayForm = false;
    this.datas = [];
    this.dataSitio = [];
  }

  ngOnInit(): void {
    this.datas.push({ value: 0, id: 0, list: [{ value: 0, id: 0, list: [{ value: 0, id: 0 }] }] });
    this.dataSitio.push({ value: 1, id: 1 });

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

    this.sitios = [
      {
        nombre: 'Sitios 1',
        descripcion: 'Sitio para almacenar las bombas',
        direccion: 'SPS calle 7 ave 9',
        estado: true
      },
      {
        nombre: 'Sitios 2',
        descripcion: 'Sitio para almacenar las bombas',
        direccion: 'SPS calle 7 ave 9',
        estado: true
      },
      {
        nombre: 'Sitios 3',
        descripcion: 'Sitio para almacenar las bombas',
        direccion: 'SPS calle 7 ave 9',
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

  showModalDialogSitio(empresa: any) {
    this.displayModalSitios = true;
    this.nomEmpresa = empresa.nombre;
  }


  showModalDialogBomba(bomba: any) {
    this.displayModalBomba = true;
    this.nomSitio = bomba.nombre;
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
