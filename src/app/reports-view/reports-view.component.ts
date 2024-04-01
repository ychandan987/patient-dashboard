import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ReportsViewComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }

    posts;
    reportId;
    reportDetails;

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.reportId = params['id']
    });
    this._DataService.getLabReports(JSON.parse(this.crypt.get('currentUser')).unique_id)
    .subscribe((res)=> {
      console.log('Result1: ', res);
      this.posts = res.data;
      for(let i=0; i<this.posts.length; i++){
        if(this.posts[i].id==this.reportId){
          this.reportDetails=this.posts[i];
        }
      }
      console.log('Report Details: ',this.reportDetails);
    });
  }

  formatTime(time) {
    return moment(time).format('LLL');
  }
}
