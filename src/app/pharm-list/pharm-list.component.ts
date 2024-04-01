import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute,Router } from '@angular/router';
import * as moment from 'moment';
import { MyMaterialModule } from  '../material.module';
import {MatSort,MatPaginator, MatTableDataSource} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pharm-list',
  templateUrl: './pharm-list.component.html',
  styleUrls: ['./pharm-list.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PharmListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','labname','location','action'];
   dataSource: MatTableDataSource < Element[] > ;
  constructor(private formBuilder:FormBuilder,private _DataService: ApigatewayService,private activeRoute: ActivatedRoute,private router: Router, private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      console.log("appId :",this.appId);
    });


    this._DataService.listing_pharmacy_list({"HospitalId" : this.appId}).subscribe((res)=>{
      this.pharmacies = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('pharmacy data==',res.data);
      //console.log('mby==',res.data[0].mby);
    });
   }

   pharmacies;
   appId;
   posts;
    newPtsItem;
    addPtsItem;
    addPtsItem1;
    Fetch_PCC_UID;
    res_concat;
    pts_new_id;
    pharm_uid;
    res_concat1;
    mby;
    currentUser = JSON.parse(this.crypt.get('currentUser'));


   ngOnInit() {

   

   this._DataService.Fetch_New_PTS().subscribe((res)=>{
    console.log('Fetch_New_PTS: ', res);
    this.newPtsItem = res.data[0].newPTS;
    console.log("newPtsItem :",this.newPtsItem);
    this.addPtsItem = "000"+this.newPtsItem;
    
    this.addPtsItem1 = (Math.round(parseFloat(this.newPtsItem) + 1)).toString();
    console.log("addPtsItem :"+this.addPtsItem1);
    this.res_concat = this.newPtsItem;
    this.res_concat1 = "P".concat(this.newPtsItem);
    console.log("res_concat :"+this.res_concat);
    console.log("res_concat1 :"+this.res_concat1);
    // (Math.round(parseFloat(this.appDetails.total_cost) * 100)).toString();
 });
   }
 applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();    
   }

   submit(id,mby_val){
    this.pharm_uid = id;
    this.mby = mby_val;
     //alert(this.mby);
     this._DataService.Fetch_PCC_UID({"HospitalId" : this.appId,"PharmacyName" : this.mby}).subscribe((res)=>{
      console.log('response==: ', res);
      this.Fetch_PCC_UID = res.data[0].userId;
      console.log("Fetch_PCC_UID :"+this.Fetch_PCC_UID);

      if (res.message=='success'){
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
            this.router.navigate(['pharm/booking/'+this.appId+'/'+this.pharm_uid+'/'+this.res_concat+'/'+this.res_concat1+'/'+this.mby]);
          }
          else{
            console.log("error :",resHis.message);
          }
      })
      }
      else{
        console.log("error :",res.message);
      }
   });
   
  }

}
