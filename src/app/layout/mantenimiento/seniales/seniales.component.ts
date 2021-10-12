import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
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
  deleteId: any;
  constructor(private senialService: SenialService
    , private messageService: MessageService) {
    this.displayForm = false;
    this.data = [];
    this.cleanData();
  }

  getData(){
    this.senialService.dataGet()
    .subscribe(
      (body: any) => { this.seniales = body.data.details },
      (err) => { this.errorMessage('Error al obtener los datos.') }
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
    this.deleteId = id;
    this.showConfirm();
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Eliminar', detail: '¿Desea eliminar el registro?'});
  }

  onConfirm() {
    console.log(this.deleteId);
    this.messageService.clear('c');
    this.senialService.dataDelete({ id: this.deleteId, isDeleted: 0 })
      .subscribe(
        (body: any) => { 
            this.onDelete(body.data.details);
            this.infoMessage('El registro fue eliminado.');
          }
        , (err) => { 
            console.log(err);
            this.errorMessage('Error al eliminar el registro.');
          }
      );
  }

  infoMessage(detail) {
    this.messageService.add({ key: 'i', severity: 'info', summary: 'Info', detail: detail });
  }

  successMessage(detail) {
    this.messageService.add({ key: 's', severity: 'success', summary: 'Correcto', detail: detail });
  }

  errorMessage(detail) {
    this.messageService.add({ key: 'e', sticky: true, severity: 'error', summary: 'Error', detail: detail });
  }

  onReject() {
    this.messageService.clear('c');
  }

  onDelete(unidad){
    let index = this.seniales.map((d) => { return d.id }).indexOf(unidad.id);
    this.seniales.splice(index, 1);
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
    if (item.isError){
      this.errorMessage(item.message);
    }else{
      if (item.data.id===0){
        this.seniales.unshift(item.data);
        this.successMessage(item.message);
      }else{
        this.successMessage(item.message);
      }
    }
  this.displayForm = false;
  }

  updateData(item){
    this.itemSenial = item;
  }
}
