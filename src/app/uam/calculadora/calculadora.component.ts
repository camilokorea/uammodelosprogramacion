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

  RegexNumero = /^\d+(\.\d+)?$/;
  Bitacora: Bitacoralog[] = [];
  FS = window.require('fs');
  archivoSalvado: boolean = false;
  errorArchivoSalvado: boolean = false;
  errorLeyendoBitacora: boolean = false;
  bitacoraArchivoRuta: string = '';
  PATH = window.require('path');

  constructor() {}

  ngOnInit(): void {
    this.bitacoraArchivoRuta = this.PATH.resolve(__dirname) + '\\' + 'bitacora.txt';
    this.CargarBitacora();
  }

  ValorACambia(pValor: any) {
    this.ValorA = pValor;
  }

  ValorBCambia(pValor: any) {
    this.ValorB = pValor;
  }

  ChequeoDatos(pOperador: string): void {
    this.errorLeyendoBitacora = false;
    this.archivoSalvado = false;
    this.errorArchivoSalvado = false;

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

    this.SalvarBitacora();
  }

  SalvarBitacora() {
    try {
      this.FS.writeFileSync(this.bitacoraArchivoRuta, window.JSON.stringify(this.Bitacora));
      this.archivoSalvado = true;
    } catch (exObject) {
      this.archivoSalvado = false;
      this.errorArchivoSalvado = true;
    }
  }

  LimpiarOperacion() {
    this.ValorB = '';
    this.Bitacora.splice(-1, 1);

    if (this.Bitacora.length > 0)
      if (!this.Bitacora[this.Bitacora.length - 1].Error)
        this.ValorA = this.Bitacora[this.Bitacora.length - 1].Resultado;
      else this.ValorA = '';
    else this.ValorA = '';

    this.SalvarBitacora();
  }

  LimpiarBitacora() {
    this.Bitacora = [];
    this.ValorA = '';
    this.ValorB = '';

    this.SalvarBitacora();
  }

  CargarBitacora() {
    this.errorLeyendoBitacora = false;

    try {
      this.Bitacora = window.JSON.parse(this.FS.readFileSync(this.bitacoraArchivoRuta));

      if (this.Bitacora.length > 0)
        if (!this.Bitacora[this.Bitacora.length - 1].Error)
          this.ValorA = this.Bitacora[this.Bitacora.length - 1].Resultado;
        else this.ValorA = '';
      else this.ValorA = '';
    } catch (exceptionOj) {
      this.errorLeyendoBitacora = true;
    }
  }
}
