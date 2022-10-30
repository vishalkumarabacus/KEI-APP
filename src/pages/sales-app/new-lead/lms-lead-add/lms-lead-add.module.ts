import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectSearchableModule } from 'ionic-select-searchable';
import { IonicSelectableModule } from 'ionic-selectable';
import { LmsLeadAddPage } from './lms-lead-add';

@NgModule({
  declarations: [
    LmsLeadAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LmsLeadAddPage),
    IonicSelectableModule,
    SelectSearchableModule
  ],
})
export class LmsLeadAddPageModule {}
