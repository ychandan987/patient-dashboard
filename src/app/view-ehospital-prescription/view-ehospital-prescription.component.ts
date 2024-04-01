import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import * as moment from 'moment';

@Component({
  selector: 'app-view-ehospital-prescription',
  templateUrl: './view-ehospital-prescription.component.html',
  styleUrls: ['./view-ehospital-prescription.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ViewEhospitalPrescriptionComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private crypt: CryptService,private router: Router, private activeRoute:ActivatedRoute) { 

    this.patientId = JSON.parse(this.crypt.get("currentUser")).unique_id;
  }
  hospId;
  pres;
  patientId;
  presc_path_flag = 0;
  presc_path = " " ;
  prescription_path_array = [];
  ngOnInit() {
    this.prescription_path_array.splice(0,this.prescription_path_array.length);
   // this.prescription_path_array.length = 0;
    this.activeRoute.params.subscribe(params=>{
      this.hospId = params['hospId'];
      console.log('pat id === ',this.patientId);
    })
    this._DataService.getEhospitalPrescription({"patientId":this.patientId,"hospitalId":this.hospId}).subscribe(res => {
      this.pres = res.data;
      console.log('presciption == ',this.pres);

    });
  }
  formatTime(time){
    return moment(time).format('LL');
  }

}
