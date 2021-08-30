import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tanque',
  templateUrl: './tanque.component.html',
  styleUrls: ['./tanque.component.scss']
})
export class TanqueComponent implements OnInit {
  displayForm: boolean;
  data: any;
  tanques: any[] = [];

  constructor() {
    this.displayForm = false;
    this.data = [];
  }

  ngOnInit(): void {
    this.data.push({ value: 0 });

    this.tanques = [{
      senal: 'señal 1',
      capmax: 100,
      setpoint: 1,
      estado: true
    }]
  }

  showForm() {
    this.displayForm = true;
  }

}
