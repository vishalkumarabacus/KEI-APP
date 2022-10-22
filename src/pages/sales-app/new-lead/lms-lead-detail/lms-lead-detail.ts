import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams,ToastController,ActionSheetController, ModalController, AlertController, Platform, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { LmsActivityListPage } from '../lms-lead-activity/lms-activity-list/lms-activity-list';
import { LmsFollowupListPage } from '../lms-lead-followup/lms-followup-list/lms-followup-list';
import { LmsQuotationListPage } from '../lms-lead-quotation/lms-quotation-list/lms-quotation-list';
import { AddMultipleContactPage } from '../../../add-multiple-contact/add-multiple-contact';
import { PointLocationPage } from '../../../point-location/point-location';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LmsLeadAddPage } from '../lms-lead-add/lms-lead-add';
import { ExpenseStatusModalPage } from '../../../expense-status-modal/expense-status-modal';
import { EndCheckinPage } from '../../end-checkin/end-checkin';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

import { Geolocation } from '@ionic-native/geolocation';
import { AttendenceserviceProvider } from '../../../../providers/attendenceservice/attendenceservice';
import { Diagnostic } from '@ionic-native/diagnostic';
import moment from 'moment';
import { CheckinNewPage } from '../../../checkin-new/checkin-new';



@IonicPage()
@Component({
  selector: 'page-lms-lead-detail',
  templateUrl: 'lms-lead-detail.html',
})
export class LmsLeadDetailPage {

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public popoverCtrl: PopoverController, public modal: ModalController,
    public modalCtrl: ModalController,public actionSheetController: ActionSheetController,
     public alertCtrl: AlertController,private camera: Camera ,public navParams: NavParams,
    public diagnostic : Diagnostic,
    public locationAccuracy: LocationAccuracy,
    public platform: Platform,


