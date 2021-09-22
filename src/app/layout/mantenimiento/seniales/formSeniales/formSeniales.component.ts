import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private senialService: SenialService
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
  }

  submitForm(): void {

  }

  sendItem() {
    if (this.oldSenialEvent.id === 0) {
      console.log('Add');
      
      this.senialService.dataPost(this.oldSenialEvent)
        .subscribe(
          (data: any[] = []) => { 
            this.Message('Data Saved');
           },
          (err) => { console.log(err) }
        );
    } else {
      console.log('Update');
      this.senialService.dataPut(this.oldSenialEvent)
        .subscribe(
          (data: any[] = []) => { this.Message('Data Updated') },
          (err) => { console.log(err) }
        );
    }
  }

  Message(text) {
    this.newSenialEvent.emit(this.oldSenialEvent);
    alert(text);
  }
}
