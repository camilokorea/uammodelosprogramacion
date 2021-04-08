import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bitacoralog } from './bitacoralog.model';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit {
  @Input() ValorA: any = '';
  @Input() ValorB: any = '';

  @Output() ValorAChange = new EventEmitter<any>();
  @Output() ValorBChange = new EventEmitter<any>();

  RegexNumero = /^\d*(.\d+)?$/;
  RegexLiteral = /^\w*\W*$/;
  Bitacora: Bitacoralog[] = [];

  constructor() {}

  ngOnInit(): void {}

  ValorACambia(pValor: any) {
    this.ValorA = pValor;
  }

  ValorBCambia(pValor: any) {
    this.ValorB = pValor;
  }

  ChequeoDatos(pOperador: string): void {
    let BitacoraLog: Bitacoralog = new Bitacoralog();
    let Validacion: boolean = this.RegexNumero.test(this.ValorA) && this.RegexNumero.test(this.ValorB);

    if (!this.RegexNumero.test(this.ValorA)) BitacoraLog.ValorA = 'Valor no es numerico (' + this.ValorA + ')';
    else BitacoraLog.ValorA = this.ValorA;

    if (!this.RegexNumero.test(this.ValorB)) BitacoraLog.ValorB = 'Valor no es numerico (' + this.ValorB + ')';
    else BitacoraLog.ValorB = this.ValorB;

    BitacoraLog.Operador = pOperador;

    if (!Validacion) {
      BitacoraLog.Resultado = 'ERROR';
      BitacoraLog.Error = true;
    } else {
      switch (pOperador) {
        case '+':
          BitacoraLog.Resultado = String(Number(this.ValorA) + Number(this.ValorB));
          break;
        case '-':
          BitacoraLog.Resultado = String(Number(this.ValorA) - Number(this.ValorB));
          break;
        case 'x':
          BitacoraLog.Resultado = String(Number(this.ValorA) * Number(this.ValorB));
          break;
        case '÷':
          BitacoraLog.Resultado = String(Number(this.ValorA) / Number(this.ValorB));
          break;
      }

      this.ValorA = BitacoraLog.Resultado;
    }
    this.Bitacora.push(BitacoraLog);
  }

  LimpiarOperacion() {
    this.ValorA = '';
    this.ValorB = '';
  }

  LimpiarBitacora() {
    this.Bitacora = [];
    this.ValorA = '';
    this.ValorB = '';
  }
}
