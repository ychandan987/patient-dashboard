import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-ehospital-payment-mode',
  templateUrl: './ehospital-payment-mode.component.html',
  styleUrls: ['./ehospital-payment-mode.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospitalPaymentModeComponent implements OnInit {

   public appFormGroup: FormGroup;

  constructor(private _formBuilder:FormBuilder,private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {

      this.appFormGroup = this._formBuilder.group({        
          payment_mode:['']          
       });

     }

     hospId;
     appId;
     posts;

     currentUser = JSON.parse(this.crypt.get('currentUser'));
  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      this.hospId = params['hospid'];
      this.appId = params['id'];
      console.log('app id ==',this.appId);
      console.log('hos id ==',this.hospId);
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

    });
  }

submit()
{
 
 if(this.appFormGroup.value.payment_mode == "OFFLINE")
 {
  console.log('form value',this.appFormGroup.value.payment_mode);
  console.log('app',this.appId);
 this._DataService.updateEhospitalPayment({
  "AppointmentId":this.appId,
  "payment_mode":this.appFormGroup.value.payment_mode,
  "paymentconfirmation":" ",
  "payment_id":" "
}).subscribe((res) => {
  console.log("payment response: ",res)
  console.log('res succ',res.message);
  if(res.message == 'success')
  {
    this.router.navigate(['e-hospital/appointments/'+this.hospId+'/'+this.appId+'/details']);
    //<a routerLink="../{{app.AppointmentId}}/details"class="btn btn-primary">Select</a>
  }
  
})
 }
 else{
  this.router.navigate(['e-hospital/appointments/'+this.hospId+'/'+this.appId+'/details']);

 }
}

formatTime(time){
  return moment(time).format('LL');
}

}
