import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-ehospital-patient-prescriptions',
  templateUrl: './view-ehospital-patient-prescriptions.component.html',
  styleUrls: ['./view-ehospital-patient-prescriptions.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ViewEhospitalPatientPrescriptionsComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService,private router: Router, private activeRoute:ActivatedRoute) { }
  
  pres;
  patientId;
  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.patientId = params['patientId'];
      console.log('pat id === ',this.patientId);
    })
    this._DataService.getEhospitalPrescription({"patientId":this.patientId}).subscribe(res => {
      this.pres = res.data;
      console.log('presc == ',this.pres);
    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }

}
