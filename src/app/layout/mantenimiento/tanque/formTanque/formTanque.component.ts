import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SenialService } from 'src/app/core/services/senial/senial.service';
import { TanqueService } from 'src/app/core/services/tanque/tanque.service';

@Component({
  selector: 'app-formTanque',
  templateUrl: './formTanque.component.html',
  styleUrls: ['./formTanque.component.scss']
})
export class FormTanqueComponent implements OnInit {
  @Input() oldTanqueEvent: any;
  @Input() oldSenialEvent: any;
  @Output() newTanqueEvent = new EventEmitter<any>();

  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];
  data: any;
  rangeValues: number[] = [20, 80];
  seniales: any[] = [];
  constructor(
    private fb: FormBuilder,
    private senialService: SenialService,
    private tanqueService: TanqueService
  ) {
    this.data = [];
  }

  ngOnInit() {
    this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];
    this.data.push({ value: 1 });
    this.validateForm = this.fb.group({
      senial: [null, [Validators.required]],
      capacidad: [null, [Validators.required]]
    });
    this.getDataSenial();
    console.log(this.oldTanqueEvent);
  }

  submitForm(): void {

  }

  sendItem() {
    this.oldTanqueEvent.senialId = parseInt(this.oldTanqueEvent.senialId);
    if (this.oldTanqueEvent.id === 0) {
      this.tanqueService.dataPost(this.oldTanqueEvent)
        .subscribe(
          (data: any[] = []) => { this.Message('Data Saved') },
          (err) => { console.log(err) }
        );
    } else {
      console.log('Update');
      this.tanqueService.dataPut(this.oldTanqueEvent)
        .subscribe(
          (data: any[] = []) => { this.Message('Data Updated') },
          (err) => { console.log(err) }
        );
    }
  }

  getDataSenial() {
    this.senialService.dataGet()
      .subscribe(
        (data: any[] = []) => { this.seniales = data },
        (err) => { console.log(err) }
      );
  }

  Message(text) {
    this.newTanqueEvent.emit(this.oldTanqueEvent);
    alert(text);
  }

}
