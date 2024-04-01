import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-lab-prescription-upload',
  templateUrl: './lab-prescription-upload.component.html',
  styleUrls: ['./lab-prescription-upload.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class LabPrescriptionUploadComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _DataService: ApigatewayService, private crypt: CryptService,
    private router: Router, private activeRoute: ActivatedRoute) { 
    this.activeRoute.params.subscribe(params => {
      this.labId = params['uId'];
    });
    this.firstFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
      prescription_id:['', Validators.required],
      consultation_type_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      probable_start_time: ['', Validators.required],
      payment_type_id: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['',  [Validators.required,Validators.minLength(10)]],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required],
    });

    this.activeRoute.params.subscribe(params => {
      this.labUid = params['id'];
    });
    
  }
  isEditable = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  labUid;
  labId;
  prescriptions;
  selectedPres;
  currentUser=JSON.parse(this.crypt.get("currentUser"));
  categories=[];
  tests=[];
  allTests=[];
  cost=0;
  consultationType=[{
    id:1,
    type:"Walk-in Lab"
  },{
    id:5,
    type:"Home Service"
  }];
  selectedTests=[];
profile;
  ngOnInit() {
    this._DataService.getUserProfileAll(this.currentUser.unique_id).subscribe(res => {
      this.profile = res.data[0];
      console.log("profile details ==",this.profile);
      this.secondFormGroup.setValue({       
       
       name: res.data[0].first_name+" "+res.data[0].last_name,
         email: res.data[0].email,
         mobile: res.data[0].mobile_no,
         age: res.data[0].user_profile[0].age,
         gender: res.data[0].user_profile[0].gender,
         address: res.data[0].user_profile[0].address,
         locality: res.data[0].user_profile[0].city,
         landmark: res.data[0].user_profile[0].state,
         pincode: res.data[0].user_profile[0].pincode
       })

      console.log('secondFormGroup values == ',this.secondFormGroup.value);
    });

    this._DataService.getAllPrescriptions(this.currentUser.unique_id).subscribe(res => {
      this.prescriptions = res.data;
      console.log("Prescriptions:", this.prescriptions);
    });
    this.getCategories().then(() => {
      this._DataService.getAllSpecificTests(this.labUid).subscribe(res => {
        this.allTests = res.data;
        this.getTests();
      });
    })
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
  async getCategories(){
    // this._DataService.getAllCategoriesTests(this.labUid).subscribe(res => {
    //   this.categories = res.data;
    //   console.log('cat ', this.categories);
    // });

    let promise = new Promise((resolve, reject) => {
      this._DataService.getAllCategoriesTests(this.labUid).subscribe(res => {
        this.categories = res.data;
        console.log('cat ', this.categories);
        if (res.success){
          console.log("Resolved!");
          resolve(res.data);
        } else {
          reject("Error");
        }
      });
    });

    return await promise;
  }

  getTests(){
    for(var i=0; i<this.categories.length; i++){
      this.categories[i]['tests'] = this.allTests.filter(test => {
        return test.category_id==this.categories[i].id;
      })
    }
    console.log("Cat: ", this.categories);
  }

  calculateCosts(){
    let totalCost=0
    for(var i=0; i<this.firstFormGroup.value.tests.length; i++){
      totalCost += this.firstFormGroup.value.tests[i].price
    }
    this.cost =totalCost;
    console.log("Tests: ",this.firstFormGroup.value.tests);
    
  }

  submit(){
    console.log("First Group: ",this.firstFormGroup.value);
    console.log("Second Group: ",this.secondFormGroup.value);
    console.log("Time:",this.firstFormGroup.value.appointment_date);
    if(this.secondFormGroup.value.name == "" || this.secondFormGroup.value.mobile == "" || this.secondFormGroup.value.email == "" || this.secondFormGroup.value.age == "" || this.secondFormGroup.value.address == "" ||  this.secondFormGroup.value.pincode == "" ||  this.secondFormGroup.value.gender == "" ||  this.secondFormGroup.value.city == "" ||  this.secondFormGroup.value.state == "")
    {
      alert("All Fields are Required..");
    }
    else{
    let bookObj ={
      "lab_uid":this.labId,
      "user_uid":JSON.parse(this.crypt.get("currentUser")).unique_id,
      "appointment_date":this.firstFormGroup.value.appointment_date,
      "probable_start_time":this.firstFormGroup.value.probable_start_time,
      "actual_end_time":"00:00:00",
      "consultation_type_id":this.firstFormGroup.value.consultation_type_id,
      "total_cost":this.cost,
      "prescription_id":this.firstFormGroup.value.prescription_id,
      "description":this.firstFormGroup.value.description,
      "payment_type_id":this.firstFormGroup.value.payment_type_id,
      "tests":[],
      "name":this.secondFormGroup.value.name,
      "mobile":this.secondFormGroup.value.mobile,
      "age":this.secondFormGroup.value.age,
      "gender":this.secondFormGroup.value.gender,
      "email":this.secondFormGroup.value.email,
      "locality":this.secondFormGroup.value.locality,
      "address":this.secondFormGroup.value.address,
      "landmark":this.secondFormGroup.value.landmark,
      "pincode":this.secondFormGroup.value.pincode,
      "booking_type":2
    } 
    console.log("Booking Obj:", bookObj)

    this._DataService.bookLabApp(bookObj).subscribe(res => {
      console.log("Response: ", res);
      if (res.success){
        alert("Prescription Sent.");
        this.router.navigate(['dashboard']);
      } else {
        alert("Cannot book appointment at this time!");
      }
    });
  }
  }

  getCurrentDate() {
    var today = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    }
    return yyyy+'-'+mm+'-'+dd;
  }

  formatTime(time){
    return moment(time).format('LL');
  }
}
