import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-reschedule-view',
  templateUrl: './reschedule-view.component.html',
  styleUrls: ['./reschedule-view.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class RescheduleViewComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder,private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }

    posts;
    hospId;
    appId;
    currentUser = JSON.parse(this.crypt.get('currentUser'));

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.hospId = params['hospId'];
      this.appId = params['AppointmentId'];
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

  accept(){
    console.log("AppointmentId=="+this.appId);
    console.log("DoctorId=="+this.posts.DoctorId);
    console.log("patientId=="+this.currentUser.unique_id);
    var acceptStatus = {
      "AppointmentId": this.appId,
	    "patientId": this.currentUser.unique_id,
	    "doctorId": this.posts.DoctorId,
	    "isconfirmed": 'confirm'
    }
    console.log("acceptStatus=="+acceptStatus);
    this._DataService.updateResceduleStatus(acceptStatus).subscribe((resp) => {
    if (resp.message=='fail')
  {
    alert("Error");
    console.log("error :",resp.message);
   
  }
  else{
    
  alert("Accepted");
      this.router.navigate(['e-hospital/appointments/'+this.hospId+'/list']);
  }

  })
  }

  reject(){
    console.log("AppointmentId=="+this.appId);
    console.log("DoctorId=="+this.posts.DoctorId);
    console.log("patientId=="+this.currentUser.unique_id);
    var acceptStatus = {
      "AppointmentId": this.appId,
	    "patientId": this.currentUser.unique_id,
	    "doctorId": this.posts.DoctorId,
	    "isconfirmed": 'cancel'
    }
    console.log("acceptStatus=="+acceptStatus);
    this._DataService.updateResceduleStatus(acceptStatus).subscribe((resp) => {
    if (resp.message=='fail')
  {
    alert("Error");
    console.log("error :",resp.message);
   
  }
  else{
    
  alert("Cancelled");
      this.router.navigate(['e-hospital/appointments/'+this.hospId+'/list']);
  }

  })
  }

  formatTime(time){
    return moment(time).format('LL');
  }


}
