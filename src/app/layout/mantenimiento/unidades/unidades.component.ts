import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {
  displayForm: boolean;
  data: any;
  constructor() {
    this.displayForm = false;
    this.data=[];
  }

  ngOnInit(): void {
    this.data.push({value: 1});
  }

  showForm() {
    this.displayForm = true;
  }

}
