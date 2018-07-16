import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule } from '@angular/material';

const moduels = [MatButtonModule, MatCheckboxModule, MatToolbarModule];

@NgModule({
  imports: moduels,
  exports: moduels,
})
export class VigMaterialModule { }
