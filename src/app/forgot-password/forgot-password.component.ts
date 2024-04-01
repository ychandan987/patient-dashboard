import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ApigatewayService]
})

export class ForgotPasswordComponent implements OnInit {
  public ForgotPasswordForm: FormGroup

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router) {
 
    this.ForgotPasswordForm = this.formBuilder.group({     
      //email: ['', [Validators.required]], 
      // mobile_no: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[6-9]\\d{9}')]],
      username: ['', Validators.required],
    
    });

  }
  
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      alert('Please Enter only digits');
      event.preventDefault();
    }
    
  }

  mobile;
  mobile_no;
  username;
    ngOnInit() {
    }

    forgotPass()
    {
      console.log('reached in forgot pass..');
     // this._DataService.forgotpass(this.ForgotPasswordForm.value).subscribe(res=>{
        // console.log("Response:", res.success);
     // });
      this.username = this.ForgotPasswordForm.value.username;
      //alert(this.username);
      this._DataService.getUserMob(this.username).subscribe(res=>{
        console.log(res);
        this.mobile_no = res.data[0].mobile_no;

        var value = this.mobile_no;

        var mobile = value.substring(3, value.length);
        console.log("mobile=="+mobile);
        console.log("mobile_no==",+this.mobile_no);
          if(res.success==true){

             this._DataService.forgotpassword({'mobile_no': mobile}).subscribe(resp=>{
             console.log("Response:--", resp.success);
             if(resp.success == true){
              alert("OTP Send to "+mobile);
              this.router.navigate(['submit-otp-forgotpasswor/'+mobile+'/'+this.username])
             }
             else {
              console.log('Error', resp.error);
            }

            });
           
          }

          else {
            console.log('Error', res.error);
          }
        }); 
    


    }


}
