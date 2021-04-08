import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss'],
})
export class CalculadoraComponent implements OnInit {
  ValorA: any;
  ValorB: any;
  RegexNumero = new RegExp('^d*(.d+)?$');
  RegexLiteral = new RegExp('^w*W*$');

  constructor() {}

  ngOnInit(): void {}

  ValorACambia(pValor: any) {
    this.ValorA = pValor;
  }

  ValorBCambia(pValor: any) {
    this.ValorB = pValor;
  }

  ValidarNumero() {}

  ValidarLiteral() {}

  ChequeoDatos() {
    console.log(typeof this.ValorA);
    console.log(typeof this.ValorB);
  }

  Multiplicacion() {
    this.ChequeoDatos();
  }

  Division() {
    this.ChequeoDatos();
  }

  Suma() {
    this.ChequeoDatos();
  }

  Resta() {
    this.ChequeoDatos();
  }

  LimpiarOperacion() {}

  LimpiarBitacora() {}
}
