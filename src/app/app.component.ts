import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, App, ToastController, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { ConstantProvider } from '../providers/constant/constant';
import { DbserviceProvider } from '../providers/dbservice/dbservice';
import * as jwt_decode from "jwt-decode";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AppVersion } from '@ionic-native/app-version';
import moment from 'moment';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { LeaveListPage } from '../pages/leave-list/leave-list';
import { CheckinListPage } from '../pages/sales-app/checkin-list/checkin-list';
import { Network } from '@ionic-native/network';
import { FollowupListPage } from '../pages/followup-list/followup-list';
import { ExpenseListPage } from '../pages/expense-list/expense-list';
import { LoginPage } from '../pages/login/login';
import { LmsLeadListPage } from '../pages/sales-app/new-lead/lms-lead-list/lms-lead-list';
import { ProfilePage } from '../pages/profile/profile';
import { EndCheckinPage } from '../pages/sales-app/end-checkin/end-checkin'
import { CancelpolicyModalPage } from '../pages/cancelpolicy-modal/cancelpolicy-modal';
import { AttendenceNewPage } from '../pages/attendence-new/attendence-new';
import { CheckinNewPage } from '../pages/checkin-new/checkin-new';
import { TravelListNewPage } from '../pages/travel-list-new/travel-list-new';
// import { ResultsPage } from '…/pages/results / results';
// import { ModalController } from 'ionic-angular';
// import { TabsPage } from '../pages/tabs/tabs';
// import { AboutusModalPage } from '../pages/aboutus-modal/aboutus-modal';
// import { SelectRegistrationTypePage } from '../pages/select-registration-type/select-registration-type';
// import { MainDistributorListPage } from '../pages/sales-app/main-distributor-list/main-distributor-list';
// import { DistributorListPage } from '../pages/sales-app/distributor-list/distributor-list';
// import { AttendencePage } from '../pages/attendence/attendence';
// import { TravelListPage } from '../pages/travel-list/travel-list';
// import { ContactusPage } from '../pages/contactus/contactus';
// import { CategoryPage } from '../pages/category/category';

// import { DealerHomePage } from '../pages/dealer-home/dealer-home';

// import { DealerCheckInPage } from '../pages/dealer-check-in/dealer-check-in';
// import { DealerOrderPage } from '../pages/dealer-order/dealer-order';
// import { DealerProfilePage } from '../pages/dealer-profile/dealer-profile';
// import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { DealerDealerListPage } from '../pages/dealer-dealer-list/dealer-dealer-list';
// import { FavoriteProductPage } from '../pages/favorite-product/favorite-product';
// import { VideoCategoryPage } from '../pages/video-category/video-category';
// import { LeadsDetailPage } from '../pages/leads-detail/leads-detail';
// import { ProductsPage } from '../pages/products/products';
// import { AnnouncementListPage } from '../pages/announcement/announcement-list/announcement-list';
// import { PolicyPage } from '../pages/policy/policy';
// import { NewarrivalsPage } from '../pages/newarrivals/newarrivals';
// import { SupportPage } from '../pages/support/support';
// import { CataloguePdfPage } from '../pages/catalogue-pdf/catalogue-pdf';
// import { CatalogueHomePage } from '../pages/catalogue-home/catalogue-home';
// import { ContractorMeetListPage } from '../pages/Contractor-Meet/contractor-meet-list/contractor-meet-list';
// import { EnquiryPage } from '../pages/enquiry/enquiry';
// import { VisitingCardListPage } from '../pages/visiting-card/visiting-card-list/visiting-card-list';
// import { VisitingCardPage } from '../pages/visiting-card/visiting-card';
// import { LmsActivityListPage } from '../pages/sales-app/new-lead/lms-lead-activity/lms-activity-list/lms-activity-list';
// import { PopGiftListPage } from '../pages/sales-app/pop-gift/pop-gift-list/pop-gift-list';
// import { LmsQuotationListPage } from '../pages/sales-app/new-lead/lms-lead-quotation/lms-quotation-list/lms-quotation-list';
// import { RequirementPage } from '../pages/requirement/requirement';
// import { RequirementlistPage } from '../pages/requirementlist/requirementlist';
// import { FCM } from '@ionic-native/fcm'





