import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seniales',
  templateUrl: './seniales.component.html',
  styleUrls: ['./seniales.component.scss']
})
export class SenialesComponent implements OnInit {

  data: any;
  displayForm: boolean;
  seniales: any[] = []
  first = 0;
  rows = 1;

  constructor() {
    this.displayForm = false;
    this.data = [];
  }

  ngOnInit(): void {
    this.data.push({ valule: 0 });

    this.seniales = [
      {
        unidad: 'Señal 1',
        descripcion: 'Señal para monitoreo',
        etiqueta: 'HN',
        servidor: 'Servidor 1',
        fuente: 'Electrico',
        estado: true
      }, {
        unidad: 'Señal 2',
        descripcion: 'Señal para monitoreo',
        etiqueta: 'HN',
        servidor: 'Servidor 2',
        fuente: 'Electrico',
        estado: true
      },
      {
        unidad: 'Señal 3',
        descripcion: 'Señal para monitoreo',
        etiqueta: 'HN',
        servidor: 'Servidor 3',
        fuente: 'Electrico',
        estado: true
      },
      {
        unidad: 'Señal 4',
        descripcion: 'Señal para monitoreo',
        etiqueta: 'HN',
        servidor: 'Servidor 4',
        fuente: 'Electrico',
        estado: true
      },
      {
        unidad: 'Señal 5',
        descripcion: 'Señal para monitoreo',
        etiqueta: 'HN',
        servidor: 'Servidor 5',
        fuente: 'Electrico',
        estado: true
      }
    ];

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
    return this.seniales ? this.first === (this.seniales.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.seniales ? this.first === 0 : true;
  }

  showForm() {
    this.displayForm = true;
  }

}
