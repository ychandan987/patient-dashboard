import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-initialclinicform',
  templateUrl: './initialclinicform.component.html',
  styleUrls: ['./initialclinicform.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class InitialclinicformComponent implements OnInit {

  public editinitialclinicdemographicsForm: FormGroup;
  public editinitialclinichealthcheckupsForm: FormGroup;
  public editinitialclinichealthgoalsForm: FormGroup;
  public editinitialclinicknownallergiesForm: FormGroup;

  public editinitialclinicsystemssummaryForm: FormGroup;
  public editinitialcliniclifestylerelatedForm: FormGroup;

  public editinitialclinicpreexistingteatmentForm: FormGroup;
  public editinitialclinicpreexistingteatmentForm2: FormGroup;

  public editinitialclinicpraticemodalityForm: FormGroup;
  public editinitialclinicpraticemodalityForm2: FormGroup;


  public editinitialclinicsignificanteventForm: FormGroup;
  public editinitialclinicsignificanteventForm2: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private _DataService: ApigatewayService, private storage: AngularFireStorage, 
    private router: Router, private crypt: CryptService) {

      this.editinitialclinicdemographicsForm = this.formBuilder.group({
        unique_id: [''],    
        first_name: [''],
        middle_name: [''],
        last_name: [''],
        gender: [''],
        date_of_birth: [''],
        age: [''],
        address_res: [''],
        city_res: [''],
        state_res: [''],
        zip_res: [''],
        address_office: [''],
        city_office: [''],
        state_office: [''],
        zip_office: [''],
        home_phone: [''],
        email: [''],
        other_phone: [''],
        height_in_cms: [''],
        weight_in_kgs: [''],
        bmi: [''],
        spo2: [''],
        bp: [''],       
        pulse_rate: [''],
        temperature: [''],
        neck_circumference: [''],
        waist_circumference: [''],
        waist_to_hip_circumference: ['']                  
      });


      this.editinitialclinichealthcheckupsForm = this.formBuilder.group({
        unique_id: [''],    
        health_checkups_done_in_past: [''],
        frequency_package_name_price: ['']                       
      });

      this.editinitialclinichealthgoalsForm = this.formBuilder.group({
        unique_id: [''],    
        history_of_present_complaints_with_duration: [''],
        severity_of_symptoms: ['']                       
      });

      this.editinitialclinicknownallergiesForm = this.formBuilder.group({
        unique_id: [''],       
        medicine: [''],
        food: [''],
        metal: [''],
        cloth: [''],
        environmental: [''],
        any_other : ['']                 
      });

      this.editinitialclinicsystemssummaryForm = this.formBuilder.group({
      unique_id: [''],    
      present_energy_levels_guidelines :  [''],    
      present_energy_levels_remarks :  [''],       
      weight_change_guidelines :  [''],    
      weight_change_remarks :  [''],       
      usual_weight_guidelines :  [''],     
      usual_weight_remarks :  [''],        
      excessive_thirst_guidelines :  [''], 
      excessive_thirst_remarks :  [''],    
      sleep_guidelines :  [''],    
      sleep_remarks :  [''],       
      neuropsychiatric_guidelines :  [''], 
      neuropsychiatric_remarks :  [''],    
      hearing_guidelines :  [''],  
      hearing_remarks :  [''],     
      vision_guidelines :  [''],   
      vision_remarks :  [''],      
      heart_condition_guidelines :  [''],  
      heart_condition_remarks :  [''],     
      lung_condition_guidelines :  [''],   
      lung_condition_remarks :  [''],      
      stomach_intestinal_conditions_guidelines :  [''],    
      stomach_intestinal_conditions_remarks :  [''],       
      muscle_bone_joints_system_guidelines :  [''],        
      muscle_bone_joints_system_remarks :  [''],   
      genitourinary_system_guidelines :  [''],     
      genitourinary_system_remarks :  [''],        
      skin_hair_guidelines :  [''],        
      skin_hair_remarks :  [''],   
      oral_health_guidelines :  [''],      
      oral_health_remarks :  [''], 
      goals_guidelines :  [''],    
      goals_remarks :  ['']                     
      });

      this.editinitialcliniclifestylerelatedForm = this.formBuilder.group({
        unique_id: [''],    
        smoking_yes_no: [''],
        smoking_daily_hrs: [''],
        smoking_cond_reason: [''],
        drinking_yes_no: [''],
        drinking_daily_hrs: [''],
        drinking_cond_reason: [''],
        junk_food_intake_yes_no: [''],
        junk_food_intake_daily_hrs: [''],
        junk_food_intake_cond_reason: [''],
        water_intake_yes_no: [''],
        water_intake_daily_hrs: [''],
        water_intake_cond_reason: [''],
        exercise_yes_no: [''],
        exercise_daily_hrs: [''],
        exercise_cond_reason: [''],
        sleep_yes_no: [''],
        sleep_daily_hrs: [''],
        sleep_cond_reason: [''],
        continous_work_hrs_yes_no: [''],
        continous_work_hrs_daily_hrs: [''],
        continous_work_hrs_cond_reason: [''],
        freq_of_urination_yes_no: [''],
        freq_of_urination_daily_hrs: [''],
        freq_of_urination_cond_reason: [''],
        name_of_physician: [''],
        medical_council_reg_no: [''],
        phone: [''],
        email: [''],
        name_of_person_fill_out_this_form: [''],
        name_of_person_assisting_fill_out_this_form: [''],
        any_additional_general_comments: ['']                
      });

      this.editinitialclinicpreexistingteatmentForm = this.formBuilder.group({
        unique_id: [''],       
        name_of_medication: [''],
        strength: [''],
        dose: [''],
        duration: [''],
        dependency_on_medicines: ['']                        
      });

      this.editinitialclinicpreexistingteatmentForm2 = this.formBuilder.group({
        id:[''],
        unique_id: [''],       
        name_of_medication: [''],
        strength: [''],
        dose: [''],
        duration: [''],
        dependency_on_medicines: ['']                        
      });

      


      this.editinitialclinicpraticemodalityForm = this.formBuilder.group({
        unique_id: [''],       
        name_of_medication_pm: [''],
        strength_pm: [''],
        dose_pm: [''],
        reason_for_taking_pm: ['']                       
      });

      this.editinitialclinicpraticemodalityForm2 = this.formBuilder.group({
        id:[''],
        unique_id: [''],       
        name_of_medication_pm: [''],
        strength_pm: [''],
        dose_pm: [''],
        reason_for_taking_pm: ['']                        
      });

      

      this.editinitialclinicsignificanteventForm = this.formBuilder.group({
        unique_id: [''],       
        name_of_event: [''],
        date_of_event: ['']                      
      });

      this.editinitialclinicsignificanteventForm2 = this.formBuilder.group({
        id:[''],
        unique_id: [''],       
        name_of_event: [''],
        date_of_event: ['']                        
      });

 }

 showModal: boolean;
