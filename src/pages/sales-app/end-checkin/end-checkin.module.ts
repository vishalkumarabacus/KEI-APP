import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndCheckinPage } from './end-checkin';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    EndCheckinPage,
  ],
  imports: [
    IonicPageModule.forChild(EndCheckinPage),
    IonicSelectableModule,
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class EndCheckinPageModule {}
