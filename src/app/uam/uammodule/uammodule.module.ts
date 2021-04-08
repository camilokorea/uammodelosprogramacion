import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { Shell } from '@app/shell/shell.service';
import { FormsModule } from '@angular/forms';

import { RegexComponent } from '../regex/regex.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'calculadora', component: CalculadoraComponent },
    { path: 'regex', component: RegexComponent },
  ]),
];

@NgModule({
  declarations: [CalculadoraComponent, RegexComponent],
  imports: [FormsModule, CommonModule, FlexLayoutModule, SharedModule, MaterialModule, RouterModule.forChild(routes)],
  exports: [RouterModule, RegexComponent, CalculadoraComponent],
  providers: [],
})
export class UammoduleModule {}
