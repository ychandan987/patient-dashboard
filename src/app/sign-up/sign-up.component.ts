import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [ApigatewayService]
})

export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup
  

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required]],
      mobile_no: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[6-9]\\d{9}')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword: ['', [Validators.required]]
    });
   }

   passMatch=false;
   errMsg:string ='';
   alldata;
   appId;
   appDetails;

   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      alert('Please Enter only digits');
      event.preventDefault();
    }    
  }

  ngOnInit() {
   
    
    
  }

  signUp() {
   // console.log('pass match == ',this.passMatch);
    // console.log("Sign Up form: ", this.signUpForm.value);
    // this.signUpForm.removeControl('confirmpassword')
    this._DataService.getUserEmailMobile().subscribe(res=>{
      this.alldata = res.data;
      console.log("alldata",this.alldata);
      for(let i=0; i<this.alldata.length; i++){
        if(this.alldata[i].mobile_no){
          this.appDetails=this.alldata[i];
          
        }
      }
      console.log("appDetails",this.appDetails);
      console.log("appDetails1",this.alldata.mobile_no);
      
      if(this.signUpForm.value.mobile_no!= this.alldata[0].mobile_no){
        if(this.passMatch == true)
      {
      this._DataService.register(this.signUpForm.value).subscribe(res=>{
        // console.log("Response:", res.success);
        if(res.success==true){
          this.router.navigate(['submit-otp/'+this.signUpForm.value.mobile_no]) 
        } else {
          console.log('Error', res.error)
          if(res.error.detail.includes('username')){
            this.errMsg = 'Username already exist'; 
          } else if(res.error.detail.includes('mobile_no')) {
            this.errMsg = 'Mobile number already exist'; 
          } else if(res.error.detail.includes('email')){
            this.errMsg = 'Email Id already exist'; 
          }
          console.log('Error msg:'+this.errMsg)       
        }
      });
    }
    else
    {
      alert('Entered Password is not matching!! Try Again');
    }
      }
      else{
        // this._DataService.register1(this.signUpForm.value).subscribe((res)=>{
        // });
        alert('Your mobile No. is already registered');
  
      }

    });
     
    
   
    
  }


  matchPassword(){
    
    if(this.signUpForm.value.password==this.signUpForm.value.confirmpassword){
      console.log("true");
    } else console.log("false");
    return (this.signUpForm.value.password==this.signUpForm.value.confirmpassword)? true : false;
  }
  passCheck(){
    if(this.signUpForm.value.password != this.signUpForm.value.confirmpassword && (this.signUpForm.controls.confirmpassword.dirty || this.signUpForm.controls.confirmpassword.touched)){
      this.passMatch  = false;
      return "is-invalid";
    } else if(this.signUpForm.value.password == this.signUpForm.value.confirmpassword && (this.signUpForm.controls.confirmpassword.dirty || this.signUpForm.controls.confirmpassword.touched)) {
      this.passMatch  = true;
      return "is-valid";
    } else "";
  };

}
