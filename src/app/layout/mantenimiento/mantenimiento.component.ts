import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.scss']
})
export class MantenimientoComponent implements OnInit {     

  itemMenu: any;
  constructor() { }

  ngOnInit(): void {
    this.itemMenu = [
      {
        titulo: 'Empresa',
        icon: 'pi pi-sitemap',
        url: 'empresa'
      },
      {
        titulo: 'Unidades',
        icon: 'pi pi-th-large',
        url: 'unidades'
      },
      {
        titulo: 'Señales',
        icon: 'pi pi-caret-up',
        url: 'seniales'
      },
      {
        titulo: 'Tanque de agua',
        icon: 'pi pi-tablet',
        url: 'tanqueagua'
      }
    ];
  }

}
