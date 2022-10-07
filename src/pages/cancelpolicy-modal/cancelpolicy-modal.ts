import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, Loading,Nav, App, Events } from 'ionic-angular';
import { CancelationPolicyPage } from '../cancelation-policy/cancelation-policy';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
import { TransactionPage } from '../transaction/transaction';
import { TabsPage } from '../tabs/tabs';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { DashboardPage } from '../dashboard/dashboard';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

import * as jwt_decode from "jwt-decode";


@IonicPage()
@Component({
    selector: 'page-cancelpolicy-modal',
    templateUrl: 'cancelpolicy-modal.html',
})
export class CancelpolicyModalPage {
  net:any='';

  constructor(public navParams: NavParams, private app: App, public serv: MyserviceProvider, public events: Events,public navCtrl: NavController,public viewCtrl : ViewController,public storage: Storage) {
      events.subscribe('state', (data) => {
        console.log("Cancel-policy-page");
        
        console.log(data);
        if(data=='online'){
          // this.reload();
        }

      });

    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad NotificationPage');
      this.net=this.navParams.get('net');
      console.log(this.net);
     
      
    }

  ionViewWillEnter(){

    console.log("Offline Page");
    
    // this.viewCtrl.dismiss()

  }
  
  
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    }
    catch (Error) {
      return null;
    }
  }


  
    reload(){
  
      console.log(this.serv.isInternetConnection);
  
      if( this.serv.isInternetConnection==false){
        console.log("internet offlineeeeeeeeeee");
      }
      else{
  
        this.storage.get('token').then((token) => {

        let tokenInfo = this.getDecodedAccessToken(token);
          console.log(tokenInfo);

          console.log("offline page =>",tokenInfo);
          
          if (tokenInfo && tokenInfo.user_type == 'Sales User') {

            console.log("offline page");
            
            this.navCtrl.setRoot(DashboardPage);

          }
          else {
            this.navCtrl.setRoot(LoginPage, { 'registerType': 'Employee' });
          }
        });
      }
    }
  }
  