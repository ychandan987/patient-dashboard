import { Component, OnInit } from '@angular/core';
import { ApigatewayService } from '../apigateway.service';
import { CryptService } from '../crypt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-e-hospital-book-app',
  templateUrl: './e-hospital-book-app.component.html',
  styleUrls: ['./e-hospital-book-app.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EHospitalBookAppComponent implements OnInit {

  posts = [];
  hospId;
  specId;
  docId;
  schedule;
  selected_day;
  show_select_date_flag = 0;
  date;
  finalPrice;
  walkInFees;
  voiceFees;
  textFees;
  videoFees;
  public appFormGroup: FormGroup;

  constructor(private _formBuilder:FormBuilder, private _DataService: ApigatewayService, private router: Router,
    private activeRoute: ActivatedRoute, private crypt: CryptService) {
       console.log("Currentuser:",JSON.parse(this.crypt.get("currentUser")));
      this.appFormGroup = this._formBuilder.group({
        doctorId: ['', Validators.required],
        patientId: ['', Validators.required],
        patientName: [JSON.parse(this.crypt.get("currentUser")).first_name, Validators.required],
        AppointmentDate: ['', Validators.required],
        AppointmentTime: ['', Validators.required],
        AppointmentIdType: ['', Validators.required],
        mobileNumber: [JSON.parse(this.crypt.get("currentUser")).mobile_no, Validators.required],
        emailId: [JSON.parse(this.crypt.get("currentUser")).email, Validators.required],
        Description: [''],
        BookingType: [''],
        BookingRef: [''],
        AppointmentAmount: ['']
      });

      this.activeRoute.params.subscribe(params => {
        this.hospId = params['id'];
        this.specId = params['specId'];
        this.docId = params['docId'];
        this.walkInFees = params['walkInFees'];
        this.voiceFees = params['voiceFees'];
        this.textFees = params['textFees'];
        this.videoFees = params['videoFees'];
      });

      console.log("current day:",this.getCurrentDay());

      // this.getData().then((res) => {
      //   console.log("async res:", res);
      //   for(var i=0; i<res.length; i++) {
      //     console.log('match res ==',res[i].Day == 'THURSDAY');
      //     // if(res[i].Day == this.getCurrentDay()) {
      //     //   this.schedule = res[i];
      //     //   console.log("Day's Schedule: ", this.schedule);
      //     // };
      //   }
      // });

     

      
    }
    dr_shedule = [];

  ngOnInit() {
  }
doc_sch =[];
  async getData() {
    let promise = new Promise<any[]> ((resolve,reject) => {
      this._DataService.getEhospitalDoctorsSchedule({doctorId : this.docId}).subscribe((res) => {
        if(res.error==false){
          resolve(res.data);
          this.doc_sch = res.data;
        } else reject("Error");
        console.log("res: ",res);
      });
    });
    let result = await promise;
    return result;
  }

  getCurrentDay() {
    var day;

    switch(new Date().getDay()) {
      case 0:
        day = "SUNDAY";
        break;
      case 1:
        day = "MONDAY";
        break;
      case 2:
        day = "TUESDAY";
        break;
      case 3:
        day = "WEDNESDAY";
        break;
      case 4:
        day = "THURSDAY";
        break;
      case 5:
        day = "FRIDAY";
        break;
      case 6:
        day = "SATURDAY";
        break;
    }
    return day;
  }
 new_sch = [];
 show_time_flag = 0;
 show_time_flag_time1 = 0;
 show_time_flag_time2 = 0;
 show_time_flag_time3 = 0;
 show_time_flag_time4 = 0;
 show_time_flag_time5 = 0;
 show_time_flag_time6 = 0;
 show_time_flag_time7 = 0;
matchtimingsresult;
  onChange(value)
  {   
   
    var days = {
      'Mon': 'MONDAY',
      'Tue':'TUESDAY',
      'Wed':'WEDNESDAY',
      'Thu':'THURSDAY',
      'Fri':'FRIDAY',
      'Sat':'SATURDAY',
      'Sun':'SUNDAY'
   }
 
    var d = new Date(value);
    var dayName = days[d.getDay()];
    var dayName1 = d.toString().split(' ')[0];
   // console.log(days[dayName1]);
    this.selected_day = days[dayName1];

    this.getData().then((res) => {
          // console.log("async res:", res);
            this.doc_sch = res;
          //  console.log('doc sche array == ',this.doc_sch);
            for(var d1=0;d1<(this.doc_sch.length);d1++)
            {
                 // console.log('database day',this.doc_sch[d1].Day);
                //  console.log('ui day == ',this.selected_day);
                  if(this.doc_sch[d1].Day == this.selected_day) {
                          // console.log('true');
                          this.schedule = this.doc_sch[d1];
                        //  console.log('day ',this.doc_sch[d1].Day);
                         // console.log('Time2 ',this.doc_sch[d1].Time2);

                          // Check todays date
                         // console.log('selected app date',d);
                          var today = new Date();
                         // console.log('today == ',today);
                          var isToday = (today.toDateString() == d.toDateString());
                          //console.log(isToday);
                          if(isToday == true)
                          {
                           // console.log('date is todays date..');
                          //  console.log('new sch validation == ',this.new_sch);
                          // console.log('get time ==',this.new_sch[0].Time2);
                        
                          var Time1 = this.doc_sch[d1].Time1;
                          var Time2 = this.doc_sch[d1].Time2;
                          var Time3 = this.doc_sch[d1].Time3;
                          var Time4 = this.doc_sch[d1].Time4;
                          var Time5 = this.doc_sch[d1].Time5;
                          var Time6 = this.doc_sch[d1].Time6;
                          var Time7 = this.doc_sch[d1].Time7;

                          var timeslots = {Time1,Time2,Time3,Time4,Time5,Time6,Time7};
                         // console.log('timeslots',timeslots);

                       //  console.log(' check timeslot is empty',timeslots.Time1 == "");
                                                
                         if(timeslots.Time1 == "")
                         {
                           console.log("Time 1 is empty");
                         }
                         else{
                         // console.log("do validation for time1");
                          var splitted = Time1.substr(11, 8); //Time2.split("", 3); 
                        //  console.log('splitted == ',splitted);
                          this.matchtimingsresult = this.matchtimings(splitted);
                         // console.log('matchtimingsresult for time 1 == ',this.matchtimingsresult);
                          if(this.matchtimingsresult === 'passed')
                          {
                           
                            this.show_time_flag_time1 = 1;
                          
                          }
                          else{
                            this.show_time_flag_time1 = 0;
                          }
                        }


                         if(timeslots.Time2 == "")
                         {
                           console.log("Time 2 is empty");
                         }
                         else{
                         //  console.log("do validation for time2");
                           var splitted = Time2.substr(11, 8); //Time2.split("", 3); 
                        //  console.log('splitted == ',splitted);
                          this.matchtimingsresult = this.matchtimings(splitted);
                         // console.log('matchtimingsresult for time 2== ',this.matchtimingsresult);
                          if(this.matchtimingsresult != 'passed')
                          {
                           
                            this.show_time_flag_time2 = 0;
                            
                          }
                          else{
                            this.show_time_flag_time2 = 1;
                           
                           
                          }
                         }


                         if(timeslots.Time3 == "")
                         {
                           console.log("Time 3 is empty");
                         }
                         else{
                          //console.log("do validation for time3");
                          var splitted = Time3.substr(11, 8); //Time2.split("", 3); 
                        //  console.log('splitted == ',splitted);
                          this.matchtimingsresult = this.matchtimings(splitted);
                          console.log('matchtimingsresult == ',this.matchtimingsresult);
                          if(this.matchtimingsresult == 'passed')
                        {
                         
                          this.show_time_flag_time3 = 1;
                        
                        }
                        else{
                          this.show_time_flag_time3 = 0;
                        }
                        }
                        if(timeslots.Time4 == "")
                        {
                          console.log("Time 4 is empty");
                        }
                        else{
                        // console.log("do validation for time3");
                         var splitted = Time4.substr(11, 8); //Time2.split("", 3); 
                        // console.log('splitted == ',splitted);
                         this.matchtimingsresult = this.matchtimings(splitted);
                         console.log('matchtimingsresult == ',this.matchtimingsresult);
                         if(this.matchtimingsresult == 'passed')
                        {
                         
                          this.show_time_flag_time4 = 1;
                        
                        }
                        else{
                          this.show_time_flag_time4 = 0;
                        }
                       }
                       if(timeslots.Time5 == "")
                       {
                         console.log("Time 5 is empty");
                       }
                       else{
                      //  console.log("do validation for time3");
                        var splitted = Time5.substr(11, 8); //Time2.split("", 3); 
                       // console.log('splitted == ',splitted);
                        this.matchtimingsresult = this.matchtimings(splitted);
                        console.log('matchtimingsresult == ',this.matchtimingsresult);
                        if(this.matchtimingsresult == 'passed')
                        {
                         
                          this.show_time_flag_time5 = 1;
                        
                        }
                        else{
                          this.show_time_flag_time5 = 0;
                        }
                      }
                      if(timeslots.Time6 == "")
                      {
                        console.log("Time 6 is empty");
                      }
                      else{
                      // console.log("do validation for time3");
                       var splitted = Time6.substr(11, 8);
                       //Time6.slice(11, -2); //Time2.split("", 3); 
                      // console.log('splitted == ',splitted);
                       this.matchtimingsresult = this.matchtimings(splitted);
                       console.log('matchtimingsresult == ',this.matchtimingsresult);
                       if(this.matchtimingsresult == 'passed')
                        {
                         
                          this.show_time_flag_time6 = 1;
                        
                        }
                        else{
                          this.show_time_flag_time6 = 0;
                        }
                     }
                     if(timeslots.Time7 == "")
                     {
                       console.log("Time 7 is empty");
                     }
                     else{
                     // console.log("do validation for time3");
                      var splitted = Time7.substr(11, 8); //Time2.split("", 3); 
                     // console.log('splitted == ',splitted);
                      this.matchtimingsresult = this.matchtimings(splitted);
                      console.log('matchtimingsresult == ',this.matchtimingsresult);
                      if(this.matchtimingsresult != 'passed')
                      {
                       
                        this.show_time_flag_time7 = 0;
                      
                      }
                      else{
                        this.show_time_flag_time7 = 1;
                      }
                    }

                      
                
                    this.new_sch.push(this.doc_sch[d1]);

                  }
                  else{
                    this.show_time_flag = 1;
                    this.new_sch.push(this.doc_sch[d1]);
                  }
                   
                   // console.log(splitted < splitdate1);

                        
                        // console.log('doc sche days == ',this.doc_sch[d1]);
                        //  console.log('day schedule == ',this.schedule);                        
                  }//end of if

              }//end of for
    
    
      });//end of get data

     
      // var time = date.getHours(); // => 9
      // var time1 = date.getMinutes(); // =>  30  
      // console.log('curr date time ==',time);
      // console.log('curr date time1 ==',time1);


          if(this.new_sch.length == 0 )
          {
            this.show_select_date_flag = 1;
          }

          if(this.new_sch.length == 1)
          {  
            this.new_sch.shift(); 
          }

//console.log('new sch',this.new_sch);


}

matchtimings(splitted)
{
  console.log('splitted timings == ',splitted);
  var today = new Date();
 // console.log('today == ',today);
 var splitdate1 = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: true});
 //console.log('splitted1 == ',splitdate1);
 // console.log('time1 slot doc schedule == ',this.schedule)
  
  var now = new Date();
  var hour = (now.getHours() < 12) ? now.getHours() : now.getHours() - 12;
