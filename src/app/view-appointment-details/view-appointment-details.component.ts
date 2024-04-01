import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-appointment-details',
  templateUrl: './view-appointment-details.component.html',
  styleUrls: ['./view-appointment-details.component.css'],
  providers: [ApigatewayService,CryptService]
})
export class ViewAppointmentDetailsComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) { }
  posts;
  appId;
  appDetails;

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.appId = params['id']
    })
    this._DataService.getAllLabAppointmentList(JSON.parse(this.crypt.get('currentUser')).unique_id,0).subscribe((res)=>{
      console.log('Result: ', res);
      this.posts = res.data;
      for(let i=0; i<this.posts.length; i++){
        if(this.posts[i].id==this.appId){
          this.appDetails=this.posts[i];
        }
      }
      console.log('Appointent Details: ',this.appDetails);
    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }

  changeStatus(id,statusId,uId){
    
    let labID = uId;
    let STATUSID = statusId;
    console.log("labID=="+labID+",STATUSID=="+STATUSID);
    let statusObj={
      "id":id,
      "statusId":statusId,
    };
    console.log(statusObj);
    this._DataService.changeLabAppointmentStatus(statusObj,this.posts.lab_uid).subscribe((res)=>{
      if(res.success==true){
        alert("Appointment Cancelled Successfully.");
        this.router.navigate(['/lab-appointments']) 
      } else {
        alert("Update failed");
      } 
    });
  }
}
