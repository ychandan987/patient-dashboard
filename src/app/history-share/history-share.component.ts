import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-history-share',
  templateUrl: './history-share.component.html',
  styleUrls: ['./history-share.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class HistoryShareComponent implements OnInit {
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
   selectedReports1;

   reportUpload = {
    "id": 0,
    "appointment_id":"",
    "report_id":0,
    "report_path":""
  }

  ngOnInit() {
    this._DataService.getPatientPreviousHistory(this.currentUser.unique_id).subscribe(res => {
      this.upload_prev_hist = res.data;
      console.log('upload prev hist path==',this.upload_prev_hist);

    });
  }

  getReports1(){
    console.log("Selected:",this.reportsForm.value.report_id);
    for(var i=0; i<this.upload_prev_hist.length; i++){
      if (this.reportsForm.value.report_id==this.upload_prev_hist[i].id) {
        this.selectedReports1 = this.upload_prev_hist[i];
        console.log("True");
      }
    }
    console.log("selected Reports1: ", this.selectedReports1);
  }

  submit(){
    console.log("selected Reports1: ", this.selectedReports1);
    alert("Previous History Shared successfully to Doctor");
      this.reportUpload = this.reportsForm.value;
      this.reportUpload.report_id = this.selectedReports1.id;
      this.reportUpload.report_path = this.selectedReports1.doc_path;
      console.log("Uploaded Data: ", this.reportUpload);
    this._DataService.shareReports(this.reportUpload).subscribe(res => {
      console.log("Response:",res);
      if (res.success){
        this.router.navigate(['reports/share/'+this.appId]);
      } else {
        alert("Cannot share reports at this time!");
      }
    });

  }

}
