import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private senialService: SenialService
    , private tanqueService: TanqueService) {
    this.displayForm = false;
    this.data = [];
    this.cleanData();
  }

  async ngOnInit() {
    this.getData();
    this.getDataSenial();
    this.data.push({ value: 0 });

    /*this.tanques = [{
      senal: 'señal 1',
      capmax: 100,
      setpoint: 1,
      estado: true
    }]*/
  }

  getData(){
    this.tanqueService.dataGet()
    .subscribe(
      (data: any[]=[]) => { this.tanques = data },
      (err) => { console.log(err) }
    );
  }

  rowDelete(id) {
    alert(id);
    console.log({ id: id, isDeleted: 0 });
    this.tanqueService.dataDelete({ id: id, isDeleted: 0 })
      .subscribe(
        (data: any[]) => { this.onDelete(data) }
        , (err) => { console.log(err) }
      );
  }

  onDelete(unidad){
    console.log(unidad);
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
    if (item.id===0){
      this.tanques.unshift(item);
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

  getDataSenial(){
    this.senialService.dataGet()
    .subscribe(
      (data: any[]=[]) => { this.seniales = data},
      (err) => { console.log(err) }
    );
  }

  
  updateData(item){
    this.itemTanque = item;
  }
}
