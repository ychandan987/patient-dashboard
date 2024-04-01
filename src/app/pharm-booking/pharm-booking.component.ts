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
  selector: 'app-pharm-booking',
  templateUrl: './pharm-booking.component.html',
  styleUrls: ['./pharm-booking.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PharmBookingComponent implements OnInit {
  public orderForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   displayedColumns: string[] = ['id','itemcode','pharmname','price','action'];
   dataSource: MatTableDataSource < Element[] > ;

  constructor(private formBuilder:FormBuilder,private _DataService: ApigatewayService,private activeRoute: ActivatedRoute,private router: Router, private crypt: CryptService) {
    this.activeRoute.params.subscribe(params => {
      this.appId = params['id'];
      this.pts_new_id = params['pts_new_id'];
      this.transacId = params['transactionId'];
      this.pharmacies_id = params['pharmId'];
      this.mby = params['mby'];
      
      console.log("appId :",this.appId);
    });

    this._DataService.listing_pharmacy_Items({"HospitalId" : this.appId, "PharmacyName" : this.mby}).subscribe((res)=>{
      this.medicines = res.data;
      console.log("medicines :",this.medicines);
    });

    this._DataService.listing_pharmacy_Items({"HospitalId" : this.appId, "PharmacyName" : this.mby}).subscribe((res)=>{
      this.pharmacies = res.data;
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('pharmacy data==',res.data);
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
      pincode: ['', Validators.required],
      delivery_time: ['', Validators.required],
      delivery_date: ['', Validators.required],
      pts_medicine_date: ['', Validators.required]
    });
   }


   mby;
   pharmacies;
   transacId;
   pharmacies_id;
   appId;
   posts;
   show;
   profile;
    newPtsItem;
    addPtsItem;
    addPtsItem1;
    Fetch_PCC_UID;
    res_concat;
    pts_new_id;
    pharm_uid;
    appDetails;
    currentUser = JSON.parse(this.crypt.get('currentUser'));
    medicines;
    cart=[];
    pharmUid;
    cartTotal=0;
    pts_medicine_id_new;

    consultationType=[{
      id:1,
      type:"Self Pickup"
    },{
      id:5,
      type:"Home Delivery"
    }];


    checkout = false;
    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
  
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        alert('Please Enter only digits');
        event.preventDefault();
      }    
    }
  ngOnInit() {
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
          order_taken_date: ['', Validators.required],
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
          delivery_time: [''],
          delivery_date: ['', Validators.required],
          pts_medicine_date: ['', Validators.required]
              
        })
        console.log('bookapp form == ',this.orderForm.value);

      });

    });

    this._DataService.listing_pharmacy_list({"HospitalId" : this.appId}).subscribe((res)=>{
      console.log('pharmacies_data==',res.data);
      this.pharmacies = res.data;
      // this.posts = res.data;
      for(let i=0; i<this.pharmacies.length; i++){
        if(this.pharmacies[i].code_ph==this.pharmacies_id){
          this.appDetails=this.pharmacies[i];
        }
      }
      console.log('pharmacies Details: ',this.appDetails);
    });
  }

  addToCart(item){
    if (!this.checkItemInCart(item)){
      this.cart.push({
        medi_id:item.voucherno,
        med_name:item.itemcode,
        quantity:1,
        cost:item.rate,
        gst:item.gst,
        medicine_Name:item.itemName,
        available_quantity:item.receiveqty
      });
      console.log("cart_new :",this.cart);
    } else {
      alert("Item is already in the cart!");
    }

    this.calculateCost();
  }

  checkItemInCart(item){
    for(var i=0;i<this.cart.length;i++){
      if (item.voucherno==this.cart[i].medi_id){
        return true;
      }
    } return false;
  }

  incQuan(item){
    if (item.quantity >= item.issueqty){
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
    console.log("Cart_New: medi ", this.cart);
    let bookObj ={
      "pts_id":this.pts_new_id,
      "pts_medicine_date":this.orderForm.value.pts_medicine_date,
      "pts_medicine_deliveryTime":this.orderForm.value.delivery_time,
      "pts_medicine_mobile":this.orderForm.value.mobile,
      "pts_medicine_email":this.orderForm.value.email,
      "pts_medicine_altMobile":this.appDetails.phoneno_ph,
      "pts_medicine_altlandline":this.appDetails.phoneno_ph,
      "paymentconfirmation" : "",
      "pts_medicine_patientName":this.orderForm.value.name,
      "pts_medicine_landline":this.orderForm.value.mobile,
      "pts_medicine_address":this.orderForm.value.address,
      "pts_medicine_altEmail":this.orderForm.value.email,
      "payment_mode":"",
      "paymentId":"",
      "isDelivered":""
    } 
    console.log("Booking Obj:", bookObj)
    this._DataService.pharm_booking(bookObj).subscribe(res => {
      console.log("Result_pharm_booking==",res);
      this.pts_medicine_id_new = res.data[0].pts_medicine_id;
      console.log("pts_medicine_id_new==",this.pts_medicine_id_new);
      if (res.message=='success'){
       // alert("Thank you for order medicine");
        alert("Proceed to Payment");
        // for (let i = 0; i < this.cart.length; i++) {
        // let Final_booking ={
        //   "pts_transaction_id":this.pts_new_id,
        //   "pts_medicine_ch_PharmacyName":this.getCurrentDate,
        //   "pts_medicine_id":this.cart[i].medi_id,
        //   "pts_medicine_ch_name":this.cart[i].med_name,
        //   "pts_medicine_ch_brand ":this.orderForm.value.email,
        //   "pts_medicine_ch_strength":this.orderForm.value.mobile,
        //   "pts_medicine_ch_dosage":this.orderForm.value.mobile,
        //   "pts_medicine_ch_days":"0",
        //   "pts_medicine_ch_qty":this.cart[i].quantity,
        //   "pts_medicine_ch_price":this.cart[i].cost,
        //   "pts_medicine_ch_gst":this.orderForm.value.address,
        //   "pts_medicine_ch_discount":this.orderForm.value.email,
        //   "pts_medicine_ch_flag":"0",
        //   "pts_medicine_ch_FinalPrice":"0",
        //   "uom ":"",
        //   "perPieceQty":""
        // } 
        for (let i = 0; i < this.cart.length; i++) {
          let final_cost = 0;
          let final_with_gst = 0;
          // final_cost += this.cart[i].cost;
          final_cost += ((this.cart[i].cost * this.cart[i].quantity)  + (this.cart[i].cost * this.cart[i].quantity * this.cart[i].gst / 100));
          // final_with_gst += (final_cost * this.cart[i].gst/100) +  final_cost;
          let Final_booking ={
            "pts_transaction_id" : this.transacId,
            "pts_medicine_ch_PharmacyName" : this.appDetails.code_ph,
            "pts_medicine_id" : this.pts_medicine_id_new,
            "pts_medicine_ch_name" : this.cart[i].med_name,
            "pts_medicine_ch_brand" : this.cart[i].partyroles,
            "pts_medicine_ch_strength" : "0",
            "pts_medicine_ch_dosage" : this.cart[i].quantity,
            "pts_medicine_ch_days" : "0",
            "pts_medicine_ch_qty" : this.cart[i].quantity,
            "pts_medicine_ch_price" : this.cart[i].cost,
            "pts_medicine_ch_gst" : this.cart[i].gst,
            "pts_medicine_ch_discount" : "0",
            "pts_medicine_ch_flag" : "0",
            "pts_medicine_ch_FinalPrice" : final_cost,
            "uom" : "0",
            "perPieceQty" : "0"
          } 
          console.log("Final_booking :",Final_booking);
  
          this._DataService.pharm_booking_final(Final_booking).subscribe(resFinal => {
            console.log("Final_booking_Result",resFinal);
            if (resFinal.message=='success'){
              // alert("Thank you for order medicine");
              this.router.navigate([`e-hospital/pts/${this.pts_new_id}/${this.transacId}/pharmacy`]);
            }
            else{
              console.log("Error");
            }
          });
        }
        
      // }
        // this.router.navigate([`pharmacy/${this.pharmUid}/payment/${res.data[0].insert_or_update_pharmacy_order}`]);
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

   show1(){
   // document.getElementById('div1').style.display ='none';
    this.show = true;
  }
  show2(){
    this.show = false;
  }

 

  getCurrentDateUpdated() {
    var today = new Date();
    var dd:any = today.getDate();
    var mm:any = today.getMonth()+2; //January is 0!

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

  formatTime1(time){
    return moment().calendar('Tomorrow');
  }

  formatTime4(time) {
    return moment(time).subtract(0, 'days').format('LL');
  
  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();    
  }

}
