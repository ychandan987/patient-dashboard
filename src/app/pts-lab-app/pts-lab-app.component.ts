import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
// import { DatePipe } from '@angular/common';

declare var Razorpay: any; 


@Component({
  selector: 'app-pts-lab-app',
  templateUrl: './pts-lab-app.component.html',
  styleUrls: ['./pts-lab-app.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PtsLabAppComponent implements OnInit {
  myDate = new Date();
  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {
      // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
     }
  
    
  posts;
  posts1;
  commonData;
  commonData1;
  ptsId;
  transId;
  doctorId;
  docId;
  today;
  alreadyShared;
  lab_repo;
  posts2;
  resLength;
  followUpDocId;
  
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Lab Tests Payment",
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
        "color": "#rgba(0, 118, 168)"
    }
  };

  
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.ptsId = params['ptsId'];
      this.transId = params['transId'];
    });

    this._DataService.getPTSAppointments({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((respdata)=>{
      console.log("resAllPts: ",respdata);
      this.posts2 = respdata.data;
      console.log("post2=="+this.posts2);
      this.followUpDocId =  respdata.griddata[0].doctorId;
      console.log("followUpDocId=="+this.followUpDocId);
    });
    
    this._DataService.getPTSLabServices({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
      console.log("res: ",res);
      this.commonData = res.data[0];
      this.posts = res.griddata;
      console.log('posts==',this.posts);
      console.log('commonData==',this.commonData);
    });

    
  }


  pay(){
    this.rzpOptions.amount = (Math.round(parseFloat(this.posts[0].TotalFinalPrice) * 100)).toString();
    this.initPay();
  }
  share(){
    console.log('ptsId==',this.ptsId);
    console.log('transId==',this.transId);
    // alert("Shared Lab Report");
    this._DataService.getPTSAppointments({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
      console.log("getPTSAppointments: ",res);
      this.commonData1 = res.data[0];
      this.docId =  res.griddata[0].doctorId;
      console.log("docId: ",this.docId);
      for (let i = 0; i < res.griddata.length; i++) {
          this.posts1 = res.griddata[i];
          this.doctorId = res.griddata[i].doctorId;
          console.log("commonData1: ",this.commonData1);
          console.log("doctorId: ",this.doctorId);
          if (res.message=='success'){
            this._DataService.shareLabReport1({"MPatient_Id" : this.currentUser.unique_id, "MDoctor_Id" : this.doctorId,"MDoc_Path" : this.commonData.labReport}).subscribe((shareRes)=>{
              console.log("shareRes: ",shareRes);
              console.log('pts lab id == ',this.posts[0].pts_lab_id);
              let dateTime = new Date();
              console.log("dateTime",dateTime);
              if (shareRes.message=='0'){
                // alert("Please Share Lab Report");
                var shareddata = {
                  "MPatient_Id" : this.currentUser.unique_id,
                   "MDoctor_Id" : this.docId,
                   "MDoc_Type" : "LabReport",
                   "MDoc_Id" : this.posts[0].pts_lab_id,
                   "MDoc_Path" : this.commonData.labReport,
                   "Mpts_ID" : this.ptsId,
                   "MTransaction_Id" : this.transId,
                   "MStatus" : "1" ,
                   "MCreated_On" : dateTime
                 }
                 console.log("shareddata",shareddata);
                  this._DataService.shareLabReport({
                    "MPatient_Id" : this.currentUser.unique_id,
                     "MDoctor_Id" : this.doctorId,
                     "MDoc_Type" : "LabReport",
                     "MDoc_Id" : this.posts[0].pts_lab_id,
                     "MDoc_Path" : this.commonData.labReport,
                     "Mpts_ID" : this.ptsId,
                     "MTransaction_Id" : this.transId,
                     "MStatus" : "1" ,
                     "MCreated_On" : dateTime
                   }).subscribe((res) => {
                    
                    if (res.message=='fail')
                  {
                    console.log("error :",res.message);
                   
                  }
                  else{
                    alert("lab report shared with doctor");
                    console.log("shareddata resp: ",res)
                  }
                  })
              }
              else{
                alert("Lab Report Already Shared");
                this.alreadyShared = shareRes.message;
                console.log("error :",shareRes.message);
              }
            });
             
          }
          else if(res.message=='fail'){
            this.lab_repo = res.message;
            console.log("lab_repo :",this.lab_repo);
          }
          else{
            console.log("error :",res.message);
          }
          
      
        
      }
    });

    
  }

  submit()
{
  
  console.log('pts lab id == ',this.commonData.pts_lab_id);
  this._DataService.updatePTSPayment({
    "PtsId":this.ptsId,
    "pts_medicine_id":"",
    "pts_lab_id":this.commonData.pts_lab_id,
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
    this.router.navigate(['pts/lab/payment/'+this.ptsId]);

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
  formatTime1(time){
    return moment(time).format('MMMM Do YYYY, h:mm:ss a');
  }
  
}
