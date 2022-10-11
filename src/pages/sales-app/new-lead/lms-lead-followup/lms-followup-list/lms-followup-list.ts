import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../../../../providers/myservice/myservice';
import { LmsFollowupAddPage } from '../lms-followup-add/lms-followup-add';

@IonicPage()
@Component({
  selector: 'page-lms-followup-list',
  templateUrl: 'lms-followup-list.html',
})
export class LmsFollowupListPage {
  followup_detail:any = [];
  today_date = new Date().toISOString().slice(0,10);

  constructor(public navCtrl: NavController, public navParams: NavParams,public db:MyserviceProvider) {
  }
  
  ionViewWillEnter() {
    console.log(this.today_date)
    this.type=this.navParams.get('type');
    this.id=this.navParams.get('id');
    this.company_name=this.navParams.get('company_name');
    console.log(this.type);
    console.log(this.id);
    console.log(this.company_name);
    
    // this.folloupadd();
    console.log('ionViewDidLoad LmsFollowupListPage');
    this.get_Followup_List();
  }
  
  
  followup_list:any[];
  type:any;
  id:any;
  company_name:any;
  
  lead_followup_add(type,id,company_name)
  {
    console.log(this.type);
    console.log(this.id);
    this.navCtrl.push(LmsFollowupAddPage,{'type':type,'id':id,'company_name':company_name})
  } 
  update_followup(type)
    {
      console.log('function called');
      this.navCtrl.push(LmsFollowupAddPage,{'type':type, 'data':this.followup_list, 'from':'updateFollowup'})
    }
  get_Followup_List()
  {

    var value = {'dr_id':this.id};

    this.db.addData({'data':value},"Lead/followupList")
    .then(resp=>{
      console.log(resp);
      this.followup_list = resp['data'];
      console.log(this.followup_list);
    },
    err=>
    {
    })
  }
  
  doRefresh (refresher)
  {   
    this.get_Followup_List() 
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
