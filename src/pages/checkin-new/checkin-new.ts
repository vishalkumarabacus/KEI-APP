import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { AddCheckinPage } from '../sales-app/add-checkin/add-checkin';


@IonicPage()
@Component({
  selector: 'page-checkin-new',
  templateUrl: 'checkin-new.html',
})
export class CheckinNewPage {
  selected_date =new Date().toISOString().slice(0,10);
  userId:any;
  checkinData:any={};
  actual:any=true;

  travelPlan: string = "actual_travel";



  traveled:any=false
  checkin_count_data : any = {};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public serve: MyserviceProvider,
    public loadingCtrl: LoadingController, 
    public storage: Storage) 
    {
      this.storage.get('userId').then((id) => {
        this.userId = id;
        console.log(this.userId);
      });
      this.getCkeckInData();

    }
    
    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckinNewPage');
      // setTimeout(() => {
        this.selected_date = moment().format('YYYY-MM-DD');
      
      // }, 100);
    }
    
    changeDate(type)
    { 
      console.log(type);
      
      if(type=='previous')
      this.selected_date = moment(this.selected_date).subtract(1, "days").format('YYYY-M-D');
      
      if(type=='next')
      this.selected_date = moment(this.selected_date).add(1, 'days').format('YYYY-M-D'); 
      this.getCkeckInData();
      
    }
   expense:any 
   checkinlist:any=[]
   travellist:any=[]
   attendancelist:any=[]
   starttime:any=[]
   stoptime:any=[]

   addCheckin(){
    this.navCtrl.push(AddCheckinPage)
  }

    getCkeckInData()
    {
      this.serve.show_loading();
      // this.selected_date = '2022-03-03';
      this.storage.get('userId').then((id) => {
        this.userId = id;
        console.log(this.userId);
      this.serve.addData({'user_id':this.userId},'Checkin_new/GET_CHECKIN_LIST/'+this.selected_date).then((result)=>
      {
        this.serve.dismiss();

        console.log(result);
        this.checkin_count_data = result['count'];
        this.checkinData=result['data'];
        this.attendancelist=result['data']['attendance'];
        this.checkinlist= this.checkinData.actual_traval;

        this.travellist=result['data']['travel_plan']['area_dealer_list'];

        this.checkinData=result['data'];

        if (this.attendancelist){
          // this.checkinData['start_date_time'] = this.checkinData['attendance']['start_time'] ?  this.checkinData['attendance']['attend_date']+' '+this.checkinData['attendance']['start_time'] : null;
          // this.checkinData['stop_date_time'] = this.checkinData['attendance']['stop_time'] ? this.checkinData['attendance']['attend_date']+' '+this.checkinData['attendance']['stop_time']:null;
          
          this.starttime = moment(this.attendancelist['start_time_withDate'], 'hh:mm:ss a');
          this.stoptime = moment(this.checkinData['attendance']['stop_time'], 'hh:mm:ss a');
          // this.checkinData['total_working_hours'] = endTime.diff(startTime, 'hours');

        }
        console.log(this.checkinlist);
        console.log(this.stoptime);

        this.expense = this.checkinData['expense_data'].total_expense;
        console.log(this.expense);
        
      },err=>
      {
        this.serve.dismiss()
        this.serve.errToasr()
      }); 
    });

    } 
    
  }
  