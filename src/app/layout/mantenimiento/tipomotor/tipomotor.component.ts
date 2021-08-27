import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipomotor',
  templateUrl: './tipomotor.component.html',
  styleUrls: ['./tipomotor.component.scss']
})
export class TipomotorComponent implements OnInit {
  data: any;
  displayForm: boolean;
  constructor() {
    this.displayForm = false;
    this.data=[];
  }

  ngOnInit(): void {
    this.data.push({valule: 0});
  }

  showForm() {
    this.displayForm = true;
  }

}
