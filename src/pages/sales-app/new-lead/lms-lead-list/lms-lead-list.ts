import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, NavParams, ViewController, PopoverController } from 'ionic-angular';
import { MyserviceProvider } from '../../../../providers/myservice/myservice';
import { ExpensePopoverPage } from '../../../expense-popover/expense-popover';
import { ExpenseStatusModalPage } from '../../../expense-status-modal/expense-status-modal';
import { LmsLeadAddPage } from '../lms-lead-add/lms-lead-add';
import { LmsLeadDetailPage } from '../lms-lead-detail/lms-lead-detail';

@IonicPage()
@Component({
    selector: 'page-lms-lead-list',
    templateUrl: 'lms-lead-list.html',
})
export class LmsLeadListPage {

    constructor(public popoverCtrl: PopoverController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,public db:MyserviceProvider,public loadingCtrl: LoadingController) {
        // this.get_assign_dr(1);
    }

    load_data:any
    start:any=0;
    filter:any={status: 'lead Bank'};
    dr_list:any=[];
    count:any={};
    allCount:any={}
    drid:any = 9
    date_from:any
  date_to:any
  date_id:any
    networkType:any=[]

    presentPopover(myEvent)
    {
      let popover = this.popoverCtrl.create(ExpensePopoverPage,{'from':'lead_list'});

      popover.present({
        ev: myEvent
      });

      popover.onDidDismiss(data => {
        console.log(data)
        this.date_from=data.date_from
        this.date_to=data.date_to
      //   this.date_id=data.team_id
        console.log(this.date_to);
        console.log(this.date_from);
        this.get_assign_dr(9)



      })

    }



    statusModal()
    {
        console.log('status modal clicked')
      let modal = this.modalCtrl.create(ExpenseStatusModalPage,{'from':'lead_list'});

      modal.onDidDismiss(data =>
        {
            console.log(data)
          this.date_from=data.date_from
          this.date_to=data.date_to
        //   this.date_id=data.team_id
          console.log(this.date_to);
          console.log(this.date_from);
          this.get_assign_dr(9)


        //   this.checkin_list(this.date_to,this.date_from)
        });

        modal.present();
      }



    getNetworkType(){
        this.db.addData3('', "Dashboard/distributionNetworkModule").then((result => {
          console.log(result);
          this.networkType = result['modules'];
        }))
      }
    get_assign_dr(type_id:any='')
    {
        console.log(type_id);
        this.drid=type_id;
        this.load_data=0;
        this.filter.type_id = type_id;
        this.filter.date_from = this.date_from;
        this.filter.date_to = this.date_to;

        // this.db.show_loading();

        this.db.addData({"search":this.filter},"Lead/getLeadList")
        .then(resp=>{

            console.log(resp);
        // this.db.dismiss();

            this.dr_list = resp['dr_list'];

            this.count = resp['count'][0];
            console.log(this.count)
            this.allCount = resp['Allcount'];
            for (let index = 0; index < this.count.length; index++) {
                if(this.count[index].name=='Online'){
                    this.count[index].name='Online';
                }
                // if(this.count[index].name=='Dealer'){
                //     this.count[index].name='Retailer';
                // }

            }
            console.log(this.count);
            console.log(this.dr_list);
            if(!this.dr_list.length)
            {
                this.load_data=1
            }
        },
        err=>
        {
            // this.db.dismiss()
            console.log('get error')
        })

    }

    loadData(infiniteScroll)
    {
        console.log('loading');
        this.start = this.dr_list.length;
        this.db.addData({"start":this.start,"search":this.filter},"dealerData/get_assign_dr")
        .then((r) =>{
            console.log(r);

            if(r['dr_list']=='')
            {
                // this.flag=1;
            }
            else
            {
                setTimeout(()=>{
                    this.dr_list=this.dr_list.concat(r['dr_list']);
                    console.log('Asyn operation has stop')
                    infiniteScroll.complete();
                },1000);
            }
        });
    }

    lead_detail(id)
    {
        console.log(id);
        this.navCtrl.push(LmsLeadDetailPage,{'id':id,'type':'Lead'})
    }

    addLead(add)
    {
      console.log(add);

        this.navCtrl.push(LmsLeadAddPage,{'from':add})
     }

    ionViewWillEnter() {
        console.log('ionViewDidLoad LmsLeadListPage');
        this.get_assign_dr(9);
        // this.doRefresh(Refresher);

    }

    doRefresh(refresher)
    {
        this.filter.master=null
        this.filter={}
        this.start=0
        console.log(refresher);

        this.get_assign_dr(9)
        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

}
