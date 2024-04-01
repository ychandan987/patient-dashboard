import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-otp',
  templateUrl: './submit-otp.component.html',
  styleUrls: ['./submit-otp.component.css'],
  providers: [ApigatewayService]
})
export class SubmitOtpComponent implements OnInit {
  public submitOtpForm: FormGroup

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute) { 
    this.submitOtpForm = this.formBuilder.group({
      mobile: [''],
      otp: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

  }
  
  errorMsg:string ='';

  submitOtp() {
    this.activeRoute.params.subscribe(params=>{
      this.submitOtpForm.value.mobile = params['mob'];
    });
    console.log("otp: ",  this.submitOtpForm.value)
    this._DataService.otp( this.submitOtpForm.value).subscribe(res=>{
      // console.log("Response:", res.success);
      if(res.success==true){
        this.router.navigate(['login'])
      } else {
        this.errorMsg = 'Invalid OTP! Please enter valid OTP'; 
      }
    });
  }

}
