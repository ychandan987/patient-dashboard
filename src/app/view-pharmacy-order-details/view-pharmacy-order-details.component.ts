import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-pharmacy-order-details',
  templateUrl: './view-pharmacy-order-details.component.html',
  styleUrls: ['./view-pharmacy-order-details.component.css'],
  providers: [ApigatewayService,CryptService]
})
export class ViewPharmacyOrderDetailsComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) { }
  posts;
  appId;
  appDetails;

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.appId = params['id']
    })
    this._DataService.getAllPharmacyOrders(JSON.parse(this.crypt.get('currentUser')).unique_id).subscribe((res)=>{
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

}
