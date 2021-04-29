import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-regex',
  templateUrl: './regex.component.html',
  styleUrls: ['./regex.component.scss'],
})
export class RegexComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  RegexFecha = /^\d{1,2}\/\d{1,2}\/\d{4,4}$/;
  RegexId = /^\d{1,1}\-\d{4,4}\-\d{3,4}$/;
  RegexEmail = /^\w+@\w+.\w+$/;

  public opcionValidacion: string = 'email';

  validado: boolean = false;
  valido: boolean;

  @Input() valorValidar: string;
  @Output() valorValidarChange = new EventEmitter<any>();

  CambioDeExpresion(pValor: any): void {
    this.validado = false;
    this.valorValidar = pValor;
  }

  ValidarExpresion(): void {
    console.log('this.opcionValidacion: ' + this.opcionValidacion);
    console.log('this.valorValidar: ' + this.valorValidar);

    if (this.opcionValidacion == 'email') this.valido = this.RegexEmail.test(this.valorValidar);
    else if (this.opcionValidacion == 'fecha') this.valido = this.RegexFecha.test(this.valorValidar);
    else if (this.opcionValidacion == 'id') this.valido = this.RegexId.test(this.valorValidar);

    console.log('this.valido: ' + this.valido);

    this.validado = true;
  }
}
