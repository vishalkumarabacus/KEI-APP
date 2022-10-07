import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ConstantProvider } from '../../providers/constant/constant';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
    selector: 'page-dealer-discount',
    templateUrl: 'dealer-discount.html',
})
export class DealerDiscountPage {
    state;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public events: Events,private network: Network) {
    // if (this.network.type == 'none') {
    //   this.closeModel();
    //   this.navCtrl.push(NotificationPage)
    // }
    events.subscribe('state', (data) => {
      console.log(data);
      if(data=='stop'){
        this.closeModel();
      }
    });
    this.StartTimer();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingCntrlPage');
  }

  closeModel() {
    console.log("Close");

    this.viewCtrl.dismiss();
  }


  maxTime: any = 0;
  hidevalue: boolean = false;
  StartTimer() {
    setTimeout((x) => {
      this.maxTime++;
      this.StartTimer();
    }, 1000);
  }
}
