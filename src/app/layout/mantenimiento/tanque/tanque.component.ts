import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SenialService } from 'src/app/core/services/senial/senial.service';
import { TanqueService } from 'src/app/core/services/tanque/tanque.service';

@Component({
  selector: 'app-tanque',
  templateUrl: './tanque.component.html',
  styleUrls: ['./tanque.component.scss']
})
export class TanqueComponent implements OnInit {
  @Input () newItem: any;

  displayForm: boolean;
  data: any;
  tanques: any[] = [];
  itemTanque: any;
  seniales: any[] = [];
  deleteId: any;
  constructor(private senialService: SenialService
    , private tanqueService: TanqueService
    , private messageService: MessageService) {
    this.displayForm = false;
    this.cleanData();
  }

  async ngOnInit() {
    this.getDataSenial();
    this.getData();
  }

  getData(){
    this.tanqueService.dataGet()
    .subscribe(
      (body: any) => { this.tanques = body.data.details; },
      (err) => { this.errorMessage('Error al obtener los datos de Tanques.') }
    );
  }

  getDataSenial(){
    this.senialService.dataGet()
    .subscribe(
      (body: any) => { this.seniales = body.data.details; },
      (err) => { this.errorMessage('Error al obtener los datos de Señales.')  }
    );
  }

  rowDelete(id) {
    this.deleteId = id;
    this.showConfirm();;
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Eliminar', detail: '¿Desea eliminar el registro?'});
  }

  onConfirm() {
    this.messageService.clear('c');
    this.tanqueService.dataDelete({ id: this.deleteId, isDeleted: 0 })
      .subscribe(
        (body: any) => { 
          console.log(body.data.details);
            this.onDelete(body.data.details);
            this.infoMessage('El registro fue eliminado.');
          }
        , (err) => { 
            console.log(err);
            this.errorMessage('Error al eliminar el registro.');
          }
      );
  }

  onReject() {
    this.messageService.clear('c');
  }

  onDelete(unidad){
    let index = this.tanques.map((d) => { return d.id }).indexOf(unidad.id);
    this.tanques.splice(index, 1);
  }

  getSenialName(id){
    return this.seniales.filter(d=>d.id===id)[0].descripcion;
  }

  showForm() {
    this.displayForm = true;
  }

  showTanque(item){
    if (item.isError){
      this.errorMessage(item.message);
    }else{
      if (item.data.id===0){
        this.tanques.unshift(item.data);
        this.successMessage(item.message);
      }else{
        this.successMessage(item.message);
      }
    }
  this.displayForm = false;
  }

  cleanData(){
    this.itemTanque = {
      id: 0,
      senialId: 0,
      capacidad: '',
      setpoint: [
        20,
        80
      ],
      fuente: '',
      estado: true,
      isDeleted: 1
    }
  }

  updateData(item){
    this.itemTanque = item;
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
}
