import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
// import { MobileLoginPage } from '../pages/login-section/mobile-login/mobile-login';
// import { OtpPage } from '../pages/login-section/otp/otp';
// import { // RegistrationPage } from '../pages/login-section/registration/registration';
// import { LoginScreenPage } from '../pages/login-section/login-screen/login-screen';
// import { ChartsModule } from 'ng2-charts';
import { StatusBar } from '@ionic-native/status-bar';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CoupanCodePageModule } from '../pages/scane-pages/coupan-code/coupan-code.module';
import { ScanPageModule } from '../pages/scane-pages/scan/scan.module';
import { GiftDetailPageModule } from '../pages/gift-gallery/gift-detail/gift-detail.module';
import { GiftListPageModule } from '../pages/gift-gallery/gift-list/gift-list.module';
import { OffersPageModule } from '../pages/offers/offers.module';
import { PointListPageModule } from '../pages/points/point-list/point-list.module';
import { PointDetailPageModule } from '../pages/points/point-detail/point-detail.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { MainHomePageModule } from '../pages/main-home/main-home.module';
import { ProductsPageModule } from '../pages/products/products.module';
import { TermsPageModule } from '../pages/terms/terms.module';
import { ProductDetailPageModule } from '../pages/product-detail/product-detail.module';
import { ProductSubdetailPageModule } from '../pages/product-subdetail/product-subdetail.module';
import { TransactionPageModule } from '../pages/transaction/transaction.module';
import { ShippingDetailPageModule } from '../pages/shipping-detail/shipping-detail.module';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { ContactPageModule } from '../pages/contact/contact.module';
import { VideoPageModule } from '../pages/video/video.module';
import { NewsPageModule } from '../pages/news/news.module';
import { NewsDetailPageModule } from '../pages/news-detail/news-detail.module';
import { FeedbackPageModule } from '../pages/feedback/feedback.module';
import { AboutusModalPageModule } from '../pages/aboutus-modal/aboutus-modal.module';
import { DbserviceProvider } from '../providers/dbservice/dbservice';
import { HttpClientModule } from '@angular/common/http';
import { ConstantProvider } from '../providers/constant/constant';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { OfferListPageModule } from '../pages/offer-list/offer-list.module';
import { IonicStorageModule } from '@ionic/storage';
import { SafePipe } from '../pipes/safe/safe';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ViewProfilePageModule } from '../pages/view-profile/view-profile.module';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ComplaintDetailPageModule } from '../pages/complaints/complaint-detail/complaint-detail.module';
import { AddNewComplaintPageModule } from '../pages/complaints/add-new-complaint/add-new-complaint.module';
import { ComplaintHistoryPageModule } from '../pages/complaints/complaint-history/complaint-history.module';
import { MyCamplaintsPageModule } from '../pages/plumber-camplaints/my-camplaints/my-camplaints.module';
import { PulmberCustomerDetailPageModule } from '../pages/plumber-camplaints/pulmber-customer-detail/pulmber-customer-detail.module';
import { EnquiryPageModule } from '../pages/enquiry/enquiry.module';
import { TaskClosePageModule } from '../pages/task-close/task-close.module';
import { Super30PageModule } from '../pages/super30/super30.module';
import { CancelComplaintPageModule } from '../pages/cancel-complaint/cancel-complaint.module';
import { MediaCapture} from '@ionic-native/media-capture';
import { PointLocationPageModule } from '../pages/point-location/point-location.module';
import { Geolocation } from  '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { EditProfilePageModule } from '../pages/edit-profile/edit-profile.module';
// import { ComplaintRemarksPageModule } from '../pages/complaint-remarks/complaint-remarks.module';
import { AppVersion } from '@ionic-native/app-version';
import { CategoryPageModule } from '../pages/category/category.module';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { SelectRegistrationTypePage } from '../pages/select-registration-type/select-registration-type';
import { SelectRegistrationTypePageModule } from '../pages/select-registration-type/select-registration-type.module';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { OtpverifyPageModule } from '../pages/otpverify/otpverify.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { AttendenceserviceProvider } from '../providers/attendenceservice/attendenceservice';
import { CatalougeProvider } from '../providers/catalouge/catalouge';
import { MyserviceProvider } from '../providers/myservice/myservice';
import { GeolocationserviceProvider } from '../providers/geolocationservice/geolocationservice';
import { AddOrderPageModule } from '../pages/add-order/add-order.module';
import { CartDetailPageModule } from '../pages/cart-detail/cart-detail.module';
import { LeadsDetailPageModule } from '../pages/leads-detail/leads-detail.module';
import { LeaveListPageModule } from '../pages/leave-list/leave-list.module';
import { AddLeavePageModule } from '../pages/add-leave/add-leave.module';
import { MainDistributorListPageModule } from '../pages/sales-app/main-distributor-list/main-distributor-list.module';
import { WorkTypeModalPageModule } from '../pages/work-type-modal/work-type-modal.module';
import { AddCheckinPageModule } from '../pages/sales-app/add-checkin/add-checkin.module';
import { CheckinListPageModule } from '../pages/sales-app/checkin-list/checkin-list.module';
import { EndCheckinPageModule } from '../pages/sales-app/end-checkin/end-checkin.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { AttendencePageModule } from '../pages/attendence/attendence.module';
import { TravelListPageModule } from '../pages/travel-list/travel-list.module';
import { TravelAddPageModule } from '../pages/travel-add/travel-add.module';
import { SearchPageModule } from '../pages/search/search.module';
import { AddDealerPageModule } from '../pages/sales-app/add-dealer/add-dealer.module';
import { EnquiryserviceProvider } from '../providers/enquiryservice/enquiryservice';
import { DistributorDetailPageModule } from '../pages/sales-app/distributor-detail/distributor-detail.module';
import { CustomerOrderPageModule } from '../pages/sales-app/customer-order/customer-order.module';
import { CustomerCheckinPageModule } from '../pages/sales-app/customer-checkin/customer-checkin.module';
import { DistributorListPageModule } from '../pages/sales-app/distributor-list/distributor-list.module';
import { AddLeadsPage } from '../pages/sales-app/add-leads/add-leads';
import { CheckinDetailPageModule } from '../pages/sales-app/checkin-detail/checkin-detail.module';
import { AddLeadsPageModule } from '../pages/sales-app/add-leads/add-leads.module';
import { OrderDetailPageModule } from '../pages/order-detail/order-detail.module';
import { NewarrivalsPageModule } from '../pages/newarrivals/newarrivals.module';
import { TimeCounterPipe } from '../pipes/time-counter/time-counter';
// import { OtpverifyPage } from '../pages/otpverify/otpverify';
import { NearestDealerPageModule } from '../pages/nearest-dealer/nearest-dealer.module';
import { VideoCategoryPageModule } from '../pages/video-category/video-category.module';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { OfflineDbProvider } from '../providers/offline-db/offline-db';
import { Network } from '@ionic-native/network';
import { DealerHomePageModule } from '../pages/dealer-home/dealer-home.module';
import { DealerCheckInPageModule } from '../pages/dealer-check-in/dealer-check-in.module';
import { DealerOrderPageModule } from '../pages/dealer-order/dealer-order.module';
import { DealerDiscountPage } from '../pages/dealer-discount/dealer-discount';
import { DealerDiscountPageModule } from '../pages/dealer-discount/dealer-discount.module';
import { DealerProfilePageModule } from '../pages/dealer-profile/dealer-profile.module';
import { DealerAddorderPageModule } from '../pages/dealer-addorder/dealer-addorder.module';
import { DealerDealerListPageModule } from '../pages/dealer-dealer-list/dealer-dealer-list.module';
import { DealerExecutiveAppPageModule } from '../pages/dealer-executive-app/dealer-executive-app.module';
import { DealerExecutiveListPage } from '../pages/dealer-executive-list/dealer-executive-list';
import { DealerExecutiveListPageModule } from '../pages/dealer-executive-list/dealer-executive-list.module';
import { FavoriteProductPage } from '../pages/favorite-product/favorite-product';
import { FavoriteProductPageModule } from '../pages/favorite-product/favorite-product.module';
import { ExecutivDetailPageModule } from '../pages/executiv-detail/executiv-detail.module';
import { EditNetworkPageModule } from '../pages/sales-app/edit-network/edit-network.module';
import { ExecutiveEditPageModule } from '../pages/executive-edit/executive-edit.module';
import { ExecutivePopoverPageModule } from '../pages/executive-popover/executive-popover.module';
import { ExecutiveOrderDetailPageModule } from '../pages/executive-order-detail/executive-order-detail.module';
// import { CancelationPolicyPage } from '../pages/cancelation-policy/cancelation-policy';
import { CancelationPolicyPageModule } from '../pages/cancelation-policy/cancelation-policy.module';
import { CancelpolicyModalPageModule } from '../pages/cancelpolicy-modal/cancelpolicy-modal.module';
import { FollowupListPageModule } from '../pages/followup-list/followup-list.module';
import { FollowupAddPageModule } from '../pages/followup-add/followup-add.module';
import { ExpenseAddPageModule } from '../pages/expense-add/expense-add.module';
import { ExpenseListPageModule } from '../pages/expense-list/expense-list.module';
import { CatalogueHomePageModule } from '../pages/catalogue-home/catalogue-home.module';
import { ExpenseDetailPageModule } from '../pages/expense-detail/expense-detail.module';
import { AnnouncementListPageModule } from '../pages/announcement/announcement-list/announcement-list.module';
import { AnnouncementDetailPageModule } from '../pages/announcement/announcement-detail/announcement-detail.module';
import { PolicyPageModule } from '../pages/policy/policy.module';
import { SupportPageModule } from '../pages/support/support.module';
// import { ExpensePopoverPage } from '../pages/expense-popover/expense-popover';
import { CataloguePdfPageModule } from '../pages/catalogue-pdf/catalogue-pdf.module';
// import { ExpenseStatusModalPage } from '../pages/expense-status-modal/expense-status-modal';
import { TravelDetailPageModule } from '../pages/travel-detail/travel-detail.module';
import { ContractorMeetListPageModule } from '../pages/Contractor-Meet/contractor-meet-list/contractor-meet-list.module';
import { ContractorMeetAddPageModule } from '../pages/Contractor-Meet/contractor-meet-add/contractor-meet-add.module';
import { ContractorMeetDetailPageModule } from '../pages/Contractor-Meet/contractor-meet-detail/contractor-meet-detail.module';
import { VisitingCardListPageModule } from '../pages/visiting-card/visiting-card-list/visiting-card-list.module';
import { VisitingCardAddPageModule } from '../pages/visiting-card/visiting-card-add/visiting-card-add.module';
// import { VisitingCardModalPage } from '../pages/visiting-card/visiting-card-modal/visiting-card-modal';
import { LmsLeadListPageModule } from '../pages/sales-app/new-lead/lms-lead-list/lms-lead-list.module';
import { LmsLeadAddPageModule } from '../pages/sales-app/new-lead/lms-lead-add/lms-lead-add.module';
import { LmsLeadDetailPageModule } from '../pages/sales-app/new-lead/lms-lead-detail/lms-lead-detail.module';
import { LmsActivityListPageModule } from '../pages/sales-app/new-lead/lms-lead-activity/lms-activity-list/lms-activity-list.module';
import { LmsActivityAddPageModule } from '../pages/sales-app/new-lead/lms-lead-activity/lms-activity-add/lms-activity-add.module';
import { LmsFollowupAddPageModule } from '../pages/sales-app/new-lead/lms-lead-followup/lms-followup-add/lms-followup-add.module';
import { LmsFollowupListPageModule } from '../pages/sales-app/new-lead/lms-lead-followup/lms-followup-list/lms-followup-list.module';
import { LmsQuotationAddPageModule } from '../pages/sales-app/new-lead/lms-lead-quotation/lms-quotation-add/lms-quotation-add.module';
import { LmsQuotationListPageModule } from '../pages/sales-app/new-lead/lms-lead-quotation/lms-quotation-list/lms-quotation-list.module';
import { PopGiftAddPageModule } from '../pages/sales-app/pop-gift/pop-gift-add/pop-gift-add.module';
import { PopGiftListPageModule } from '../pages/sales-app/pop-gift/pop-gift-list/pop-gift-list.module';
import { PopGiftOutgoingPageModule } from '../pages/sales-app/pop-gift/pop-gift-outgoing/pop-gift-outgoing.module';
// import { ContractorModalPage } from '../pages/Contractor-Meet/contractor-modal/contractor-modal';
import { LmsQuotationDetailPageModule } from '../pages/sales-app/new-lead/lms-lead-quotation/lms-quotation-detail/lms-quotation-detail.module';
import { TargetAchievementPageModule } from '../pages/target-achievement/target-achievement.module';
import { AnnouncementListPage } from '../pages/announcement/announcement-list/announcement-list';
import { AddMultipleContactPage } from '../pages/add-multiple-contact/add-multiple-contact';
import { AddMultipleContactPageModule } from '../pages/add-multiple-contact/add-multiple-contact.module';
import { ContractorModalPageModule } from '../pages/Contractor-Meet/contractor-modal/contractor-modal.module';
import { ExpensePopoverPageModule } from '../pages/expense-popover/expense-popover.module';
import { ExpenseStatusModalPageModule } from '../pages/expense-status-modal/expense-status-modal.module';
import { LoginScreenPageModule } from '../pages/login-section/login-screen/login-screen.module';
import { MobileLoginPageModule } from '../pages/login-section/mobile-login/mobile-login.module';
import { OtpPageModule } from '../pages/login-section/otp/otp.module';
import { RegistrationPageModule } from '../pages/login-section/registration/registration.module';
import { VisitingCardModalPageModule } from '../pages/visiting-card/visiting-card-modal/visiting-card-modal.module';
import { FollowupDetailPageModule } from '../pages/followup-detail/followup-detail.module';
import { RequirementPageModule} from '../pages/requirement/requirement.module';
import { AddRetailerPageModule} from '../pages/add-retailer/add-retailer.module';
import { RequirementlistPageModule} from '../pages/requirementlist/requirementlist.module';
import { FileOpener } from '@ionic-native/file-opener';
import { WeekconnectionPageModule } from '../pages/weekconnection/weekconnection.module';
import { LoadingCntrlPageModule } from '../pages/loading-cntrl/loading-cntrl.module';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { AttendenceNewPageModule } from '../pages/attendence-new/attendence-new.module';
import { CheckinNewPageModule } from '../pages/checkin-new/checkin-new.module';
import { TravelListNewPageModule } from '../pages/travel-list-new/travel-list-new.module';
import { TravelAddNewPage } from '../pages/travel-add-new/travel-add-new';
import { TravelAddNewPageModule } from '../pages/travel-add-new/travel-add-new.module';

