import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { ExpensePopoverPage } from '../expense-popover/expense-popover';
import { IonicSelectableComponent } from 'ionic-selectable';
import moment from 'moment';
import { CheckinNewPage } from '../checkin-new/checkin-new';

@IonicPage()
@Component({
  
  
  
  selector: 'page-attendence-new',
  templateUrl: 'attendence-new.html',
})
export class AttendenceNewPage {
  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;
  date:any
  current_month:any
  current_year:any
  attendance_list:any =[]
  attendance_list1:any =[]
  
  attendance_summery:any ={}
  userId:any
  month_array:any=[]
  attendencetype='My'
  data:any={};
  absent_count:any
  count:any
  selected_date =new Date().toISOString().slice(0,10);
  data3:any=false
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serve: MyserviceProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public popoverCtrl: PopoverController,
    )
    {
      console.log();
      this.get_team_state();
      this.get_team_region()
      
      this.storage.get('userId').then((id) => {
        this.userId = id;
        console.log(this.userId);
      });
      
      this.date = new Date();
      this.current_month = this.date.getMonth();
      this.current_year = this.date.getFullYear();
    }
    
    teamCount:any= 0;
    ionViewDidLoad() {
      this.storage.get('team_count').then((team_count) => {
        this.teamCount = team_count;
      });
      console.log('ionViewDidLoad AttendenceNewPage');
      this.getMonthArray()
      this.get_user();
      
    }
    getMonthArray()
    {
      
      for (let i = 0; i < 5; i++)
      {
        let month = new Date(this.current_year,this.current_month-i,1).getMonth()
        let year = new Date(this.current_year,this.current_month-i,1).getFullYear()
        
        this.month_array.push({ 'month':month,'year':year,'month_name':this.monthNames[month]})
      }
      console.log(this.month_array);
      
      setTimeout(() => {
        this.getAttendanceData();
        
      }, 100);
      
      
    }
    changeDate(type)
    { 
      console.log(type);
      
      if(type=='previous')
      this.selected_date = moment(this.selected_date).subtract(1, "days").format('YYYY-M-D');
      
      if(type=='next')
      this.selected_date = moment(this.selected_date).add(1, 'days').format('YYYY-M-D'); 
      this.getTeamData();
      
    }
    test2(){
      this.data3=true
    }

    refresh(){
      this.data.team_state=''
      this.data.team_region=''
      this.getTeamData();
      this.get_team_region();
      this.get_team_state();
    

    }
    getTeamData()
    {
      
      if(this.attendencetype!='My'){
        // this.serve.show_loading();

        let data = {'month':this.current_month+1,'year':this.current_year,'user_id':this.data.user,'date':this.selected_date,'region':this.data.team_region,'team_state':this.data.team_state}
        
        console.log(data);
        
        this.serve.addData(data,'Attendence_new/GET_TEAM_ATTENDANCE').then((result)=>
        {
          console.log(result);

          this.attendance_list1 = result['data'].attendance;
          this.count = result['data'].present_count;
          console.log(this.attendance_list1.length);
          console.log(this.count);
          this.absent_count=this.attendance_list1.length-this.count
          console.log(this.absent_count);
          
          
          

          this.attendance_summery = result['data'].attendance_summery;
          for (let i = 0; i < this.attendance_list.length; i++) {
            this.attendance_list[i]['start_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['start_time'];
            this.attendance_list[i]['stop_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['stop_time'];
            this.attendance_list[i]['collapse'] = false;
            
          }

          
        },err=>
        {
          
        });
      }
      
      
    }
    getAttendanceData()
    {
      if(this.attendencetype=='My'){
        this.data.user=""
        let data = {'month':this.current_month+1,'year':this.current_year,'user_id':this.userId}
        this.serve.show_loading();
        
        console.log(data);
        
        this.serve.addData(data,'Attendence_new/GET_USER_ATTENDANCE').then((result)=>
        {
          console.log(result);
          this.attendance_list = result['data'].attendance
          this.attendance_summery = result['data'].attendance_summery
          for (let i = 0; i < this.attendance_list.length; i++) {
            this.attendance_list[i]['start_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['start_time'];
            this.attendance_list[i]['stop_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['stop_time'];
            this.attendance_list[i]['collapse'] = false;
            
          }
          this.serve.dismiss()
          
        },err=>
        {
          this.serve.dismiss()
          this.serve.errToasr()
        });
      }
      if(this.attendencetype!='My'){
        let data = {'month':this.current_month+1,'year':this.current_year,'user_id':this.data.user,}
        this.serve.show_loading();
        
        console.log(data);
        
        this.serve.addData(data,'Attendence_new/GET_USER_ATTENDANCE').then((result)=>
        {
          console.log(result);
          this.attendance_list = result['data'].attendance
          this.attendance_summery = result['data'].attendance_summery
          for (let i = 0; i < this.attendance_list.length; i++) {
            this.attendance_list[i]['start_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['start_time'];
            this.attendance_list[i]['stop_date_time'] = this.attendance_list[i]['date']+' '+this.attendance_list[i]['stop_time'];
            this.attendance_list[i]['collapse'] = false;
            
          }
          this.serve.dismiss()
          
        },err=>
        {
          this.serve.dismiss()
          this.serve.errToasr()
        });
      }
      
      
    }
    presentPopover(myEvent)
    {
      let popover = this.popoverCtrl.create(ExpensePopoverPage,{'from':'Attendence'});
      
      popover.present({
        ev: myEvent
      });
      
      popover.onDidDismiss(resultData => {
        
        console.log(resultData);
        if( resultData)
        {
          this.attendencetype = resultData.TabStatus;
          console.log(this.attendencetype);
          this.getAttendanceData();
          if(this.attendencetype=="Team"){
            this.getTeamData()
          }
          
          
        }
        
      })
      
    }
    test(id)
    {
      console.log('test');
      
      console.log(id);
      
    }
    user_list:any=[]
    get_user()
    {
      
      this.serve.addData({'user_id':this.data.user},"Attendence/all_ASM")
      .then(resp=>{
        console.log(resp);
        this.user_list = resp['asm_id'];
        console.log(this.user_list);
      },
      err=>
      {
      })
    }
    region_list:any=[]
    get_team_region(){
      this.serve.addData({},"Attendence_new/team_region")
      .then(resp=>{
        console.log(resp);
        this.region_list = resp['region'];
        console.log(this.region_list);
      },
      err=>
      {
      })
    
    }

    teamstate_list:any=[]
    get_team_state(){
      this.serve.addData({'region':this.data.team_region},"Attendence_new/team_state")
      .then(resp=>{
        console.log(resp);
        this.teamstate_list = resp['team_state'];
        console.log(this.teamstate_list);
      },
      err=>
      {
      })
    
    }

    gotoViewCheckin(data){
      console.log(data);
      
      this.navCtrl.push(CheckinNewPage,{'data':data, 'comes_from':'team_attendence'})
    }


  }
  