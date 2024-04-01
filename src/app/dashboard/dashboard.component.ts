import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApigatewayService, CryptService]
})

export class DashboardComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService) { }
 
  currentUser = JSON.parse(this.crypt.get('currentUser')); 
  orders_length; 
  appointments_length;
  apps_length;

  ngOnInit() {
   
    this._DataService.getAllPharmacyOrders(this.currentUser.unique_id).subscribe(res => {
      this.orders_length = res.data.length;
      console.log("orders length == ",res.data.length);
    });

    this._DataService.getAllLabAppointmentList(this.currentUser.unique_id, 0).subscribe(res => {
      this.appointments_length = res.data.length;
      console.log('app length == ',this.appointments_length);
    });

    this._DataService.getAllAppointments(this.currentUser.unique_id).subscribe(res => {
      this.apps_length = res.data.length;
      console.log('apps length ==',this.apps_length);
    });

  }


}
