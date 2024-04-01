import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-other-report-share',
  templateUrl: './other-report-share.component.html',
  styleUrls: ['./other-report-share.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class OtherReportShareComponent implements OnInit {
  public reportsForm: FormGroup;
  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute, private storage: AngularFireStorage) { 
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
    });
    this.reportsForm = this.formBuilder.group({
      id:0,
      appointment_id:this.appId,
      report_id:['', Validators.required],
      report_path:['', Validators.required],
    });
  }
  appId;
  currentUser=JSON.parse(this.crypt.get("currentUser"));
  upload_prev_hist;
  selectedReports;
  reports;

  reportUpload = {
   "id": 0,
   "appointment_id":"",
   "report_id":0,
   "report_path":""
 }
 ngOnInit() {
  this._DataService.getLabReports(this.currentUser.unique_id).subscribe(res => {
    this.reports = res.data;
    console.log("Reports:", this.reports);
  });
}

getReports(){
  console.log("Selected:",this.reportsForm.value.report_id);
  for(var i=0; i<this.reports.length; i++){
    if (this.reportsForm.value.report_id==this.reports[i].id) {
      this.selectedReports = this.reports[i];
      console.log("True");
    }
  }
  console.log("selected Reports: ", this.selectedReports);
}

submit(){
  console.log("selected Lab Reports: ", this.selectedReports);
  
    this.reportUpload = this.reportsForm.value;
    this.reportUpload.report_id = this.selectedReports.id;
    this.reportUpload.report_path = this.selectedReports.report_path;
    console.log("Uploaded Data: ", this.reportUpload);
  this._DataService.shareReports(this.reportUpload).subscribe(res => {
    console.log("Response:",res);
    if (res.success){
      alert("Lab Report Shared successfully to Doctor");
      this.router.navigate(['reports/share/'+this.appId]);
    } else {
      alert("Cannot share reports at this time!");
    }
  });

}

}
