import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ehosp-lab-report-share',
  templateUrl: './ehosp-lab-report-share.component.html',
  styleUrls: ['./ehosp-lab-report-share.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospLabReportShareComponent implements OnInit {
  public reportsForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute, private storage: AngularFireStorage) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      this.doctorId = params['docId'];
    });
    this.reportsForm = this.formBuilder.group({
      MPatient_Id:this.currentUser.unique_id,
      MDoctor_Id:this.doctorId,
      MDoc_Type:['LabReport', Validators.required],
      MDoc_Id:['0', Validators.required],
      MDoc_Path:['', Validators.required],
      Mpts_ID:['0', Validators.required],
      MTransaction_Id:this.appId,
      MAppointment_Id:this.appId,
      MStatus:['1', Validators.required],
      MCreated_On:['1', Validators.required]
    });
   }

   appId;
   currentUser=JSON.parse(this.crypt.get("currentUser"));
   upload_prev_hist;
   selectedReports;
   doctorId;
   reports;

   reportUpload = {
    "MPatient_Id": this.currentUser.unique_id,
    "MDoctor_Id":this.doctorId,
    "MDoc_Type" : "NewDoc",
    "MDoc_Id" :0,
    "MDoc_Path":"",
    "Mpts_ID":0,
    "MTransaction_Id":this.appId,
    "MAppointment_Id":this.appId,
    "MStatus":1,
    "MCreated_On":1
  }

  ngOnInit() {
    this._DataService.getLabReports(this.currentUser.unique_id).subscribe(res => {
      this.reports = res.data;
      console.log("Reports:", this.reports);
    });
  }

  getReports(){
    console.log("Selected:",this.reportsForm.value.MDoc_Id);
    for(var i=0; i<this.reports.length; i++){
      if (this.reportsForm.value.MDoc_Id==this.reports[i].id) {
        this.selectedReports = this.reports[i];
        console.log("True");
      }
    }
    console.log("selected Reports1: ", this.selectedReports);
  }

  submit(){
    console.log("selected Reports: ", this.selectedReports);
      this.reportUpload = this.reportsForm.value;
      this.reportUpload.MDoc_Id = this.selectedReports.id;
      this.reportUpload.MDoc_Path = this.selectedReports.report_path;
      console.log("Uploaded Data: ", this.reportUpload);
    this._DataService.shareLabReport(this.reportUpload).subscribe(res => {
      console.log("Response:",res);
      if (res.message=="success"){
        alert("Lab Report Shared successfully to Doctor");
        this.router.navigate(['ehosp/report/share/'+this.appId+'/'+this.doctorId]);
      } else {
        alert("Cannot share reports at this time!");
      }
    });

  }

}
