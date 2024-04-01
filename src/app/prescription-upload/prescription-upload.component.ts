import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import * as moment from 'moment';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';

@Component({
  selector: 'app-prescription-upload',
  templateUrl: './prescription-upload.component.html',
  styleUrls: ['./prescription-upload.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PrescriptionUploadComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.pharmaId = params['uId'];
      console.log("pharmaId",this.pharmaId);
    });
    this.firstFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
      prescription_id:['', Validators.required],
      consultation_type: ['', Validators.required],
      order_date: [''],
      order_taken_date: [''],
      payment_type_id: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      address: ['',  [Validators.required,Validators.minLength(10)]],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }
  public prescriptionForm: FormGroup;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  pharmaId;
  prescriptions;
  currentUser=JSON.parse(this.crypt.get("currentUser"));
  selectedPres;
  consultationType=[{
    id:1,
    type:"Walk-in"
  },{
    id:5,
    type:"Home Service"
  }];

  medicines = []
  profile;

  ngOnInit() {
    
    this._DataService.getUserProfileAll(this.currentUser.unique_id).subscribe(res => {
      this.profile = res.data[0];
      //console.log("profile details ==",this.profile);
      this.secondFormGroup.setValue({         
       name: res.data[0].first_name+" "+res.data[0].last_name,
         email: res.data[0].email,
         mobile: res.data[0].mobile_no,      
         address: res.data[0].user_profile[0].address,
         locality: res.data[0].user_profile[0].city,
         landmark: res.data[0].user_profile[0].state,
         pincode: res.data[0].user_profile[0].pincode
       })

     // console.log('secondFormGroup values == ',this.secondFormGroup.value);
    });


    this._DataService.getAllPrescriptions(this.currentUser.unique_id).subscribe(res => {
      this.prescriptions = res.data;
      console.log("Prescriptions:", this.prescriptions);
    });

  }

  getPrescription(){
    console.log("Selected:",this.firstFormGroup.value.prescription_id);
    for(var i=0; i<this.prescriptions.length; i++){
      if (this.firstFormGroup.value.prescription_id==this.prescriptions[i].id){
        this.selectedPres = this.prescriptions[i];
        console.log("True");
      }
    }
    console.log("selected pres: ", this.selectedPres);
  }

  formatTime(time){
    return moment(time).format('LL');
  }

  submit(){
    
    if(this.secondFormGroup.value.name == "" || this.secondFormGroup.value.mobile == "" || this.secondFormGroup.value.email == "" || this.secondFormGroup.value.locality == "" || this.secondFormGroup.value.address == "" ||  this.secondFormGroup.value.pincode == "")
    {
      alert("All Fields are Required..");
    }
    else
    {
    let booking_obj = {
      "id" : 0,
      "user_uid" : JSON.parse(this.crypt.get("currentUser")).unique_id,
      "pharmacy_uid" : this.pharmaId,
      "order_date" : '01-01-2018',
      "order_taken_date" : '01-01-2018',
      "consultation_type" : this.firstFormGroup.value.consultation_type,
      "name" : this.secondFormGroup.value.name,
      "mobile" : this.secondFormGroup.value.mobile,
      "email" : this.secondFormGroup.value.email,
      "description" : this.firstFormGroup.value.description,
      "cost" : 0,
      "prescription_id" : this.firstFormGroup.value.prescription_id,
      "payment_type_id" : this.firstFormGroup.value.payment_type_id,
      "bookingType" : 2,
      "medicines" : [],
      "locality" : this.secondFormGroup.value.locality,
      "address" : this.secondFormGroup.value.address,
      "landmark" : this.secondFormGroup.value.landmark,
      "pincode" : this.secondFormGroup.value.pincode
}
    this._DataService.orderMedicine(booking_obj).subscribe(res => {
      console.log("Response:",res);
      if (res.success){
        alert("Prescription Sent.");
        this.router.navigate(['pharmacy']);
      } else {
        alert("Cannot book order at this time!");
      }
    });

  }

  }

}