export interface PageInterface {
    title: string;
    name: string;
    component: any;
    icon: string;
    index?: number;
    tabName?: string;
    tabComponent?: any;
    show: any;

}
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    public onlineOffline: boolean = navigator.onLine;
    @ViewChild(Nav) nav: Nav;
    connectionChk: any = '';
    rootPage: any;
    tokenInfo: any = '';
    loginType: any = '';
    current_page: any;
    check_token: any;
    pages: PageInterface[];
    user_logged_in: boolean;
    userLoggedRole: any;
    userLoggedDisplayName: any;
    userRoleId: any;
    last_attendence_data: any = [];
    currentTime: any = '';
    userType: any;
    userName: any;
    versionNumber: any;
    userToken: any;
    checkin_data: any = [];

    constructor(private network: Network, public platform: Platform, statusBar: StatusBar, public menu: MenuController, public attendenceServe: AttendenceserviceProvider, splashScreen: SplashScreen, public storage: Storage, public events: Events, public constant: ConstantProvider, private app: App, public toastCtrl: ToastController, public serve: MyserviceProvider, public service: DbserviceProvider, public myserv: MyserviceProvider, public alertCtrl: AlertController, public push: Push, public appVersion: AppVersion,) {
        this.check_version()

        setTimeout(() => {
            console.log("settimeout");
            
            if (this.constant.UserLoggedInData.userLoggedInChk == false) {
                console.log('inside if');
                
                // this.nav.setRoot(CatalogueHomePage);
                this.nav.setRoot(LoginPage, { 'registerType': 'Employee' });

                // this.nav.setRoot(SelectRegistrationTypePage);
            }
            else {
                console.log("inside else");
                
                if (this.constant.UserLoggedInData.loggedInUserType == 'Employee') {
                console.log(this.constant.UserLoggedInData.loggedInUserType);

                    storage.get('token_value').then((val) => {
                        console.log("App-component\n" + val);

                        if (val == '' || val == null || val == undefined) {
                            console.log("App-component\n" + 'if');
                            this.nav.setRoot(LoginPage, { 'registerType': 'Employee' });
                        }
                        else {
                            this.storage.get('role').then((role) => {
                                if (typeof (role) !== 'undefined' && role) {
                                    this.userLoggedRole = role;
                                }
                            });

                            this.storage.get('displayName').then((displayName) => {
                                if (typeof (displayName) !== 'undefined' && displayName) {
                                    this.userLoggedDisplayName = displayName;
                                }
                            });

                            this.storage.get('user_type').then((userType) => {
                                if (typeof (userType) !== 'undefined' && userType) {
                                    this.userType = userType;
                                    console.log("App-component\n" + this.userType)
                                }
                            });
                            this.user_logged_in = true
                            this.initPushNotification();
                            this.check_version();
                            this.nav.setRoot(DashboardPage);
                            this.set_pages();

                        }
                    });
                    this.currentTime = moment().format("HH:mm:ss");
                }
            }
            // else{
            //     this.nav.setRoot(LoginPage);
            // }
        }, 2000);
       
        platform.ready().then(() => {
            statusBar.overlaysWebView(false);
            setTimeout(() => {
                splashScreen.hide();
            }, 1000);
            statusBar.backgroundColorByHexString('#55a9e4');

            console.log("Platform Reday App component");

            console.log(window);

            // window.caches.delete('CacheStorage');

            // window.localStorage.clear();

            console.log(this.storage);

            console.log(window.localStorage);


            console.log("App component 131");

            


        });

        platform.registerBackButtonAction(() => {
            const overlayView = this.app._appRoot._overlayPortal._views[0];

            console.log(overlayView);

            if (overlayView && overlayView.dismiss) {
                overlayView.dismiss();
                console.log("App-component\n" + overlayView)
                return;
            }

            let nav = app.getActiveNav();
            console.log("App-component 131");

            console.log(nav.getActive());

            let activeView = app.getActiveNavs()[0].getViews()[0].name;

            console.log(activeView);
            console.log("line no 138 App component");

            console.log("App-component\n" + nav.canGoBack());
            if (nav.canGoBack() == false) {
                console.log("App-component\n" + 'ok');
                let alert = this.alertCtrl.create({
                    title: 'App termination',
                    message: 'Are you sure you want Exit?',
                    buttons: [
                        {
                            text: 'Stay',
                            handler: () => {
                                console.log("App-component\n" + 'Cancel clicked');
                                // this.d.('Action Cancelled!')
                            }
                        },
                        {
                            text: 'Exit',
                            handler: () => {
                                this.platform.exitApp();
                            }
                        }
                    ]
                })

                alert.present();
            }
            else if (activeView == 'DealerAddorderPage') {
                this.events.publish('AddOrderBackAction')
            }

            else if (activeView == 'GiftListPage' || activeView == 'TransactionPage' || activeView == 'ProfilePage' || activeView == 'MainHomePage') {
                console.log(activeView);

                nav.parent.select(0);
            }
            else if (activeView == 'CancelpolicyModalPage') {
                let alert = this.alertCtrl.create({
                    title: 'App termination',
                    message: 'Are you sure you want Exit?',
                    buttons: [
                        {
                            text: 'Stay',
                            handler: () => {
                                console.log("App-component\n" + 'Cancel clicked');
                            }
                        },
                        {
                            text: 'Exit',
                            handler: () => {
                                this.platform.exitApp();
                            }
                        }
                    ]
                })

                alert.present();
            }
            else if (nav.canGoBack()) {
                console.log("App-component\n" + 'ok');
                nav.pop();
            }
            else {
                this.platform.exitApp();
            }
        });



        window.addEventListener('offline', (data) => {
            console.log("Pffline Mode App Component");
            this.serve.isInternetConnection = false;
            this.nav.setRoot(CancelpolicyModalPage);

        })


        window.addEventListener('online', (data) => {
            this.serve.isInternetConnection = true;
            console.log("Online Mode App component");

            // setTimeout(() => {
            //     console.log(this.network.type);

            // }, 2000);

            this.events.publish('state', 'online');

            this.storage.get('token').then((token) => {

                let tokenInfo = this.getDecodedAccessToken(token);
                console.log(tokenInfo);

                console.log("App-component page =>", tokenInfo);

                if (tokenInfo && tokenInfo.user_type == 'Sales User') {
                    this.user_logged_in = true;
                    this.check_version()
                }

            });

        });


       


        /******************Events*****************************/

        this.events.subscribe('user:navigation_menu', () => {
            this.open_nav_menu();
        });

        this.events.subscribe('token_val', (val) => {
            if (val) {
                this.user_logged_in = true;
            }
        });

        this.events.subscribe('userType', (val) => {
            if (val) {
                this.userType = val;
            }
        });
        this.events.subscribe('userLoggedDisplayName', (val) => {
            if (val) {
                this.userLoggedDisplayName = val;
            }
        });

        this.events.subscribe('userRoleId', (val) => {
            if (val) {
                this.userRoleId = val;
            }
        });


        /************************************************* */

    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    set_pages() {
        this.service.set(this.user_logged_in);
        if (this.user_logged_in) {
            console.log("App-component\n" + this.onlineOffline);

            if (this.userName) {
                this.rootPage = DashboardPage;
            }
        }

        this.pages = [
            { title: 'Home', name: 'HomePage', component: DashboardPage, index: 0, icon: 'home', show: true },
            { title: 'Attendance', name: 'AttendencePage', component: AttendenceNewPage, index: 11, icon: 'date_range', show: true },
            { title: 'Checkin', name: 'CheckinNewPage', component: CheckinNewPage, index: 11, icon: 'date_range', show: true },
            { title: 'Lead', name: 'Lead', component: LmsLeadListPage, index: 5, icon: 'receipt_long', show: true },
            { title: 'Travel Plan', name: 'TravelListPage', component: TravelListNewPage, index: 23, icon: 'train', show: true },
            { title: 'Follow Up', name: 'FollowupListPage', component: FollowupListPage, index: 25, icon: 'contact_phone', show: true },
            { title: 'Expense', name: 'ExpenseListPage', component: ExpenseListPage, index: 26, icon: 'credit_card', show: true },
            { title: 'Leave', name: 'LeaveListPage', component: LeaveListPage, index: 10, icon: 'beach_access', show: true },
        ];

    }

    openPage(page: PageInterface) {
        let params = {};
        console.log("App-component\n");
        console.log(page);

        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (page.name == "Check-In") {

            if (this.checkin_data != null) {
                console.log("App-component\n" + "if");
                console.log("App-component\n" + this.checkin_data.length);
                this.nav.push(EndCheckinPage, { 'data': this.checkin_data });
            }
            else {
                this.nav.push(CheckinListPage);
            }



            this.nav.push(page.component, { type: 3 });

        }
        else {
            params['view_type'] = 'My';
            this.nav.push(page.component, params);
        }
    }

    open_profile() {
        console.log("App-component\n" + 'inside open_profile');

        this.nav.push(ProfilePage);
    }
    login() {
        this.nav.push(LoginPage, { 'registerType': 'Employee' });
    }

    logout() {
        let alert = this.alertCtrl.create({
            title: 'Logout!',
            message: 'Are you sure you want Logout?',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        console.log("App-component\n" + 'Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.storage.set('token', '');
                        this.storage.set('role', '');
                        this.storage.set('displayName', '');
                        this.storage.set('role_id', '');
                        this.storage.set('name', '');
                        this.storage.set('type', '');
                        this.storage.set('token_value', '');
                        this.storage.set('userId', '');
                        this.storage.set('token_info', '');
                        this.user_logged_in = false;
                        this.userLoggedRole = '';
                        this.userLoggedDisplayName = '';
                        this.userRoleId = '';
                        this.userType = '';
                        this.userName = '';
                        this.constant.UserLoggedInData = {};
                        this.constant.UserLoggedInData.userLoggedInChk = false;
                        console.log("App-component\n" + this.constant.UserLoggedInData);
                        this.nav.setRoot(LoginPage, { 'registerType': 'Employee' });

                    }
                }
            ]
        })

        alert.present();

    }

    db_app_version: any = '';
    app_version: any = '';
    check_version() {
        this.serve.addData("", 'login/app_version').then(resp => {
            console.log("App-component\n" + resp);
            this.db_app_version = resp['app_version'];

            this.appVersion.getVersionNumber().then(resp => {
                console.log("App-component\n" + resp);
                this.app_version = resp;
                if (this.app_version != this.db_app_version) {
                    let updateAlert = this.alertCtrl.create({
                        title: 'Update Available',
                        enableBackdropDismiss: false,
                        message: 'A newer version of this app is available for download. Please update it from PlayStore !',
                        buttons: [
                            {
                                text: 'Cancel',
                                handler: () => {
                                    setTimeout(() => {
                                    }, 500);

                                    this.platform.exitApp();
                                }
                            },
                            {
                                text: 'Update Now',
                                handler: () => {
                                    setTimeout(() => {
                                    }, 500);

                                    window.open('market://details?id=com.kei_india_abacusdesk.app&hl=en', '_system', 'location=yes');
                                    this.platform.exitApp();
                                }
                            }]
                    });
                    updateAlert.present();
                }
                console.log("App-component\n" + "version");

            });
        });
    }

    initPushNotification() {
        console.log("App-component\n" + " in initPushNotification");

        this.push.hasPermission()
            .then((res: any) => {
                if (res.isEnabled) {
                    console.log("App-component\n" + 'We have permission to send push notifications');
                }
                else {
                }
            });

        const options: PushOptions = {
            android: {
                senderID: '643423474252',
                icon: './assets/imgs/logo_small'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('registration').subscribe((registration) => {
            console.log("App-component\n" + "in notificaiton start");

            if (this.loginType == 'CMS') {
                console.log("App-component\n" + "in notificaiton if");

                this.service.post_rqst({ 'registration_id': registration.registrationId }, 'app_karigar/update_token_static')
                    .subscribe((r) => {
                        console.log("App-component\n" + r);
                    });
            }
            else {
                console.log("App-component\n" + "in notificaiton else");
                this.constant.deviceId = registration.registrationId
                console.log("App-component\n" + this.constant.deviceId);

                console.log("App-component\n" + this.constant.UserLoggedInData.loggedInUserType)
                this.myserv.addData({ 'registration_id': this.constant.deviceId }, 'DealerData/updateDeviceToken').then((r) => {

                });
            }
        });

        pushObject.on('notification')
            .subscribe((notification) => {
                console.log("App-component\n" + 'Received a notification', notification);
                var tmpNotification = notification;

                let confirmAlert = this.alertCtrl
                    .create({
                        title: 'New Notification',
                        message: JSON.stringify(notification.message),
                        buttons:
                            [{
                                text: 'Ignore',
                                role: 'cancel'
                            },
                            {
                                text: 'View',
                                handler: () => {
                                    console.log("App-component\n" + "View Notification");
                                    console.warn("open by notification");
                                }
                            }]
                    });
            });

        pushObject.on('error').subscribe((error) =>
            console.error('Error with Push plugin', error));
    }

    open_nav_menu() {
        this.menu.open('first');
        this.menu.enable(true, 'first');
    }
}