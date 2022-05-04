import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-attendence-new',
  templateUrl: 'attendence-new.html',
})
export class AttendenceNewPage {

  date:any
  current_month:any
  current_year:any
  attendance_list:any =[]
  attendance_summery:any ={}
  userId:any
  month_array:any=[]
  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public serve: MyserviceProvider,
              public loadingCtrl: LoadingController, 
              public storage: Storage,
              ) 
  {
    console.log();

    this.storage.get('userId').then((id) => {
          this.userId = id;
          console.log(this.userId);
  });
    
    this.date = new Date();
    this.current_month = this.date.getMonth();
    this.current_year = this.date.getFullYear();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttendenceNewPage');
    this.getMonthArray()
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

  getAttendanceData()
  {
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

}
