import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import { WindowRefService } from '../window-ref.service';
import * as moment from 'moment';

declare var Razorpay: any; 

@Component({
  selector: 'app-doctor-appointment-payment',
  templateUrl: './doctor-appointment-payment.component.html',
  styleUrls: ['./doctor-appointment-payment.component.css'],
  providers: [ApigatewayService, CryptService, WindowRefService]
})
export class DoctorAppointmentPaymentComponent implements OnInit {
  
  
  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService, private winRef: WindowRefService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Doctor Appointment Payment",
    "image": "https://arkaahealth.com/img/arkaanewlogo.png",
    "handler": function (response){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            location.href = "/patient/patient#/dashboard/";
           // alert('res1'+response.razorpay_payment_id);
           // alert('or res =='+response.razorpay_order_id);
          }
        };
        xhttp.open("GET", "https://arkaahealthapp.com/api/v1/doctor-appointment/update-payment/"+response.razorpay_payment_id, true);
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log("payment res:",xhttp.responseText);
            if(JSON.parse(xhttp.responseText).success) {
             // alert('res1'+response.razorpay_payment_id);
            //  alert('order res1 =='+response.razorpay_order_id);

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
        "color": "#rgba(0, 118, 168)"
    }
  };
 
  posts;
  appId;
  appDetails;
  fees;
  payment_mode_value;
  paymenttype;
  ngOnInit() {

    this.activeRoute.params.subscribe(params=>{
      this.appId = params['ordId'];
      this.paymenttype = params['paymentmode'];
      this.rzpOptions.notes.appId=this.appId;
    })
    this._DataService.getAllDocAppointmentList(JSON.parse(this.crypt.get('currentUser')).unique_id,0).subscribe((res)=>{
      // console.log('Result: ', res);
      this.posts = res.data;
     // console.log('post data == ',this.posts);
      for(let i=0; i<this.posts.length; i++){
        if(this.posts[i].id==this.appId){
          this.appDetails=this.posts[i];
        }
      }
     // this.rzpOptions.order_id = 1;
      console.log('app data == ',this.appDetails);
    });
    //this._DataService.getLabAppOrder(this.appId).subscribe((res)=>{
      this._DataService.getDoctorAppOrder(this.appId).subscribe((res)=>{      
      console.log('order history fees: ',res.data[0].consultation_fees);
    //  console.log('pay id == ',res.data[0].order_id);
      this.rzpOptions.order_id = res.data[0].order_id;
      this.fees = res.data[0].consultation_fees;
    });
  }
  
  formatTime(time){
    return moment(time).format('LL');
  }
  onChange(value) {
    console.log('value == ',value);
    this.payment_mode_value = value;
   }

  pay(){
    //console.log('currentUser = ',this.currentUser);
    // for(let i=0; i<this.appDetails.length; i++){
    //   console.log('fees == ',this.appDetails.affiliation_details[0].first_consultation_fee);

    // }
    this.rzpOptions.amount = (Math.round((this.fees) * 100)).toString();
    this.rzpOptions.prefill.name = this.appDetails.name;
    this.rzpOptions.prefill.email = this.appDetails.email;
    this.rzpOptions.prefill.contact = this.appDetails.mobile;
    // this.rzpOptions.prefill.name = this.currentUser.first_name;
    // this.rzpOptions.prefill.email = this.currentUser.email;
    // this.rzpOptions.prefill.contact = this.currentUser.mobile_no;

    this.initPay();

  }
// Payment
  public initPay():void {
    // this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.rzpOptions);
    // this.rzp1.open();
   // this.rzpOptions.order_id = '1';
    console.log(this.rzpOptions);
    this.rzp1 = new Razorpay(this.rzpOptions);
    this.rzp1.open();
  }
}
