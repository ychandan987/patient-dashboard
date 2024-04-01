import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pharmacy-details',
  templateUrl: './pharmacy-details.component.html',
  styleUrls: ['./pharmacy-details.component.css'],
  providers: [ApigatewayService]
})
export class PharmacyDetailsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.pharmacyId = params['uId'];
    });
    this._DataService.getPharmacy(this.pharmacyId).subscribe( res => {
      this.pharmacyDetails = res.data[0];
    });
   }
   pharmacyId;
   pharmacyDetails;

  ngOnInit() {
  }

}
