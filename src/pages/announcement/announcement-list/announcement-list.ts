import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../../../providers/constant/constant';
import { MyserviceProvider } from '../../../providers/myservice/myservice';
import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { LmsLeadDetailPage } from '../../sales-app/new-lead/lms-lead-detail/lms-lead-detail';


@IonicPage()
@Component({
  selector: 'page-announcement-list',
  templateUrl: 'announcement-list.html',
})
export class AnnouncementListPage
{
  user_data:any={};
  userType:any;
  sendRequest:any=false
  announcementList:any=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public constant:ConstantProvider,
    public viewcontrol: ViewController,

    public db:MyserviceProvider)
    {
      if(this.constant.UserLoggedInData.loggedInUserType == 'Employee')
      {
        this.userType='Employee'
      }
      else
      {
        this.userType='drLogin'
      }
      console.log(this.userType);

      setTimeout(() =>
      {
        this.getAnnouncementList()

      }, 500);
    }

    ionViewDidLoad()
    {
      console.log('ionViewDidLoad AnnouncementListPage');
    }

    deatilPage(id,to_id,tab)
    {
      // this.navCtrl.push(LmsLeadDetailPage,{'id':id,'type':'Lead','to_id':to_id});
      this.navCtrl.push(LmsLeadDetailPage,{'id':id,'type':'Lead','tab_id':tab});


      this.db.addData({'noticeId':to_id},"Attendence/update_notification_status").then(resp=>
        {
            console.log(resp);
           this.getAnnouncementList()

        },err=>
        {
            this.db.dismiss()
            this.db.errToasr()
        })
    }

    getAnnouncementList()
    {
      this.db.show_loading();
      this.sendRequest=false

      this.db.addData({'userType':this.userType},"Announcement/announcement_list").then(resp=>
        {
          console.log(resp);
          this.announcementList = resp;
          this.sendRequest=true
          this.db.dismiss()
        },err=>
        {
          this.db.dismiss()
          this.db.errToasr()
        })
      }

      doRefresh (refresher)
      {
        this.getAnnouncementList()
        setTimeout(() => {
          refresher.complete();
        }, 1000);
      }

      close() {

        this.viewcontrol.dismiss();
      }

    }
