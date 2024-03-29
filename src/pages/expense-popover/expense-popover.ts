import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ExpenseListPage } from '../expense-list/expense-list';
import { OrderListPage } from '../order-list/order-list';
import { VisitingCardListPage } from '../visiting-card/visiting-card-list/visiting-card-list';
import { PopGiftListPage } from '../sales-app/pop-gift/pop-gift-list/pop-gift-list';




@IonicPage()
@Component({
  selector: 'page-expense-popover',
  templateUrl: 'expense-popover.html',
})
export class ExpensePopoverPage {

  page_from:any='';
  via:any;
  checkInData:any;
  showEditRetailer:boolean=false;
  type:any;
  date_from:any
  date_to:any
  filter:any={}
  status:any;
  Tab:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController)
  {
    console.log(this.navParams);
    this.type = this.navParams.get('type');
    console.log(this.type);

    this.page_from = this.navParams.get('from');
    if(this.page_from=='lead_list'){
     console.log(this.navParams.get('status'))
     console.log(this.navParams.get('Tab'))
     this.filter.status=this.navParams.get('status')
     this.filter.Tab=this.navParams.get('Tab')
    }
    this.via = this.navParams.get('via');
    this.showEditRetailer=this.navParams.get('showEditRetailer');
    console.log(this.showEditRetailer);

    this.checkInData = this.navParams.get('checkInData')


  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad ExpensePopoverPage');
  }

  close()
  {
    // return type
    var data = this.filter
    this.viewCtrl.dismiss(data);
  }
  close1()
  {
    // return type
    // var data = this.filter
    this.viewCtrl.dismiss();
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

      dismiss(){
        var data=this.filter
        this.viewCtrl.dismiss(data);
      }

  goto(type){

    if(type == 'Primary Orders'){
      console.log("in Primary order");
      console.log(this.checkInData.dr_name);
      this.navCtrl.push(OrderListPage,{'type':'Primary', 'dr_name':this.checkInData.dr_name})
      this.viewCtrl.dismiss();

    }
    else if(type == 'Secondary Orders'){
      console.log("in Primary order");
      console.log(this.checkInData.dr_name);
      this.navCtrl.push(OrderListPage,{'type':'Secondary', 'dr_name':this.checkInData.dr_name})
      this.viewCtrl.dismiss();

    }
    else if(type == 'Visiting Card'){
      console.log("in Visiting Card");
      console.log(this.checkInData.dr_name);
      this.navCtrl.push(VisitingCardListPage,{'dr_name':this.checkInData.dr_name})
      this.viewCtrl.dismiss();
    }
    else if(type == 'Pop & Gifts'){
      console.log("in Pop & Gifts");
      console.log(this.checkInData.dr_name);
      this.navCtrl.push(PopGiftListPage,{'dr_name':this.checkInData.dr_name})
      this.viewCtrl.dismiss();
    }

    else if(type == 'Show'){
      console.log("in Pop & Gifts");
      this.viewCtrl.dismiss({ 'Retailer': type});
    }
    else if(type == 'Hide'){
      console.log("in Pop & Gifts");
      this.viewCtrl.dismiss({ 'Retailer': type});
    }


  }
}
