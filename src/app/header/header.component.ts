import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service';
import { ApigatewayService } from '../apigateway.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CryptService, ApigatewayService]
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router, private _DataService: ApigatewayService, private crypt:CryptService) { }
  counter = 1; 
  currentUser;
  profile;

  ngOnInit() {
    this.currentUser= JSON.parse(this.crypt.get("currentUser"));
    console.log('current user == ',this.currentUser);
    this._DataService.getUserProfile(this.currentUser.unique_id).subscribe(res => {
      this.profile = res.data[0];
      // console.log('User profile: ',this.profile);
    });
  }
  
  logout(){
    this.router.navigate(['login'])
    sessionStorage.clear();
  }

  onClick() {
    this.counter++
  }

  retClass() {
    if(this.counter%2 == 0){
      return "show";
    } else {
      return "";
    };
  }

}
