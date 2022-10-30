import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, LoadingController, Navbar, NavController, NavParams, Platform, PopoverController, ToastController } from 'ionic-angular';
import moment from 'moment';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { Storage } from '@ionic/storage';
import { AddCheckinPage } from '../sales-app/add-checkin/add-checkin';
import { ExpensePopoverPage } from '../expense-popover/expense-popover';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { EndCheckinPage } from '../sales-app/end-checkin/end-checkin';
import { Geolocation } from '@ionic-native/geolocation';
import { DashboardPage } from '../dashboard/dashboard';

import { Diagnostic } from '@ionic-native/diagnostic';

@IonicPage()
@Component({
  selector: 'page-checkin-new',
  templateUrl: 'checkin-new.html',
})
export class CheckinNewPage {
  @ViewChild('district_Selectable') district_Selectable: IonicSelectableComponent;
  // @ViewChild(Navbar) navBar: Navbar;

  selected_date =new Date().toISOString().slice(0,10);
  userId:any;
  checkinData:any={};
  actual:any=true;
  checkinType:any="My";
  data:any
  travelPlan: string = "actual_travel";
  user_list:any=[]

  isCheckinEnabled:boolean= false;

  traveled:any=false
  checkin_count_data : any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public locationAccuracy: LocationAccuracy,
    public diagnostic : Diagnostic,

    // private  checkinListPage:CheckinListPage,
    public geolocation: Geolocation,
    public serve: MyserviceProvider,
    public service: MyserviceProvider,

    public toastCtrl: ToastController,

    public loadingCtrl: LoadingController
    ,public popoverCtrl: PopoverController
    , public alertCtrl: AlertController,

