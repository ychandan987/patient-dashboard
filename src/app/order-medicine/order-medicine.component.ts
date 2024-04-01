import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-order-medicine',
  templateUrl: './order-medicine.component.html',
  styleUrls: ['./order-medicine.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class OrderMedicineComponent implements OnInit {
  public orderForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private _DataService: ApigatewayService, private crypt: CryptService, private router: Router, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.pharmUid = params['uId'];
    });
    this._DataService.getAllMedicines(this.pharmUid).subscribe(res => {
      this.medicines = res.data;
    });

   
    this.orderForm = this.formBuilder.group({
      id: [0, Validators.required],
      user_uid: ['', Validators.required],
      pharmacy_uid: ['', Validators.required],
      order_date: ['', Validators.required],
      order_taken_date: ['', Validators.required],
      consultation_type: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', Validators.required],
      cost: ['', Validators.required],
      prescription_id: [0, Validators.required],
      payment_type_id: ['', Validators.required],
      bookingType: [1, Validators.required],
      medicines: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['',  [Validators.required,Validators.minLength(10)]],
      landmark: ['', Validators.required],
      pincode: ['', Validators.required]
    });
   }

   medicines;
   cart=[];
   profile;
   pharmUid;
   cartTotal=0;
   checkout = false;
   currentUser = JSON.parse(this.crypt.get('currentUser'));
   prescriptions;
   selectedPres;

   keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      alert('Please Enter only digits');
      event.preventDefault();
    }    
  }
  
  ngOnInit() {
    this._DataService.getAllPrescriptions(this.currentUser.unique_id).subscribe(res => {
      this.prescriptions = res.data;
    });
    

    this._DataService.getUserProfileAll(JSON.parse(this.crypt.get("currentUser")).unique_id).subscribe(res => {
      this.profile = res.data[0];
       console.log('User profile: ',this.profile);
       this._DataService.getUserProfileAll(JSON.parse(this.crypt.get("currentUser")).unique_id).subscribe(res => {
        this.profile = res.data[0];
        
         console.log('User profile: ',this.profile);
        
        this.orderForm.setValue({          
        
          id: [0],
          user_uid: [''],
          pharmacy_uid: [''],
          order_date: [''],
          order_taken_date: [''],
          consultation_type: [''],
          name: res.data[0].first_name+" "+res.data[0].last_name,
          email: res.data[0].email,
          mobile: res.data[0].mobile_no,
          description: [''],
          cost: [''],
          prescription_id: [0],
          payment_type_id: [''],
          bookingType: [1],
          medicines: [''],     
          address: res.data[0].user_profile[0].address,
          locality: res.data[0].user_profile[0].city,
          landmark: [''],
          pincode: res.data[0].user_profile[0].pincode,
              
        })
        console.log('bookapp form == ',this.orderForm.value);
      });

    });
  }
  getPrescription(){
    console.log("Selected:",this.orderForm.value.prescription_id);
    for(var i=0; i<this.prescriptions.length; i++){
      if (this.orderForm.value.prescription_id==this.prescriptions[i].id){
        this.selectedPres = this.prescriptions[i];
        console.log("True");
      }
    }
    console.log("selected pres: ", this.selectedPres);
  }

  addToCart(item){
    if (!this.checkItemInCart(item)){
      this.cart.push({
        medi_id:item.id,
        med_name:item.med_name,
        quantity:1,
        cost:item.med_cost,
        available_quantity:item.med_quantity
      });
    } else {
      alert("Item is already in the cart!");
    }

    this.calculateCost();
  }

  checkItemInCart(item){
    for(var i=0;i<this.cart.length;i++){
      if (item.id==this.cart[i].medi_id){
        return true;
      }
    } return false;
  }

  incQuan(item){
    if (item.quantity >= item.available_quantity){
      alert("Item quantity exceeded the limit!");
    } else item.quantity++;
    
    this.calculateCost();
  }

  decQuan(item){
    item.quantity--;
    if (item.quantity==0){
      for(var i=0;i<this.cart.length;i++){
        if (item.medi_id==this.cart[i].medi_id){
          this.cart.splice(i,1);
        }
      }
    }

    this.calculateCost();
  }

  calculateCost(){
    let cart = 0;
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].quantity>1) {
        cart += (this.cart[i].cost * this.cart[i].quantity);
      } else {
        cart += this.cart[i].cost;
      }
    }
    this.cartTotal = cart;
  }

  submit() {
    this.orderForm.patchValue({
      user_uid: this.currentUser.unique_id,
      pharmacy_uid: this.pharmUid,
      order_date: this.getCurrentDate(),
      order_taken_date: this.getCurrentDate(),
      cost: this.cartTotal,
      medicines:this.cart
    });
    console.log("Order Obj: ", this.orderForm.value);
    console.log("Order Obj: medi ", this.orderForm.value.medicines);
    this._DataService.orderMedicine(this.orderForm.value).subscribe(res => {
      console.log("Result",res);
      if (res.success){
        alert("Thank you for order medicine");
        this.router.navigate([`pharmacy/${this.pharmUid}/payment/${res.data[0].insert_or_update_pharmacy_order}`]);
      } else {
        alert("Cannot order medicine at this time!");
      }
    });
  }

  checkoutFunc() {
    if(this.cart.length>0) {
      this.checkout = true;
    } else {
      alert("Please add items to cart to checkout!")
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
    return mm+'-'+dd+'-'+yyyy;
  }
  formatTime(time){
    return moment(time).format('LL');
  }
}
