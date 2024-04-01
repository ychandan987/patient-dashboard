import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

declare var Razorpay: any; 

@Component({
  selector: 'app-ehospital-app-details',
  templateUrl: './ehospital-app-details.component.html',
  styleUrls: ['./ehospital-app-details.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalAppDetailsComponent implements OnInit {

  // public appFormGroup: FormGroup;

  constructor(private _formBuilder:FormBuilder,private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {

      // this.appFormGroup = this._formBuilder.group({
      //   	AppointmentId:0,
      //     payment_mode:['', Validators.required],
      //     paymentconfirmation:['', Validators.required],
      //     payment_id:['', Validators.required]    
      //  });

     }
  
    
  posts;
  hospId;
  appId;
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  rzp1:any;
  rzpOptions = {
    "key": "rzp_live_sKSHyyNW9lRx17",
    "amount": "", // should be in paise
    "name": "Arkaa Health",
    "description": "Doctor Appointment Payment",
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
//   changemode(ev) {
//     alert('event == '+ev.target.defaultValue);
// }
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.hospId = params['hospId'];
      this.appId = params['appId'];
    });
    this._DataService.getAppointments({"patientId" : this.currentUser.unique_id, "hospitalId" : this.hospId}).subscribe((res)=>{
      console.log("res: ",res);
      this.posts = res.data;
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].AppointmentId == this.appId){
          this.posts = res.data[i];
          console.log(this.posts.AppointmentType);
         


        };
      }
        // this.appFormGroup.patchValue({
        //   AppointmentId: this.posts.AppointmentId,
        //   payment_mode:['', Validators.required],
        //   paymentconfirmation:['', Validators.required],
        //   payment_id:['', Validators.required] 
        //   });

    });
  }

 

  pay(){

    //this.rzpOptions.amount = (Math.round(parseFloat(this.posts.FinalPrice) * 100)).toString();
    if(this.posts.AppointmentType == "Text Consult")
          {
              this.rzpOptions.amount = (Math.round(parseFloat(this.posts.TextFeesWithGSt) * 100)).toString();

          }
          if(this.posts.AppointmentType == "Walk-In")
          {
              this.rzpOptions.amount = (Math.round(parseFloat(this.posts.WalkInFeesWithGSt) * 100)).toString();

          }
          if(this.posts.AppointmentType == "Video Consult")
          {
              this.rzpOptions.amount = (Math.round(parseFloat(this.posts.VideoFeesWithGSt) * 100)).toString();

          }
          if(this.posts.AppointmentType == "Phone Consult")
          {
              this.rzpOptions.amount = (Math.round(parseFloat(this.posts.VoiceFeesWithGSt) * 100)).toString();

          }
    this.rzpOptions.prefill.name = this.posts.PatientName;
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
  formatTime(time){
    return moment(time).format('LL');
  }
}
