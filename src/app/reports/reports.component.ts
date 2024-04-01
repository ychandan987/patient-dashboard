import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import * as moment from 'moment';
import { CryptService } from '../crypt.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ReportsComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private crypt:CryptService) { }
  reports = [];

  ngOnInit() {
    this._DataService.getLabReports(JSON.parse(this.crypt.get('currentUser')).unique_id).subscribe((res)=>{
      console.log('Result: ', res);
      this.reports = res.data;

    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }
}
