import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {
  unidades: any[] = [];
  displayModal: boolean = false;
  
  constructor() {
    
  }

  ngOnInit(): void {
    this.unidades = [
      {
        nombre: 'Cuarto 1',
        descripcion: 'Cuarto principal',
        ubicacion: 'Planta alta',
        empresa: 'Empresa 1'
      },
      {
        nombre: 'Cuarto 2',
        descripcion: 'Cuarto secundario',
        ubicacion: 'Planta alta',
        empresa: 'Empresa 2'
      }
    ];

  }

  showModalDialog() {
    this.displayModal = true;
}

}