content: string;
title: string;

editModal: boolean;
//Bootstrap Modal Open event
show()
{
  this.showModal = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title = " Pre-Existing & Existing Treatment Summary";    // Dynamic Data
}

editpre(ptd)
{


  this.editinitialclinicpreexistingteatmentForm2.setValue({
    id:ptd.id,
    unique_id: this.userReg.unique_id,
    name_of_medication: ptd.name_of_medication,
    strength:  ptd.strength,
    dose:  ptd.dose,
    duration:  ptd.duration,
    dependency_on_medicines:  ptd.dependency_on_medicines                     
    })
  this.editModal = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title = " Pre-Existing & Existing Treatment Summary";    // Dynamic Data
}
hidepre()
{
  this.editModal = false;
}
//Bootstrap Modal Close event
hide()
{
  this.showModal = false;
}
 preexistingDetails: PreexistingTreatmentDetails[] = [
  {
    id: 0,
    name_of_medication: '',
    strength: '',
    dose: '',
    duration: '',
    dependency_on_medicines:''
  }
];




// For Pactice Modality
showModal1: boolean;
content1: string;
title1: string;

editModal1: boolean;
//Bootstrap Modal Open event
show_practice_add_Modal()
{
  this.showModal1 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title1 = " Any other Practice modality of medicines taken";    // Dynamic Data
}
hide_practice_add_Modal()
{
  this.showModal1 = false;
}
editpm(pm)
{


  this.editinitialclinicpraticemodalityForm2.setValue({
    id:pm.id,
    unique_id: this.userReg.unique_id,
    name_of_medication_pm: pm.name_of_medication,
    strength_pm:  pm.strength,
    dose_pm:  pm.dose,
    reason_for_taking_pm:  pm.reason_for_taking                       
    })
  this.editModal1 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title1 = " Any other Practice modality of medicines taken ";    // Dynamic Data
}
hide_practice_edit_Modal()
{
  this.editModal1 = false;
}
//Bootstrap Modal Close event

 

// For Significant Event
showModal2: boolean;
content2: string;
title2: string;

editModal2: boolean;
//Bootstrap Modal Open event
show_significant_event_add_Modal()
{
  this.showModal2 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title2 = "Significant Event";    // Dynamic Data
}
hide_significant_event_add_Modal()
{
  this.showModal2 = false;
}
editse(se)
{


  this.editinitialclinicsignificanteventForm2.setValue({
    id:se.id,
    unique_id: this.userReg.unique_id,
    name_of_event: se.name_of_event,
    date_of_event:  se.date_of_event                          
    })
  this.editModal2 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.title2 = "Significant Event";    // Dynamic Data
}
hide_significant_event_edit_Modal()
{
  this.editModal2 = false;
}
//Bootstrap Modal Close event



DemographicsDetails;
 DId;

 HealthCheckupsDetails;
 HId;

 HealthGoalsDetails;
 HGId;

 KnownAllergiesDetails;
 KAId;

 SystemsSummaryDetails;
 SSId;

 LifestyleRelatedDetails;
 LRId;

PTDetails;
PTId;

PTDetails2;
PTId2;


PMDetails;
PMId;

PMDetails2;
PMId2;


SEDetails;
SEId;

