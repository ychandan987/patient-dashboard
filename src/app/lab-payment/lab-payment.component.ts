import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import { WindowRefService } from '../window-ref.service';
import * as moment from 'moment';
import { LocationStrategy } from '@angular/common';

declare var Razorpay: any; 

@Component({
  selector: 'app-lab-payment',
  templateUrl: './lab-payment.component.html',
  styleUrls: ['./lab-payment.component.css'],
  providers: [ApigatewayService, CryptService, WindowRefService]
})
export class LabPaymentComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService, private winRef: WindowRefService) { }

  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Lab Tests Payment",
    "image": "https://arkaahealth.com/img/arkaanewlogo.png",
    "handler": function (response){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            location.href = '/member/#/dashboard/';
          }
        };
        xhttp.open("GET", "http://172.31.47.161:3000/api/v1/lab-appointment/update-payment/"+response.razorpay_payment_id, true);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log("payment res:",xhttp.responseText);
            if(JSON.parse(xhttp.responseText).success) {
              location.href = '/member/#/dashboard/';
            }
          }
        };
        xhttp.setRequestHeader("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjYxMDYwNzJ9.brSH-nMAMGsmtdsQBhrLoq2_NCB9EudBVV0-OZz40n8");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    },
    "prefill": {
        "name": this.currentUser.first_name+' '+this.currentUser.last_name,
        "email": this.currentUser.email,
        "contact": this.currentUser.mobile_no
    },
    "notes": {
        "appId": ""
    },
    "order_id":"",
    "theme": {
        "color": "rgba(0, 118, 168)"
    }
  };
  posts;
  appId;
  appDetails;

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.appId = params['ordId'];
      this.rzpOptions.notes.appId=this.appId;
    })
    this._DataService.getAllLabAppointmentList(JSON.parse(this.crypt.get('currentUser')).unique_id,0).subscribe((res)=>{
       console.log('Result tests: ', res);
      this.posts = res.data;
      for(let i=0; i<this.posts.length; i++){
        if(this.posts[i].id==this.appId){
          this.appDetails=this.posts[i];
        }
      }
    });
    this._DataService.getLabAppOrder(this.appId).subscribe((res)=>{
      console.log('order: ', res);
      this.rzpOptions.order_id = res.data[0].order_id;
    });
  }

  formatTime(time){
    return moment(time).format('LLL');
  }
  formatTime1(time){
    return moment(time).format('LL');
  }

  pay(){
    this.rzpOptions.amount = (Math.round(parseFloat(this.appDetails.total_cost) * 100)).toString();
    this.rzpOptions.prefill.name = this.appDetails.patient_details[0].name;
    this.rzpOptions.prefill.email = this.appDetails.patient_details[0].email;
    this.rzpOptions.prefill.contact = this.appDetails.patient_details[0].mobile;
    this.initPay();
  }

  

  // Payment
  public initPay():void {
    // this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.rzpOptions);
    // this.rzp1.open();
    console.log(this.rzpOptions);
    this.rzp1 = new Razorpay(this.rzpOptions);
    this.rzp1.open();
  }

}
