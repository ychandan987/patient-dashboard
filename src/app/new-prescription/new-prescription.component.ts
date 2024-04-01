import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-new-prescription',
  templateUrl: './new-prescription.component.html',
  styleUrls: ['./new-prescription.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class NewPrescriptionComponent implements OnInit {

  constructor(private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) { }
    posts;
    commonData;
    ptsId;
    transId;
    PatientId;
    hospId;
    Doctorname;
    appId;
    PCCUID;
    currentUser = JSON.parse(this.crypt.get('currentUser'));
  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.PatientId = params['PatientId'];
      this.hospId = params['hospId'];
      this.appId = params['appId'];
    });

    this._DataService.PrescriptionByDoctorByAppointmentID({"patientId" : this.PatientId, "hospitalId" : this.hospId,"AppointmentId" : this.appId}).subscribe((res)=>{
      console.log("res: ",res);
      this.commonData = res.data;
      this.PCCUID = res.data[0].PCCUID;
      // this.Doctorname = res.data.Doctorname;
      // this.posts = res.griddata;
      console.log("currentUser :",this.currentUser);
      console.log("commonData :",this.commonData);
      console.log("PCCUID :",this.PCCUID);
      // this.total_with_quant = ( res.griddata[0].pts_medicine_ch_price *  res.griddata[0].pts_medicine_ch_dosage);
      // console.log("total_with_quant :",this.total_with_quant);
    });

    this._DataService.PrescriptionMedicines({"patientId" : this.PatientId, "hospitalId" : this.hospId,"AppointmentId" : this.appId}).subscribe((res1)=>{
      console.log("res1: ",res1);
      this.posts = res1.data;
      // this.posts = res.griddata;
      console.log("medicine_detail :",this.posts);
    });
  }

  formatTime(time){
    return moment(time).format('LLL');
  }
  

}
