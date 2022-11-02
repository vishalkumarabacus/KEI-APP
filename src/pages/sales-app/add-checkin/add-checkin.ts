import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Navbar, Platform, AlertController  } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';

import { AddDealerPage } from '../add-dealer/add-dealer';
import { CheckinListPage } from '../checkin-list/checkin-list';
import { ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { EndCheckinPage } from '../end-checkin/end-checkin';
import { Diagnostic } from '@ionic-native/diagnostic';
// import { MapType } from '@angular/compiler/src/output/output_ast';
// import { MapOperator } from 'rxjs/operators/map';
// import { CacheService } from "ionic-cache";


@IonicPage()
@Component({
  selector: 'page-add-checkin',
  templateUrl: 'add-checkin.html',
})
export class AddCheckinPage {

  @ViewChild('selectComponent') selectComponent: IonicSelectableComponent;

  @ViewChild(Navbar) navBar: Navbar;

  userPincode:any
  userPincodeCheck = true ;
  add_exist:any=false
  data:any = {};
  distribution_data:any=[];
  addNewDealer:any=false;
  distributorList: any = [];
  checkin_data:any = [];
  filter:any=[]
  filter_category_active:any = false;
  filter_active:any = false;
  AddCheckinForm:FormGroup;
  load_data:any = "0";
  limit=0;
  flag:any='';

  isCheckinEnabled:boolean = false;
  customer_type:any = {};
  request:any
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public service: MyserviceProvider,
    public toastCtrl: ToastController,
    public formBuilder: FormBuilder,
    public diagnostic : Diagnostic,
    // public map : Map,

    public platform: Platform,
    public locationAccuracy: LocationAccuracy,

    // private  checkinListPage:CheckinListPage,
    public geolocation: Geolocation,public storage:Storage,
    // public cache : CacheService
    ) {


      // var cache = new Cache;

      // cache.delete()
      // this.cache.clearAll();
      // this.cache.enableCache(false)

      this.getFilterData()
      // this.checkUserLocation()
      this.data = {};

      if(this.navParams.get('data'))
      {
        this.distribution_data = this.navParams.get('data');
        console.log(this.distribution_data);

        this.data.network = this.distribution_data.type;
        console.log(this.data.network);

        this.data.dr_id = this.distribution_data.id;
        console.log(this.data.dr_id);

        this.data.type_name = {'company_name':this.distribution_data.company_name};
        console.log(this.data.type_name);

        this.type_name.company_name = this.distribution_data.company_name;
        this.type_name.name = this.distribution_data.name;
        this.type_name.mobile = this.distribution_data.mobile;
      }

      this.AddCheckinForm = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        mobile: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
      })

    }
    userType:any;
    ionViewDidLoad() {
      this.getNetworkType()
      console.log('ionViewDidLoad AddCheckinPage');

      // this.navBar.backButtonClick = (e:UIEvent)=>{
      //   // todo something
      //   this.navCtrl.push(CheckinListPage);
      // }

      this.storage.get('user_type').then((userType) => {
        console.log(userType);
        if(userType=='OFFICE')
        {
          this.data.network=3;
          this.get_network_list(this.data.network,'')
          this.userType  = userType
        }

      });


    }
    ionViewDidLeave(){

      console.log("destroyed attendence component")

      this.request.unsubscribe(); // To cancel the get request.
    }

    loading:any;
    networkType:any=[]
    otherType:any=[]

    // othertype=[{module_name:'Other',type:'11'}]
    getNetworkType(){
      this.request=  this.service.addData3({'type':'checkin'}, "Dashboard/allNetworkModule").then((result => {
        console.log(result);
        this.networkType = result['modules'];
        // this.networkType.push(this.othertype[0])
        console.log(this.networkType);
        // console.log(this.othertype);



      }))
    }
    getotherType(data){
      this.request= this.service.addData3({'type':data}, "Dashboard/others_type").then((result => {
        console.log(result);
        this.otherType = result['modules'];
        // this.networkType.push(this.othertype[0])
        console.log(this.networkType);
        this.open();

        // console.log(this.othertype);



      }))
    }
    category_list:any=[]
    getFilterData()
    {


      this.category_list = [{name:'Scheduled'},{name:'Unscheduled'}];

      this.category_list.map((x:any)=>{
        x.checked = false;
      });
    }
    typeboolean:any
    test(data){
      console.log(data)

      if(data!='3'&&data!='11'){
        this.string=undefined
        this.get_network_list(data,'')

        this.typeboolean =false

      }
      if(data!='3'&&data=='11'){
        this.string=undefined
        this.getotherType(data)

        this.typeboolean =false

      }
      console.log(this.typeboolean)

      if(data=='3' &&data!='11'){


        console.log(this.typeboolean)

        this.typeboolean =true
        // this.get_network_list(data)

        console.log(data)
        console.log(this.typeboolean)

      }
    }





    presentToast() {
      let toast = this.toastCtrl.create({
        message: 'Visit Started Successfully',
        duration: 3000,
        position: 'bottom'
      });



      toast.present();
    }


    distributor_network_list:any = [];
    string:any={}
    search:any={}

    test66(event,network){
      console.log(event.text);
      this.search=event.text
      console.log(this.search);
      this.get_network_list(network,this.search)

    }
    get_network_list(network_type,search)
    {


      this.data.type_name = {};
      // this.load = "0";

      console.log(network_type);
      if(network_type != 'Other')
      {
        // this.service.show_loading()
        this.request= this.service.addData({'search':search,'filter':this.string, 'type':network_type},'Distributor/get_type_list').then((result)=>{
          console.log(result);
          this.distributor_network_list = result;
          for(let i = 0 ;i<this.distributor_network_list.length;i++){
            if(this.distributor_network_list[i].company_name==null){
              this.distributor_network_list[i].company_name=''
          }
          if(this.distributor_network_list[i].name==null){
              this.distributor_network_list[i].name=''
          }
          if(this.distributor_network_list[i].mobile==null){
              this.distributor_network_list[i].mobile=''
          }
          if(this.distributor_network_list[i].city==null){
            this.distributor_network_list[i].city=''
          }
            if(this.distributor_network_list[i].name!=""||this.distributor_network_list[i].mobile!=""){
              this.distributor_network_list[i].company_name=this.distributor_network_list[i].company_name+',    '+this.distributor_network_list[i].city +'('+this.distributor_network_list[i].name+'  '+this.distributor_network_list[i].mobile+')'
            }
            if(this.distributor_network_list[i].name==""&&this.distributor_network_list[i].mobile==""){
              this.distributor_network_list[i].company_name=this.distributor_network_list[i].company_name
            }
          }
          this.filter=[]
          // this.load = "1";

          // this.service.dismiss();
          this.open();
        });
      }



    }
    loadData(infiniteScroll,network_type)
    {
      console.log('loading');

      this.request= this.service.addData({'limit':this.distributor_network_list.length,'filter':this.string, 'type':network_type},'Distributor/get_type_list').then( result=>
        {
          console.log(result);
          if(result=='')
          {
            this.flag=1;
          }
          else
          {
            setTimeout(()=>{
              this.distributor_network_list=this.distributor_network_list.concat(result);
              console.log('Asyn operation has stop')
              infiniteScroll.complete();
            },1000);
          }
        });
      }
      open()
      {
        this.selectComponent.open();
      }





      MobileNumber(event: any)
      {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar))
        {event.preventDefault(); }
      }


      load:any = "0";
      type_name:any={};

      other_name:any = '';
      dr_name:any
      other(name,network,type_name)
      {
        this.addNewDealer=false
        console.log(type_name);
        console.log(name);
        console.log(network);


        this.type_name = type_name;
        this.load = "1";
        this.dr_name=name
        console.log(name);
        console.log(network);
        if(name == 'Add New Channel Partner')
        {
          this.navCtrl.push(AddDealerPage,{'type': network});
        }

        if(name == 'Add New Direct Dealer')
        {
          this.navCtrl.push(AddDealerPage,{'type': network});
        }

        if(name == 'Prospective Retailer')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Distributor')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Dealer')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Project')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Contractor')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Architect')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Constructor')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Interior Designer')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Electrician')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Direct Customer')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Govt. Department')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Industry')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Infra')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective MEPM')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Builders')
        {
          this.addNewDealer = true;
        }
        if(name == 'Prospective Consultant')
        {
          this.addNewDealer = true;
        }
      }

      check_num(mobile)
      {
        this.checkExist=false
        console.log(mobile);

        if(mobile && mobile.length == 10)
        {
          console.log(mobile.length);

          console.log(mobile);
          this.check_mobile_existence(mobile)
        }
      }
      checkExist=false
      error:any
      check_mobile_existence(mobile)
      {
        // this.data.mobile=mobile

        this.service.show_loading()
        this.request= this.service.addData({'mobile':mobile},'Enquiry/check_mobile_existenceLead').then((result)=>{
          this.error=result['data']
          console.log(this.error);

          this.service.dismiss()

          if(result['executive']!=0)
          {
            let alert=this.alertCtrl.create({
              title:'Exists !!',
              subTitle: 'Mobile No Is Already Registered With An Executive !!',
              cssClass:'action-close',

              buttons: [
                {
                  text:'Okay',
                  cssClass: 'close-action-sheet',
                  handler:()=>
                  {
                  }
                }]
              });
              alert.present();
              this.data.mobile='';
              return;
            }
            if(result['check_mobile']==1)
            {
              this.checkExist=true

              // this.service.presentToast('Dealer With Same Mobile No. Already Exists')

            }
            else
            {
              this.data.DealerExist=false;

              this.checkExist=false
            }

          },err=>
          {
            this.service.dismiss()

          })



        }
        check_mobile(type){
          if(this.checkExist==true &&(this.data.network==this.error.type))
          {
            this.service.presentToast('Mobile No. Already Exists !!');
            return
          }
          if(this.data.network!=this.error.type &&this.error.checkin_active=='0')      {
            console.log('ok');
            let alert = this.alertCtrl.create({
              title: '',
              message: 'Are you still want to create checkin with same  mobile number ?',
              buttons: [
                {
                  text: 'Yes',
                  handler: () => {
                    this.add_exist=true
                    console.log('Cancel clicked');
                    this.presentalert(type)

                  }
                },
                {
                  text: 'No',
                  handler: () => {
                    this.data.mobile=''
                  }
                }
              ]
            })

            alert.present();
          }
        }



        userCurrentLocation:any
        // checkUserLocation()
        // {
        //   this.platform.ready().then(() => {

        //     var whiteList = ['com.package.example','com.package.example2'];

        //     (<any>window).gpsmockchecker.check(whiteList, (result) => {

        //       console.log(result);

        //       if(result.isMock){

        //         console.log("DANGER!! Mock is in use");
        //         console.log("Apps that use gps mock: ");
        //         let alert = this.alertCtrl.create({
        //           title: 'Alert!',
        //           subTitle: 'Please Remove Thirt Party Location Apps',
        //           buttons: [
        //             {
        //               text: 'Ok',
        //               handler: () =>
        //               {

        //               }
        //             }
        //           ]
        //         });
        //         alert.present();
        //         console.log(result.mocks);
        //       }
        //       else
        //       {
        //         this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        //           () => {
        //             let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
        //             this.geolocation.getCurrentPosition(options).then((resp) => {

        //               this.data.lat = resp.coords.latitude
        //               this.data.lng = resp.coords.longitude

        //               console.log(this.data);

        //               this.service.addData({'data':this.data},'Checkin/checkPincode').then((result)=>{
        //                 console.log(result);
        //                 this.userPincode = result[0]
        //                 this.userCurrentLocation = result[1]
        //                 console.log('check console here');

        //                 console.log(this.userPincode);
        //                 console.log(this.userCurrentLocation);

        //               },err=>
        //               {
        //                 this.service.dismiss();
        //               });

        //             }).catch((error) => {
        //               console.log('Error getting location', error);
        //               console.log('Error requesting location permissions', error);
        //               this.service.dismiss();
        //               let toast = this.toastCtrl.create({
        //                 message: 'Allow Location Permissions',
        //                 duration: 3000,
        //                 position: 'bottom'
        //               });



        //               toast.present();
        //             });
        //           },
        //           error => {
        //             console.log('Error requesting location permissions', error);
        //             this.service.dismiss();
        //             let toast = this.toastCtrl.create({
        //               message: 'Allow Location Permissions',
        //               duration: 3000,
        //               position: 'bottom'
        //             });



        //             toast.present();
        //           });
        //         }



        //       }, (error) => console.log(error));

        //     });

        //   }

        pending_checkin()
        {
          this.service.pending_data().then((result)=>{
            console.log(result);
            this.checkin_data = result['checkin_data'];
            console.log(this.checkin_data);
            // this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
          })
        }
        presentalert(type) {

          this.platform.ready().then(() => {

            var whiteList = ['com.package.example','com.package.example2'];

            (<any>window).gpsmockchecker.check(whiteList, (result) => {

              console.log(result);

              if(result.isMock){
                console.log("DANGER!! Mock is in use");
                console.log("Apps that use gps mock: ");
                let alert = this.alertCtrl.create({
                  title: 'Alert!',
                  subTitle: 'Please Remove Third Party Location Apps',
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
                console.log(result.mocks);
              }
              else
              {
                this.checkLocationActive(type);

                // let alert = this.alertCtrl.create({
                //   title: 'Start Visit',
                //   message: 'Do you want to start visit?',
                //   cssClass: 'alert-modal',
                //   buttons: [
                //     {
                //       text: 'Yes',
                //       handler: () => {
                //         console.log('Yes clicked');





                //       }
                //     },
                //     {
                //       text: 'No',
                //       role: 'cancel',
                //       handler: () => {
                //         console.log('Cancel clicked');
                //       }
                //     }

                //   ]
                // });
                // alert.present();
              }


            }, (error) => console.log(error));

          });


        }
        checkin(type)
        {

          console.log(type);

          this.service.show_loading()
          this.isCheckinEnabled = true;

          var options = {
            maximumAge:0,
            enableHighAccuracy: true,
            timeout:10000
          };

          // this.locationAccuracy.canRequest().then((canRequest: boolean) => {

          //   if (canRequest) {

          //     this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then((resp)=>{
          //       console.log("Request Successful");

          //       this.geolocation.getCurrentPosition(options).then((resp) => {
          //         console.log(resp);

          //       })

          //     },error=>{
          //          console.log('Error requesting location permissions', error)
          //     })
          //   }

          // });

          if(this.isCheckinEnabled==true){
            console.log("in Function");

            this.geolocation.getCurrentPosition(options).then((resp) => {
              this.data.lat = resp.coords.latitude
              this.data.lng = resp.coords.longitude

              if(type=='other'){

                this.service.addData({'data':this.data},'Checkin/start_other_visit').then((result)=>{
                  console.log(result);
                  this.isCheckinEnabled = false;

                  if(result == 'success')
                  {

                    this.navCtrl.remove(2,1,{animate:false});
                    this.navCtrl.pop({animate:false});
                    this.service.dismiss();
                    this.pending_checkin();
                    if(this.checkin_data != null){
                      this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
                      // this.navCtrl.pop();
                    }
                    this.presentToast();
                  }
                },err=>
                {
                  this.service.dismiss();
                });
              }
              else if(type=='old')
              {
                if(this.distribution_data == '')
                {
                  console.log(this.data);
                  this.data.dr_id = this.data.type_name.id;
                  this.data.dr_name = this.data.type_name.name;

                  this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
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
                      this.service.dismiss();
                      this.presentToast();




                    }
                    else
                    {
                      this.service.dismiss();
                    }


                  });
                }

                if(this.distribution_data != '')
                {

                  this.service.addData({'data':this.data},'Checkin/start_visit_new').then((result)=>{
                    console.log(result);
                    if(result == 'success')
                    {

                      this.navCtrl.pop({animate:false});
                      this.service.dismiss();
                      this.presentToast();
                      this.navCtrl.push(CheckinListPage);

                    }
                    else
                    {
                      this.service.dismiss();
                    }
                  });

                }


              }
              else if(type=='new'){

                this.data.type = 'Retailer';

                this.service.addData({'data':this.data,'add_exist':this.add_exist},'Checkin/start_dealer_visit').then((result)=>{
                  console.log(result);
                  this.isCheckinEnabled = false;

                  if(result == 'success')
                  {

                    this.navCtrl.remove(2,1,{animate:false});
                    this.navCtrl.pop({animate:false});
                    this.pending_checkin();
                    if(this.checkin_data != null){
                      this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
                      // this.navCtrl.pop();
                    }
                    this.service.dismiss();
                    this.presentToast();
                  }
                },err=>
                {
                  this.service.dismiss();
                });
              }

            }).catch((error) => {

              console.log(error);
              this.service.dismiss();


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

        checkLocationActive(targetAction){

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
                  this.checkin(targetAction);
                  break;
                  case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                  console.log("Permission granted only when in use");
                  this.checkin(targetAction);
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
