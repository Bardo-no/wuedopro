import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfessionalsPage } from './professionals';

@NgModule({
  declarations: [
    ProfessionalsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfessionalsPage),
  ],
})
export class ProfessionalsPageModule {}
