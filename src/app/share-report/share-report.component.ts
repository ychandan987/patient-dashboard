import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-share-report',
  templateUrl: './share-report.component.html',
  styleUrls: ['./share-report.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class ShareReportComponent implements OnInit {
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
    });
    this.reportsForm = this.formBuilder.group({
      id:0,
      appointment_id:this.appId,
      report_id:['0', Validators.required],
      report_path:['', Validators.required],
    });
  }
  dropdownSettings = {};
  selectedItems = [];
  testArr=[];
  tests=[];
  upload_prev_hist;
  appId;
  currentUser=JSON.parse(this.crypt.get("currentUser"));
  reports;
  selectedReports;
  selectedReports1;
  file;
  doc;
  reports_lab;
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

    this._DataService.getPatientPreviousHistory(this.currentUser.unique_id).subscribe(res => {
      this.upload_prev_hist = res.data;
      console.log('upload prev hist path==',this.upload_prev_hist);

    });

    this._DataService.getReports(this.appId).subscribe((res)=>{
      console.log('GetReports: ', res);
      this.reports_lab = res.data;
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
      this.reportUpload.report_path = res;
      console.log("Uploaded Data: ", this.reportUpload);
    this._DataService.shareReports(this.reportUpload).subscribe(res => {
      console.log("Response:",res);
      if (res.success){
        var uploadData = {
          "ID":0,
          "Uid":this.currentUser.unique_id,
          "docPath":this.reportUpload.report_path       
        }
         this._DataService.uploadPatientPreviousHistory(uploadData).subscribe(res => {
          console.log('uploadPatientPreviousHistory: ', res);

          if (res.success==true){
            alert("Uploaded & Share report successfully to Doctor");
            this.router.navigate(['doctor-appointments']);
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
