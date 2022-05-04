import { Component,ViewChild } from '@angular/core';
import { NavController,Nav, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DbserviceProvider } from '../../providers/dbservice/dbservice';
// import { ProfilePage } from '../profile/profile';
// import { MobileLoginPage } from '../login-section/mobile-login/mobile-login';
import { CatalogueHomePage } from '../catalogue-home/catalogue-home';
// import { ProductsPage } from '../products/products';
// import { CategoryPage } from '../category/category';
// import { DealerProfilePage } from '../dealer-profile/dealer-profile';
// import { DealerHomePage } from '../dealer-home/dealer-home';
import { DashboardPage } from '../dashboard/dashboard';
import { ConstantProvider } from '../../providers/constant/constant';
import { EnquiryPage } from '../enquiry/enquiry';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HttpInterceptingHandler } from '@angular/common/http/src/module';
import { AttendenceserviceProvider } from '../../providers/attendenceservice/attendenceservice';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage 
{
  index:any='';
  userType:any='';
  login:any;
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  tab1Root = CatalogueHomePage;
  // tab2Root = DealerHomePage;
  tab5Root = DashboardPage;
  tab2Root = EnquiryPage;
  tab3Root = AboutPage;
  // tab4Root = CategoryPage;
  tab4Root = ContactPage;
  // tab5Root = ProductsPage;
  // tab6Root = DealerProfilePage;

  constructor( 
              public storage: Storage,
              public navParams: NavParams, 
              public service:DbserviceProvider, 
              public navCtrl: NavController,
              public constant:ConstantProvider
              ) 
  {
    console.log(constant);
    
    this.index = this.navParams.get('index');

    this.login=this.constant.UserLoggedInData.userLoggedInChk;
    
    
    // storage.get('token').then((val) => {
    //   console.log(val);
    //   if(val == '' || val == null || val == undefined)
    //   {
    //     this.rootPage = MobileLoginPage;
    //     // this.nav.setRoot(MobileLoginPage);
    //   }else{
         

    //     if(this.index=='5')
    //     {
    //       console.log('index 5');
          
    //     this.navCtrl.setRoot(ProfilePage);
    //     // this.rootPage = ProfilePage;
    //     return;

    //     }
    //     // this.navCtrl.setRoot(HomePage);

    //     this.rootPage = CatalogueHomePage;

    //   }
    // });


    if(this.constant.UserLoggedInData.userLoggedInChk==false || (!this.constant.UserLoggedInData))
    {
      console.log('in UserLoggedInData');
      this.rootPage = CatalogueHomePage;
    }
    // else if(this.constant.UserLoggedInData.loggedInUserType == 'Employee')
    // {
    //   this.userType = 'Employee'
    //   this.rootPage = DashboardPage;
    //   console.log(this.userType);
    // }
    // else if(this.constant.UserLoggedInData.loggedInUserType == 'DrLogin')
    // {
    //   this.userType = 'DrLogin'
    //   this.rootPage = DealerHomePage;
    //   console.log(this.userType);
    // }

  }

 
}
