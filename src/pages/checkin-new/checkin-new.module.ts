import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinNewPage } from './checkin-new';

@NgModule({
  declarations: [
    CheckinNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinNewPage),
  ],
})
export class CheckinNewPageModule {}
