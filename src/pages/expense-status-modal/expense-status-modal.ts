import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { LmsLeadListPage } from '../sales-app/new-lead/lms-lead-list/lms-lead-list';

/**
* Generated class for the ExpenseStatusModalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-expense-status-modal',
  templateUrl: 'expense-status-modal.html',
})
export class ExpenseStatusModalPage {

  data:any={}
  filter:any={}
  user:any=[]
  tab:any;
  from_page :any=''
  lead_detail:any=[]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public serve: MyserviceProvider,
    )
    {
      this.from_page =this.navParams.get("from");
      console.log(this.from_page)
      if(this.from_page =='team')
      {
        this.data.type=this.navParams.get("type");
        console.log(this.data.type);

      }
      if(this.from_page =='lead')
      {
        this.lead_detail=this.navParams.get("lead_detail");
        this.data.id=this.navParams.get("lead_id");

        console.log(this.data.type);

      }
      if(this.from_page =='lead_list')
      {

        // console.log(this.data.type);
        console.log(this.from_page);


      }
      if(this.from_page =='leadassign')
      {
        this.data.id=this.navParams.get("drId");
        this.data.state=this.navParams.get("state");
        console.log(this.data.id);
        console.log(this.data);

        this.serve.addData(this.data,'Checkin/listing_all_asm').then((result)=>
        {
            console.log(result);
           this.user=result
           console.log(this.user);

          },
          error => {
            this.serve.presentToast('Something Went wrong!!')
          });
      }
      if(this.from_page =='drassign')
      {
        this.data.id=this.navParams.get("drId");
        console.log(this.data.id);

        this.serve.addData(this.data,'Checkin/listing_all_asm').then((result)=>
        {
            console.log(result);
           this.user=result
           console.log(this.user);

          },
          error => {
            this.serve.presentToast('Something Went wrong!!')
          });
      }
      if(this.from_page =='travel')
      {
        this.data.id=this.navParams.get("travelId");
      }
      if(this.from_page =='leaddetail')
      {  this.tab=this.navParams.get("Tab")
        this.data.id=this.navParams.get("lead_id");
        this.data.status=this.navParams.get("status");

      }
      if(this.from_page =='expense')
      {
        this.data.id=this.navParams.get("expenseId");
        this.data.type=this.navParams.get("type");
      }
      if(this.from_page =='leave')
    {
      this.data.id=this.navParams.get("leaveId");
    }
      if(this.from_page =='travel')
      {
        this.data.id=this.navParams.get("travelId");
      }
      if(this.from_page =='team')
      {
        this.data.type=this.navParams.get("type");
        console.log(this.data.type);

      }
      console.log(this.data);

    }

    ionViewDidLoad()
    {
      console.log('ionViewDidLoad ExpenseStatusModalPage');
      // this.getReportData();
    }

    dismiss()
    {
      this.viewCtrl.dismiss();
    }

  //    statusModal1(type)
  // {
  //   console.log(type)

  //   let modal = this.modalCtrl.create(ExpenseStatusModalPage,{'lead_id':this.data.id,'status':this.lead_detail.status,'from':'leaddetail'});

  //   modal.onDidDismiss(data =>
  //   {
  //   });

  //   modal.present();
  // }
    update_status()
    {

      console.log(this.data)
      var func_name
      if(this.from_page =='expense')
      {
        func_name = 'Expense/update_status'
      }

      if(this.from_page =='travel')
      {
        func_name = 'TravelPlan/update_status'
      }
      if(this.from_page =='leave')
      {
        func_name = 'leave/update_status'
      }
      if(this.from_page =='leaddetail')
      {
        func_name = 'lead/update_lead'
      }
      this.serve.addData(this.data,func_name).then((result)=>
      {
        console.log(result);
        if(result)
        {
          this.serve.presentToast('Status Changed Successfully!!');
          if(this.from_page =='leaddetail'){
            this.navCtrl.push(LmsLeadListPage)
          }
          this.viewCtrl.dismiss();
        }
      },
      error => {
        this.serve.presentToast('Something Went wrong!!')
      });
    }
    team:any=[]
    getReportData()
    {

      // this.show_loading();
      this.serve.addData({},'Checkin/listing_all_asm').then((result)=>
      {

        console.log(result);
        this.team=result









      },err=>
      {


      })

    }
    ondismiss(){
      {
        console.log("hloo");

        var data=this.filter
        console.log(data);

        this.viewCtrl.dismiss(
          data
        );
      }
    }


    status()
    {
      console.log(this.data)
      var func_name
     this.data.dr_id =

      this.serve.addData(this.data,'Distributor/assign_dr').then((result)=>
      {
          console.log(result);
          if(result)
          {
            this.serve.presentToast('User Assigned Successfully!!');
            this.viewCtrl.dismiss();
          }
        },
        error => {
          this.serve.presentToast('Something Went wrong!!')
        });
    }
    status1()
    {
      console.log(this.data)
      var func_name
     this.data.dr_id =

      this.serve.addData(this.data,'Distributor/assign_customer').then((result)=>
      {
          console.log(result);
          if(result)
          {
            this.serve.presentToast('User Assigned Successfully!!');
            this.viewCtrl.dismiss();
          }
        },
        error => {
          this.serve.presentToast('Something Went wrong!!')
        });
    }
  }