    public storage: Storage)
    {
      if(this.navParams.get('comes_from')=='team_attendence'){
        console.log("hello world");
        let team_attendence_data=this.navParams.get('data');
        console.log(team_attendence_data);
        this.user_list.push({'id':team_attendence_data.id,'name':team_attendence_data.name});
        this.data = team_attendence_data.id;
        console.log(this.user_list);

        this.checkinType='';
        this.getCkeckInData();
      }


      this.storage.get('userId').then((id) => {
        this.userId = id;
        console.log(this.userId);
      });
      if(this.checkinType=='My'){
        this.getCkeckInData();
      }
      this.getuserlist();


    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad CheckinNewPage');
      // setTimeout(() => {
      this.selected_date = moment().format('YYYY-MM-DD');
      console.log(this.navParams);

      // }, 100);
    }
    presentPopover(myEvent)
    {
      let popover = this.popoverCtrl.create(ExpensePopoverPage,{'from':'Checkins'});

      popover.present({
        ev: myEvent
      });

      popover.onDidDismiss(resultData => {

        console.log(resultData);
        if( resultData)
        {
          this.checkinType = resultData.TabStatus;
          console.log(this.checkinType);

          this.getCkeckInData();
        }

      })

    }
    data1:any={}
    startVisit(id,name) {

      this.platform.ready().then(() => {

        var whiteList = ['com.package.example','com.package.example2'];

        (<any>window).gpsmockchecker.check(whiteList, (result) => {

          console.log(result);

          if(result.isMock){
            console.log("DANGER!! Mock is in use");
            console.log("Apps that use gps mock: ");
            let alert = this.alertCtrl.create({
              title: 'Alert!',
              subTitle: 'Please Remove Thirt Party Location Apps',
              buttons: [
                {
                  text: 'Ok',
                  handler: () =>
                  {

                  }
                }
              ]
            });
            console.log(result.mocks);
          }
          else
          {
            let alert = this.alertCtrl.create({
              title: 'Stop Time',
              message: 'Do you want to start checkin?',
              cssClass: 'alert-modal',
              buttons: [
                {
                  text: 'Yes',
                  handler: () => {
                    console.log('Yes clicked');
                    this.startvisit1(id,name)
                    this.checkLocationActive(id,name);


                  }
                },
                {
                  text: 'No',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }

              ]
            });
            alert.present();
          }


        }, (error) => console.log(error));

      });


    }


    checkin_data:any=[]
    startvisit1(id,name){
      this.serve.show_loading()
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {

          console.log('Request successful');

          let options = {maximumAge: 0, timeout: 15000, enableHighAccuracy: true};
          this.geolocation.getCurrentPosition(options).then((resp) => {


            var lat = resp.coords.latitude
            var lng = resp.coords.longitude


            console.log(this.data);
            this.data1.dr_id = id;
            this.data1.dr_name =name;
            this.data1.lat = lat;
            this.data1.lng = lng;
            this.data1.network = 3;

            this.serve.addData({'data':this.data1},'Checkin/start_visit_new').then((result)=>{
              console.log(result);
              console.warn("static result console");

              if(result == 'success')
              {
                this.navCtrl.remove(2,1,{animate:false});
                this.navCtrl.pop({animate:false});
                this.pending_checkin();
                if(this.checkin_data != null){
                  this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
                }
                this.serve.dismiss();
                this.presentToast();
                // this.checkinListPage.checkin_detail('71');



                // this.navCtrl.push(CheckinListPage,{'via':'checkinIsCreated'});

              }
              else
              {
                this.serve.dismiss();
              }

              // loading.dismiss();

            });
            // loading.dismiss();




          }).catch((error) => {
            console.log('Error getting location', error);
            // this.saveOrderHandler({});
            console.log('Error requesting location permissions', error);
            this.serve.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Allow Location Permissions',
              duration: 3000,
              position: 'bottom'
            });



            toast.present();
          });
        },
        error => {
          console.log('Error requesting location permissions', error);
          this.serve.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Allow Location Permissions',
            duration: 3000,
            position: 'bottom'
          });



          toast.present();
        });
      }
      pending_checkin()
      {
        this.serve.pending_data().then((result)=>{
          console.log(result);
          this.checkin_data = result['checkin_data'];
          console.log(this.checkin_data);
          // this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
        })
      }
      presentToast() {
        let toast = this.toastCtrl.create({
          message: 'Visit Started Successfully',
          duration: 3000,
          position: 'bottom'
        });



        toast.present();
      }
      getuserlist(){
        this.storage.get('userId').then((id) => {
          this.userId = id;
          console.log(this.userId);``
          this.serve.addData({'user_id':this.userId},'Attendence/all_ASM').then((result)=>
          {
            this.serve.dismiss();

            console.log(result);
            this.user_list=result['asm_id'];
            console.log(this.user_list);






          },err=>
          {
            this.serve.dismiss()
            this.serve.errToasr()
          });
        });

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
      expenselist:any
      addCheckin(){
        this.navCtrl.push(AddCheckinPage)
      }
      show_Error(stop_time){
        console.log("start your attendence first");

        var title1 = "Could not start your checkin,Please start your attendance.";
        var title2 = "Could not start your checkin,your attendance is stop.";

        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: stop_time =='00:00:00' ? title1 : title2,
          buttons: [
            {
              text: 'Ok',
              handler: () =>
              {

              }
            }
          ]
        });
        alert.present();

      }
      checkinDataorder:any=[]
      checkin_out:any
      getCkeckInData()
      {
        this.serve.show_loading();
        // this.selected_date = '2022-03-03';
        if(this.checkinType=='My'){
          this.data=""
          this.storage.get('userId').then((id) => {
            this.userId = id;
            console.log(this.userId);
            this.serve.addData({'user_id':this.userId,'checkin_type':this.checkinType},'Checkin_new/GET_CHECKIN_LIST/'+this.selected_date).then((result)=>
            {

              this.serve.dismiss()

              console.log(result);
              this.checkin_count_data = result['count'];
              this.checkin_out = result['checkOut'];
              console.log(this.checkinData);


              this.checkinData=result['data'];


              this.attendancelist=result['data']['attendance'];
              console.log(this.attendancelist)

              this.expenselist=result['data']['expense_data'];

              this.checkinlist= this.checkinData.actual_traval;


              if(result['data']['travel_plan']!=null){
                this.travellist=result['data']['travel_plan']['area_dealer_list'];
              }
              this.checkinData=result['data'];

              this.checkinDataorder=result['data']['primary_order'];
              console.log(this.checkinDataorder)

              if (this.attendancelist){

                this.starttime = moment(this.attendancelist['start_time_withDate'], 'hh:mm:ss a');
                this.stoptime = moment(this.checkinData['attendance']['stop_time'], 'hh:mm:ss a');

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
        if(this.checkinType!='My'){

          console.log(this.data);
          this.serve.addData({'user_id':this.data,'checkin_type':this.checkinType},'Checkin_new/GET_CHECKIN_LIST/'+this.selected_date).then((result)=>
          {

            console.log(result);
            this.checkin_count_data = result['count'];
            this.checkinData=result['data'];
            this.checkin_out = result['checkOut'];
            console.log(this.checkin_out);
            this.attendancelist=result['data']['attendance'];

            this.expenselist=result['data']['expense_data'];

            this.checkinlist= this.checkinData.actual_traval;

            if (result['data']['travel_plan'] != null) {
              this.travellist = result['data']['travel_plan']['area_dealer_list'];
            }

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
            this.serve.dismiss();

          },err=>
          {
            this.serve.dismiss()
            this.serve.errToasr()
          });
        }
      }

      checkin(id,name)
      {

        // window.caches.delete()

        var options = {
          maximumAge: 0,
          timeout: 10000,
          enableHighAccuracy: true
        };

        this.serve.show_loading()
        this.isCheckinEnabled = true;

        if (this.isCheckinEnabled==true){

          console.log("In function");


          this.geolocation.getCurrentPosition(options).then((resp) => {
            var lat = resp.coords.latitude
            var lng = resp.coords.longitude

            this.data1.dr_id = id;
            this.data1.dr_name =name;
            this.data1.lat = lat;
            this.data1.lng = lng;
            this.data1.network = 3;

            this.serve.addData({'data':this.data1},'Checkin/start_visit_new').then((result)=>{
              console.log(result);
              console.warn("static result console");
              this.isCheckinEnabled = false;

              if(result == 'success')
              {
                this.navCtrl.remove(2,1,{animate:false});
                this.navCtrl.pop({animate:false});
                this.pending_checkin();
                if(this.checkin_data != null){
                  this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
                }
                this.serve.dismiss();
                this.presentToast();
                // this.checkinListPage.checkin_detail('71');



                // this.navCtrl.push(CheckinListPage,{'via':'checkinIsCreated'});

              }
              else
              {
                this.serve.dismiss();
              }

              // loading.dismiss();

            });


          }).catch((error) => {

            this.serve.dismiss();
            let alert = this.alertCtrl.create({
              title: '',
              message: 'Could not get Location !!',
              buttons: [

                {
                  text: 'OK',
                  handler: () => {
                  }
                }
              ]
            })
            alert.present();

          });

        }
      }

      checkLocationActive(id,name){

        console.log("Check location");


        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {

            this.diagnostic.requestLocationAuthorization().then((status)=>{
              console.log(status);

              switch (status) {
                case this.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
                case this.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission denied");
                this.throwLocationError()
                break;
                case this.diagnostic.permissionStatus.DENIED:
                console.log("Permission denied");
                this.throwLocationError()
                break;
                case this.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted always");
                this.checkin(id,name);
                break;
                case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                console.log("Permission granted only when in use");
                this.checkin(id,name);
                break;

                default:
                console.log("DEFAULT CASE");
                console.log(status);
                this.throwLocationError()
              }
            },error=>{
              console.log("authorision Error");

              this.diagnostic.locationAuthorizationMode.ALWAYS
            })

          },
          error => {
            console.log("Accuracy Error");

            this.service.dismiss();
            let alert = this.alertCtrl.create({
              title: '',
              message: 'Please Allow Location !!',
              buttons: [

                {
                  text: 'OK',
                  handler: () => {
                  }
                }
              ]
            })
            alert.present();
            this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY
          });

        }

        throwLocationError() {

          console.log("location error");

          let alert=this.alertCtrl.create({
            title:'To access this app please allow location permission from KEI App',
            cssClass:'action-close',

            buttons: [{
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text:'Ok',
              cssClass: 'close-action-sheet',
              handler:()=>
              {
                this.diagnostic.switchToLocationSettings();
              }
            }]
          });
          alert.present();

        }
      }
