import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-doctor-appointments-orders-details',
  templateUrl: './doctor-appointments-orders-details.component.html',
  styleUrls: ['./doctor-appointments-orders-details.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class DoctorAppointmentsOrdersDetailsComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) { }

  posts;
  appId;
  appDetails;

  ngOnInit() {

    this.activeRoute.params.subscribe(params=>{
      this.appId = params['appId'];
      
    })
    this._DataService.getAllDocAppointmentList(JSON.parse(this.crypt.get('currentUser')).unique_id,0).subscribe((res)=>{
      // console.log('Result: ', res);
      this.posts = res.data;
     console.log('post data == ',this.posts);
      for(let i=0; i<this.posts.length; i++){
        if(this.posts[i].id==this.appId){
          this.appDetails=this.posts[i];
        }
      }
     // this.rzpOptions.order_id = 1;
      console.log('app data == ',this.appDetails);
    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }
}
