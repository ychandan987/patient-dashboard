import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-submit-otp-forgotpasswor',
  templateUrl: './submit-otp-forgotpasswor.component.html',
  styleUrls: ['./submit-otp-forgotpasswor.component.css'],
  providers: [ApigatewayService]
})
export class SubmitOtpForgotpassworComponent implements OnInit {

  public submitOtpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private _DataService: ApigatewayService,
     private router: Router, private activeRoute: ActivatedRoute) {
    this.submitOtpForm = this.formBuilder.group({
      mobile: [''],
      otp: ['', [Validators.required, Validators.minLength(4)]],
      type : 'browser',
      username: ['']
    });
  }

  ngOnInit() {

  }
  errorMsg:string = '';
  successMsg:string ='';
  submitOtp() {
    this.activeRoute.params.subscribe(params=> {
      this.submitOtpForm.value.mobile = params['mobile_no'];
      this.submitOtpForm.value.username = params['username'];
    });
    console.log("otp: ",  this.submitOtpForm.value);
    this._DataService.otpforgotpasswordWithUsername( this.submitOtpForm.value).subscribe(res => {
       console.log("Response:", res);
      if(res.success==true) {
        alert('Please Check Your Email.Reset Password link will send on your Email Id !');
        this.successMsg = 'Please Check Your Email.Reset Password link will send on your Email Id !';
        this.router.navigate(['login'])
      } else {
        this.errorMsg = 'Invalid OTP! Please enter valid OTP';
      }
    });
  }
 
}
