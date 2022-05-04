import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FollowupAddPage } from '../followup-add/followup-add';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import moment from 'moment';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { FollowupDetailPage } from '../followup-detail/followup-detail';



@IonicPage()
@Component({
  selector: 'page-followup-list',
  templateUrl: 'followup-list.html',
})
export class FollowupListPage 
{
  today_date = new Date().toISOString().slice(0,10);
  followupList:any=[];
  selected_date =new Date().toISOString().slice(0,10);
  loading:Loading;  
  userId:any;
  requestSend:any = false;
  user_data:any={};
  see_more_button : any = 0;  
  filter:any={};
  complete_count:any;
  pending_count:any; 
  upcoming_count:any; 
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: MyserviceProvider, 
    public loadingCtrl: LoadingController,
    public alertCtrl:AlertController,
    public toastCtrl: ToastController,
    public attendence_serv: AttendenceserviceProvider) 
    {
      this.userId = this.navParams.get('userId');
      console.log(this.userId);
      
      // this.last_attendence(); 
      this.getFollowup();
    }
    
    ionViewWillEnter() 
    {  
      this.filter.status='pending'
      this.getFollowup();
    }
    
    goOnAddFollowup(){
      this.navCtrl.push(FollowupAddPage,{})
    }

    // goOnDetail(){
    //   this.navCtrl.push(FollowupDetailPage,{})
    // }
   
    
    nextDate()
    { 
      console.log( this.selected_date);
      this.selected_date = moment(this.selected_date).add(1, 'days').format('YYYY-M-D'); 
      console.log( this.selected_date);
      this.getFollowup();
      
    }
    
    previousDate()
    {
      this.selected_date = moment(this.selected_date).subtract(1, "days").format('YYYY-M-D');
      this.getFollowup();
    }
    
    // last_attendence() 
    // {
    //   this.attendence_serv.last_attendence_data().then((result) => {
    //     console.log(result);
    //     this.user_data = result['user_data'];
    //     console.log(this.user_data.id);
    //     // this.get_dealers();
        
    //   });
    //   // this.get_dealers();
      
    // }

    id:any;
    getFollowup()
    {
      // this.service.show_loading();
      
      // this.requestSend=false
      // this.show_loading();
      this.service.addData({'filter':this.filter},'Followup/followup_list').then((result)=>
      {
        console.log(result);
      // this.service.dismiss();.

        this.followupList=result['followup_list'];
        this.requestSend=true
        this.complete_count = result['count']['complete_count'];
        this.pending_count = result['count']['pending_count'];
        this.upcoming_count = result['count']['upcoming_count'];
        this.id= result['followup_list']['id'];
        console.log(this.id);
        
      },err=>
      {
      // this.service.dismiss();
        
        
      })
      
    }
    
    go_to_followup_detail(id){
      console.log("go_to_followup_detail method call");
      console.log(id);
      this.navCtrl.push(FollowupDetailPage,{'follow_up_id':id , 'from':'follow_up_list_page'})
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
                  this.getFollowup();
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
    
   
    
    
    
    
  }
  