SEDetails2;
SEId2;

 currentUser = JSON.parse(this.crypt.get('currentUser'));
 userReg;
 profile;
 state;
 city;
 age;
 address;
 dob;
 pincode;
 gender;
 zip;
 height;
 weight;

 groupList:any = [];

 pacticemodalityList:any = [];

 significanteventList:any = [];
 user_uuid =this.currentUser.unique_id;
 first_name =this.currentUser.first_name;
 last_name =this.currentUser.last_name;
 mobile_no =this.currentUser.mobile_no;
 email =this.currentUser.email;

  ngOnInit() {

    this._DataService.getUserProfile(this.user_uuid).subscribe(res => {
      this.profile = res.data[0];
      this.state = res.data[0].state;
      this.city = res.data[0].city;
      this.age = res.data[0].age;
      this.address = res.data[0].address;
      this.dob = res.data[0].dob;
      this.pincode = res.data[0].pincode;
      this.gender = res.data[0].gender;
      this.zip = res.data[0].pincode;
      this.height = res.data[0].height;
      this.weight = res.data[0].weight;
       console.log('User profile: ',this.profile);
       console.log('User state: ',this.state);
       
    });

    this._DataService.getUser(this.currentUser.username).subscribe(res => {
      this.userReg = res.data[0];
     
      this.editinitialclinicdemographicsForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editinitialclinichealthcheckupsForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editinitialclinichealthgoalsForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editinitialclinicknownallergiesForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editinitialclinicsystemssummaryForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editinitialcliniclifestylerelatedForm.patchValue({
        unique_id: this.userReg.unique_id
      });

      this.editinitialclinicpreexistingteatmentForm.patchValue({
        unique_id: this.userReg.unique_id
      });


      this.editinitialclinicpreexistingteatmentForm2.patchValue({
        unique_id: this.userReg.unique_id
      });


      this.editinitialclinicpraticemodalityForm.patchValue({
        unique_id: this.userReg.unique_id
      });


      this.editinitialclinicpraticemodalityForm2.patchValue({
        unique_id: this.userReg.unique_id
      });
 

      this.editinitialclinicsignificanteventForm.patchValue({
        unique_id: this.userReg.unique_id
      });


      this.editinitialclinicsignificanteventForm2.patchValue({
        unique_id: this.userReg.unique_id
      });

      console.log('currentuser', this.currentUser);  
      console.log('currentuser unique id ==', this.currentUser.unique_id);  

      this._DataService.getInitialclinicDemographicsDetails(this.userReg.unique_id).subscribe(res => {
        console.log('demographics det : ', res.data);
        this.DemographicsDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.DId = res.data[0].id;
       }
       else{
        this.DId = 0; 
       }
      console.log('DId == ',this.DId);
        this.editinitialclinicdemographicsForm.setValue({
          unique_id: this.userReg.unique_id,
          first_name: this.first_name,
          middle_name: res.data[0].middle_name,
          last_name: this.last_name,
          gender: this.gender,
          date_of_birth: this.dob,
          age: this.age,
          address_res: this.address,
          city_res: this.city,
          state_res: this.state,
          zip_res: this.pincode,
          address_office: res.data[0].address_office,
          city_office: res.data[0].city_office,
          state_office: res.data[0].state_office,
          zip_office: res.data[0].zip_office,
          home_phone: this.mobile_no,
          email: this.email,
          other_phone: res.data[0].other_phone,
          height_in_cms: res.data[0].height_in_cms,
          weight_in_kgs: res.data[0].weight_in_kgs,
          bmi: res.data[0].bmi,
          spo2: res.data[0].spo2,
          bp: res.data[0].bp,       
          pulse_rate: res.data[0].pulse_rate,
          temperature: res.data[0].temperature,
          neck_circumference: res.data[0].neck_circumference,
          waist_circumference: res.data[0].waist_circumference,
          waist_to_hip_circumference: res.data[0].waist_to_hip_circumference              
        })
    //  }
      });


      this._DataService.getInitialclinicHealthCheckupsDetails(this.userReg.unique_id).subscribe(res => {
        console.log('health checkups : ', res.data);
        this.HealthCheckupsDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.HId = res.data[0].id;
       }
       else{
        this.HId = 0; 
       }
      console.log('HId == ',this.HId);
        this.editinitialclinichealthcheckupsForm.setValue({
          unique_id: this.userReg.unique_id,
          health_checkups_done_in_past: res.data[0].health_checkups_done_in_past,
          frequency_package_name_price: res.data[0].frequency_package_name_price                        
        })
    //  }
      });


      this._DataService.getInitialclinicHealthGoalsDetails(this.userReg.unique_id).subscribe(res => {
        console.log('health goals : ', res.data);
        this.HealthGoalsDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.HGId = res.data[0].id;
       }
       else{
        this.HGId = 0; 
       }
      console.log('HGId == ',this.HGId);
        this.editinitialclinichealthgoalsForm.setValue({
          unique_id: this.userReg.unique_id,
          history_of_present_complaints_with_duration: res.data[0].history_of_present_complaints_with_duration,
          severity_of_symptoms: res.data[0].severity_of_symptoms                        
        })
    //  }
      });

      this._DataService.getInitialclinicKnownAllergiesDetails(this.userReg.unique_id).subscribe(res => {
        console.log('health goals : ', res.data);
        this.KnownAllergiesDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.KAId = res.data[0].id;
       }
       else{
        this.KAId = 0; 
       }
      console.log('KAId == ',this.KAId);
        this.editinitialclinicknownallergiesForm.setValue({
          unique_id: this.userReg.unique_id,
          medicine: res.data[0].medicine,
          food: res.data[0].food,
          metal:res.data[0].metal,
          cloth:res.data[0].cloth,
          environmental:res.data[0].environmental,
          any_other:res.data[0].any_other                     
        })
    //  }
      });


      this._DataService.getInitialclinicSystemssummaryDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Systems summary det : ', res.data);
        this.SystemsSummaryDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.SSId = res.data[0].id;
       }
       else{
        this.SSId = 0; 
       }
      console.log('SSId == ',this.SSId);
        this.editinitialclinicsystemssummaryForm.setValue({
          unique_id: this.userReg.unique_id,
          present_energy_levels_guidelines :  res.data[0].present_energy_levels_guidelines,    
          present_energy_levels_remarks :  res.data[0].present_energy_levels_remarks,       
          weight_change_guidelines :  res.data[0].weight_change_guidelines,    
          weight_change_remarks :  res.data[0].weight_change_remarks,       
          usual_weight_guidelines :  res.data[0].usual_weight_guidelines,     
          usual_weight_remarks :  res.data[0].usual_weight_remarks,        
          excessive_thirst_guidelines :  res.data[0].excessive_thirst_guidelines, 
          excessive_thirst_remarks :  res.data[0].excessive_thirst_remarks,    
          sleep_guidelines :  res.data[0].sleep_guidelines,    
          sleep_remarks :  res.data[0].sleep_remarks,       
          neuropsychiatric_guidelines :  res.data[0].neuropsychiatric_guidelines, 
          neuropsychiatric_remarks :  res.data[0].neuropsychiatric_remarks,    
          hearing_guidelines :  res.data[0].hearing_guidelines,  
          hearing_remarks :  res.data[0].hearing_remarks,     
          vision_guidelines :  res.data[0].vision_guidelines,   
          vision_remarks :  res.data[0].vision_remarks,      
          heart_condition_guidelines :  res.data[0].heart_condition_guidelines,  
          heart_condition_remarks :  res.data[0].heart_condition_remarks,     
          lung_condition_guidelines :  res.data[0].lung_condition_guidelines,   
          lung_condition_remarks :  res.data[0].lung_condition_remarks,      
          stomach_intestinal_conditions_guidelines:  res.data[0].stomach_intestinal_conditions_guidelines,    
          stomach_intestinal_conditions_remarks :  res.data[0].stomach_intestinal_conditions_remarks,       
          muscle_bone_joints_system_guidelines :  res.data[0].muscle_bone_joints_system_guidelines,        
          muscle_bone_joints_system_remarks :  res.data[0].muscle_bone_joints_system_remarks,   
          genitourinary_system_guidelines :  res.data[0].genitourinary_system_guidelines,     
          genitourinary_system_remarks :  res.data[0].genitourinary_system_remarks,        
          skin_hair_guidelines :  res.data[0].skin_hair_guidelines,        
          skin_hair_remarks :  res.data[0].skin_hair_remarks,   
          oral_health_guidelines :  res.data[0].oral_health_guidelines,      
          oral_health_remarks :  res.data[0].oral_health_remarks, 
          goals_guidelines :  res.data[0].goals_guidelines,    
          goals_remarks :  res.data[0].goals_remarks                 
        })
    //  }
      });


      this._DataService.getInitialclinicLifestyleRelatedDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Lifestyle Related det : ', res.data);
        this.LifestyleRelatedDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.LRId = res.data[0].id;
       }
       else{
        this.LRId = 0; 
       }
      console.log('LRId == ',this.LRId);
      this.editinitialcliniclifestylerelatedForm.setValue({
      unique_id: this.userReg.unique_id,
      smoking_yes_no:  res.data[0].smoking_yes_no,
      smoking_daily_hrs:  res.data[0].smoking_daily_hrs,
      smoking_cond_reason:  res.data[0].smoking_cond_reason,
      drinking_yes_no:  res.data[0].drinking_yes_no,
      drinking_daily_hrs:  res.data[0].drinking_daily_hrs,
      drinking_cond_reason:  res.data[0].drinking_cond_reason,
      junk_food_intake_yes_no:  res.data[0].junk_food_intake_yes_no,
      junk_food_intake_daily_hrs:  res.data[0].junk_food_intake_daily_hrs,
      junk_food_intake_cond_reason:  res.data[0].junk_food_intake_cond_reason,
      water_intake_yes_no:  res.data[0].water_intake_yes_no,
      water_intake_daily_hrs:  res.data[0].water_intake_daily_hrs,
      water_intake_cond_reason:  res.data[0].water_intake_cond_reason,
      exercise_yes_no:  res.data[0].exercise_yes_no,
      exercise_daily_hrs:  res.data[0].exercise_daily_hrs,
      exercise_cond_reason:  res.data[0].exercise_cond_reason,
      sleep_yes_no:  res.data[0].sleep_yes_no,
      sleep_daily_hrs:  res.data[0].sleep_daily_hrs,
      sleep_cond_reason:  res.data[0].sleep_cond_reason,
      continous_work_hrs_yes_no:  res.data[0].continous_work_hrs_yes_no,
      continous_work_hrs_daily_hrs:  res.data[0].continous_work_hrs_daily_hrs,
      continous_work_hrs_cond_reason:  res.data[0].continous_work_hrs_cond_reason,
      freq_of_urination_yes_no:  res.data[0].freq_of_urination_yes_no,
      freq_of_urination_daily_hrs:  res.data[0].freq_of_urination_daily_hrs,
      freq_of_urination_cond_reason:  res.data[0].freq_of_urination_cond_reason,
      name_of_physician:  res.data[0].name_of_physician,
      medical_council_reg_no:  res.data[0].medical_council_reg_no,
      phone:  res.data[0].phone,
      email:  res.data[0].email,
      name_of_person_fill_out_this_form:  res.data[0].name_of_person_fill_out_this_form,
      name_of_person_assisting_fill_out_this_form:  res.data[0].name_of_person_assisting_fill_out_this_form,
      any_additional_general_comments:  res.data[0].any_additional_general_comments                
      })
    //  }
      });


      this._DataService.getInitialclinicPreexistingTreatmentDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Pre existing treatment det : ', res.data);
        this.PTDetails = res.data[0];
        this.PTDetails2 = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PTId = res.data[0].id;
        this.PTId2 = res.data[0].id;
       }
       else{
        this.PTId = 0; 
        this.PTId2 = 0; 
       }
      console.log('PTId == ',this.PTId);
      console.log('PTId2 == ',this.PTId2);

      // this.editinitialclinicpreexistingteatmentForm2.setValue({
      //   unique_id: this.userReg.unique_id,
      //   name_of_medication:  res.data[0].name_of_medication,
      //   strength:  res.data[0].strength,
      //   dose:  res.data[0].dose,
      //   duration:  res.data[0].duration,
      //   dependency_on_medicines:  res.data[0].dependency_on_medicines                     
      //   })

      res.data.forEach((element, i) => {
        this.groupList[i] = {
          id: element.id,
          name_of_medication: element.name_of_medication,
          strength: element.strength,
          dose: element.dose,
          duration: element.duration,
          dependency_on_medicines: element.dependency_on_medicines
        };
      });      
     
      });



      this._DataService.getInitialclinicPracticemodalityDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Practice Modality det : ', res.data);
        this.PMDetails = res.data[0];
        this.PMDetails2 = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PMId = res.data[0].id;
        this.PMId2 = res.data[0].id;
       }
       else{
        this.PMId = 0; 
        this.PMId2 = 0; 
       }
      console.log('PMId == ',this.PMId);
      console.log('PMId2 == ',this.PMId2);


      res.data.forEach((element, i) => {
        this.pacticemodalityList[i] = {
          id: element.id,
          name_of_medication: element.name_of_medication,
          strength: element.strength,
          dose: element.dose,
          reason_for_taking: element.reason_for_taking
        };
      });      
     
      });



      this._DataService.getInitialclinicSignificanteventDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Significant event det : ', res.data);
        this.SEDetails = res.data[0];
        this.SEDetails2 = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.SEId = res.data[0].id;
        this.SEId2 = res.data[0].id;
       }
       else{
        this.SEId = 0; 
        this.SEId2 = 0; 
       }
      console.log('SEId == ',this.SEId);
      console.log('SEId2 == ',this.SEId2);


      res.data.forEach((element, i) => {
        this.significanteventList[i] = {
          id: element.id,
          name_of_event: element.name_of_event,
          date_of_event: element.date_of_event
        };
      });      
     
      });


    
    })
  }


