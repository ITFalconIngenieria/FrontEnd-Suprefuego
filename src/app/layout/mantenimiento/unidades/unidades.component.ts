import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {
  displayForm: boolean;
  unidades: any[] = [];

  constructor() {
    this.displayForm = false;
  }

  ngOnInit(): void {
    this.unidades = [
      {
        cuarto: 'cuarto 1',
        motor: 'Eletrico',
        marca: 'CLARKE',
        modelo: 'JU4H-UF34',
        sn: 'SO159989P',
        hp: '115',
        rpm: '3000',
        estado: true
      },
      {
        cuarto: 'cuarto 2',
        motor: 'Diesel',
        marca: 'CLARKE',
        modelo: 'JU4H-UF34',
        sn: 'SO159989P',
        hp: '115',
        rpm: '3000',
        estado: true
      }
    ];

  }

  showForm() {
    this.displayForm = true;
  }

}
