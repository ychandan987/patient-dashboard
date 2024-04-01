import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ProfileComponent implements OnInit {
  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  user;
  profile;
  age_date;
  dob;
  currentUser = JSON.parse(this.crypt.get('currentUser'));
 
  ngOnInit() {
    this._DataService.getUser(this.currentUser.username).subscribe(res => {
      this.user = res.data[0];
    });
    this._DataService.getUserProfile(this.currentUser.unique_id).subscribe(res => {
      this.profile = res.data[0];
      this.age_date = res.data[0].dob;
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     this.dob = formatDate(this.age_date);
    console.log('agedate===', this.dob);
      console.log('currentuser = ',this.currentUser.unique_id);
      console.log('currentuser = ',this.currentUser.username);
       console.log('User profile: ',this.profile);
    });
  }
}
