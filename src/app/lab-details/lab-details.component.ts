import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.css'],
  providers: [ApigatewayService]
})
export class LabDetailsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.labId = params['id'];
    });
    this._DataService.getLab(this.labId).subscribe( res => {
      this.labDetails = res.data[0];
    });
  }
  labId;
  labDetails;

  ngOnInit() {
  }

}