@NgModule({
    declarations: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        // MobileLoginPage,
        // SelectRegistrationTypePage,
        // OtpPage,
        // RegistrationPage,
        // LoginScreenPage,
        SafePipe,
        // TimeCounterPipe,
        // OtpverifyPage,
        // ExpensePopoverPage,
        // ExpenseStatusModalPage,
        // VisitingCardModalPage,
        // ContractorModalPage ,
        ],
    imports: [
        AddRetailerPageModule,
        VisitingCardModalPageModule,
        OtpPageModule,
        RegistrationPageModule,
        MobileLoginPageModule,
        LoginScreenPageModule,
        ExpenseStatusModalPageModule,
        ExpensePopoverPageModule,
        DealerExecutiveAppPageModule,
        ExecutivDetailPageModule,
        TaskClosePageModule,
        EnquiryPageModule,
        BrowserModule,
        // ChartsModule,
        // IonicSelectableModule,
        IonicModule.forRoot(MyApp),
        ScanPageModule,
        CoupanCodePageModule,
        GiftDetailPageModule,
        GiftListPageModule,
        OffersPageModule,
        ViewProfilePageModule,
        PointListPageModule,
        PointDetailPageModule,
        ProfilePageModule,
        MainHomePageModule,
        ProductsPageModule,
        TermsPageModule,
        NewarrivalsPageModule,
        ProductDetailPageModule,
        VideoCategoryPageModule,
        ProductSubdetailPageModule,
        TransactionPageModule,
        ShippingDetailPageModule,
        NotificationPageModule,
        ContactPageModule,
        VideoPageModule,
        NewsPageModule,
        PinchZoomModule,
        NewsDetailPageModule,
        FeedbackPageModule,
        HttpClientModule,
        HttpModule,
        AboutusModalPageModule,
        IonicStorageModule.forRoot(),
        OfferListPageModule,
        AddNewComplaintPageModule,
        ComplaintDetailPageModule,
        ComplaintHistoryPageModule,
        MyCamplaintsPageModule,
        PulmberCustomerDetailPageModule ,
        Super30PageModule,
        CancelComplaintPageModule,
        PointLocationPageModule ,
        EditProfilePageModule ,
        // ComplaintRemarksPageModule,
        CategoryPageModule,
        FavoriteProductPageModule,
        WorkTypeModalPageModule,
        LoginPageModule,
        DashboardPageModule,
        AddOrderPageModule,
        CartDetailPageModule,
        LeadsDetailPageModule,
        LeaveListPageModule,
        AddLeavePageModule,
        MainDistributorListPageModule,
        DealerDealerListPageModule,
        AddCheckinPageModule,
        CheckinListPageModule,
        EndCheckinPageModule,
        OrderListPageModule,
        AttendencePageModule,
        AttendenceNewPageModule,
        NewarrivalsPageModule,
        TravelListPageModule,
        TravelAddPageModule,
        SearchPageModule,
        AddDealerPageModule,
        DistributorDetailPageModule,
        CustomerOrderPageModule,
        CustomerCheckinPageModule,
        DistributorListPageModule,
        NearestDealerPageModule,
        AddLeadsPageModule,
        CheckinDetailPageModule,
        OrderDetailPageModule,
        ExecutiveOrderDetailPageModule,
        DealerHomePageModule,
        DealerCheckInPageModule,
        DealerOrderPageModule,
        DealerDiscountPageModule,
        DealerProfilePageModule,
        DealerAddorderPageModule,
        DealerExecutiveListPageModule,
        LmsQuotationDetailPageModule,
        EditNetworkPageModule,
        ExecutiveEditPageModule,
        ExecutivePopoverPageModule,
        CancelationPolicyPageModule,
        CancelpolicyModalPageModule,
        FollowupListPageModule,
        FollowupAddPageModule,
        ExpenseAddPageModule,
        ExpenseListPageModule,
        CatalogueHomePageModule,
        ExpenseDetailPageModule,
        AnnouncementListPageModule,
        AnnouncementDetailPageModule,
        PolicyPageModule,
        SupportPageModule,
        CataloguePdfPageModule,
        TravelDetailPageModule,
        ContractorMeetListPageModule,
        ContractorMeetAddPageModule,
        ContractorMeetDetailPageModule,
        EnquiryPageModule,
        VisitingCardListPageModule,
        VisitingCardAddPageModule,
        LmsLeadListPageModule,
        LmsLeadAddPageModule,
        LmsLeadDetailPageModule,
        LmsActivityListPageModule,
        LmsActivityAddPageModule,
        LmsFollowupAddPageModule,
        LmsFollowupListPageModule,
        LmsQuotationAddPageModule,
        LmsQuotationListPageModule,
        PopGiftAddPageModule,
        PopGiftListPageModule,
        PopGiftOutgoingPageModule,
        TargetAchievementPageModule,
        AddMultipleContactPageModule,
        SelectRegistrationTypePageModule,
        OtpverifyPageModule,
        ContractorModalPageModule,
        FollowupDetailPageModule,
        RequirementPageModule,
        RequirementlistPageModule,
        WeekconnectionPageModule,
        LoadingCntrlPageModule,
        CheckinNewPageModule,
        TravelListNewPageModule,
        TravelAddNewPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        HomePage,
        TabsPage,
        // MobileLoginPage,
        // OtpPage,
        // SelectRegistrationTypePage,
        // RegistrationPage,
        // LoginScreenPage,
        // OtpverifyPage,
        // ExpensePopoverPage,
        // ExpenseStatusModalPage,
        // VisitingCardModalPage,
        // ContractorModalPage,
        AnnouncementListPage,

        // CancelationPolicyPage
        // ExecutivePopoverPage
    ],
    providers: [
        StatusBar,
        DbserviceProvider,
        LoginserviceProvider,
        SplashScreen,
        // FileChooser,
        ConstantProvider,
        Geolocation,
        NativeGeocoder,
        Camera,
        MediaCapture,
        BarcodeScanner,
        FileTransfer,
        SocialSharing,
        Push,
        FileTransferObject,
        File,
        LaunchNavigator,
        Diagnostic,
        AndroidPermissions,
        AppVersion,
        DocumentViewer,
        //sfa
        AttendenceserviceProvider,
        EnquiryserviceProvider,
        CatalougeProvider,
        GeolocationserviceProvider,
        CatalougeProvider,
        MyserviceProvider,
        LocationAccuracy,
        AttendenceserviceProvider,
        SQLite,
        VideoPlayer,
        // InfiniteScroll,
        Network,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        OfflineDbProvider,
        // DocumentViewer
        FileOpener
    ]
})
export class AppModule {}
