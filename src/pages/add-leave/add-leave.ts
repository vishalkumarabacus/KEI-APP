import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController,LoadingController } from 'ionic-angular';
import * as moment from 'moment/moment';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { LeaveListPage } from '../leave-list/leave-list';


@IonicPage()
@Component({
  selector: 'page-add-leave',
  templateUrl: 'add-leave.html',
})
export class AddLeavePage {
  data:any={};
  attend_id:any;
  start_time:any='';
  stop_time:any='';
  currentTime:any='';
  sub_list:any=[];
  today_date = new Date().toISOString().slice(0,10);
  loading: any;
  user_data:any
  currentDay:any=''
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public db:MyserviceProvider, public alertCtrl:AlertController, private toastCtrl: ToastController,
    public attendence_serv: AttendenceserviceProvider
    ,public loadingCtrl:LoadingController) 
  {
    this.last_attendence()
    this.getleaveList()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddLeavePage');
    this.currentTime = moment().format("HH:mm:ss");
    this.data.currentDay = moment().format("Y-M-D");
    
    // this.today_date = new Date(Date.now() + ( 3600 * 1000 * 24)).toISOString().slice(0,10);
    // console.log(this.today_date);
    this.data.type = 'Full Day';
  }
  
  add_leave()
  {
    console.log(this.data.leave_start_date);
    console.log(this.today_date);

    
    console.log(this.last_attendence_data);

    console.log(this.last_attendence_data.start_time);
    console.log(this.last_attendence_data.stop_time);

    
    if(this.last_attendence_data.start_time!=''&&this.last_attendence_data.stop_time=='00:00:00'&&(this.data.leave_start_date==this.today_date)){
      let toast = this.toastCtrl.create({
        message: 'Please firstly punched out!!!',
        duration: 3000
    });
    toast.present();
    return;
      // 
    }
    this.show_loading();

    this.db.addData({'data':this.data},"leave/add_leave").then(response=>
      {
        console.log(response);

        this.presentToast1();
        this.navCtrl.push(LeaveListPage);
        this.loading.dismiss();
      },err=>
      {
        this.loading.dismiss();
        this.db.errToasr()
      });
    }

    presentToast1() 
    {
      let toast1 = this.toastCtrl.create({
        message: 'Leave Added Successfully',
        duration: 3000,
        position: 'bottom'
      });
  
      toast1.present();
    }
    leave_list:any=[]
    getleaveList()
    {
  
      
      this.db.addData({},'Leave/leaves_type').then((result)=>
      {
        console.log(result);
        this.leave_list=result;
        console.log(result);
        console.log(this.leave_list);

      },err=>
      {
        
      }); 
    }
    showsuccess(text)
    {
      let alert= this.alertCtrl.create(
        {
          title:'Success!',
          subTitle:text,
          buttons: ['OK']
        });
        alert.present();
      }
      last_attendence_data:any
last_attendence() 
    {
      this.attendence_serv.last_attendence_data().then((result) => {
        console.log(result);
        this.last_attendence_data = result['attendence_data'];
        console.log(this.last_attendence_data);

        // this.get_dealers();
        
      });
      // this.get_dealers();
      
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
    