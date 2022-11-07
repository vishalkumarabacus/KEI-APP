import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar,ActionSheetController,PopoverController, ToastController, LoadingController, AlertController,Platform } from 'ionic-angular';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { Geolocation } from '@ionic-native/geolocation';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AddOrderPage } from '../../add-order/add-order';
import { Storage } from '@ionic/storage';
import { Camera ,CameraOptions} from '@ionic-native/camera';
import { MediaCapture, CaptureVideoOptions, MediaFile } from '@ionic-native/media-capture';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EnquiryserviceProvider } from '../../../providers/enquiryservice/enquiryservice';
import { ExpensePopoverPage } from '../../expense-popover/expense-popover';
import { OrderListPage } from '../../order-list/order-list';
import { FollowupAddPage } from '../../followup-add/followup-add';
import { VisitingCardAddPage } from '../../visiting-card/visiting-card-add/visiting-card-add';
import { PopGiftAddPage } from '../../sales-app/pop-gift/pop-gift-add/pop-gift-add';
import { LmsQuotationAddPage } from '../../sales-app/new-lead/lms-lead-quotation/lms-quotation-add/lms-quotation-add';
import { ContractorMeetAddPage } from '../../Contractor-Meet/contractor-meet-add/contractor-meet-add';
import { AddMultipleContactPage } from '../../add-multiple-contact/add-multiple-contact';
import { CheckinNewPage } from '../../checkin-new/checkin-new';
import { ExecutiveOrderDetailPage } from '../../executive-order-detail/executive-order-detail';
import { DashboardPage } from '../../dashboard/dashboard';
import { Diagnostic } from '@ionic-native/diagnostic';
import { IonicSelectableComponent } from 'ionic-selectable';










@IonicPage()
@Component({
  selector: 'page-end-checkin',
  templateUrl: 'end-checkin.html',
})
export class EndCheckinPage {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('selectSelectable') selectSelectable: IonicSelectableComponent;


  state_list:any=[];city_list:any=[];
  city_name:any=[];
  data:any={};
  checkin_data:any = [];
  checkin:any = {};
  Site_checkin:any={}
  checkinForm: FormGroup;
  checkinFormWithNewDealer: FormGroup;
  order_token :any = [];
  brand_assign:any = [];
  salesUserId:any;
  showEditRetailer:boolean=true;
  today_date = new Date().toISOString().slice(0,10);
  pending_checkin_id:any;
  new_retailer_id:any;
  area_list:any=[];
  form1:any={};
  update_retailer_flag:any='0';
  check_gst:any = '';
  gst_details:any = [];
  check_mobile:any = '';
  district_list:any = [];
  image:any='';
  image_data:any=[];
  videoId: any;
  flag_upload = true;
  flag_play = true;
  for_order:any = [];
  Site_status_array:any=[];
  functionCalled:any=0


  constructor(public navCtrl: NavController,private camera: Camera , public popoverCtrl: PopoverController, public platform: Platform,public androidPermissions: AndroidPermissions, public navParams: NavParams,public actionSheetController: ActionSheetController,private mediaCapture: MediaCapture, public service: MyserviceProvider,public geolocation: Geolocation, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder,
    public locationAccuracy: LocationAccuracy ,
    public services:EnquiryserviceProvider,
    public diagnostic : Diagnostic,
    public alertCtrl: AlertController,public storage: Storage) {


      this.checkin_data = this.navParams.get('data');
      console.log(this.checkin_data);
      this.getState();
      this.checkinForm = this.formBuilder.group({
        description: ['',Validators.compose([Validators.required])],
        site_status: ['',Validators.compose([Validators.required])],
        stage_of_project: ['',Validators.compose([Validators.required])],
        Contact_decision: ['',Validators.compose([Validators.required])],
        beat_code: ['',Validators.compose([Validators.required])],

      })
      this.checkin.dr_name = this.checkin_data.dr_name;
      this.checkin.name = this.checkin_data.name;
      this.checkin.dr_mobile = this.checkin_data.dr_mobile_no;

      this.Site_status_array=[
        {id:'1', value:'Not able to meet the owner', Status_type:'Not able to meet the owner (another visit required)'},
        {id:'2', value:'Site postponed', Status_type:'Site postponed (to be revisited)'},
        {id:'3', value:'Win',Status_type:'Won (if the lead is converted)'},
        {id:'4',value:'Partially won',Status_type:'Partially won (if more visits required for conversion)'},
        {id:'5',value:'Lost',Status_type:'Lost (if the site is closed with competitor)'}

      ];
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad EndCheckinPage');

    }

