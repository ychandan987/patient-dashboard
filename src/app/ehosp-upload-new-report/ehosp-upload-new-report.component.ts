import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-ehosp-upload-new-report',
  templateUrl: './ehosp-upload-new-report.component.html',
  styleUrls: ['./ehosp-upload-new-report.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EhospUploadNewReportComponent implements OnInit {
  public reportsForm: FormGroup;

  // Main Task
  task: AngularFireUploadTask;

  // Progress Monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadUrl: Observable<String>;

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute, private storage: AngularFireStorage) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      this.doctorId = params['docId'];
      console.log("doctorID :"+this.doctorId);
    });
    this.reportsForm = this.formBuilder.group({
      MPatient_Id:this.currentUser.unique_id,
      MDoctor_Id:this.doctorId,
      MDoc_Type:['NewDoc', Validators.required],
      MDoc_Id:['0', Validators.required],
      MDoc_Path:['', Validators.required],
      Mpts_ID:['0', Validators.required],
      MTransaction_Id:this.appId,
      MAppointment_Id:this.appId,
      MStatus:['1', Validators.required],
      MCreated_On:['1', Validators.required]
    });
   }
   upload_prev_hist;
   appId;
   doctorId;
   currentUser=JSON.parse(this.crypt.get("currentUser"));
   reports;
   selectedReports;
   selectedReports1;
   file;
   doc;
   reports_lab;
   GetEhospitalReports;
   reportUpload = {
     "MPatient_Id": this.currentUser.unique_id,
     "MDoctor_Id":this.doctorId,
     "MDoc_Type" : "NewDoc",
     "MDoc_Id" : 0,
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

    this._DataService.getPatientPreviousHistory(this.currentUser.unique_id).subscribe(res => {
      this.upload_prev_hist = res.data;
      console.log('upload prev hist path==',this.upload_prev_hist);

    });

    this._DataService.listing_patient_shared_docs({"AppointmentId" : this.appId}).subscribe((res)=>{
      console.log('GetEhospitalReports: ', res);
      this.GetEhospitalReports = res.data;
      // console.log('Reports_NEW: ', this.reports);
   });
  }

  getFile(event: FileList){
    // File object
    this.file = event.item(0);
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
    this.startUpload(this.file).then((res)=>{
      this.doc = res;
      this.reportUpload = this.reportsForm.value;
      this.reportUpload.MDoc_Path = res;
      console.log("Uploaded Data: ", this.reportUpload);
    this._DataService.shareLabReport(this.reportUpload).subscribe(res => {
      console.log("Response:",res);
      if (res.message=='success'){
        
        var uploadData = {
          "ID":0,
          "Uid":this.currentUser.unique_id,
          "docPath":this.reportUpload.MDoc_Path       
        }
         this._DataService.uploadPatientPreviousHistory(uploadData).subscribe(resHis => {
          console.log('uploadPatientPreviousHistory: ', resHis);

          if (resHis.success==true){
            alert("Uploaded & Share report successfully to Doctor");
            this.router.navigate(['e-hospital/appointments/list']);
          }
          else{
            console.log("Error")
          }
        });
       
      } else {
        alert("Cannot share reports at this time!");
      }
    });
  });
  }

  async startUpload(file){

    if (file!=undefined){
      // Storage Path
      const path = `share_reports/${new Date().getTime()}_${file.name}`;

      // Main Task
      this.task = this.storage.upload(path, file);

      const ref = this.storage.ref(path);

      // Progress Monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      let downURL;
      let promise = new Promise((resolve,reject) => {
        // File's Download Url
        this.task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadUrl = ref.getDownloadURL();
            this.downloadUrl.subscribe( (url) => {
              // this.doc = url;
              //  console.log("DownloadURL: "+this.doc);
              resolve(url);
            })
        })).subscribe();
      });

      downURL = await promise;
      return downURL;
    } else {
      return undefined;
      // if (file==undefined){
      //   alert("Please select a report to upload!");
      // } else {
      //   alert("Please specify test name of the report!");
      // }
    }
  }

}
