import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import {FollowupListPage} from '../followup-list/followup-list';


@IonicPage()
@Component({
  selector: 'page-followup-add',
  templateUrl: 'followup-add.html',
})
export class FollowupAddPage 
{
  disableSelect:boolean = false;

  followup_data:any={};
  today_date = new Date().toISOString().slice(0,10);
  max_date = new Date().getFullYear() + 1;
  loading:Loading;  
  drList:any=[];
  followupList:any=[];
  drtype:any;
  checkin_id:any=0;
  
  constructor(
    public navCtrl: NavController,
    public storage:Storage, 
    public navParams: NavParams,
    public service: MyserviceProvider, 
    public loadingCtrl: LoadingController , 
    public alertCtrl:AlertController,
    public toastCtrl: ToastController,) 
    {
      
      console.log(this.navParams);
      this.checkin_id=this.navParams.get('checkin_id')
      if(this.checkin_id){
        this.disableSelect=true;

      }
     this.getNetworkType()
      
    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad FollowupAddPage');
    }
    networkType:any=[]
    getNetworkType(){
        this.service.addData3('', "Dashboard/allNetworkModule").then((result => {
          console.log(result);
          this.networkType = result['modules'];
        }))
      }
    getFollowup(date)
    {
      console.log(date);
      this.show_loading();
      this.service.addData({'followup_date':date},'Followup/followup_list').then((result)=>
      {
        console.log(result);
        this.followupList=result;
        // this.followup_data.type ='Dr';
        this.loading.dismiss();
      },err=>
      {
        this.loading.dismiss()
        
      })
      
      if(this.navParams.get('dr_type') && this.navParams.get('dr_name')){
        this.followup_data.dr_type=this.navParams.get('dr_type');
        this.getDrList( this.followup_data.dr_type);
      }
      
    }
    
    getDrList(type)
    {
      console.log(this.followup_data);
      console.log(type);
      this.followup_data.checkin_id=this.checkin_id;
      console.log(this.followup_data);
      
      this.drList = [];
      this.service.addData(this.followup_data ,'Followup/distributors_list').then((result)=>
      {
        console.log(result);
        this.drList=result;  
        
        if(this.navParams.get('dr_name')){
          this.followup_data.dr_id= this.drList.filter(row=>row.company_name == this.navParams.get('dr_name'));
          console.log(this.followup_data.dr_id);
          this.followup_data.dr_id=this.followup_data.dr_id[0].id;
          console.log(this.followup_data.dr_id);
        }
        
      },err=>
      {
        
      });
      
      
     
      
    }
    
    addFollowup()
    {
      
      // var index = this.followupList.findIndex(row=>row.dr_id==this.followup_data.dr_id)
      // console.log(index);
      // if(index!= -1)
      // {
      //   this.service.presentToast('Follow Up Already Exists !!')
      //   return
      // }
      this.show_loading();
      
      console.log(this.followup_data);
      
      this.service.addData(this.followup_data,'Followup/add_followup').then((result)=>
      {
        this.loading.dismiss();
        
        let toast = this.toastCtrl.create({
          message: 'Follow Up Saved Successfully!',
          duration: 3000
        });
        
        if(result['msg'] == 'success')
        { 
          toast.present();
          this.getFollowup(this.followup_data.followup_date)
          this.followup_data.type = '';
          this.followup_data.dr_type = '';
          this.followup_data.description = '';
          // this.followup_data.amount = '';

          this.followup_data.dr_id = '';
          this.drList = [];
        this.loading.dismiss();
          this.navCtrl.pop();
        }
      },err=>
      {
        this.loading.dismiss() 
      })
    }
    
    
    deleteFollowUp(id,i)
    {
      
      let alert = this.alertCtrl.create({
        title: 'Delete Follow Up',        
        message: 'Do you want to delete Follow Up?',
        cssClass: 'alert-modal',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              
              this.service.addData({'id':id},'Followup/deleteFollowUp').then((result)=>
              {
                let toast = this.toastCtrl.create({
                  message: 'Follow Up Deleted!',
                  duration: 3000
                });
                if(result=='success')
                {
                  toast.present();
                  this.followupList.splice(i,1);
                  this.getFollowup(this.followup_data.followup_date);
                }
              }); 
            }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
      
    }
    
    show_loading()
    {
      this.loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: `<img src="./assets/imgs/gif.svg"/>`,
        dismissOnPageChange: true
      });
      this.loading.present();
    }
    
  }
  