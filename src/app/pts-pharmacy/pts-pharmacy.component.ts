import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

declare var Razorpay: any; 

@Component({
  selector: 'app-pts-pharmacy',
  templateUrl: './pts-pharmacy.component.html',
  styleUrls: ['./pts-pharmacy.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PtsPharmacyComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
  
    
  posts;
  commonData;
  ptsId;
  transId;
  total_with_quant = 0;
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Pharmacy Medicine Payment",
    "image": "https://arkaahealth.com/img/arkaanewlogo.png",
    "handler": function (response){
      if(response.razorpay_payment_id) {
        location.href += "/pay/"+response.razorpay_payment_id;
      } else alert("Payment Failed!");
    },
    "prefill": {
        "name": this.currentUser.first_name+' '+this.currentUser.last_name,
        "email": this.currentUser.email,
        "contact": this.currentUser.mobile_no
    },
    "theme": {
        "color": "rgba(0, 118, 168)"
    }
  };


  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.ptsId = params['ptsId'];
      this.transId = params['transId'];
    });
    this._DataService.getPTSMedicines({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
      console.log("res: ",res);
      this.commonData = res.data[0];
      this.posts = res.griddata;
      console.log("posts :",this.posts);
      console.log("commonData :",this.commonData);
      // this.total_with_quant = ( res.griddata[0].pts_medicine_ch_price *  res.griddata[0].pts_medicine_ch_dosage);
      // console.log("total_with_quant :",this.total_with_quant);
    });
  }


  pay(){
    this.rzpOptions.amount = (Math.round(parseFloat(this.posts[0].TotalFinalPrice) * 100)).toString();
    this.initPay();
  }

  submit()
{
  console.log('pts medicine id == ',this.commonData.pts_medicine_id);
  this._DataService.updatePTSPayment({
    "PtsId":this.ptsId,
    "pts_medicine_id":this.commonData.pts_medicine_id,
    "pts_lab_id":"",
    "pts_venderProducts_id":"",
    "pts_venderservice_id":"",
    "pts_doctorconsult_ch_id":"",
    "payment_mode":"OFFLINE",
    "paymentconfirmation":"",
    "payment_id":this.posts[0].paymentId
  }).subscribe((res) => {
    console.log("payment response: ",res)

    if(res.message == 'success')
  {
    alert("Please pay on visit");
    // this.router.navigate(['e-hospital/pts/'+this.ptsId+'/'+this.transId+'/appointments/'+this.chId+'/details']);
    this.router.navigate(['pts/pharmacy/payment/'+this.ptsId+'']);

    // pts/payment-mode/:id
    // e-hospital/pts/:ptsId/:transId/appointments/:id/details/pay/:payId
    //<a routerLink="../{{app.AppointmentId}}/details"class="btn btn-primary">Select</a>
  }
  })
}


  // Payment
  public initPay():void {
    // this.rzp1 = new this.winRef.nativeWindow.Razorpay(this.rzpOptions);
    // this.rzp1.open();
    console.log(this.rzpOptions);
    this.rzp1 = new Razorpay(this.rzpOptions);
    this.rzp1.open();
  }


  formatTime(time){
    return moment(time).format('LL');
  }

}
