import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-hosp-lab-list',
  templateUrl: './hosp-lab-list.component.html',
  styleUrls: ['./hosp-lab-list.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class HospLabListComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute, private storage: AngularFireStorage) { 
      this.activeRoute.params.subscribe(params => {
        this.appId = params['id'];
        this.labId = '000010';
        console.log("appId :",this.appId);
      });
    }
    posts;
    labId;
    lab_uid;
    posts1;
    appId;
    newPtsItem;
    addPtsItem;
    addPtsItem1;
    Fetch_PCC_UID;
    res_concat;
    pts_new_id;
    res_concat1;
    currentUser = JSON.parse(this.crypt.get('currentUser'));
  ngOnInit() {
    this._DataService.listing_lab_list({"HospitalId" : this.appId}).subscribe((res)=>{
      console.log('getEhospitalLabList: ', res);
      this.posts = res.data;
   });

   this._DataService.Fetch_PCC_UID({"HospitalId" : this.appId}).subscribe((res)=>{
    console.log('Fetch_PCC_UID: ', res);
    this.Fetch_PCC_UID = res.data[0].userId;
    console.log("Fetch_PCC_UID :"+this.Fetch_PCC_UID);
 });

   this._DataService.Fetch_New_PTS().subscribe((res)=>{
    console.log('Fetch_New_PTS: ', res);
    this.newPtsItem = res.data[0].newPTS;
    console.log("newPtsItem :",this.newPtsItem);
    this.addPtsItem = "000"+this.newPtsItem;
    
    this.addPtsItem1 = (Math.round(parseFloat(this.addPtsItem) + 1)).toString();
    console.log("addPtsItem :"+this.addPtsItem1);
    this.res_concat = this.newPtsItem;
    this.res_concat1 = "L".concat(this.newPtsItem);
    console.log("res_concat :"+this.res_concat);
    console.log("res_concat1 :"+this.res_concat1);
    // (Math.round(parseFloat(this.appDetails.total_cost) * 100)).toString();
 });
  }

  submit(id){
    this.lab_uid = id;
    // alert(this.lab_uid);
    console.log("Fetch_PCC_UID123 :"+this.Fetch_PCC_UID);
    console.log("AfteraddPtsItem :"+this.res_concat);
    var shareddata = {
      "PtsId" : this.res_concat,
       "TransactionId" : this.res_concat1,
       "EmpId" : this.currentUser.unique_id,
       "PCC_UID" : this.Fetch_PCC_UID,
       "HospitalId" :this.appId
     }

     console.log("shareddata",shareddata);
      this._DataService.Corpo_PreTreatmentScheduler_prescription(shareddata).subscribe((resHis) => {
        console.log('post1: ', resHis);

          if (resHis.message=='success'){
            this.pts_new_id = resHis.data[0].pts_id;
            console.log("pts_new_id :",this.pts_new_id);
            // alert("Uploaded & Share report successfully to Doctor");
            this.router.navigate(['lab/booking/'+this.appId+'/'+this.lab_uid+'/'+this.res_concat+'/'+this.res_concat1]);
          }
          else{
            console.log("error :",resHis.message);
          }
      })
  }

}
