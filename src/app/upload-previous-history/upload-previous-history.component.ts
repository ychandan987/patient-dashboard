import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-previous-history',
  templateUrl: './upload-previous-history.component.html',
  styleUrls: ['./upload-previous-history.component.css'],
  providers: [ApigatewayService,CryptService]
})
export class UploadPreviousHistoryComponent implements OnInit {
// Main Task
task: AngularFireUploadTask;

// Progress Monitoring
percentage: Observable<number>;

snapshot: Observable<any>;

// Download URL
downloadUrl: Observable<String>;

constructor(private _DataService:ApigatewayService, private router: Router, private activeRoute:ActivatedRoute, private crypt: CryptService, private storage: AngularFireStorage) { }

currentUser = JSON.parse(this.crypt.get('currentUser'));
user;
file;
doc;
upload_prev_hist;
jpg_flag = 0;
profile;
ngOnInit() {
//get userdetails
  this._DataService.getUser(this.currentUser.username).subscribe(res => {
    this.user = res.data[0];
  });

  this._DataService.getUserProfile(this.currentUser.unique_id).subscribe(res => {
    this.profile = res.data[0];
  });
  
  //get patient's previous history documents
  this._DataService.getPatientPreviousHistory(this.currentUser.unique_id).subscribe(res => {
    this.upload_prev_hist = res.data;
    console.log('upload prev hist path==',this.upload_prev_hist);
    for(var a=0;a<this.upload_prev_hist.length; a++)
    {
     // let str = "A drop of ink may make a million think";

     // alert( str.search( /a/i ) ); // 0 (the first position)
   
  //   console.log('doc path == ',this.upload_prev_hist[a].doc_path);
  //   let str = this.upload_prev_hist[a].doc_path;
  //   console.log("check jpg == ",str.search( /jpg/i ) );
  //   console.log("check png == ",str.search( /png/i ) );
  //   console.log("check pdf == ",str.search( /pdf/i ) );
  //   // for(var j =0 ;j < str.length; j++)
  //   //  {
  //       if(str.search( /jpg/i ) == -1  )
  //       {
  //         console.log("show img");
  //        this.jpg_flag = 0;
         
  //       }
  //       if(str.search( /pdf/i ) == -1  ){
  //        this.jpg_flag = 0;
        
  //       }
  //  //  }
   

    }
  //  this.upload_prev_hist.doc_path.split('.').pop(); 
    //console.log(this.upload_prev_hist.doc_path);
  });

 
}

formatTime(time){
  return moment(time).format('LLL');
}

getFile(event: FileList){
  // File object
  this.file = event.item(0);
}

submit(){
  this.startUpload(this.file).then((res)=>{
    this.doc = res;  
    
      var uploadData = {
        "ID":0,
        "Uid":JSON.parse(this.crypt.get('currentUser')).unique_id,
        "docPath":this.doc       
      }

      console.log("Uploaded Data: ", uploadData);

      this._DataService.uploadPatientPreviousHistory(uploadData).subscribe((res)=>{
     
        console.log('Result: ', res);

        if (res.success==true){
          alert('Documents Uploaded Successfully!');
          this.router.navigateByUrl("/profile");
        }
        else
        {
          alert('Documents Uploaded Failed');
        }

      });
   
  });
  
}

async startUpload(file){

  if (file!=undefined){
    // Storage Path
    const path = `Patient-documents/${new Date().getTime()}_${file.name}`;

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