     // private  checkinListPage:CheckinListPage,
     public geolocation: Geolocation,public db:MyserviceProvider,
      public attendence_serv: AttendenceserviceProvider,
     public loadingCtrl: LoadingController,public service:MyserviceProvider) {
      this.last_attendence()
      this.dr_detail()


    }

  ionViewWillEnter() {
    this.last_attendence()

    this.dr_id=this.navParams.get('id');
    this.tab_id=this.navParams.get('tab_id');
    console.log(this.tab_id);
    console.log(this.dr_id);
    this.dr_detail();
    console.log('ionViewDidLoad LmsLeadDetailPage');
    this.today_date = new Date().toISOString().slice(0,10);
    console.log(this.today_date);
  }

  search:any={}
  dr_id:any;
  tab_id:any;
  lead_detail:any={};
  contactPerson:any={};
  visiting_image:any=[];
  image: any = '';
  today_date:any='';



  dr_detail()
  {
    // var loading = this.loadingCtrl.create({
    //   spinner: 'hide',
    //   content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    // });
    // this.distributor_detaill.orderType = type
    this.service.show_loading()
    console.log(this.search);
    this.service.addData({'dr_id':this.dr_id,search:this.search},'Lead/getLeadDetail').then((result)=>{
      console.log(result);
      this.lead_detail = result['data'];
      console.log(this.lead_detail);
      console.log(this.lead_detail.date_updated);
      if (this.lead_detail.date_updated) {
        this.lead_detail.date_updated = moment(this.lead_detail.date_updated).format('YYYY-MM-DD');
        console.log(this.lead_detail.date_updated);
        console.log(this.today_date);
      }
      if (this.lead_detail.date_created) {
        this.lead_detail.date_created = moment(this.lead_detail.date_created).format('YYYY-MM-DD');
        console.log(this.lead_detail.date_created);
        console.log(this.today_date);
      }
      this.visiting_image.push(this.lead_detail.visiting_card_image)
      console.log(this.visiting_image);
      this.contactPerson=result['data']['contactPerson'];
      console.log(this.contactPerson);
      this.service.dismiss()
    });
  }

  lead_followup(type,id,company_name)
  {
    console.log(type);
    console.log(id);
    console.log(company_name);
    this.navCtrl.push(LmsFollowupListPage,{'type':type,'id':id,'company_name':company_name})
  }

  lead_activity(type,id,company_name)
  {
    console.log(type);
    console.log(id);
    console.log(company_name);
    this.navCtrl.push(LmsActivityListPage,{'type':type,'id':id,'company_name':company_name})
  }

  goToQuotation(type,id,company_name)
  {
    this.navCtrl.push(LmsQuotationListPage,{'type':type,'id':id,'company_name':company_name});
  }
  go_editlead()
    {
      this.navCtrl.push(LmsLeadAddPage,{'data':this.lead_detail,'tab_id':this.tab_id})
    }
  addContactPerson(id){
    this.navCtrl.push(AddMultipleContactPage,{'dr_id':id})
  }

  update_location(lat,lng,id,leadType){
    console.log(lat);
    console.log(lng);
    this.navCtrl.push(PointLocationPage,{"lat":lat,"lng":lng,"id":id,"type":leadType});
  }

  remove_image(i: any) {
    this.visiting_image.splice(i, 1);
  }


  captureMedia() {
    let actionsheet = this.actionSheetController.create({
      title: "Upload Image",
      cssClass: 'cs-actionsheet',

      buttons: [{
        cssClass: 'sheet-m',
        text: 'Camera',
        icon: 'camera',
        handler: () => {
          console.log("Camera Clicked");

          this.takePhoto();
        }
      },
      {
        cssClass: 'sheet-m1',
        text: 'Gallery',
        icon: 'image',
        handler: () => {
          console.log("Gallery Clicked");
          this.getImage();
        }
      },
      {
        cssClass: 'cs-cancel',
        text: 'Cancel',
        role: 'cancel',
        icon: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    actionsheet.present();
  }
  last_attendence_data: any = [];

        last_attendence()
    {
      this.attendence_serv.last_attendence_data().then((result) => {
        console.log(result);
        this.last_attendence_data = result['attendence_data'];


      });
      // this.get_dealers();

    }
  takePhoto() {
    console.log("i am in camera function");
    const options: CameraOptions =
    {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 400,
      cameraDirection:1,
      correctOrientation : true,
    }

    console.log(options);
    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
      console.log(this.image);
      if (this.image) {
        this.fileChange(this.image);
      }
    },
    (err) => {
    });
  }
  checkin_data:any=[]
  data1:any={}

  startVisit(type,id,name) {

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
                                this.startvisit1(type,id,name)

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
startvisit1(type,id,name){
  // this.serve.show_loading()
  this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
    () => {

      console.log('Request successful');

      let options = {maximumAge: 10000, timeout: 15000, enableHighAccuracy: true};
      this.geolocation.getCurrentPosition(options).then((resp) => {


        var lat = resp.coords.latitude
        var lng = resp.coords.longitude


          this.data1.dr_id = id;
          this.data1.dr_name =name;
          this.data1.lat = lat;
          this.data1.lng = lng;
          this.data1.network = type;

          this.service.addData({'data':this.data1},'Checkin/start_visit_new').then((result)=>{
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
              // this.serve.dismiss();
              // this.presentToast();
              // this.checkinListPage.checkin_detail('71');



              // this.navCtrl.push(CheckinListPage,{'via':'checkinIsCreated'});

            }
            else
            {
              // this.serve.dismiss();
            }

            // loading.dismiss();

          });
          // loading.dismiss();




      }).catch((error) => {
        console.log('Error getting location', error);
        // this.saveOrderHandler({});
        console.log('Error requesting location permissions', error);
        // this.serve.dismiss();
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
      // this.serve.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Allow Location Permissions',
        duration: 3000,
        position: 'bottom'
      });



      toast.present();
    });
}
show_Error(){
  console.log("start your attendence first");

  let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Please Start Attendence First',
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
  pending_checkin()
        {
          this.service.pending_data().then((result)=>{
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
  getImage() {
    const options: CameraOptions =
    {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    console.log(options);

    this.camera.getPicture(options).then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;

      console.log(this.image);
      if (this.image) {
        this.fileChange(this.image);
      }
    }, (err) => {
    });
  }



  fileChange(img) {
    this.visiting_image = (img);
    console.log(this.visiting_image);
    this.image = '';

    this.update_visiting_card()


  }
  // statusModal1(type)
  // {
  //   this.navCtrl.push(ExpenseStatusModalPage,{'lead_id':this.dr_id,'status':this.lead_detail.status,'from':'leaddetail' });
  // }

  statusModal1(type)
  {
    console.log(type)
    let modal = this.modalCtrl.create(ExpenseStatusModalPage,{'lead_id':this.dr_id,'status':this.lead_detail.status,'from':'leaddetail'});

    modal.onDidDismiss(data =>
    {
      console.log(data);
      this.dr_detail()
    });
    modal.present();
  }

  update_visiting_card(){
    var loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h55" />`,
    });
    loading.present();
    this.service.addData({'dr_id':this.dr_id,'visiting_card_image':this.visiting_image},'Lead/update_visitingCard').then((result)=>{
      console.log(result);
      if(result['msg'] == "success"){
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message:' Image Updated Successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.dr_detail();

      }
      else{
        let toast = this.toastCtrl.create({
          message: 'Something went wrong in uploading image',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        loading.dismiss();
      }

    });
    loading.dismiss();
  }

  statusModal(id, state)
  {
    this.navCtrl.push(ExpenseStatusModalPage,{'drId':id,'from':'leadassign', 'state':state});
  }

  presentalert(type,id,name) {

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
                console.log(result.mocks);
            }
            else
            {
              this.checkLocationActive(type,id,name);


                // let alert = this.alertCtrl.create({
                //     title: 'Stop Time',
                //     message: 'Do you want to start checkin?',
                //     cssClass: 'alert-modal',
                //     buttons: [
                //         {
                //             text: 'Yes',
                //             handler: () => {
                //                 console.log('Yes clicked');





                //             }
                //         },
                //         {
                //             text: 'No',
                //             role: 'cancel',
                //             handler: () => {
                //                 console.log('Cancel clicked');
                //             }
                //         }

                //     ]
                // });
                // alert.present();
        }


        }, (error) => console.log(error));

    });


}
checkin(type,id,name)
{

    console.log(type);

    var options = {
        maximumAge: 15000,
        timeout: 10000,
        enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((resp) => {
      var lat = resp.coords.latitude
      var lng = resp.coords.longitude

      this.data1.dr_id = id;
      this.data1.dr_name =name;
      this.data1.lat = lat;
      this.data1.lng = lng;
      this.data1.network = type;

      this.service.addData({'data':this.data1},'Checkin/start_visit_new').then((result)=>{
        console.log(result);
        if(result == 'Please Check Out First'){
          let toast = this.toastCtrl.create({
            message:'Please Check Out First',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();

        }
        console.warn("static result console");

        if(result == 'success')
        {
          this.navCtrl.remove(2,1,{animate:false});
          this.navCtrl.pop({animate:false});
          this.pending_checkin();
          if(this.checkin_data != null){
            this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
          }
          // this.serve.dismiss();
          // this.presentToast();
          // this.checkinListPage.checkin_detail('71');



          // this.navCtrl.push(CheckinListPage,{'via':'checkinIsCreated'});

        }
        else
        {
          // this.serve.dismiss();
        }

        // loading.dismiss();

      });


    }).catch((error) => {
      let alert = this.alertCtrl.create({
        title: '',
        message: 'Please Allow Location||',
        buttons: [

          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      })
    });
}

checkLocationActive(type,id,name){

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
                        this.checkin(type,id,name);
                        break;
                        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                        console.log("Permission granted only when in use");
                        this.checkin(type,id,name);
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
                this.service.presentToast('Please Allow Location!!')
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
        goToCheckin() {
          if(this.checkin_data != null){
              console.log("if");
              console.log(this.checkin_data.length);
              this.navCtrl.push(EndCheckinPage,{'data':this.checkin_data});
          }
          else{
              this.navCtrl.push(CheckinNewPage);
          }
      }
}
