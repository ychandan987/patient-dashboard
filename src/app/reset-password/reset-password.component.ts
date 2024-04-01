import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ApigatewayService]
})
export class ResetPasswordComponent implements OnInit {
  public ResetPasswordForm: FormGroup
  mobile;
  email;
  token;
  username;
  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router,private activeRoute: ActivatedRoute) {
    
    this.activeRoute.params.subscribe(params => {
      this.mobile = params['mobile'];
      this.email = params['email'];
      this.token = params['token'];
      this.username = params['username'];
    });
    this.ResetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required]],
      mobile : this.mobile,
      email:this.email,
      token:this.token,
      username:this.username
    });
   }
   passMatch=false;
   errMsg:string ='';

  ngOnInit() {
  }

  resetPass()
  {
    console.log('reached in reset password..',this.ResetPasswordForm.value);
    if(this.ResetPasswordForm.value.password==this.ResetPasswordForm.value.confirmpassword){
     
    this._DataService.resetpassword(this.ResetPasswordForm.value).subscribe(res=>{
      if(res.success==true){
        this.router.navigate(['/login']) 
      } else {
        console.log('Error', res.error)
      }
    });
  }
  else{
    this.passMatch  = false;
      return "is-invalid";
  }

  }

  matchPassword(){
    
    if(this.ResetPasswordForm.value.password==this.ResetPasswordForm.value.confirmpassword){
      console.log("true");
    } else console.log("false");
    return (this.ResetPasswordForm.value.password==this.ResetPasswordForm.value.confirmpassword)? true : false;
  }
  passCheck(){
    if(this.ResetPasswordForm.value.password != this.ResetPasswordForm.value.confirmpassword && (this.ResetPasswordForm.controls.confirmpassword.dirty || this.ResetPasswordForm.controls.confirmpassword.touched)){
      this.passMatch  = false;
      return "is-invalid";
    } else if(this.ResetPasswordForm.value.password == this.ResetPasswordForm.value.confirmpassword && (this.ResetPasswordForm.controls.confirmpassword.dirty || this.ResetPasswordForm.controls.confirmpassword.touched)) {
      this.passMatch  = true;
      return "is-valid";
    } else "";
  };

}
