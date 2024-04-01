import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loginFailed = false;
  msg;

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.minLength(4), Validators.required]]
    });
  }

  public loading:boolean = false;
  
  ngOnInit() {
  }

  login() {
    this.loading = true;
    this._DataService.authenticate(this.loginForm.value).subscribe(res=>{
      // console.log("Response:", res.success);
      if(res.success==true){

        this._DataService.getUser(this.loginForm.value.username).subscribe(res=>{
          this.crypt.store('currentUser', JSON.stringify(res.data[0]));
        });
        setTimeout(()=>{
          this.router.navigate(['dashboard']);
          this.loading = false;
        }, 2000)
      } else {
        this.loginFailed=true;
        this.msg = res.message;
        this.loading = false;
      }
    });
  }

}