    ionViewWillEnter(){
      this.GET_BEAT_CODE_LIST();
      this.pending_checkin();
      this.salesUserId=this.checkin_data.created_by;
      console.log(this.salesUserId);
      this.get_distributor()
    }

    present_upload_document_alert(){
      let alert=this.alertCtrl.create({
        title:'Document',
        subTitle: 'Upload Document is Mandatory',
        cssClass:'action-close',

        buttons: [{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }






    saveNewRetailer(){
      console.log("saveNewRetailer method calls");
      console.log("Lead/save_lead");
      this.checkin.type_id=3
      console.log(this.checkin);
      console.log(this.pending_checkin_id);
      console.log(this.new_retailer_id);
      if(!this.checkin.assign_dr_id && this.checkin_data.dr_type == '3')
      {
          let toast = this.toastCtrl.create({
              message: 'Please Select Distributor!',
              duration: 3000
          });
          toast.present();
          return;
      }

      // type_id = type_id;
      // this.service.show_loading()
      if(this.checkin_data.dr_type == '3'){
        if(this.checkin.beat_code==undefined){
        this.service.addData({"data":this.checkin,"checkin_id":this.pending_checkin_id,"dr_id":this.new_retailer_id,'assign_beat_code':'','assign_Area':''},"Lead/save_lead")
        .then(resp=>{
          this.service.dismiss()
          console.log(resp);

          if(resp['msg'] == 'success')
          {
            this.service.presentToast("Success!");
            this.showEditRetailer = false;
            this.pending_checkin();
            // this.navCtrl.pop();
          }
        },
        err=>{
          this.service.dismiss()
          this.service.errToasr()

        });

      }
      else{
        this.service.addData({"data":this.checkin,"checkin_id":this.pending_checkin_id,"dr_id":this.new_retailer_id,'assign_beat_code':this.checkin.beat_code.beat_code,'assign_Area':this.checkin.beat_code.area},"Lead/save_lead")
        .then(resp=>{
          this.service.dismiss()
          console.log(resp);

          if(resp['msg'] == 'success')
          {
            this.service.presentToast("Success!");
            this.showEditRetailer = false;
            this.pending_checkin();
            // this.navCtrl.pop();
          }
        },
        err=>{
          this.service.dismiss()
          this.service.errToasr()

        });

      }
    }
      else{
        this.service.addData({"data":this.checkin,"checkin_id":this.pending_checkin_id,"dr_id":this.new_retailer_id},"Lead/save_lead")
        .then(resp=>{
          this.service.dismiss()
          console.log(resp);

          if(resp['msg'] == 'success')
          {
            this.service.presentToast("Success!");
            this.showEditRetailer = false;
            this.pending_checkin();
            // this.navCtrl.pop();
          }
        },
        err=>{
          this.service.dismiss()
          this.service.errToasr()

        });
      }

    }



      presentAlert() {
        let alert = this.alertCtrl.create({
          title: 'Create Order',
          message: 'Do you want to create order for this checkin?',
          cssClass: 'alert-modal',
          buttons: [
            {
              text: 'Yes',
              handler: () => {
                console.log('Yes clicked');
                console.log(this.for_order);
                this.navCtrl.pop();
                this.service.dismiss();

                this.navCtrl.push(AddOrderPage,{'for_order':this.for_order,'brand_assign':this.brand_assign});

              }
            },
            {
              text: 'No',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
                console.log(this.for_order)
                this.navCtrl.pop();


              }
            }
          ]
        });
        alert.present();
      }
      //cpture image
      onGetCaptureVideoPermissionHandler() {

        console.log('start');

        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
          result => {
            if (result.hasPermission) {

              console.log('hello111');
              this.service.dismiss();

              this.capturevideo();

            } else {
              this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(result => {
                if (result.hasPermission) {

                  console.log('hello222');
                  this.service.dismiss();

                  this.capturevideo();

                }
              });
            }
          },
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
          );




        }
        getImage()
        {
          const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            saveToPhotoAlbum:false
          }
          console.log(options);
          this.camera.getPicture(options).then((imageData) => {
            this.image= 'data:image/jpeg;base64,' + imageData;

            console.log(this.image);
            if(this.image)
            {
              this.fileChange(this.image);
            }
          }, (err) => {
          });
        }

        capturevideo()
        {
          let options: CaptureVideoOptions = { limit: 1 };
          this.mediaCapture.captureVideo(options)
          .then((videodata: MediaFile[]) => {
            console.log(videodata);
            this.service.dismiss();

            var i, path, len,name;
            for (i = 0, len = videodata.length; i < len; i += 1)
            {
              path = videodata[i].fullPath;
              name = videodata[i].name;
            }
            this.videoId = path;
            this.flag_play = false;
            this.flag_upload = false;
            console.log(videodata);


          });
        }


        takePhoto()
        {
          console.log("i am in camera function");
          console.log(this.camera.DestinationType.DATA_URL);

          const options: CameraOptions = {
            quality: 70,
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth : 500,
            targetHeight : 400,
            cameraDirection:1,
            correctOrientation : true,

          }
          // this.service.dismiss();

          console.log(options);
          this.camera.getPicture(options).then((imageData) => {
            this.image = 'data:image/jpeg;base64,' + imageData;
            console.log(this.image);
            if(this.image)
            {
              this.fileChange(this.image);
            }
          }, (err) => {
          });
        }
        captureImageVideo()
        {
          let actionsheet = this.actionSheetController.create({
            title:"Upload Image",
            cssClass: 'cs-actionsheet',

            buttons:[{
              cssClass: 'sheet-m',
              text: 'Camera',
              icon:'camera',
              handler: () => {
                console.log("Camera Clicked");

                this.takePhoto();
              }
            },
            {
              cssClass: 'sheet-m1',
              text: 'Gallery',
              icon:'image',
              handler: () => {
                console.log("Gallery Clicked");
                this.getImage();
              }
            },
            {
              cssClass: 'cs-cancel',
              text: 'Cancel',
              role: 'cancel',
              icon:'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });
        actionsheet.present();
      }


      fileChange(img)
      {
        // this.image_data=[];
        this.image_data.push(img);
        console.log(this.image_data);
        this.image = '';
      }

      captureMedia()
      {
        if(this.videoId)
        {
          this.captureImageVideo();
        }
        else
        {
          this.captureImageVideo();
        }

      }

      remove_image(i:any)
      {
        this.image_data.splice(i,1);
      }
      getState() {


        this.services.getState().then((response:any)=>{
          console.log(response);
          this.state_list = response;

        });
      }


      getDistrict(state) {
        console.log(state);



        this.services.getCity(state).then((response:any)=>{
          console.log(response);
          this.district_list = response;

        });
      }


      check_mobile_existence(mobile)
      {

        this.service.addData({'mobile':mobile},'Enquiry/check_mobile_existence').then((result)=>{
          console.log(result);

          this.check_mobile = result['check_mobile'];
          console.log(this.check_mobile);

          console.log(mobile.length);

        })

      }

      get_pincode_area_name(pincode)
      {
        this.services.get_pincode_city_name(pincode).then((response:any)=>{
          console.log(response);
          if(response=='' || response==null)
          {
            this.city_name = "Not Matched";
          }
          else
          {
            this.city_name = response.city;
            this.data.state = {'state_name':response.state_name};
            this.data.district = {'district_name':response.district_name};
            this.data.city = {'city':response.city};

          }
        });
      }


      getCity(state,district) {
        console.log(state);
        console.log(district);



        this.services.getCity1({'state':state,'district':district}).then((response:any)=>{
          console.log(response);
          this.city_list = response;

        });
      }

      getArea(state,district,city) {
        console.log(state);



        this.services.getCity({'state':state,'district':district, 'city':city}).then((response:any)=>{
          console.log(response);
          this.city_list = response;

        });
      }


      getPincode(state,district,city,area) {
        console.log(state);



        this.services.getCity({'state':state,'district':district, 'city':city, 'area':area}).then((response:any)=>{
          console.log(response);
          this.city_list = response;

        });
      }

      selectAddressOnBehalfOfPincode()
      {
        if(this.checkin.pincode.length==6)
        {

          this.service.addData({'pincode':this.checkin.pincode},'Enquiry/selectAddressOnBehalfOfPincode').then((result)=>{

            console.log(result);
            this.checkin.state = result['state_name']
            this.get_district()
            this.checkin.district = result['district_name']
            this.checkin.city = result['city']

            // this.selectarea();


          },err=>
          {

            // this.db.presentToast('Failed To Get ')
          })
        }
      }
      get_district()
      {
        this.service.addData({"state_name":this.checkin.state},"dealerData/getDistrict")
        .then(resp=>{
          console.log(resp);
          this.district_list = resp['district_list'];
        },
        err=>{
          this.service.errToasr()
        })
      }

      presentPopover(myEvent,type)
      {

        console.log(type);

        console.log(myEvent);


        let popover = this.popoverCtrl.create(ExpensePopoverPage,{'via':'checkin','checkInData':this.checkin_data,'showEditRetailer':this.showEditRetailer,'type': type});


        popover.present({
          ev: myEvent
        });

        popover.onDidDismiss(resultData => {

          console.log(resultData['Retailer']);

          if(resultData['Retailer']=='Show'){
            console.log("in true");
            this.showEditRetailer=true;
          }
          else if(resultData['Retailer']=='Hide'){
            console.log("in false");
            this.showEditRetailer=false;

          }

          console.log(this.showEditRetailer);


        })


      }
      distributor_list:any=[]
      get_distributor()
{
    // this.service1.show_loading();
    this.service.addData({'type':1,'from':'order'},'DealerData/get_type_list').then((result)=>{
        console.log(result);
        this.distributor_list = result;

        // this.service1.dismiss();


    });
}
goOnOrderDetail(id)
    {
        this.navCtrl.push(ExecutiveOrderDetailPage,{id:id , login:'Employee'})
    }

      goTo(where){
        console.log(where);

        if(where == 'Primary'){
          this.navCtrl.push(AddOrderPage,{'dr_type':this.checkin_data.dr_type,'checkin_id':this.checkin_data.checkin_id ,'id':this.checkin_data.dr_id,'dr_name':this.checkin_data.dr_name, 'order_type':'Primary'});
        }
        else if(where == 'Secondary'){
          console.log(this.checkin_data.dr_type);
          console.log(this.checkin_data.dr_name);
          this.navCtrl.push(AddOrderPage,{'dr_type':this.checkin_data.dr_type,'id':this.checkin_data.dr_id,'checkin_id':this.checkin_data.checkin_id ,'dr_name':this.checkin_data.dr_name, 'order_type':'Secondary'});
        }
        else if(where == 'FollowUp'){
          this.navCtrl.push(FollowupAddPage, {'dr_type':this.checkin_data.dr_type,'checkin_id':this.checkin_data.checkin_id ,'dr_name':this.checkin_data.dr_name});
        }

        else if(where == 'VisitingCard'){
          this.navCtrl.push(VisitingCardAddPage, {'dr_type':this.checkin_data.dr_type,'checkin_id':this.checkin_data.checkin_id ,'dr_name':this.checkin_data.dr_name});
        }



        else if(where == 'UPLOAD'){
          this.takePhoto();
        }

        else if(where == 'Contacts'){
          this.navCtrl.push(AddMultipleContactPage,{'dr_id':this.checkin_data.dr_id,'checkin_id':this.checkin_data.checkin_id ,'dr_name':this.checkin_data.dr_name})

        }

      }


      pending_checkin()
      {
        console.log("pending_checkin method calls");

        this.service.pending_data().then((result)=>{
          console.log(result);
          this.checkin_data = result['checkin_data'];
          console.log(this.checkin_data);
          this.pending_checkin_id=this.checkin_data['checkin_id']
          this.new_retailer_id=this.checkin_data['dr_id']
          this.checkin.dr_name = this.checkin_data.dr_name;
          this.checkin.name = this.checkin_data.name;
          this.checkin.dr_mobile = this.checkin_data.dr_mobile_no;
          this.update_retailer_flag=this.checkin_data['update_retailer'];
          console.log(this.update_retailer_flag);

        })
      }

      selectarea(){
        console.log(this.checkin);
        this.form1.state=this.checkin.state;
        this.form1.district=this.checkin.district;
        console.log(this.form1);
        this.service.addData3(this.form1,"User/area_user_list")
        .then(resp=>{
          console.log(resp);
          this.area_list = resp['query']['area'];
          console.log(this.area_list);
          this.checkin.area='';
        },
        err=>{
          this.service.errToasr();
        })
      }
      beatCodeList:any=[];
      GET_BEAT_CODE_LIST() {
        // this.serve.show_loading();

        this.service.addData({ city: '' }, 'Distributor/assign_beat_code').then((result) => {
          console.log(result);
          // this.serve.dismiss()
          this.beatCodeList = result['data'];
          for(let i = 0 ;i<this.beatCodeList.length;i++){
              this.beatCodeList[i].beat_code1=this.beatCodeList[i].beat_code+' '+'( '+this.beatCodeList[i].area+')'

          }
        }, err => {
          // this.serve.dismiss()
          this.service.errToasr()
        });
      }
      presentalert(id,description,type) {

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
                  this.checkLocationActive(id,description,type);

                    // let alert = this.alertCtrl.create({
                    //     title: 'End Visit',
                    //     message: 'Do you want to end visit?',
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
    end_checkin(id,description,type)
    {

        console.log(type);

        var options = {
            maximumAge: 15000,
            timeout: 10000,
            enableHighAccuracy: true
        };
        this.geolocation.getCurrentPosition(options).then((resp) => {
          this.data.lat = resp.coords.latitude
          this.data.lng = resp.coords.longitude
            this.service.show_loading();

            if(type=='new'){
              this.service.addData({'lat': this.data.lat, 'lng': this.data.lng, 'checkin_id': id, 'checkin': description,imgarr:this.image_data,'dr_data':this.checkin},'Checkin/visit_endWithNewDealer').then((result) => {

                this.brand_assign = result['brand_assign'];

                if(result['msg'] == 'success')
                {
                  this.service.presentToast('Visit Ended Successfully !!');
            this.service.dismiss();

                  this.navCtrl.push(CheckinNewPage);
                }
              })
            }
            else if(type=='old')
            {
              if(this.checkin_data.dr_type == '3'&&this.checkin_data.beat_code=='' ){
                console.log(this.checkin.beat_code)


                if(!this.checkin.beat_code){
                console.log("internal if");
                console.log(id);
                console.log(description);
                console.log(this.checkinForm.value);

                  this.service.addData({'lat':this.data.lat, 'lng':this.data.lng, 'checkin_id': id, 'checkin': description,'Site_Checkin':this.Site_checkin,imgarr:this.image_data,'dr_data':this.checkinForm.value,'assign_beat_code':'','assign_Area':''},'Checkin/visit_end').then((result) => {

                    this.for_order = result['for_order'];
                    this.brand_assign = result['brand_assign'];

                    this.service.dismiss();

                    if(result['msg'] == 'success')
                    {
                      this.navCtrl.pop();

                      this.service.dismiss();

                      this.service.presentToast('Visit Ended Successfully !!');
                      if(this.checkin_data.other_name == '')
                      {
                        // this.presentAlert();
                        this.navCtrl.pop();
                        this.navCtrl.push(CheckinNewPage);
                      }
                      else
                      {
                        this.navCtrl.pop();
                      }
                    }

                  })
                }
                else{
                  console.log("external if");
                  console.log(id);
                  console.log(description);
                  console.log(this.checkinForm.value);
                  console.log(this.data);
                  console.log(this.checkin.beat_code)




                    this.service.addData({'lat':this.data.lat, 'lng':this.data.lng, 'checkin_id': id, 'checkin': description,'Site_Checkin':this.Site_checkin,imgarr:this.image_data,'dr_data':this.checkinForm.value,'assign_beat_code':this.checkin.beat_code.beat_code,'assign_Area':this.checkin.beat_code.area},'Checkin/visit_end').then((result) => {

                      this.for_order = result['for_order'];
                      this.brand_assign = result['brand_assign'];

                      this.service.dismiss();

                      if(result['msg'] == 'success')
                      {

                        this.service.dismiss();

                        this.service.presentToast('Visit Ended Successfully !!');
                        if(this.checkin_data.other_name == '')
                        {
                          // this.presentAlert();
                          this.navCtrl.pop();
                         this.navCtrl.push(CheckinNewPage);
                        }
                        else
                        {
                          this.navCtrl.pop();
                        }
                      }


                    })
                  }
              }

              else{
                this.service.addData({'lat':this.data.lat, 'lng':this.data.lng, 'checkin_id': id, 'checkin': description,'Site_Checkin':this.Site_checkin,imgarr:this.image_data,'dr_data':this.checkinForm.value},'Checkin/visit_end').then((result) => {
                console.log('yyyyy');


                  this.for_order = result['for_order'];
                  this.brand_assign = result['brand_assign'];

                  this.service.dismiss();

                  if(result['msg'] == 'success')
                  {
                    console.log('sucess');
                    this.navCtrl.pop();


                    this.service.dismiss();

                    this.service.presentToast('Visit Ended Successfully !!');
                    if(this.checkin_data.other_name == '')
                    {
                      // this.presentAlert();
                      this.navCtrl.pop();
               this.navCtrl.push(CheckinNewPage);


                    }
                    else
                    {
                      this.navCtrl.pop();
                    }
                  }




                })
              }


            }


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
    alert.present();
        });
    }

    checkLocationActive(id,description,targetAction){

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
                            this.end_checkin(id,description,targetAction,);
                            break;
                            case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            console.log("Permission granted only when in use");
                            this.end_checkin(id,description,targetAction);
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
            test(status){
              console.log(status);
            }

    }
