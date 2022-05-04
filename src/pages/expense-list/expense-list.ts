import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ExpenseAddPage } from '../expense-add/expense-add';
import { ExpenseDetailPage } from '../expense-detail/expense-detail';
import { MyserviceProvider } from '../../providers/myservice/myservice';
import { ExpensePopoverPage } from '../expense-popover/expense-popover';

@IonicPage()
@Component({
  selector: 'page-expense-list',
  templateUrl: 'expense-list.html',
})
export class ExpenseListPage {

  expenseStatus:any = 'Pending';
  expenseList:any = [];
  sendRequest:any=false
  expenseType:any="My";


  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              public db:MyserviceProvider,
              public popoverCtrl: PopoverController) 
  {
    // this.getExpenseList();
  }

  ionViewDidLoad() 
  {                                                                      
    console.log('ionViewDidLoad ExpenseListPage');
  }

  ionViewWillEnter(){
    this.getExpenseList();
  }

  addPage()
  {
    this.navCtrl.push(ExpenseAddPage);
  }

  
  deatilPage(id)
  {
    this.navCtrl.push(ExpenseDetailPage,{'id':id});
  }

  getExpenseList()
  {
        this.db.show_loading();
        this.sendRequest=false
        this.expenseList =[];
        
        this.db.addData({'expenseStatus':this.expenseStatus,'expenseType':this.expenseType},"Expense/expList").then(resp=>
        {
            console.log(resp);
            this.expenseList = resp;
            this.sendRequest=true;
          console.log("resp");
            this.db.dismiss()
        },err=>
        {
          console.log("err");
            this.db.dismiss()
            this.db.errToasr()
        })
  }


  presentPopover(myEvent) 
  {
    let popover = this.popoverCtrl.create(ExpensePopoverPage,{'from':'Expense'});
    
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(resultData => {

      console.log(resultData);
      this.expenseType = resultData.TabStatus;
      this.getExpenseList();

     })
    
    
  }

}