//Insert Edit Initial Clinic Demographics Details
editinitialclinicdemographics() { 

  var initialclinicdemographicsEdit = {   
  "id":this.DId,
  "unique_id" : this.editinitialclinicdemographicsForm.value.unique_id,    
  "first_name" : this.editinitialclinicdemographicsForm.value.first_name,
  "middle_name" : this.editinitialclinicdemographicsForm.value.middle_name,
  "last_name" : this.editinitialclinicdemographicsForm.value.last_name,
  "gender" : this.editinitialclinicdemographicsForm.value.gender,
  "date_of_birth" : this.editinitialclinicdemographicsForm.value.date_of_birth,
  "age" : this.editinitialclinicdemographicsForm.value.age,
  "address_res" : this.editinitialclinicdemographicsForm.value.address_res,
  "city_res" : this.editinitialclinicdemographicsForm.value.city_res,
  "state_res" : this.editinitialclinicdemographicsForm.value.state_res,
  "zip_res" : this.editinitialclinicdemographicsForm.value.zip_res,
  "address_office" : this.editinitialclinicdemographicsForm.value.address_office,
  "city_office" : this.editinitialclinicdemographicsForm.value.city_office,
  "state_office" : this.editinitialclinicdemographicsForm.value.state_office,
  "zip_office" : this.editinitialclinicdemographicsForm.value.zip_office,
  "home_phone" : this.editinitialclinicdemographicsForm.value.home_phone,
  "email" : this.editinitialclinicdemographicsForm.value.email,
  "other_phone" : this.editinitialclinicdemographicsForm.value.other_phone,
  "height_in_cms" : this.editinitialclinicdemographicsForm.value.height_in_cms,
  "weight_in_kgs" : this.editinitialclinicdemographicsForm.value.weight_in_kgs,
  "bmi" : this.editinitialclinicdemographicsForm.value.bmi,
  "spo2" : this.editinitialclinicdemographicsForm.value.spo2,
  "bp" : this.editinitialclinicdemographicsForm.value.bp,       
  "pulse_rate" : this.editinitialclinicdemographicsForm.value.pulse_rate,
  "temperature" : this.editinitialclinicdemographicsForm.value.temperature,
  "neck_circumference" : this.editinitialclinicdemographicsForm.value.neck_circumference,
  "waist_circumference" : this.editinitialclinicdemographicsForm.value.waist_circumference,
  "waist_to_hip_circumference" : this.editinitialclinicdemographicsForm.value.waist_to_hip_circumference 
}
 
 
   this._DataService.InsertInitialclinicDemographicsDetails(initialclinicdemographicsEdit).subscribe(res=>{
     console.log('Demographics Details res'+res);
     console.log('Demographics Details success == '+res.success);
     if(res.success==true){
       alert("Demographics Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']);
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


 //Insert Edit Initial Clinic Health Checkups Details
 editinitialclinichealthcheckups() { 

  var initialclinicHealthCheckupsEdit = {   
  "id":this.HId,
  "unique_id" : this.editinitialclinichealthcheckupsForm.value.unique_id,    
  "health_checkups_done_in_past" : this.editinitialclinichealthcheckupsForm.value.health_checkups_done_in_past,
  "frequency_package_name_price" : this.editinitialclinichealthcheckupsForm.value.frequency_package_name_price 
}
 
 
   this._DataService.InsertInitialclinicHealthCheckupsDetails(initialclinicHealthCheckupsEdit).subscribe(res=>{
     console.log('Health Checkups Details res'+res);
     console.log('Health Checkups Details success == '+res.success);
     if(res.success==true){
       alert("Health Checkups Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


  //Insert Edit Initial Clinic Health Goals Details
  editinitialclinichealthgoals() { 

    var initialclinicHealthGoalsEdit = {   
    "id":this.HGId,
    "unique_id" : this.editinitialclinichealthgoalsForm.value.unique_id,    
    "history_of_present_complaints_with_duration" : this.editinitialclinichealthgoalsForm.value.history_of_present_complaints_with_duration,
    "severity_of_symptoms" : this.editinitialclinichealthgoalsForm.value.severity_of_symptoms 
  }
   
   
     this._DataService.InsertInitialclinicHealthGoalsDetails(initialclinicHealthGoalsEdit).subscribe(res=>{
       console.log('Health Goals Details res'+res);
       console.log('Health Goals Details success == '+res.success);
       if(res.success==true){
         alert("Health Goals Details Updated Successfully!");
        
        // location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
          this.router.navigate(['./profile/initialclinicform']); 
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }
  
 //Insert Edit Initial Clinic Known Allegies Details
 editinitialclinicknownallergies() { 

  var initialclinicKnownAllergiesEdit = {   
  "id":this.KAId,
  "unique_id" : this.editinitialclinicknownallergiesForm.value.unique_id,    
  "medicine" : this.editinitialclinicknownallergiesForm.value.medicine,
  "food" : this.editinitialclinicknownallergiesForm.value.food, 
  "metal" : this.editinitialclinicknownallergiesForm.value.metal, 
  "cloth" : this.editinitialclinicknownallergiesForm.value.cloth, 
  "environmental" : this.editinitialclinicknownallergiesForm.value.environmental, 
  "any_other" : this.editinitialclinicknownallergiesForm.value.any_other
}
 
 
   this._DataService.InsertInitialclinicKnownAllergiesDetails(initialclinicKnownAllergiesEdit).subscribe(res=>{
     console.log('Known Allergies Details res'+res);
     console.log('Known Allergies Details success == '+res.success);
     if(res.success==true){
       alert("Known Allergies Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


//Insert Edit Initial Clinic Systems Summary Details
editinitialclinicsystemssummary() { 

  var initialclinicsystemssummaryEdit = {   
  "id":this.SSId,
  "unique_id" : this.editinitialclinicsystemssummaryForm.value.unique_id,    
  "present_energy_levels_guidelines" :  this.editinitialclinicsystemssummaryForm.value.present_energy_levels_guidelines,    
  "present_energy_levels_remarks" :  this.editinitialclinicsystemssummaryForm.value.present_energy_levels_remarks,       
  "weight_change_guidelines" :  this.editinitialclinicsystemssummaryForm.value.weight_change_guidelines,    
  "weight_change_remarks" :  this.editinitialclinicsystemssummaryForm.value.weight_change_remarks,       
  "usual_weight_guidelines" :  this.editinitialclinicsystemssummaryForm.value.usual_weight_guidelines,     
  "usual_weight_remarks" :  this.editinitialclinicsystemssummaryForm.value.usual_weight_remarks,        
  "excessive_thirst_guidelines" :  this.editinitialclinicsystemssummaryForm.value.excessive_thirst_guidelines, 
  "excessive_thirst_remarks" :  this.editinitialclinicsystemssummaryForm.value.excessive_thirst_remarks,    
  "sleep_guidelines" :  this.editinitialclinicsystemssummaryForm.value.sleep_guidelines,    
  "sleep_remarks" :  this.editinitialclinicsystemssummaryForm.value.sleep_remarks,       
  "neuropsychiatric_guidelines" :  this.editinitialclinicsystemssummaryForm.value.neuropsychiatric_guidelines, 
  "neuropsychiatric_remarks" :  this.editinitialclinicsystemssummaryForm.value.neuropsychiatric_remarks,    
  "hearing_guidelines" :  this.editinitialclinicsystemssummaryForm.value.hearing_guidelines,  
  "hearing_remarks" :  this.editinitialclinicsystemssummaryForm.value.hearing_remarks,     
  "vision_guidelines" :  this.editinitialclinicsystemssummaryForm.value.vision_guidelines,   
  "vision_remarks" :  this.editinitialclinicsystemssummaryForm.value.vision_remarks,      
  "heart_condition_guidelines" :  this.editinitialclinicsystemssummaryForm.value.heart_condition_guidelines,  
  "heart_condition_remarks" :  this.editinitialclinicsystemssummaryForm.value.heart_condition_remarks,     
  "lung_condition_guidelines" :  this.editinitialclinicsystemssummaryForm.value.lung_condition_guidelines,   
  "lung_condition_remarks" :  this.editinitialclinicsystemssummaryForm.value.lung_condition_remarks,      
  "stomach_intestinal_conditions_guidelines":  this.editinitialclinicsystemssummaryForm.value.stomach_intestinal_conditions_guidelines,    
  "stomach_intestinal_conditions_remarks" :  this.editinitialclinicsystemssummaryForm.value.stomach_intestinal_conditions_remarks,       
  "muscle_bone_joints_system_guidelines" :  this.editinitialclinicsystemssummaryForm.value.muscle_bone_joints_system_guidelines,        
  "muscle_bone_joints_system_remarks" :  this.editinitialclinicsystemssummaryForm.value.muscle_bone_joints_system_remarks,   
  "genitourinary_system_guidelines" :  this.editinitialclinicsystemssummaryForm.value.genitourinary_system_guidelines,     
  "genitourinary_system_remarks" :  this.editinitialclinicsystemssummaryForm.value.genitourinary_system_remarks,        
  "skin_hair_guidelines" :  this.editinitialclinicsystemssummaryForm.value.skin_hair_guidelines,        
  "skin_hair_remarks" :  this.editinitialclinicsystemssummaryForm.value.skin_hair_remarks,   
  "oral_health_guidelines" :  this.editinitialclinicsystemssummaryForm.value.oral_health_guidelines,      
  "oral_health_remarks" :  this.editinitialclinicsystemssummaryForm.value.oral_health_remarks, 
  "goals_guidelines" :  this.editinitialclinicsystemssummaryForm.value.goals_guidelines,    
  "goals_remarks" :  this.editinitialclinicsystemssummaryForm.value.goals_remarks      
}
 
 
   this._DataService.InsertInitialclinicSystemssummaryDetails(initialclinicsystemssummaryEdit).subscribe(res=>{
     console.log('Systems Summary Details res'+res);
     console.log('Systems Summary Details success == '+res.success);
     if(res.success==true){
       alert("Systems Summary Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

//Insert Edit Initial Clinic Lifestyle Related Details
editinitialcliniclifestylerelated() { 

  var initialcliniclifestylerelatedEdit = {   
  "id":this.LRId,
  "unique_id" : this.editinitialcliniclifestylerelatedForm.value.unique_id,    
  "smoking_yes_no" : this.editinitialcliniclifestylerelatedForm.value.smoking_yes_no,
  "smoking_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.smoking_daily_hrs,
  "smoking_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.smoking_cond_reason,
  "drinking_yes_no" : this.editinitialcliniclifestylerelatedForm.value.drinking_yes_no,
  "drinking_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.drinking_daily_hrs,
  "drinking_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.drinking_cond_reason,
  "junk_food_intake_yes_no" : this.editinitialcliniclifestylerelatedForm.value.junk_food_intake_yes_no,
  "junk_food_intake_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.junk_food_intake_daily_hrs,
  "junk_food_intake_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.junk_food_intake_cond_reason,
  "water_intake_yes_no" : this.editinitialcliniclifestylerelatedForm.value.water_intake_yes_no,
  "water_intake_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.water_intake_daily_hrs,
  "water_intake_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.water_intake_cond_reason,
  "exercise_yes_no" : this.editinitialcliniclifestylerelatedForm.value.exercise_yes_no,
  "exercise_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.exercise_daily_hrs,
  "exercise_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.exercise_cond_reason,
  "sleep_yes_no" : this.editinitialcliniclifestylerelatedForm.value.sleep_yes_no,
  "sleep_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.sleep_daily_hrs,
  "sleep_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.sleep_cond_reason,
  "continous_work_hrs_yes_no" : this.editinitialcliniclifestylerelatedForm.value.continous_work_hrs_yes_no,
  "continous_work_hrs_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.continous_work_hrs_daily_hrs,
  "continous_work_hrs_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.continous_work_hrs_cond_reason,
  "freq_of_urination_yes_no" : this.editinitialcliniclifestylerelatedForm.value.freq_of_urination_yes_no,
  "freq_of_urination_daily_hrs" : this.editinitialcliniclifestylerelatedForm.value.freq_of_urination_daily_hrs,
  "freq_of_urination_cond_reason" : this.editinitialcliniclifestylerelatedForm.value.freq_of_urination_cond_reason,
  "name_of_physician" : this.editinitialcliniclifestylerelatedForm.value.name_of_physician,
  "medical_council_reg_no" : this.editinitialcliniclifestylerelatedForm.value.medical_council_reg_no,
  "phone" : this.editinitialcliniclifestylerelatedForm.value.phone,
  "email" : this.editinitialcliniclifestylerelatedForm.value.email,
  "name_of_person_fill_out_this_form" : this.editinitialcliniclifestylerelatedForm.value.name_of_person_fill_out_this_form,
  "name_of_person_assisting_fill_out_this_form" : this.editinitialcliniclifestylerelatedForm.value.name_of_person_assisting_fill_out_this_form,
  "any_additional_general_comments" : this.editinitialcliniclifestylerelatedForm.value.any_additional_general_comments     
}
 
 
   this._DataService.InsertInitialclinicLifestyleRelatedDetails(initialcliniclifestylerelatedEdit).subscribe(res=>{
     console.log('Lifestyle Related Details res'+res);
     console.log('Lifestyle Related Details success == '+res.success);
     if(res.success==true){
       alert("Lifestyle Related Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


 //Insert Initial Clinic Pre Existing Details Details
 addinitialclinicpreexistingteatment() { 

  var initialclinicpreexistingtreatmentEdit = {   
  "id":0,
  "unique_id" : this.editinitialclinicpreexistingteatmentForm.value.unique_id,    
  "name_of_medication" : this.editinitialclinicpreexistingteatmentForm.value.name_of_medication,
  "strength" : this.editinitialclinicpreexistingteatmentForm.value.strength, 
  "dose" : this.editinitialclinicpreexistingteatmentForm.value.dose, 
  "duration" : this.editinitialclinicpreexistingteatmentForm.value.duration, 
  "dependency_on_medicines" : this.editinitialclinicpreexistingteatmentForm.value.dependency_on_medicines
}
 
 
   this._DataService.InsertInitialclinicPreexistingTreatmentDetails(initialclinicpreexistingtreatmentEdit).subscribe(res=>{
     console.log('Pre Existing Treatment Details res'+res);
     console.log('Pre Existing Treatment Details success == '+res.success);
     if(res.success==true){
       alert("Pre Existing Treatment Details Added Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Edit Initial Clinic Pre Existing Details Details
 editpreexistingdetails() { 


  //console.log('ptd id == ',id);
  var initialclinicpreexistingtreatmentEdit = {   
  "id":this.editinitialclinicpreexistingteatmentForm2.value.id,
  "unique_id" : this.editinitialclinicpreexistingteatmentForm2.value.unique_id,    
  "name_of_medication" : this.editinitialclinicpreexistingteatmentForm2.value.name_of_medication,
  "strength" : this.editinitialclinicpreexistingteatmentForm2.value.strength, 
  "dose" : this.editinitialclinicpreexistingteatmentForm2.value.dose, 
  "duration" : this.editinitialclinicpreexistingteatmentForm2.value.duration, 
  "dependency_on_medicines" : this.editinitialclinicpreexistingteatmentForm2.value.dependency_on_medicines
}
 
 
   this._DataService.InsertInitialclinicPreexistingTreatmentDetails(initialclinicpreexistingtreatmentEdit).subscribe(res=>{
     console.log('Pre Existing Treatment Details res edit =='+res);
     console.log('Pre Existing Treatment Details success edit == '+res.success);
     if(res.success==true){
       alert("Pre Existing Treatment Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 deletepreexistingdetails(ptd)
 {
//console.log('ptd id == ',id);
var ptddelete = {   
  "id":ptd.id 
}
 
 
   this._DataService.deleteInitialclinicPreexistingTreatmentDetails(ptddelete).subscribe(res=>{
     console.log('Pre Existing Treatment Details res edit =='+res);
     console.log('Pre Existing Treatment Details success edit == '+res.success);
     if(res.success==true){
       alert("Pre Existing Treatment Details Deleted Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });
 }

 //Insert Initial Clinic Practice Modality Details Details
 addinitialclinicpraticemodality() { 

  var initialclinicpracticemodalityEdit = {   
  "id":0,
  "unique_id" : this.editinitialclinicpraticemodalityForm.value.unique_id,    
  "name_of_medication" : this.editinitialclinicpraticemodalityForm.value.name_of_medication_pm,
  "strength" : this.editinitialclinicpraticemodalityForm.value.strength_pm, 
  "dose" : this.editinitialclinicpraticemodalityForm.value.dose_pm, 
  "reason_for_taking" : this.editinitialclinicpraticemodalityForm.value.reason_for_taking_pm
}
 
 
   this._DataService.InsertInitialclinicPracticemodalityDetails(initialclinicpracticemodalityEdit).subscribe(res=>{
     console.log('Practice Modality Details res'+res);
     console.log('Practice Modality Details success == '+res.success);
     if(res.success==true){
       alert("Practice Modality Details Added Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Edit Initial Clinic Practice Modality Details Details
 editinitialclinicpraticemodality() { 


  //console.log('ptd id == ',id);
  var initialclinicpmEdit = {   
  "id":this.editinitialclinicpraticemodalityForm2.value.id,
  "unique_id" : this.editinitialclinicpraticemodalityForm2.value.unique_id,    
  "name_of_medication" : this.editinitialclinicpraticemodalityForm2.value.name_of_medication_pm,
  "strength" : this.editinitialclinicpraticemodalityForm2.value.strength_pm, 
  "dose" : this.editinitialclinicpraticemodalityForm2.value.dose_pm, 
  "reason_for_taking" : this.editinitialclinicpraticemodalityForm2.value.reason_for_taking_pm
}
 
 
   this._DataService.InsertInitialclinicPracticemodalityDetails(initialclinicpmEdit).subscribe(res=>{
     console.log('Practice Modality Details res edit =='+res);
     console.log('Practice Modality Details success edit == '+res.success);
     if(res.success==true){
       alert("Practice Modality Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 deletepm(pm) { 


  //console.log('ptd id == ',id);
  var pmDelete = {   
  "id":pm.id
  }
 
 
   this._DataService.deleteInitialclinicPracticemodalityDetails(pmDelete).subscribe(res=>{
     console.log('Practice Modality Details res edit =='+res);
     console.log('Practice Modality Details success edit == '+res.success);
     if(res.success==true){
       alert("Practice Modality Details Deleted Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/initialclinicform']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Insert Initial Clinic Significant Event Details Details
 addinitialclinicsignificantevent() { 

  var initialclinicsignificanteventEdit = {   
  "id":0,
  "unique_id" : this.editinitialclinicsignificanteventForm.value.unique_id,    
  "name_of_event" : this.editinitialclinicsignificanteventForm.value.name_of_event,
  "date_of_event" : this.editinitialclinicsignificanteventForm.value.date_of_event
}
 
 
   this._DataService.InsertInitialclinicSignificanteventDetails(initialclinicsignificanteventEdit).subscribe(res=>{
     console.log('Significant Event Details res'+res);
     console.log('Significant Event Details success == '+res.success);
     if(res.success==true){
       alert("Significant Event Details Added Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Edit Initial Clinic Significant Event Details Details
 editinitialclinicsignificantevent() { 


  //console.log('ptd id == ',id);
  var initialclinicseEdit = {   
  "id":this.editinitialclinicsignificanteventForm2.value.id,
  "unique_id" : this.editinitialclinicsignificanteventForm2.value.unique_id,    
  "name_of_event" : this.editinitialclinicsignificanteventForm2.value.name_of_event,
  "date_of_event" : this.editinitialclinicsignificanteventForm2.value.date_of_event
}
 
 
   this._DataService.InsertInitialclinicSignificanteventDetails(initialclinicseEdit).subscribe(res=>{
     console.log('Significant Event Details res edit =='+res);
     console.log('Significant Event Details success edit == '+res.success);
     if(res.success==true){
       alert("Significant Event Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Edit Initial Clinic Significant Event Details Details
 deletese(se) { 


  //console.log('ptd id == ',id);
  var seDelete = {   
  "id":se.id  
}
 
 
   this._DataService.deleteInitialclinicSignificanteventDetails(seDelete).subscribe(res=>{
     console.log('Significant Event Details res edit =='+res);
     console.log('Significant Event Details success edit == '+res.success);
     if(res.success==true){
       alert("Significant Event Details Delete Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 add() {
  const details: PreexistingTreatmentDetails = {
    id: 0,
    name_of_medication: '',
    strength: '',
    dose: '',
    duration: '',
    dependency_on_medicines:''
  };
  this.preexistingDetails.push(details);
  console.log('preexisting Details: ', this.preexistingDetails);
}
}
interface PreexistingTreatmentDetails {
  id: number;
  name_of_medication: string;
  strength: string;
  dose: string;
  duration: string;
  dependency_on_medicines:string;
}