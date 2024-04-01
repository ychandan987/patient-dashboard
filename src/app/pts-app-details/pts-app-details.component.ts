import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { post } from 'selenium-webdriver/http';

declare var Razorpay: any; 

@Component({
  selector: 'app-pts-app-details',
  templateUrl: './pts-app-details.component.html',
  styleUrls: ['./pts-app-details.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PtsAppDetailsComponent implements OnInit {
  // parentMessage = "message from parent"
  message = 'Hola Mundo!';
  
  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
  
    
  posts;
  commonData;
  commonData1;
  doctorId;
  ptsId;
  transId;
  chId;
  serviceType;
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
        "color": "#rgba(0, 118, 168)"
    }
  };


  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.ptsId = params['ptsId'];
      this.transId = params['transId'];
      this.chId = params['id'];
      console.log('ptsId',this.ptsId);
      console.log('transId',this.transId);
      console.log('chId',this.chId);
    });
    this._DataService.getPTSAppointments({"ptsId" : this.ptsId, "transactionId" : this.transId}).subscribe((res)=>{
      console.log("res: ",res);
      this.commonData = res.data[0];
      this.commonData1 = res.data[0].patient_status;
      this.serviceType = res.data[0].pts_doctorconsult_type;
      console.log("patient_status: ",this.commonData1);
      console.log("serviceType: ",this.serviceType);
      for (let i = 0; i < res.griddata.length; i++) {
        if(res.griddata[i].pts_doctorconsult_ch_id == this.chId){
          this.posts = res.griddata[i];
          this.doctorId = res.griddata[i].doctorId;
          console.log("Posts: ",this.posts);
          console.log("doctorId: ",this.doctorId);
        };
        
      }
    });
  }

  accept_appointment(){
    var updateStatus = {
      "AppointmentPatientStatus":"Rejected",
      "PtsId":this.ptsId
    }
    
this._DataService.updateStatus(updateStatus).subscribe((resp) => {
  if (resp.message=='fail')
  {
    console.log("error :",resp.message);
   
  }
  else{
    
    this.router.navigate([`e-hospital`]);
    alert("Rejected");
  }
})
    // console.log("UserId",this.posts.doctorId);
    // console.log("currentUser",this.currentUser);
    // console.log("patientName",this.currentUser.username);
    // console.log("AppointmentDate",this.posts.pts_doctorconsult_ch_date);
    // console.log("AppointmentTime",this.posts.pts_doctorconsult_ch_timeSlots);
    // console.log("Description",this.posts.pts_doctorconsult_ch_details);
    

    // var uploadData = {
    //   "DoctorId":this.posts.doctorId,
    //   "patientId":this.currentUser.unique_id,
    //   "patientName":this.currentUser.first_name,
    //   "AppointmentDate":this.posts.pts_doctorconsult_ch_date,
    //   "AppointmentTime":this.posts.pts_doctorconsult_ch_timeSlots,
    //   "AppointmentIdType" : this.posts.pts_doctorconsult_ch_consultMode,
    //   "mobileNumber" : this.currentUser.mobile_no,
    //   "emailId" : this.currentUser.email,
    //   "Description":this.posts.pts_doctorconsult_ch_details    
    // }


    // console.log("Uploaded Data: ", uploadData);


    // this._DataService.bookEhospitalAppointment(uploadData).subscribe((res) => {
  
    //   if (res.message=='fail')
    // {
    //   console.log("error :",res.message);
     
    // }
    // else{
    //   alert("Accepted");
      
    //   // this.router.navigate(['pts/payment-mode/'+this.chId+'']);
    //   this.router.navigate([`e-hospital`]);
    // }
    // })
  }


  pay(){
    this.rzpOptions.amount = (Math.round(parseFloat(this.posts.pts_doctorconsult_ch_FinalPrice) * 100)).toString();
    this.rzpOptions.prefill.name = this.posts.PatientName;
    this.initPay();
  }

  accept(){
    console.log("chiddddd",this.chId);
  console.log("doc_consult_id",this.posts.pts_doctorconsult_id);
  console.log("final_Price",this.posts.pts_doctorconsult_ch_FinalPrice);
  var updateStatus = {
    "AppointmentPatientStatus":"Accepted",
    "PtsId":this.ptsId
  }
  var uploadData = {
    "DoctorId":this.posts.doctorId,
    "patientId":this.currentUser.unique_id,
    "patientName":this.commonData.pts_doctorconsult_patientName,
    "AppointmentDate":this.posts.pts_doctorconsult_ch_date,
    "AppointmentTime":this.posts.pts_doctorconsult_ch_timeSlots,
    "AppointmentIdType" : this.posts.pts_doctorconsult_ch_consultMode,
    "mobileNumber" : this.commonData.pts_doctorconsult_mobile,
    "emailId" : this.commonData.pts_doctorconsult_email,
    "Description":this.posts.pts_doctorconsult_ch_details, 
    "BookingType" : 'FOLLOWUP',
    "BookingRef":this.transId,
    "AppointmentAmount":this.posts.pts_doctorconsult_ch_FinalPrice 
  }

  this._DataService.updateStatus(updateStatus).subscribe((resp) => {
    if (resp.message=='fail')
  {
    console.log("error :",resp.message);
   
  }
  else{
    this._DataService.bookEhospitalAppointment(uploadData).subscribe((res) => {
  
      if (res.message=='fail')
    {
      console.log("error :",res.message);
     
    }
    else{
      alert("Accepted");
      
      // this.router.navigate(['pts/payment-mode/'+this.chId+'']);
      this.router.navigate(['pts/payment-mode/'+this.chId+'']);
    }
    })

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
