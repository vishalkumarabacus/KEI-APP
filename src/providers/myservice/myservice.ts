import { Http, Headers } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ConstantProvider } from '../constant/constant';
import { Storage } from '@ionic/storage';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AlertController, ToastController, LoadingController, ModalController, Events } from 'ionic-angular';
import { LoadingCntrlPage } from '../../pages/loading-cntrl/loading-cntrl';
import 'rxjs/add/operator/timeout';

/*
Generated class for the MyserviceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class MyserviceProvider {
    
    userlogin:any;
    navigationEvent = new EventEmitter();
  isInternetConnection = true;
    
    constructor(public http: Http,public http1:HttpClient, public toastCtrl: ToastController,public modalCtrl: ModalController, public events: Events , public loadingCtrl: LoadingController,public alertCtrl:AlertController, private constant: ConstantProvider, public storage: Storage) {
        console.log('Hello MyserviceProvider Provider');
        console.log(http);
        console.log(http1);
        console.log(constant);
        
    }
    public FileData(request_data:any, fn:any)
    {
        let header = new HttpHeaders();
        header.append('Content-Type',undefined);
        console.log(request_data);
        return this.http1.post( this.constant.server_url+fn, request_data, { headers : header});
    }

    public FileData2(request_data:any, fn:any)
    {
        let header = new HttpHeaders();
        header.append('Content-Type',undefined);
        console.log(request_data);
        return this.http1.post( this.constant.rootUrlSfa+fn+request_data, { headers : header});
    }
    public get_data() {
        
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((value) => {
                console.log(value);
                
                let header = new Headers();
                header.append('Authorization', 'Bearer '+value);
                
                header.append('Content-Type', 'application/json');
                this.http.get(this.constant.server_url+'Distributor/lead_list' ,{headers: header}).map(res=>res.json())
                .subscribe(res=>{
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            });
        });
    }
    
    public pending_data() {
        
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((value) => {
                console.log(value);
                
                let header = new Headers();
                header.append('Authorization', 'Bearer '+value);
                
                header.append('Content-Type', 'application/json');
                this.http.get(this.constant.rootUrlSfa+'Checkin/pending_checkin' ,{headers: header}).map(res=>res.json())
                .subscribe(res=>{
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            });
        });
    }
    
    public addData(value,url) {
        console.log(value);
        console.log(url);
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token)=>{
                
                let header = new Headers();
                header.append('Authorization', 'Bearer '+token);
                header.append('Content-Type', 'application/json');
                this.http.post(this.constant.rootUrl+url,JSON.stringify(value),{headers: header}).map((res)=>res.json())
                .subscribe(res=>{
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            });
        })
        
    }
    public upload_file(value,url) {
        console.log(value);
        console.log(url);
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token) => {

                let header = new Headers();
                header.append('Authorization', 'Bearer ' + token);
                this.http.post(this.constant.rootUrl + url, value, { headers: header }).map((res) => res.json())
                    .subscribe(res => {
                        console.log(res);
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });
            });
        })

    }
    public addData3(value,url) {
        console.log(value);
        console.log(url);
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token)=>{
                
                let header = new Headers();
                header.append('Authorization', 'Bearer '+token);
                header.append('Content-Type', 'application/json');
                this.http.post(this.constant.rootUrl3+url,JSON.stringify(value),{headers: header}).map((res)=>res.json())
                .subscribe(res=>{
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            });
        })
        
    }


    public addData2(value,url) {
        console.log(value);
        console.log(url);
        return new Promise((resolve, reject) => {
            this.storage.get('token').then((token)=>{
                
                let header = new Headers();
                header.append('Authorization', 'Bearer '+token);
                header.append('Content-Type', 'application/json');
                this.http.post(this.constant.rootUrl+url,JSON.stringify(value),{headers: header}).map((res)=>res.json())
                .subscribe(res=>{
                    console.log(res);
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
            });
        })
        
    }
    
    
    
    
    public set(value)
    {
        this.userlogin=value;
        console.log(this.userlogin);
        
    }
    public get()
    {
        return this.userlogin;
    }
    loading:any;
    
    public show_loading()
    {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `<img src="./assets/imgs/gif.svg"/>`,
            dismissOnPageChange: true
        });
        this.loading.present();
    }
    public dismiss()
    {
        this.loading.dismiss();
    }
    public presentToast(msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        
        toast.present();
    }
    public errToasr() {
        let toast = this.toastCtrl.create({
            message: 'Error Occured ,Please try Again!!',
            duration: 3000,
            position: 'bottom'
        });
        
        toast.present();
    }
    showOfflineAlert()
    {
        var text = 'Offline ! Please Connect To An Active Internet Connection'
        let alert = this.alertCtrl.create({
            title:'Alert!',
            cssClass:'action-close',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
    }
}