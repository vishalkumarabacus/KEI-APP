import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { TravelAddNewPage } from '../travel-add-new/travel-add-new';


@IonicPage()
@Component({
  selector: 'page-travel-list-new',
  templateUrl: 'travel-list-new.html',
})
export class TravelListNewPage {

  currentMonth: any;
  currentYear: any;
  TodayDate = new Date().toISOString().slice(0,10);
  monthNames: string[];
  date: any;
  currentMonth_no :any;
  daysInThisMonth: any=[];
  daysInLastMonth: any=[];
  daysInNextMonth: any=[];
  travel_data:any ={}
  percentages:any=0;
  userId:any
  dateArray:any=[];


  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public serve: MyserviceProvider,
              public loadingCtrl: LoadingController, 
              public storage: Storage,
              ) 
  {
    this.date = new Date();
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    console.log(this.TodayDate);
    

    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    this.currentMonth_no = this.date.getMonth();

    this.storage.get('userId').then((id) => {
      this.userId = id;
      console.log(this.userId);
});
    
    console.log(this.percentages);
    

  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad TravelListNewPage');
    this.getMonthlyData();

  }
  goToLastMonth(){
    this.date = new Date(this.currentYear, this.currentMonth_no , 0);
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    this.currentMonth_no = this.date.getMonth();

    this.getMonthlyData();
  }
  
  goToNextMonth() {
    this.date = new Date(this.currentYear, this.currentMonth_no+2 , 0);
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    this.currentMonth_no = this.date.getMonth();

    this.getMonthlyData();
  }

  
  getMonthlyData()
  {
    let data = {'month':this.currentMonth_no+1,'year':this.currentYear,'user_id':this.userId}

      console.log(data);
     this.serve.show_loading();

      this.serve.addData(data,'TravelPlan_new/getTravleData').then((result)=>
      {
        console.log(result);

        this.dateArray = result['dateArray']
        this.travel_data.working_days = 25;
        this.travel_data.travel_plan = 5;
        this.percentages = (this.travel_data.travel_plan/this.travel_data.working_days)*100

        console.log(this.travel_data);
        this.getDaysOfMonth() ;
        
      },err=>
      {
          this.serve.dismiss()
          this.serve.errToasr()
      });

  }

  getDaysOfMonth() 
  {

    let i
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];

     var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
     firstDayThisMonth ==0?firstDayThisMonth=6:firstDayThisMonth = (firstDayThisMonth-1);
        
     var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

    for( i = prevNumOfDays-(firstDayThisMonth-1); i <= prevNumOfDays; i++) 
    {
      this.daysInLastMonth.push(i);
    }
   
    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDate();
    
    for ( i = 0; i < thisNumOfDays; i++) 
    {
      let month = ((this.currentMonth_no+1) < 10) ? '0'+(this.currentMonth_no+1):(this.currentMonth_no+1)
      let date = ((i+1) < 10) ? '0'+(i+1):(i+1)
      let fulldate = this.date.getFullYear()+'-'+month+'-'+date
      let date_data = this.dateArray.filter(x => x.date === fulldate)[0];
      
      this.daysInThisMonth[i] = {'day':i+1 , 'date':fulldate, 'day_name':date_data.day,'isHoliday':date_data.isHoliday,'isOnLeave':date_data.isOnLeave,'isSunday':date_data.isSunday,'travlePlan':date_data.travlePlan};
      
    }

    console.log(this.daysInThisMonth);
    

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth()+1, 0).getDay();

    if(lastDayThisMonth>0)
    {
      for (i = 0; i < (7-lastDayThisMonth); i++) 
      {
        this.daysInNextMonth.push(i+1);
      }
    }

     this.serve.dismiss()
    
  }

  goToPage(data)
  {
    console.log(data);
    this.navCtrl.push(TravelAddNewPage)
    
  }

}
