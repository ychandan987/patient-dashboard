import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import * as moment from 'moment';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PrescriptionComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
  currentUser = JSON.parse(this.crypt.get('currentUser'));
  pres;

  ngOnInit() {
    this._DataService.getAllPrescriptions(this.currentUser.unique_id).subscribe(res => {
      this.pres = res.data;
    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }
}
