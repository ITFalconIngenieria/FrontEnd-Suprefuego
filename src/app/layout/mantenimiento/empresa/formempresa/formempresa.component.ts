import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-formempresa',
  templateUrl: './formempresa.component.html',
  styleUrls: ['./formempresa.component.scss']
})
export class FormempresaComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [{
      label: 'Empresa',
      routerLink: 'stepEmpresa',
    },
    {
      label: 'Cuarto de bombas',
      routerLink: 'stepCuarto'
    }
    ];
  }

}
