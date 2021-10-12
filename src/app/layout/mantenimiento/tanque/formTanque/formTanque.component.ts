import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    private tanqueService: TanqueService,
    private messageService: MessageService
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
          (data: any[] = []) => { this.successMessage('Datos guardados.'); },
          (err) => { this.errorMessage('Error al guardar el registro.') }
        );
    } else {
      this.tanqueService.dataPut(this.oldTanqueEvent)
        .subscribe(
          (data: any) => { this.successMessage('Datos Actualizados.') },
          (err) => { this.errorMessage('Error al actualizar el registro.') }
        );
    }
  }

  getDataSenial() {
    this.senialService.dataGet()
      .subscribe(
        (body: any) => { this.seniales = body.data.details },
        (err) => { this.errorMessage('Error al obtener los datos.') }
      );
  }

  successMessage(detail) {
    this.newTanqueEvent.emit({data: this.oldTanqueEvent, message: detail, isError: false});
  }

  errorMessage(detail) {
    this.newTanqueEvent.emit({isError: true, message: detail});
  }

}
