import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';

declare var Razorpay: any; 

@Component({
  selector: 'app-view-pharmacy-quote-details',
  templateUrl: './view-pharmacy-quote-details.component.html',
  styleUrls: ['./view-pharmacy-quote-details.component.css'],
  providers: [ApigatewayService,CryptService]
})
export class ViewPharmacyQuoteDetailsComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) { }
  posts;
  appId;
  appDetails;
  

  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Pharmacy Payment",
    "image": "https://arkaahealth.com/img/arkaanewlogo.png",
    "handler": function (response){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            location.href = '/member/#/dashboard/';
          }
        };
        xhttp.open("GET", "https://arkaahealthapp.com/api/v1/pharmacy-order/update-payment/"+response.razorpay_payment_id, true);
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
  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.appId = params['id'];
      console.log("appId",this.appId);
    })
    this._DataService.getAllPharmacyQuote(JSON.parse(this.crypt.get('currentUser')).unique_id,this.appId).subscribe((res)=>{
      console.log('Result: ', res);
      this.posts = res.data[0];
      console.log('Quotation Details: ',this.posts);
    });
    this._DataService.getPharmacyOrderHistory(this.appId).subscribe((res)=>{
      console.log('order_history: ', res);
      this.rzpOptions.order_id = res.data[0].order_id;
    });
  }


  changeStatus(id,statusId){
    let statusObj={
      "id":id,
      "statusId":statusId,
    };
    this._DataService.changeOrderStatus(statusObj,JSON.parse(this.crypt.get('currentUser')).unique_id).subscribe((res)=>{
      console.log("res",res);
      if(res.success==true){
        alert("Order Cancelled Successfully.");
        this.router.navigate(['/pharmacy/orders']) 
      } else {
        alert("Update failed");
      } 
    });
  }

  pay(){
    this.rzpOptions.amount = (Math.round(parseFloat(this.posts.quote_cost) * 100)).toString();
    this.rzpOptions.prefill.name = this.posts.name;
    this.rzpOptions.prefill.email = this.posts.email;
    this.rzpOptions.prefill.contact = this.posts.mobile;
    this.initPay();
  }

  public initPay():void {
    console.log(this.rzpOptions);
    this.rzp1 = new Razorpay(this.rzpOptions);
    this.rzp1.open();
  }

  formatTime1(time){
    return moment(time).format('LL');
  }

}
