import { Component, OnInit, Input } from '@angular/core';
import { SenialService } from 'src/app/core/services/senial/senial.service';

@Component({
  selector: 'app-seniales',
  templateUrl: './seniales.component.html',
  styleUrls: ['./seniales.component.scss']
})
export class SenialesComponent implements OnInit {
  @Input () newItem: any;

  data: any;
  displayForm: boolean;
  seniales: any[] = []
  first = 0;
  rows = 1;
  itemSenial: any;
  constructor(private senialService: SenialService) {
    this.displayForm = false;
    this.data = [];
    this.itemSenial = {
      id: 0,
      unidad: '',
      descripcion: '',
      etiqueta: '',
      servidor: '',
      fuente: '',
      estado: true,
      isDeleted: 1
    }
  }

  getData(){
    this.senialService.dataGet()
    .subscribe(
      (data: any[]=[]) => { this.seniales = data},
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.data.push({ valule: 0 });
    this.getData();
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

  rowDelete(id) {
    alert(id);
    this.senialService.dataDelete({ id: id, isDeleted: 0 })
      .subscribe(
        (data: any[]) => { this.onDelete(data) }
        , (err) => { console.log(err) }
      );
  }

  onDelete(unidad){
    let index = this.seniales.map((d) => { return d.id }).indexOf(unidad.id);
    this.seniales.splice(index, 1);
  }

  Message(text){
    alert(text);
  }

  cleanData(){
    this.itemSenial = {
      id: 0,
      unidad: '',
      descripcion: '',
      etiqueta: '',
      servidor: '',
      fuente: '',
      estado: true,
      isDeleted: 1
    }
  }

  showForm() {
    this.displayForm = true;
  }

  hideForm(isHide) {
    this.displayForm = isHide;
  }

  showSenial(item){
    if (item.id===0){
      this.seniales.unshift(item);
    }
    this.displayForm = false;
  }

  updateData(item){
    this.itemSenial = item;
  }
}
