import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { LeadsDetailPage } from './leads-detail';

@NgModule({
  declarations: [
    LeadsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(LeadsDetailPage),
    IonicSelectableModule

  ],
})
export class LeadsDetailPageModule {}