var nowTime = new Date( (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + (now.getHours())+":"+(now.getMinutes()) );
var userTime = new Date((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + splitted );
console.log('nowTime == ',nowTime);
console.log('userTime == ',userTime);

var now = new Date();
var userval = new Date(userTime);
if (userval < now) //do logic
{
  console.log('pass');
  return "passed";
}else if (userval == now) {
  console.log('pre');
  return "pre";
}
else{
  console.log('fut');
  return "fut";
}

// if (nowTime.getTime() > userTime.getTime()) {
//   console.log("passed");
//   this.matchtimingsresult = "passed";
//   return "passed";
// }else if (nowTime.getTime() == userTime.getTime()) {
    
//     console.log("present");
//     this.matchtimingsresult = "present";
//     return "present";
// }else {
    
//     console.log("future");
//     this.matchtimingsresult = "future";
//     return "future";
// }
}
  check_dateselected()
  {
    
    this.date = new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', hour12: true});
    console.log('curr date ==',this.date);
    console.log('new sec == ',this.new_sch);
    // if(this.new_sch.length == 0 )
    // {
    //   if(this.show_select_date_flag == 1)
    //   {
    //     alert("No Timings Available,Please select another Date.");
    //   }
    //   else{
    //     alert("Please Select Date from Date Picker!");
    //   }
      
    // }
   
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
    
    // var BookingType,AppointmentAmount;
    
    // console.log('app type ',this.appFormGroup.value.AppointmentIdType);
    if(this.appFormGroup.value.AppointmentIdType == "" || this.appFormGroup.value.AppointmentDate == "" || this.appFormGroup.value.AppointmentTime == "")
    {
      alert("All Fields are Required");
    }
    else{
      console.log('app type ',this.appFormGroup.value.AppointmentIdType);
      if(this.appFormGroup.value.AppointmentIdType=="Walk-In"){
        this.finalPrice = this.walkInFees;
      console.log("WalkIn_finalPrice",this.finalPrice);
      }
      else if(this.appFormGroup.value.AppointmentIdType=="Text Consult"){
        this.finalPrice = this.textFees;
      console.log("textFees_finalPrice",this.finalPrice);
      }
      else if(this.appFormGroup.value.AppointmentIdType=="Phone Consult"){
        this.finalPrice = this.voiceFees;
      console.log("voiceFees_finalPrice",this.finalPrice);
      }
      else if(this.appFormGroup.value.AppointmentIdType=="Video Consult"){
        this.finalPrice = this.videoFees;
      console.log("videoFees_finalPrice",this.finalPrice);
      }
      this.appFormGroup.patchValue({
        doctorId:this.docId,
        patientId:JSON.parse(this.crypt.get("currentUser")).unique_id,
        BookingType : 'NEW',
        BookingRef:'0',
        AppointmentAmount:this.finalPrice
      });
    
    
      
      this._DataService.bookEhospitalAppointment(this.appFormGroup.value).subscribe((res) => {
        console.log("Result: ",res)
        if (res.message=='success'){
          alert("Thank you for booking appointment");
          this.router.navigate([`e-hospital`]);
        } else {
          alert("Cannot book appointment at this time!");
        }
      });
  }
  }
  isInvalid(field){
    if(this.appFormGroup.controls[field].invalid && (this.appFormGroup.controls[field].dirty || this.appFormGroup.controls[field].touched)){
      return true;
    } else return false;
  }

  isValid(field){
    if(this.appFormGroup.controls[field].valid && (this.appFormGroup.controls[field].dirty || this.appFormGroup.controls[field].touched)){
      return true;
    } else return false;
  }
}
