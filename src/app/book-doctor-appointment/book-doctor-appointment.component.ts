import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-book-doctor-appointment',
  templateUrl: './book-doctor-appointment.component.html',
  styleUrls: ['./book-doctor-appointment.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class BookDoctorAppointmentComponent implements OnInit {
  public bookAppointmentForm: FormGroup

  constructor(private formBuilder:FormBuilder, private _DataService:ApigatewayService, private router: Router, private crypt: CryptService, private activeRoute: ActivatedRoute) { 
    this.activeRoute.params.subscribe(params => {
      this.labUid = params['officeId'];
      console.log("officeid",this.labUid);
       this.doctoruniqueid = params['dId'];
       console.log("dr id",this.doctoruniqueid);
       this.clinicId = params['clinicId'];
       console.log("dr id",this.clinicId);
    });
    
    this.bookAppointmentForm = this.formBuilder.group({
      id: '0',
      userUid:JSON.parse(this.crypt.get("currentUser")).unique_id,
      officeId:this.labUid,
      name: ['', Validators.required],
      consultationTypeId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      probableStartTime: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      paymentmode:['', Validators.required],
      city:['', Validators.required],
      address:['',  [Validators.required,Validators.minLength(10)]],
      state:['', Validators.required],
      pincode:['', Validators.required],
      description:['', Validators.required]
    });
  }


doctoruniqueid;
labUid;
docid;
profile;
docDetails;
doctortimings = [];
clinicId;

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
      // console.log('currentuser = ',this.currentUser.unique_id);
      // console.log('currentuser = ',this.currentUser.username);
       console.log('User profile: ',this.profile);
      //  this.bookAppointmentForm.patchValue({
      //   id:res.data[0].id,
      // });
        this.bookAppointmentForm.setValue({       
        id:res.data[0].user_id,
        userUid:res.data[0].unique_id,
        officeId:this.labUid,
        name: res.data[0].first_name+" "+res.data[0].last_name,
        email: res.data[0].email,
        mobile: res.data[0].mobile_no,
        address: res.data[0].user_profile[0].address,
        city: res.data[0].user_profile[0].city,
        state: res.data[0].user_profile[0].state,
        pincode: res.data[0].user_profile[0].pincode,
        consultationTypeId: [''],
        appointmentDate: [''],
        probableStartTime: [''],     
        paymentmode:[''], 
        description:[''],                
      })
      console.log('bookapp form == ',this.bookAppointmentForm.value);
    });

    this._DataService.getSpecificDoctor(this.doctoruniqueid).subscribe( res => {
      this.docDetails = res.data;
      console.log("docDetails == ",this.docDetails);
    
    console.log('clinics id ==',this.clinicId);
    for(var i=0;i<(res.data.length);i++)
      {
       
        var clinicdetails = res.data[i].clinic_details;

        var clinicdata = clinicdetails.filter(x => x.clinic_id == this.clinicId);

       
        var affdetails = clinicdata[0].affiliation_details;
        
        this.doctortimings = affdetails[0].doctor_timings;
       //console.log('doc timings == ',this.doctortimings);
      }
    });



  }
  
  signUp() {
    var bookappEdit = {
      "id": '0',
      "userUid":JSON.parse(this.crypt.get("currentUser")).unique_id,
      "officeId":this.labUid,
      //"uniqueId": this.editProfileForm.value.uniqueId,
      "name": this.bookAppointmentForm.value.name,
      "email": this.bookAppointmentForm.value.email,
      "mobile": this.bookAppointmentForm.value.mobile,
      "consultationTypeId": this.bookAppointmentForm.value.consultationTypeId,
      "appointmentDate": this.bookAppointmentForm.value.appointmentDate,
      "probableStartTime": this.bookAppointmentForm.value.probableStartTime,
      "state": this.bookAppointmentForm.value.state,
      "city": this.bookAppointmentForm.value.city,
      "address": this.bookAppointmentForm.value.address,
      "pincode": this.bookAppointmentForm.value.pincode,
      "paymentmode":this.bookAppointmentForm.value.paymentmode,
      "description":this.bookAppointmentForm.value.description
  }

  console.log('app time ==',bookappEdit.probableStartTime);
  
      this._DataService.bookDocApp(bookappEdit).subscribe(res=>{
     
        console.log('bookAppointmentForm :',res); 
        console.log('data == ',res.data[0]);
     
        this.docid = JSON.parse(this.crypt.get("currentUser")).unique_id;
      if (res.success){
        alert("Thank you for booking appointment");
       // this.router.navigate(['/book-appointment']);
        // this.router.navigate([`doctor_appointment/${this.docid}/${this.labUid}/payment/${res.data[0].insert_or_update_appointment}/${this.bookAppointmentForm.value.paymentmode}`]);

        this.router.navigate([`doctor-appointments/orders`]);

      } else {
        alert("Cannot book appointment at this time!");
      }
     });
  }

  isInvalid(field){
    if(this.bookAppointmentForm.controls[field].invalid && (this.bookAppointmentForm.controls[field].dirty || this.bookAppointmentForm.controls[field].touched)){
      return true;
    } else return false;
  }

  isValid(field){
    if(this.bookAppointmentForm.controls[field].valid && (this.bookAppointmentForm.controls[field].dirty || this.bookAppointmentForm.controls[field].touched)){
      return true;
    } else return false;
  }

  show_online_payment_mode = 0;

  onChange(value)
  {
   // alert(value);
    if(value == 2 || value == 3 || value == 4)
    {
      this.show_online_payment_mode = 0;
    }
    else{
      this.show_online_payment_mode = 1;
    }

  }
 timeStops = [];
 appointment_time_slots = [];
  show_time_slots = [];
  selected_day;
  add_timings_in_array_flag = 0;
  onChangeDate(value)
  { 
    this.timeStops.length = 0;
    this.appointment_time_slots.length = 0;
    var days = {
      'Mon':'Monday',
      'Tue':'Tuesday',
      'Wed':'Wednesday',
      'Thu':'Thursday',
      'Fri':'Friday',
      'Sat':'Saturday',
      'Sun':'Sunday'
   }

   var d = new Date(value);
   var dayName = days[d.getDay()];
   var dayName1 = d.toString().split(' ')[0];
   console.log(days[dayName1]);
   this.selected_day = days[dayName1];
   for(var d1=0;d1<(this.doctortimings.length);d1++)
            {
                 // console.log('database day',this.doc_sch[d1].Day);
                //  console.log('ui day == ',this.selected_day);
                  if(this.doctortimings[d1].day_of_week == this.selected_day) {

                   // console.log("days are matching.......");

                   // console.log('is available ==',this.doctortimings[d1].is_available);
                    var isavailable = this.doctortimings[d1].is_available;
                    if(isavailable == true)
                    {
                    //  console.log('timings new == ',this.doctortimings[d1].timings);
                      var dt = this.doctortimings[d1].timings;
                      var end_timings = dt[0].end_time;
                         // console.log('endtimings dt ==',end_timings);
                          var start_timings = dt[0].start_time;
                          //console.log('starttimings st ==',start_timings);
                          
                          var startTime = moment(start_timings, 'HH:mm:ss');
                          var endTime = moment(end_timings, 'HH:mm:ss');
                          
                          // var timeStops = [];
                          
                          while(startTime <= endTime){
                             this.timeStops.push(moment(startTime).format('HH:mm:ss'));
                              startTime.add(30, 'minutes');
                          }
                         

                          var today = new Date();
                       //  console.log('today == ',today);
                         var isToday = (today.toDateString() == d.toDateString());
                       //   console.log(isToday);
                          if(isToday == true)
                          {
                            for(var z=0;z<(this.timeStops.length);z++)
                            {
                           
                            var now = new Date();
                            var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + this.timeStops[z] );
                            
                            var userval = new Date(userTime);
                          //  console.log('userval ==',userval);

                              if (userval < now) //do logic
                                     {
                                    
                                       this.add_timings_in_array_flag = 1;                                  
                                      }else if (userval == now) {
                                           
                                          this.add_timings_in_array_flag = 0;   
                                        
                                             
                                          this.appointment_time_slots.push(this.timeStops[z]);
                                       // console.log('app time slots..',this.appointment_time_slots);                          
                                        }
                                        else{
                                       
                                          this.add_timings_in_array_flag = 0;  
                                          
                                          this.appointment_time_slots.push(this.timeStops[z]);
                                       // console.log('app time slots..',this.appointment_time_slots);                                
                                        }
                                         // console.log('check time flag ==',this.add_timings_in_array_flag);
                                         // console.log('final time slots..',this.appointment_time_slots);  
                              
                                }//end of for

                           }
                           else{
                            for(var z=0;z<(this.timeStops.length);z++)
                            {                              
                              this.appointment_time_slots.push(this.timeStops[z]);
                            }
                           
                           }
                   
                     
                    }
                    else{
                      alert("No time slots are Available, Please select another Date to book your Appointment.");
                    }
                  }
                }

  }

  onClickTime()
  { 
    if(this.appointment_time_slots.length == 0)
    { 
     alert("Please Select Appointment Date.");
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
    return moment(time, ["HH:mm"]).format("h:mm A");//moment(time).format('LT');
  }
}
