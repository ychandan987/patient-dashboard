import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { WindowRefService } from '../window-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-book-labtests',
  templateUrl: './book-labtests.component.html',
  styleUrls: ['./book-labtests.component.css'],
  providers: [ApigatewayService, CryptService, WindowRefService]
})
export class BookLabtestsComponent implements OnInit {

  constructor(private _formBuilder:FormBuilder, private _DataService: ApigatewayService, private crypt: CryptService,
    private router: Router, private activeRoute: ActivatedRoute, private winRef: WindowRefService) { 
    this.firstFormGroup = this._formBuilder.group({
      tests: [[], Validators.required],
      description: ['', Validators.required],
      consultation_type_id: ['', Validators.required],
      appointment_date: ['', Validators.required],
      probable_start_time: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address:['',  [Validators.required,Validators.minLength(10)]],
      locality: ['', Validators.required],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      payment_type_id: [, Validators.required],
    });

    this.activeRoute.params.subscribe(params => {
      this.labUid = params['id'];
    });
    
  }

  
  isEditable = true;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;
  labUid;
  profile;
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

  ngOnInit() {

    this._DataService.getUserProfileAll(JSON.parse(this.crypt.get("currentUser")).unique_id).subscribe(res => {
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

    this.getCategories().then(() => {
      this._DataService.getAllSpecificTests(this.labUid).subscribe(res => {
        this.allTests = res.data;
        this.getTests();
      });
    })


    this._DataService.getUserProfileAll(JSON.parse(this.crypt.get("currentUser")).unique_id).subscribe(res => {
      this.profile = res.data[0];
       console.log('User profile: ',this.profile);
    });
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

    for(var i=0; i<this.firstFormGroup.value.tests.length; i++){
      this.selectedTests.push(this.firstFormGroup.value.tests[i].id);
    };

    let bookObj ={
      "lab_uid":this.labUid,
      "user_uid":JSON.parse(this.crypt.get("currentUser")).unique_id,
      "appointment_date":this.firstFormGroup.value.appointment_date,
      "probable_start_time":this.firstFormGroup.value.probable_start_time,
      "actual_end_time":"00:00:00",
      "consultation_type_id":this.firstFormGroup.value.consultation_type_id,
      "total_cost":this.cost,
      "prescription_id":"0",
      "description":this.firstFormGroup.value.description,
      "payment_type_id":this.thirdFormGroup.value.payment_type_id,
      "tests":this.selectedTests,
      "name":this.secondFormGroup.value.name,
      "mobile":this.secondFormGroup.value.mobile,
      "age":this.secondFormGroup.value.age,
      "gender":this.secondFormGroup.value.gender,
      "email":this.secondFormGroup.value.email,
      "locality":this.secondFormGroup.value.locality,
      "address":this.secondFormGroup.value.address,
      "landmark":this.secondFormGroup.value.landmark,
      "pincode":this.secondFormGroup.value.pincode,
      "booking_type":1
    } 
    console.log("Booking Obj:", bookObj)

    this._DataService.bookLabApp(bookObj).subscribe(res => {
      console.log("Response: ", res.data[0]);
      if (res.success){
        alert("Thank you for booking appointment");
        this.router.navigate([`labs/${this.labUid}/payment/${res.data[0].insert_or_update_lab_appointment}`]);
      } else {
        alert("Cannot book appointment at this time!");
      }
    });
    // this.initPay()
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


  




}
