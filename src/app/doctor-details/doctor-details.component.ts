import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css'],
  providers: [ApigatewayService]
})
export class DoctorDetailsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.docId = params['id'];
    });
    this._DataService.getSpecificDoctor(this.docId).subscribe( res => {
      this.docDetails = res.data[0];
      console.log("docDetails",this.docDetails);
    });
  }
  docId;
  docDetails;

  ngOnInit() {
  }

}
