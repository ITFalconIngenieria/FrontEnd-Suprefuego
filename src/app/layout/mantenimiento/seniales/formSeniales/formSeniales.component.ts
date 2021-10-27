import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SenialService } from 'src/app/core/services/senial/senial.service';

@Component({
  selector: 'app-formSeniales',
  templateUrl: './formSeniales.component.html',
  styleUrls: ['./formSeniales.component.scss']
})
export class FormSenialesComponent implements OnInit {
  @Input() oldSenialEvent: any;
  @Output() newSenialEvent = new EventEmitter<any>();

  nombre: any;
  validateForm: FormGroup;
  dataMiembros: any;
  stateOptions: any[];

  constructor(
    private fb: FormBuilder,
    private senialService: SenialService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.stateOptions = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];

    this.validateForm = this.fb.group({
      unidad: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      etiqueta: [null, [Validators.required]],
      servidor: [null, [Validators.required]],
      fuente: [null, [Validators.required]],
      estado: [null, [Validators.required]],
    });
    console.log(this.oldSenialEvent);
  }

  sendItem() {
    if (this.oldSenialEvent.id === 0) {
      this.senialService.dataPost(this.oldSenialEvent)
        .subscribe(
          (data: any) => { 
            this.successMessage('Datos guardados.');
           },
          (err) => { this.errorMessage('Error al guardar el registro.') }
        );
    } else {
      this.senialService.dataPut(this.oldSenialEvent)
        .subscribe(
          (data: any) => { this.successMessage('Datos Actualizados.') },
          (err) => { this.errorMessage('Error al actualizar el registro.') }
        );
    }
  }
  
  successMessage(detail) {
    this.newSenialEvent.emit({data: this.oldSenialEvent, message: detail, isError: false});
  }

  errorMessage(detail) {
    this.newSenialEvent.emit({isError: true, message: detail});
  }
}
