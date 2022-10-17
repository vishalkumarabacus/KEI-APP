import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar, NavController, NavParams } from 'ionic-angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { MyserviceProvider } from '../../../../../providers/myservice/myservice';


@IonicPage()
@Component({
  selector: 'page-lms-followup-add',
  templateUrl: 'lms-followup-add.html',
})
export class LmsFollowupAddPage {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  @ViewChild(Navbar) navBar: Navbar;


  constructor(public navCtrl: NavController, public navParams: NavParams,public db:MyserviceProvider) {
  }

  form:any={};
  today_date:any='';
  followup_edit:any={}
  page_from:any;
  disableSelect:boolean = false;


  ionViewWillEnter() {

    if(this.navParams.get('from'))
      {
        this.page_from = this.navParams.get('from');
        console.log(this.page_from);
      }

    if(this.navParams.get('data')){
      console.log(this.navParams.get('data'))
      this.followup_edit=this.navParams.get('data')
      this.form.followup_type = this.followup_edit.next_follow_type
      this.form.followup_date = this.followup_edit.next_follow_date
      this.form.description = this.followup_edit.description
      this.form.lead_type = this.navParams.get('update_type')
      this.form.dr_id={id:this.followup_edit.dr_id,company_name:this.followup_edit.dr_name};
       if(this.followup_edit.dr_id && this.followup_edit.dr_name){
        this.disableSelect=true;
      }
      this.get_assign_dr(this.navParams.get('update_type'));
      console.log(this.followup_edit);
      this.today_date = new Date().toISOString().slice(0,10);
      console.log(this.today_date);
    }

    else
    {
      this.type=this.navParams.get('type');
    this.form.lead_type = this.type;
    console.log(this.type);

    this.form.dr_id={id:this.navParams.get('id'),company_name:this.navParams.get('company_name')};
    console.log(this.form.dr_id);

    console.log('ionViewDidLoad LmsFollowupAddPage');
    this.get_assign_dr(this.type);

    this.today_date = new Date().toISOString().slice(0,10);
    console.log(this.today_date);
    }
  }

  filter:any={};
  type:any;
  id:any;
  type_list:any=[];

  dr_id:any;

  get_assign_dr(type_id)
  {
    this.filter.type_id = type_id;
    this.type_list = [];
    console.log(type_id);

    this.db.addData({'dr_id':this.dr_id,"search":this.filter,},"Lead/getLeadList")
    .then(resp=>{
      console.log(resp);
      this.type_list = resp['dr_list'];
      console.log(this.type_list);
    },
    err=>
    {
    })
  }

  test(id)
  {
    console.log('test');

    console.log(id);

  }
  submit()
  {
    console.log(this.form);

    this.form.drid = this.form.dr_id.id;
    this.form.companyname = this.form.dr_id.company_name;
    this.form.followup_id=this.navParams.get('update_id')

    this.db.show_loading()
    this.db.addData({"data":this.form,},"Lead/addFollowup")
    .then(resp=>{

      console.log(resp);
      this.db.dismiss()

      if(resp['status'] == 'Success' && !this.form.followup_id)
      {
        this.db.presentToast("Successfully Added");
        this.navCtrl.pop();
      }
      if(resp['status'] == 'Success' && this.form.followup_id)
      {
        this.db.presentToast(" Update Successfully");
        this.navCtrl.pop();
      }
    },
    err=>{
      this.db.dismiss()

    });
  }

}
