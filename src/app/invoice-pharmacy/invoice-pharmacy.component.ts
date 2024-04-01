import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-invoice-pharmacy',
  templateUrl: './invoice-pharmacy.component.html',
  styleUrls: ['./invoice-pharmacy.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class InvoicePharmacyComponent implements OnInit {

  constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      this.pharmacyUid = params['uId'];
     console.log('app id == ',this.appId);
    });
   
    router.events.subscribe((event) => {
      this.getData();
    });
   }

   posts = [];
   UserId;
   appId;
   pharmacyUid;

  ngOnInit() {
  }

  getData() {
    this._DataService.getpharmacyInvoice(this.pharmacyUid,this.appId).subscribe((res) => {
      this.posts = res.data[0];
      console.log('transactions_invoice :',this.posts);
    });
  }
  formatTime(time) {
    return moment(time).format('LLL');
  }

}
