import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-healthnutritionalform',
  templateUrl: './healthnutritionalform.component.html',
  styleUrls: ['./healthnutritionalform.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class HealthnutritionalformComponent implements OnInit {

  public edithealthnutassessmentform: FormGroup;
  public editFamilyMedicalHistoryform: FormGroup;
  public editGeneralHealthInfoForm: FormGroup;
  public editPimaryConcernsForm: FormGroup;

  public editMedHistForm: FormGroup;
  public editLifestyleInfoForm: FormGroup;

  public editMedListForm: FormGroup;
  public editMedListForm1: FormGroup;

  public editSuppListForm: FormGroup;
  public editSuppListForm1: FormGroup;  
  

  constructor(private formBuilder: FormBuilder, private _DataService: ApigatewayService, private storage: AngularFireStorage, 
    private router: Router, private crypt: CryptService) {
      
      
      this.edithealthnutassessmentform = this.formBuilder.group({
        unique_id: [''],    
        uuid: ['', Validators.required],
        prescription_no: ['', Validators.required],
        membership_no: ['', Validators.required],
        date_of_assessment: ['', Validators.required],
        time_of_assessment: ['', Validators.required],
        mode_of_assessment: ['', Validators.required],
        first_name: ['', Validators.required],
        middle_name: ['', Validators.required],
        last_name: ['', Validators.required],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        age: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        home_telephone: ['', Validators.required],
        email: ['', Validators.required],
        status: ['', Validators.required],
        do_have_children: ['', Validators.required],
         how_many_children: ['', Validators.required],
        age_of_children: ['', Validators.required],
        height: ['', Validators.required],
        weight: ['', Validators.required],
        bmi: ['', Validators.required],
        spo2: ['', Validators.required],
        heart_rate: ['', Validators.required],
        blood_pressure_diastolic: ['', Validators.required],
        blood_pressure_systolic: ['', Validators.required],
        ecg_interpretation_lead_3: ['', Validators.required],
         ecg_interpretation_lead_12: ['', Validators.required]       
      });

      this.editFamilyMedicalHistoryform = this.formBuilder.group({
        unique_id: [''],    
        mother_age: ['', Validators.required],
        mother_general_health: ['', Validators.required],
        mother_disease: ['', Validators.required],
        father_age: ['', Validators.required],
        father_general_health: ['', Validators.required],
        father_disease: ['', Validators.required],
        sibling_1_age: ['', Validators.required],
        sibling_1_general_health: ['', Validators.required],
        sibling_1_disease: ['', Validators.required],
        sibling_2_age: ['', Validators.required],
        sibling_2_general_health: ['', Validators.required],
        sibling_2_disease: ['', Validators.required],
        sibling_3_age: ['', Validators.required],
        sibling_3_general_health: ['', Validators.required],
        sibling_3_disease: ['', Validators.required],
        children_age: ['', Validators.required],
        children_general_health: ['', Validators.required],
        children_disease: ['', Validators.required],
        grandparent_1_age: ['', Validators.required],
         grandparent_1_general_health: ['', Validators.required],
        grandparent_1_disease: ['', Validators.required],
        grandparent_2_age: ['', Validators.required],
        grandparent_2_general_health: ['', Validators.required],
        grandparent_2_disease: ['', Validators.required]      
      });

      this.editGeneralHealthInfoForm = this.formBuilder.group({
        unique_id: [''], 
        blood_type: ['', Validators.required],
        weight: ['', Validators.required],
        weight_gain_or_loss: ['', Validators.required],
        energy_level_during_day: ['', Validators.required],
        no_of_bowel_movements_per_day: ['', Validators.required],
        no_of_bowel_movements_per_week: ['', Validators.required],
        bowel_health_condition: ['', Validators.required],
        color_of_bowel_movement: ['', Validators.required],
        digestive_issues: ['', Validators.required],
        experience_health_problems: ['', Validators.required],
        experience_diagnosed_conditions: ['', Validators.required],
        other_details: ['', Validators.required],
        female_birth_control: ['', Validators.required],
        type_of_female_birth_control: ['', Validators.required],
        periods_stopped: ['', Validators.required],
        periods_entire_cycle: ['', Validators.required],
        avg_no_days_periods_last: ['', Validators.required],
        pms_symptoms: ['', Validators.required],
        menopausal_symptoms: ['', Validators.required],
        do_u_smoke: ['', Validators.required],
        smoke_in_past: ['', Validators.required],
        exposed_to_second_hand_smoke: ['', Validators.required],
        do_u_use_recreational_drugs: ['', Validators.required],
        silver_amalgam_fillings: ['', Validators.required],
        how_long_u_take_silver_amalgam_fillings: ['', Validators.required],
        root_canals: ['', Validators.required],
        exposed_to_any_chemicals: ['', Validators.required],
        use_home_fragrance: ['', Validators.required]      
      });

      this.editPimaryConcernsForm = this.formBuilder.group({
        unique_id: [''], 
        main_concerns: ['', Validators.required],
        issues_how_long: ['', Validators.required],
        diagnosed_by_doctor: ['', Validators.required],
        concerned_affect_daily_life: ['', Validators.required],
        illness_conditions: ['', Validators.required]      
      });

      this.editMedHistForm = this.formBuilder.group({
        unique_id: [''],    
        previous_hospitalization: ['', Validators.required],
        any_organs_removed: ['', Validators.required],
        food_allergies: ['', Validators.required],
        env_or_seasonal_allergies: ['', Validators.required],
        any_medications_taken_in_past: ['', Validators.required],
        any_suppliments_currently_taking: ['', Validators.required]     
      });

      this.editLifestyleInfoForm = this.formBuilder.group({
        unique_id: [''],
        cups_of_water: ['', Validators.required],
        cups_of_coffee: ['', Validators.required],
        cups_of_wine: ['', Validators.required],
        cups_of_milk: ['', Validators.required],
        cups_of_soft_drink: ['', Validators.required],
        cups_of_liquor: ['', Validators.required],
        cups_of_juice: ['', Validators.required],
        cups_of_diet_soft_drink: ['', Validators.required],
        cups_of_beer: ['', Validators.required],
        cups_of_tea: ['', Validators.required],
        cups_of_herbal_tea: ['', Validators.required],
        do_u_eat_out_or_restaurants: ['', Validators.required],
        who_does_grocery_shopping: ['', Validators.required],
        who_does_cooking: ['', Validators.required],
        do_u_eat_late_night: ['', Validators.required],
        foods_u_crave_most: ['', Validators.required],
        foods_u_crave_least: ['', Validators.required],
        dietary_restrictions: ['', Validators.required],
        currently_exercise: ['', Validators.required],
        exercise_for_how_long: ['', Validators.required],
         what_makes_u_happy: ['', Validators.required],
        what_makes_u_worry: ['', Validators.required],
        take_sleep_each_night: ['', Validators.required],
        describe_quality_of_sleep: ['', Validators.required],
        do_u_wake_up_feeling_rested: ['', Validators.required],
        do_u_falling_asleep: ['', Validators.required],
        expectations_of_this_prog: ['', Validators.required],
        experience_of_past_of_this_prog: ['', Validators.required],
        any_otherthing_u_need_to_address: ['', Validators.required]      
      });

      
      this.editMedListForm = this.formBuilder.group({
        unique_id: [''], 
        medical_history_id:[''],      
        name_of_medication: [''],
        when_taken_medication: [''],
        how_long: ['']                       
      });

      this.editMedListForm1 = this.formBuilder.group({
        id:[''],
        unique_id: [''],
        medical_history_id:[''],       
        name_of_medication: [''],
        when_taken_medication: [''],
        how_long: ['']                        
      });

        
      this.editSuppListForm = this.formBuilder.group({
        unique_id: [''], 
        medical_history_id:[''],      
        suppliment_herb:[''],
        name_of_brand:[''],
        amount_taken:[''],
        when_taken_suppliment:[''],
        how_long:['']                  
      });

      this.editSuppListForm1 = this.formBuilder.group({
        id:[''],
        unique_id: [''],
        medical_history_id:[''],       
        suppliment_herb:[''],
        name_of_brand:[''],
        amount_taken:[''],
        when_taken_suppliment:[''],
        how_long:['']                         
      });
      


    }

    statusarr = [
      {id: 1, name: 'Single',value: 'Single',checked:false},
      {id: 2, name: 'Common-Law',value: 'Common-Law',checked:false},
      {id: 3, name: 'Married',value: 'Married',checked:false},
      {id: 4, name: 'Seperated',value: 'Seperated',checked:false},
      {id: 5, name: 'Divorced',value: 'Divorced',checked:false},
      {id: 6, name: 'Widowed',value: 'Widowed',checked:false},      
  ];

  experiencehealthprobarr=[
    {id: 1, name: 'Weight loss',value: 'Weight loss',checked:false},
    {id: 2, name: 'Poor appetite',value: 'Poor appetite',checked:false},
    {id: 3, name: 'Problems falling asleep',value: 'Problems falling asleep',checked:false},
    {id: 4, name: 'Weight gain',value: 'Weight gain',checked:false},
    {id: 5, name: 'Bruise easily',value: 'Bruise easily',checked:false},
    {id: 6, name: 'Issues staying asleep',value: 'Issues staying asleep',checked:false}, 
    {id: 7, name: 'Change in appetite',value: 'Change in appetite',checked:false},   
    {id: 8, name: 'Poor balance ',value: 'Poor balance ',checked:false},  
  ];  

  experiencediagnosecondbarr=[
    {id: 1, name: 'Arthritis',value: 'Arthritis',checked:false},
    {id: 2, name: 'Diabetes',value: 'Diabetes',checked:false},
    {id: 3, name: 'Thyroid condition',value: 'Thyroid condition',checked:false},
    {id: 4, name: 'Pneumonia',value: 'Pneumonia',checked:false},
    {id: 5, name: 'Anemia',value: 'Anemia',checked:false},
    {id: 6, name: 'Anorexia-Bulimia',value: 'Anorexia-Bulimia',checked:false}, 
    {id: 7, name: 'Appendicitis',value: 'Appendicitis',checked:false},
    {id: 8, name: 'Seizures',value: 'Seizures',checked:false},
    {id: 9, name: 'Emphysema',value: 'Emphysema',checked:false}, 
    {id: 10, name: 'Epilepsy',value: 'Epilepsy',checked:false},
    {id: 11, name: 'Hepatitis',value: 'Hepatitis',checked:false},
    {id: 12, name: 'Eczema',value: 'Eczema',checked:false},
    {id: 13, name: 'Heart condition',value: 'Heart condition',checked:false},
    {id: 14, name: 'High-Low Blood Pressure',value: 'High-Low Blood Pressure',checked:false},
    {id: 15, name: 'Asthma',value: 'Asthma',checked:false}, 
    {id: 16, name: 'Crohns Disease',value: 'Crohns Disease',checked:false},
    {id: 17, name: 'Irritable Bowel',value: 'Irritable Bowel',checked:false},
    {id: 18, name: 'Osteoporosis',value: 'Osteoporosis',checked:false}, 
    {id: 19, name: 'Hypoglycemia',value: 'Hypoglycemia',checked:false},
    {id: 20, name: 'Gall Bladder problems',value: 'Gall Bladder problems',checked:false},
    {id: 21, name: 'Prostate problems',value: 'Prostate problems',checked:false},
    {id: 22, name: 'Endometriosis',value: 'Endometriosis',checked:false},
    {id: 23, name: 'Psoriasis',value: 'Psoriasis',checked:false}, 
    {id: 24, name: 'Fibromyalgia',value: 'Fibromyalgia',checked:false},
    {id: 25, name: 'Chronic Fatigue Syndrome',value: 'Chronic Fatigue Syndrome',checked:false},
   
  ];

  usehomefragrancearr=[
    {id: 1, name: 'Perfume-Cologne',value: 'Perfume-Cologne',checked:false},
    {id: 2, name: 'Aluminum cookware',value: 'Aluminum cookware',checked:false},
    {id: 3, name: 'Artificial sweeteners',value: 'Artificial sweeteners',checked:false},
    {id: 4, name: 'Household cleaners',value: 'Household cleaners',checked:false},
    {id: 5, name: 'Luncheon meats',value: 'Luncheon meats',checked:false},
    {id: 6, name: 'Air freshners',value: 'Air freshners',checked:false}, 
    {id: 7, name: 'Margarine',value: 'Margarine',checked:false},
    {id: 8, name: 'Fast foods',value: 'Fast foods',checked:false},   
  ];

showModal3: boolean;
content3: string;
mltitle: string;

editModal4: boolean;
//Bootstrap Modal Open event
showml()
{
  this.showModal3 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.mltitle = "List of Any Medications";    // Dynamic Data
}

editml(ml)
{


  this.editMedListForm1.setValue({
    id:ml.id,
    unique_id: this.userReg.unique_id,
    medical_history_id:ml.medical_history_id,
    name_of_medication: ml.name_of_medication,
    when_taken_medication:  ml.when_taken_medication,
    how_long:  ml.how_long                    
    })
  this.editModal4 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.mltitle = "List of Any Medications";    // Dynamic Data
}
hide4()
{
  this.editModal4 = false;
}
//Bootstrap Modal Close event
hide3()
{
  this.showModal3 = false;
}
 
// Supp List

showModal5: boolean;
content5: string;
sltitle: string;

editModal6: boolean;
//Bootstrap Modal Open event
showsl()
{
  this.showModal5 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.sltitle = "List of All Suppliments";    // Dynamic Data
}

editsl(sl)
{    this.editSuppListForm1.setValue({
      id:sl.id,
      unique_id: this.userReg.unique_id,
      medical_history_id:sl.medical_history_id,           
      suppliment_herb:sl.suppliment_herb, 
      name_of_brand:sl.name_of_brand, 
      amount_taken:sl.amount_taken, 
      when_taken_suppliment:sl.when_taken_suppliment, 
      how_long:sl.how_long                    
    })
  this.editModal6 = true; // Show-Hide Modal Check
 // this.content = "Add Pre-Existing & Existing Treatment Summary"; // Dynamic Data
  this.sltitle = "List of All Suppliments";    // Dynamic Data
}
hide6()
{
  this.editModal6 = false;
}
//Bootstrap Modal Close event
hide5()
{
  this.showModal5 = false;
}

medList:any = [];
suppList:any = [];

    AssessmentDetails;
    AssDId;

    MedicalHistoryDetails;
    MedHistId;

    GenHealthDetails;
    GenHealthId;

    PrimaryconcernsDetails;
    PCId;

    MHDetails;
    MHId;

    MLDetails;
    MLId;

    MLDetails1;
    MLId1;

    SLDetails;
    SLId;

    SLDetails1;
    SLId1;

    LifestyleInfo;
    LSId;

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
     
      this.edithealthnutassessmentform.patchValue({
        unique_id: this.userReg.unique_id
      }); 
      
      this.editFamilyMedicalHistoryform.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editGeneralHealthInfoForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editPimaryConcernsForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editMedHistForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editLifestyleInfoForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editMedHistForm.patchValue({
        unique_id: this.userReg.unique_id
      });

      this.editMedListForm.patchValue({
        unique_id: this.userReg.unique_id
      });

      this.editMedListForm1.patchValue({
        unique_id: this.userReg.unique_id
      });

      this.editSuppListForm.patchValue({
        unique_id: this.userReg.unique_id
      });
     

      this.editSuppListForm1.patchValue({
        unique_id: this.userReg.unique_id
      });
     
    
      console.log('currentuser', this.currentUser);  

      this._DataService.getHealthNutAssessmentDetails(this.userReg.unique_id).subscribe(res => {
        console.log('ass det : ', res.data);
        this.AssessmentDetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.AssDId = res.data[0].id;
       }
       else{
        this.AssDId = 0; 
       }
      
  var newstatusarr =new Array();

        var str = res.data[0].status;

       newstatusarr = str.split(",");

   
        for(var t=0;t<(this.statusarr.length);t++)
        {
          console.log('reach 1');
          var ismatch = false; 
            for(var t1=0;t1<( newstatusarr.length);t1++)
            {

             // console.log('res status == ',newstatusarr[t1]);
            //  console.log('reach 2 ',this.specs.includes( this.profile.specializations[t1].specialization_id));
            //  console.log('reach 3 ', this.profile.specializations[t1].specialization_id == this.specs[t].id );
              //  if(this.specs.includes(this.specDetails[t1].specialization_id))
                if(this.statusarr[t].name == newstatusarr[t1])
                {
                 // this.checked = 1;
                 ismatch = true;
                 this.statusarr[t].checked = true;// 
                 //this.specDetails[t1].checked = true ;        
                 //console.log('sp check ==', this.profile.specializations[t1].checked);
                 //this.specDetails[t1].checked = true;
                 this.selected.push(newstatusarr[t1]);                
                 break;
                }
                
            }
            if (!ismatch) {
              this.statusarr[t].checked = false;
            //  this.specDetails[t1].checked = false;//  checkbox status false
              this.selected.push(newstatusarr[t1]);
             
            } //End if
        }

        console.log('new arr == ',this.selected);



       console.log('status array ==',this.statusarr);
      console.log('AssDId == ',this.AssDId);
        this.edithealthnutassessmentform.setValue({
          unique_id: this.userReg.unique_id,        
          uuid: res.data[0].uuid,
          prescription_no: res.data[0].prescription_no,
          membership_no: res.data[0].membership_no,
          date_of_assessment: res.data[0].date_of_assessment,
          time_of_assessment: res.data[0].time_of_assessment,
          mode_of_assessment: res.data[0].mode_of_assessment,
          first_name: this.first_name,
          middle_name: res.data[0].middle_name,
          last_name: this.last_name,
          gender: this.gender,
          dob: res.data[0].dob,
          age: this.age,
          address: this.address,
          city: this.city,
          state: this.state,
          zip:this.zip,
          home_telephone: res.data[0].home_telephone,
          email: this.email,
          status: res.data[0].status,
          do_have_children: res.data[0].do_have_children,
          how_many_children: res.data[0].how_many_children,
          age_of_children: res.data[0].age_of_children,
          height: res.data[0].height,
          weight: res.data[0].weight,
          bmi: res.data[0].bmi,
          spo2: res.data[0].spo2,
          heart_rate: res.data[0].heart_rate,
          blood_pressure_diastolic: res.data[0].blood_pressure_diastolic,
          blood_pressure_systolic: res.data[0].blood_pressure_systolic,
          ecg_interpretation_lead_3: res.data[0].ecg_interpretation_lead_3,
          ecg_interpretation_lead_12: res.data[0].ecg_interpretation_lead_12        
        })
    //  }
      });


      this._DataService.getFamilyMedicalHistoryDetails(this.userReg.unique_id).subscribe(res => {
        console.log('family med det : ', res.data);
        this.MedicalHistoryDetails = res.data[0];
       console.log('uniq id==',this.userReg.unique_id);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.MedHistId = res.data[0].id;
       }
       else{
        this.MedHistId = 0; 
       }
      console.log('MedHistId == ',this.MedHistId);
        this.editFamilyMedicalHistoryform.setValue({
          unique_id: this.userReg.unique_id,        
          mother_age: res.data[0].mother_age,
          mother_general_health: res.data[0].mother_general_health,
          mother_disease: res.data[0].mother_disease,
          father_age: res.data[0].father_age,
          father_general_health: res.data[0].father_general_health,
          father_disease: res.data[0].father_disease,
          sibling_1_age: res.data[0].sibling_1_age,
          sibling_1_general_health: res.data[0].sibling_1_general_health,
          sibling_1_disease: res.data[0].sibling_1_disease,
          sibling_2_age: res.data[0].sibling_2_age,
          sibling_2_general_health: res.data[0].sibling_2_general_health,
          sibling_2_disease: res.data[0].sibling_2_disease,
          sibling_3_age: res.data[0].sibling_3_age,
          sibling_3_general_health: res.data[0].sibling_3_general_health,
          sibling_3_disease: res.data[0].sibling_3_disease,
          children_age: res.data[0].children_age,
          children_general_health: res.data[0].children_general_health,
          children_disease: res.data[0].children_disease,
          grandparent_1_age: res.data[0].grandparent_1_age,
          grandparent_1_general_health: res.data[0].grandparent_1_general_health,
          grandparent_1_disease: res.data[0].grandparent_1_disease,
          grandparent_2_age: res.data[0].grandparent_2_age,
          grandparent_2_general_health: res.data[0].grandparent_2_general_health,
          grandparent_2_disease: res.data[0].grandparent_2_disease                 
        })
    //  }
      });

      this._DataService.getGeneralHealthInfoDetails(this.userReg.unique_id).subscribe(res => {
        console.log('general info det : ', res.data);
        this.GenHealthDetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.GenHealthId = res.data[0].id;
       }
       else{
        this.GenHealthId = 0; 
       }

       var newexphparr =new Array();
       var str1 = res.data[0].experience_health_problems;
       newexphparr = str1.split(",");
  
       for(var x=0;x<(this.experiencehealthprobarr.length);x++)
       {
         console.log('reach 1');
         var ismatch3 = false; 
           for(var t2=0;t2<( newexphparr.length);t2++)
           {
              if(this.experiencehealthprobarr[x].name == newexphparr[t2])
               {
               
                ismatch3 = true;
                this.experiencehealthprobarr[x].checked = true;// 
                this.selectedexphp.push(newexphparr[t2]);                
                break;
               }
               
           }
           if (!ismatch3) {
             this.experiencehealthprobarr[x].checked = false;          
             this.selectedexphp.push(newexphparr[t2]);            
           } //End if
       }

       console.log('new arr == ',this.selectedexphp);


       var newexpdiagcond =new Array();
       var str2 = res.data[0].experience_diagnosed_conditions;
       newexpdiagcond = str2.split(",");
  
       for(var y=0;y<(this.experiencediagnosecondbarr.length);y++)
       {
         console.log('reach 1');
         var ismatch1 = false; 
           for(var t3=0;t3<(newexpdiagcond.length);t3++)
           {
              if(this.experiencediagnosecondbarr[y].name == newexpdiagcond[t3])
               {
               
                ismatch1 = true;
                this.experiencediagnosecondbarr[y].checked = true;// 
                this.selectedexdiagcond.push(newexpdiagcond[t3]);                
                break;
               }
               
           }
           if (!ismatch1) {
             this.experiencediagnosecondbarr[y].checked = false;          
             this.selectedexdiagcond.push(newexpdiagcond[t3]);            
           } //End if
       }

       console.log('new arr == ',this.selectedexdiagcond);


       var newusehf =new Array();
       var str3 = res.data[0].use_home_fragrance;
       newusehf = str3.split(",");
  
       for(var z=0;z<(this.usehomefragrancearr.length);z++)
       {
         console.log('reach 1');
         var ismatch2 = false; 
           for(var t4=0;t4<(newusehf.length);t4++)
           {
              if(this.usehomefragrancearr[z].name == newusehf[t4])
               {
               
                ismatch2 = true;
                this.usehomefragrancearr[z].checked = true;// 
                this.selectedusehf.push(newusehf[t4]);                
                break;
               }
               
           }
           if (!ismatch2) {
             this.usehomefragrancearr[z].checked = false;          
             this.selectedusehf.push(newusehf[t4]);            
           } //End if
       }

       console.log('new arr == ',this.selectedusehf);



      console.log('GenHealthId == ',this.GenHealthId);
        this.editGeneralHealthInfoForm.setValue({
          unique_id: this.userReg.unique_id, 
          blood_type: res.data[0].blood_type,
          weight: res.data[0].weight,
          weight_gain_or_loss: res.data[0].weight_gain_or_loss,
          energy_level_during_day: res.data[0].energy_level_during_day,
          no_of_bowel_movements_per_day: res.data[0].no_of_bowel_movements_per_day,
          no_of_bowel_movements_per_week: res.data[0].no_of_bowel_movements_per_week,
          bowel_health_condition: res.data[0].bowel_health_condition,
          color_of_bowel_movement: res.data[0].color_of_bowel_movement,
          digestive_issues: res.data[0].digestive_issues,
          experience_health_problems: res.data[0].experience_health_problems,
          experience_diagnosed_conditions: res.data[0].experience_diagnosed_conditions,
          other_details: res.data[0].other_details,
          female_birth_control: res.data[0].female_birth_control,
          type_of_female_birth_control: res.data[0].type_of_female_birth_control,
          periods_stopped: res.data[0].periods_stopped,
          periods_entire_cycle: res.data[0].periods_entire_cycle,
          avg_no_days_periods_last: res.data[0].avg_no_days_periods_last,
          pms_symptoms: res.data[0].pms_symptoms,
          menopausal_symptoms: res.data[0].menopausal_symptoms,
          do_u_smoke: res.data[0].do_u_smoke,
          smoke_in_past : res.data[0].smoke_in_past,
          exposed_to_second_hand_smoke : res.data[0].exposed_to_second_hand_smoke,
          do_u_use_recreational_drugs : res.data[0].do_u_use_recreational_drugs,
          silver_amalgam_fillings : res.data[0].silver_amalgam_fillings,
          how_long_u_take_silver_amalgam_fillings : res.data[0].how_long_u_take_silver_amalgam_fillings,
          root_canals : res.data[0].root_canals,
          exposed_to_any_chemicals : res.data[0].exposed_to_any_chemicals,
          use_home_fragrance : res.data[0].use_home_fragrance                
        })
    //  }
      });


      this._DataService.getPrimaryConcernsDetails(this.userReg.unique_id).subscribe(res => {
        console.log('PC det == ', res.data);
        this.PrimaryconcernsDetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PCId = res.data[0].id;
       }
       else{
        this.PCId = 0; 
       }
      console.log('PCId == ',this.PCId);
        this.editPimaryConcernsForm.setValue({
          unique_id: this.userReg.unique_id,        
          main_concerns: res.data[0].main_concerns,
          issues_how_long: res.data[0].issues_how_long,
          diagnosed_by_doctor: res.data[0].diagnosed_by_doctor,
          concerned_affect_daily_life: res.data[0].concerned_affect_daily_life,
          illness_conditions: res.data[0].illness_conditions       
        })
    //  }
      });


      this._DataService.getmedhistDetails(this.userReg.unique_id).subscribe(res => {
        console.log('med hist det : ', res.data);
        this.MHDetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.MHId = res.data[0].id;
       }
       else{
        this.MHId = 0; 
       }
      console.log('MHId == ',this.MHId);
        this.editMedHistForm.setValue({
          unique_id: this.userReg.unique_id,        
          previous_hospitalization: res.data[0].previous_hospitalization,
          any_organs_removed: res.data[0].any_organs_removed,
          food_allergies: res.data[0].food_allergies,
          env_or_seasonal_allergies: res.data[0].env_or_seasonal_allergies,
          any_medications_taken_in_past: res.data[0].any_medications_taken_in_past,
          any_suppliments_currently_taking: res.data[0].any_suppliments_currently_taking       
        })
    //  }
      });

      this._DataService.getmedhistlistofmedDetails(this.userReg.unique_id).subscribe(res => {
        console.log('ml det : ', res.data);
        this.MLDetails = res.data[0];
        this.MLDetails1 = res.data[0];
        console.log('ml id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.MLId = res.data[0].id;
        this.MLId1 = res.data[0].id;
       }
       else{
        this.MLId = 0; 
      this.MLId1 = 0; 
       }
      console.log('MLId == ',this.MLId);
      console.log('MLId1 == ',this.MLId1);

   

      res.data.forEach((element, i) => {
        this.medList[i] = {
          id: element.id,
          medical_history_id:element.medical_history_id,
          name_of_medication: element.name_of_medication,
          when_taken_medication: element.when_taken_medication,
          how_long: element.how_long
        };
      });      
     
      });

      this._DataService.getmedhistlistofsuppDetails(this.userReg.unique_id).subscribe(res => {
        console.log('ml det : ', res.data);
        this.SLDetails = res.data[0];
        this.SLDetails1 = res.data[0];
        console.log('ml id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.SLId = res.data[0].id;
        this.SLId1 = res.data[0].id;
       }
       else{
        this.SLId = 0; 
      this.SLId1 = 0; 
       }
      console.log('SLId == ',this.SLId);
      console.log('SLId1 == ',this.SLId1);

   

      res.data.forEach((element, i) => {
        this.suppList[i] = {
          id: element.id,
          medical_history_id:element.medical_history_id,
          suppliment_herb:element.suppliment_herb,
          name_of_brand:element.name_of_brand,
          amount_taken:element.amount_taken,
          when_taken_suppliment:element.when_taken_suppliment,
          how_long:element.how_long
        };
      });      
     
      });

      this._DataService.getLifestyleDetails(this.userReg.unique_id).subscribe(res => {
        console.log('life style det : ', res.data);
        this.LifestyleInfo = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.LSId = res.data[0].id;
       }
       else{
        this.LSId = 0; 
       }
      console.log('LSId == ',this.LSId);
        this.editLifestyleInfoForm.setValue({
          unique_id: this.userReg.unique_id,        
          cups_of_water: res.data[0].cups_of_water,
          cups_of_coffee: res.data[0].cups_of_coffee,
          cups_of_wine: res.data[0].cups_of_wine,
          cups_of_milk: res.data[0].cups_of_milk,
          cups_of_soft_drink: res.data[0].cups_of_soft_drink,
          cups_of_liquor: res.data[0].cups_of_liquor,
          cups_of_juice: res.data[0].cups_of_juice,
          cups_of_diet_soft_drink: res.data[0].cups_of_diet_soft_drink,
          cups_of_beer: res.data[0].cups_of_beer,
          cups_of_tea: res.data[0].cups_of_tea,
          cups_of_herbal_tea: res.data[0].cups_of_herbal_tea,
          do_u_eat_out_or_restaurants: res.data[0].do_u_eat_out_or_restaurants,
          who_does_grocery_shopping: res.data[0].who_does_grocery_shopping,
          who_does_cooking: res.data[0].who_does_cooking,
          do_u_eat_late_night: res.data[0].do_u_eat_late_night,
          foods_u_crave_most: res.data[0].foods_u_crave_most,
          foods_u_crave_least: res.data[0].foods_u_crave_least,
          dietary_restrictions: res.data[0].dietary_restrictions,
          currently_exercise: res.data[0].currently_exercise,
          exercise_for_how_long: res.data[0].exercise_for_how_long,
          what_makes_u_happy: res.data[0].what_makes_u_happy,
          what_makes_u_worry: res.data[0].what_makes_u_worry,
          take_sleep_each_night: res.data[0].take_sleep_each_night,
          describe_quality_of_sleep: res.data[0].describe_quality_of_sleep,
          do_u_wake_up_feeling_rested: res.data[0].do_u_wake_up_feeling_rested,
          do_u_falling_asleep: res.data[0].do_u_falling_asleep,
          expectations_of_this_prog: res.data[0].expectations_of_this_prog,
          experience_of_past_of_this_prog: res.data[0].experience_of_past_of_this_prog,
          any_otherthing_u_need_to_address: res.data[0].any_otherthing_u_need_to_address       
        })
    //  }
      });

    })

    // console.log('ass form det ==  == ',this.edithealthnutassessmentform);
    // console.log('primary concerns form det ==  == ',this.editPimaryConcernsForm);
    // console.log('family med hist det ==  == ',this.editFamilyMedicalHistoryform);
    // console.log('life style hist det ==  == ',this.editLifestyleInfoForm);
  }



  //Insert Edit Health Nut Assessment Details
  edithealthnutassessment() { 

  var healthnutassessmentEdit = {   
  "id":this.AssDId,   
  "unique_id":this.user_uuid,
  "uuid":this.edithealthnutassessmentform.value.uuid,
  "prescription_no":this.edithealthnutassessmentform.value.prescription_no,
  "membership_no":this.edithealthnutassessmentform.value.membership_no,
  "date_of_assessment":this.edithealthnutassessmentform.value.date_of_assessment,
  "time_of_assessment":this.edithealthnutassessmentform.value.time_of_assessment,
  "mode_of_assessment":this.edithealthnutassessmentform.value.mode_of_assessment,
  "first_name":this.first_name,
  "middle_name":this.edithealthnutassessmentform.value.middle_name,
  "last_name":this.last_name,
  "gender":this.gender,
  "dob":this.dob,
  "age":this.age,
  "address":this.address,
  "city":this.city,
  "state":this.state,
  "zip":this.zip,
  "home_telephone":this.mobile_no,
  "email":this.edithealthnutassessmentform.value.email,
  "status":this.selected,
  "do_have_children":this.edithealthnutassessmentform.value.do_have_children,
  "how_many_children":this.edithealthnutassessmentform.value.how_many_children,
  "age_of_children":this.edithealthnutassessmentform.value.age_of_children,
  "height":this.edithealthnutassessmentform.value.height,
  "weight":this.edithealthnutassessmentform.value.weight,
  "bmi":this.edithealthnutassessmentform.value.bmi,
  "spo2":this.edithealthnutassessmentform.value.spo2,
  "heart_rate":this.edithealthnutassessmentform.value.heart_rate,
  "blood_pressure_diastolic":this.edithealthnutassessmentform.value.blood_pressure_diastolic,
  "blood_pressure_systolic":this.edithealthnutassessmentform.value.blood_pressure_systolic,
  "ecg_interpretation_lead_3":this.edithealthnutassessmentform.value.ecg_interpretation_lead_3,
  "ecg_interpretation_lead_12":this.edithealthnutassessmentform.value.ecg_interpretation_lead_12
}
 
 
   this._DataService.InsertHealthNutAssessmentDetails(healthnutassessmentEdit).subscribe(res=>{
     console.log('Assessment Details res'+res);
     console.log('Assessment Details success == '+res.success);
     if(res.success==true){
       alert("Assessment Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
       this.router.navigate(['./profile/healthnutritionalform']) ;
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Insert Edit Health Nut Family Medical History Details
 editFamilyMedicalHistory() { 

  var familymedicalhistedit = {   
  "id":this.MedHistId,   
  "unique_id":this.editFamilyMedicalHistoryform.value.unique_id,
  "mother_age":this.editFamilyMedicalHistoryform.value.mother_age,
  "mother_general_health":this.editFamilyMedicalHistoryform.value.mother_general_health,
  "mother_disease":this.editFamilyMedicalHistoryform.value.mother_disease,
  "father_age":this.editFamilyMedicalHistoryform.value.father_age,
  "father_general_health":this.editFamilyMedicalHistoryform.value.father_general_health,
  "father_disease":this.editFamilyMedicalHistoryform.value.father_disease,
  "sibling_1_age":this.editFamilyMedicalHistoryform.value.sibling_1_age,
  "sibling_1_general_health":this.editFamilyMedicalHistoryform.value.sibling_1_general_health,
  "sibling_1_disease":this.editFamilyMedicalHistoryform.value.sibling_1_disease,
  "sibling_2_age":this.editFamilyMedicalHistoryform.value.sibling_2_age,
  "sibling_2_general_health":this.editFamilyMedicalHistoryform.value.sibling_2_general_health,
  "sibling_2_disease":this.editFamilyMedicalHistoryform.value.sibling_2_disease,
  "sibling_3_age":this.editFamilyMedicalHistoryform.value.sibling_3_age,
  "sibling_3_general_health":this.editFamilyMedicalHistoryform.value.sibling_3_general_health,
  "sibling_3_disease":this.editFamilyMedicalHistoryform.value.sibling_3_disease,
  "children_age":this.editFamilyMedicalHistoryform.value.children_age,
  "children_general_health":this.editFamilyMedicalHistoryform.value.children_general_health,
  "children_disease":this.editFamilyMedicalHistoryform.value.children_disease,
  "grandparent_1_age":this.editFamilyMedicalHistoryform.value.grandparent_1_age,
  "grandparent_1_general_health":this.editFamilyMedicalHistoryform.value.grandparent_1_general_health,
  "grandparent_1_disease":this.editFamilyMedicalHistoryform.value.grandparent_1_disease,
  "grandparent_2_age":this.editFamilyMedicalHistoryform.value.grandparent_2_age,
  "grandparent_2_general_health":this.editFamilyMedicalHistoryform.value.grandparent_2_general_health,
  "grandparent_2_disease":this.editFamilyMedicalHistoryform.value.grandparent_2_disease
  }
 
 
   this._DataService.InsertfamilymedicalhistoryDetails(familymedicalhistedit).subscribe(res=>{
     console.log('fmht Details res'+res);
     console.log('fmht Details success == '+res.success);
     if(res.success==true){
       alert("Family Medical History Details Updated Successfully!");
      
      //  location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/healthnutritionalform']) ; 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Insert Edit Health Nut Primary Concerns Details
 editPimaryConcerns() { 

  var primaryconcernsedit = {   
  "id":this.PCId,   
  "unique_id":this.editPimaryConcernsForm.value.unique_id,
  "main_concerns":this.editPimaryConcernsForm.value.main_concerns,
  "issues_how_long":this.editPimaryConcernsForm.value.issues_how_long,
  "diagnosed_by_doctor":this.editPimaryConcernsForm.value.diagnosed_by_doctor,
  "concerned_affect_daily_life":this.editPimaryConcernsForm.value.concerned_affect_daily_life,
  "illness_conditions":this.editPimaryConcernsForm.value.illness_conditions
  }
 
 
   this._DataService.InsertpimaryconcensDetails(primaryconcernsedit).subscribe(res=>{
     console.log('primary con Details res'+res);
     console.log('primary con Details success == '+res.success);
     if(res.success==true){
       alert("Primary Concerns Details Updated Successfully!");
      
       //location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/healthnutritionalform']) ; 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

  //Insert Edit Health Nut General Health Info Details
  editGeneralHealthInfo() { 

    var generalhealthinfoedit = {   
    "id":this.GenHealthId,   
    "unique_id":this.editGeneralHealthInfoForm.value.unique_id,
  "blood_type":this.editGeneralHealthInfoForm.value.blood_type,
  "weight":this.editGeneralHealthInfoForm.value.weight,
  "weight_gain_or_loss":this.editGeneralHealthInfoForm.value.weight_gain_or_loss,
  "energy_level_during_day":this.editGeneralHealthInfoForm.value.energy_level_during_day,
  "no_of_bowel_movements_per_day":this.editGeneralHealthInfoForm.value.no_of_bowel_movements_per_day,
  "no_of_bowel_movements_per_week":this.editGeneralHealthInfoForm.value.no_of_bowel_movements_per_week,
  "bowel_health_condition":this.editGeneralHealthInfoForm.value.bowel_health_condition,
  "color_of_bowel_movement":this.editGeneralHealthInfoForm.value.color_of_bowel_movement,
  "digestive_issues":this.editGeneralHealthInfoForm.value.digestive_issues,
  "experience_health_problems":this.selectedexphp,
  "experience_diagnosed_conditions":this.selectedexdiagcond,
  "other_details":this.editGeneralHealthInfoForm.value.other_details,
  "female_birth_control":this.editGeneralHealthInfoForm.value.female_birth_control,
  "type_of_female_birth_control":this.editGeneralHealthInfoForm.value.type_of_female_birth_control,
  "periods_stopped":this.editGeneralHealthInfoForm.value.periods_stopped,
  "periods_entire_cycle":this.editGeneralHealthInfoForm.value.periods_entire_cycle,
  "avg_no_days_periods_last":this.editGeneralHealthInfoForm.value.avg_no_days_periods_last,
  "pms_symptoms":this.editGeneralHealthInfoForm.value.pms_symptoms,
  "menopausal_symptoms":this.editGeneralHealthInfoForm.value.menopausal_symptoms,
  "do_u_smoke":this.editGeneralHealthInfoForm.value.do_u_smoke,
  "smoke_in_past":this.editGeneralHealthInfoForm.value.smoke_in_past,
  "exposed_to_second_hand_smoke":this.editGeneralHealthInfoForm.value.exposed_to_second_hand_smoke,
  "do_u_use_recreational_drugs":this.editGeneralHealthInfoForm.value.do_u_use_recreational_drugs,
  "silver_amalgam_fillings":this.editGeneralHealthInfoForm.value.silver_amalgam_fillings,
  "how_long_u_take_silver_amalgam_fillings":this.editGeneralHealthInfoForm.value.how_long_u_take_silver_amalgam_fillings,
  "root_canals":this.editGeneralHealthInfoForm.value.root_canals,
  "exposed_to_any_chemicals":this.editGeneralHealthInfoForm.value.exposed_to_any_chemicals,
  "use_home_fragrance":this.selectedusehf     
    }
   
   
     this._DataService.InsertGeneralHealthInfoDetails(generalhealthinfoedit).subscribe(res=>{
       console.log('general health Details res'+res);
       console.log('general health Details success == '+res.success);
       if(res.success==true){
         alert("General Health Info Details Updated Successfully!");
        
         //location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
          this.router.navigate(['./profile/healthnutritionalform']) ; 
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }


    //Insert Edit Health Nut Your Medical History Details
    editMedHist() { 

    var yourmedhistedit = {   
    "id":this.MHId,   
    "unique_id":this.editMedHistForm.value.unique_id,
    "previous_hospitalization":this.editMedHistForm.value.previous_hospitalization,
    "any_organs_removed":this.editMedHistForm.value.any_organs_removed,
    "food_allergies":this.editMedHistForm.value.food_allergies,
    "env_or_seasonal_allergies":this.editMedHistForm.value.env_or_seasonal_allergies,
    "any_medications_taken_in_past":this.editMedHistForm.value.any_medications_taken_in_past,
    "any_suppliments_currently_taking":this.editMedHistForm.value.any_suppliments_currently_taking
    }
   
   
     this._DataService.InsertmedhistDetails(yourmedhistedit).subscribe(res=>{
       console.log('Your med hist Details res'+res);
       console.log('Your med hist Details success == '+res.success);
       if(res.success==true){
         alert("Your Medical History Details Updated Successfully!");
        
        //  location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
          this.router.navigate(['./profile/healthnutritionalform']) ;
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }

//Insert Edit Health Nut Life Style Info Details
editLifestyleInfo() { 

  var lifestyleinfoedit = {   
  "id":this.LSId,   
  "unique_id":this.editLifestyleInfoForm.value.unique_id,
  "cups_of_water":this.editLifestyleInfoForm.value.cups_of_water,
  "cups_of_coffee":this.editLifestyleInfoForm.value.cups_of_coffee,
  "cups_of_wine":this.editLifestyleInfoForm.value.cups_of_wine,
  "cups_of_milk":this.editLifestyleInfoForm.value.cups_of_milk,
  "cups_of_soft_drink":this.editLifestyleInfoForm.value.cups_of_soft_drink,
  "cups_of_liquor":this.editLifestyleInfoForm.value.cups_of_liquor,
  "cups_of_juice":this.editLifestyleInfoForm.value.cups_of_juice,
  "cups_of_diet_soft_drink":this.editLifestyleInfoForm.value.cups_of_diet_soft_drink,
  "cups_of_beer":this.editLifestyleInfoForm.value.cups_of_beer,
  "cups_of_tea":this.editLifestyleInfoForm.value.cups_of_tea,
  "cups_of_herbal_tea":this.editLifestyleInfoForm.value.cups_of_herbal_tea,
  "do_u_eat_out_or_restaurants":this.editLifestyleInfoForm.value.do_u_eat_out_or_restaurants,
  "who_does_grocery_shopping":this.editLifestyleInfoForm.value.who_does_grocery_shopping,
  "who_does_cooking":this.editLifestyleInfoForm.value.who_does_cooking,
  "do_u_eat_late_night":this.editLifestyleInfoForm.value.do_u_eat_late_night,
  "foods_u_crave_most":this.editLifestyleInfoForm.value.foods_u_crave_most,
  "foods_u_crave_least":this.editLifestyleInfoForm.value.foods_u_crave_least,
  "dietary_restrictions":this.editLifestyleInfoForm.value.dietary_restrictions,
  "currently_exercise":this.editLifestyleInfoForm.value.currently_exercise,
  "exercise_for_how_long":this.editLifestyleInfoForm.value.exercise_for_how_long,
  "what_makes_u_happy":this.editLifestyleInfoForm.value.what_makes_u_happy,
  "what_makes_u_worry":this.editLifestyleInfoForm.value.what_makes_u_worry,
  "take_sleep_each_night":this.editLifestyleInfoForm.value.take_sleep_each_night,
  "describe_quality_of_sleep":this.editLifestyleInfoForm.value.describe_quality_of_sleep,
  "do_u_wake_up_feeling_rested":this.editLifestyleInfoForm.value.do_u_wake_up_feeling_rested,
  "do_u_falling_asleep":this.editLifestyleInfoForm.value.do_u_falling_asleep,
  "expectations_of_this_prog":this.editLifestyleInfoForm.value.expectations_of_this_prog,
  "experience_of_past_of_this_prog":this.editLifestyleInfoForm.value.experience_of_past_of_this_prog,
  "any_otherthing_u_need_to_address":this.editLifestyleInfoForm.value.any_otherthing_u_need_to_address   
    }
 
 
   this._DataService.InsertLifestyleDetails(lifestyleinfoedit).subscribe(res=>{
     console.log('Life Style Details res'+res);
     console.log('Life Style Details success == '+res.success);
     if(res.success==true){
       alert("LifeStyle Info Details Updated Successfully!");
      
      //  location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
        this.router.navigate(['./profile/healthnutritionalform']) ;
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


  //Insert Initial Clinic List of Medication Details Details
  addMedList() { 
console.log('med hist id == ',this.MHId);

// console.log('unique_id == ',this.editMedListForm.value.unique_id);
// console.log('unique_id1 == ',this.editMedListForm1.value.unique_id);
// console.log('unique_id2 == ',this.userReg.unique_id);
    var medlistEdit = {   
    "id":0,
    "unique_id" : this.userReg.unique_id,
    "medical_history_id":   this.MHId,     
    "name_of_medication" : this.editMedListForm.value.name_of_medication,
    "when_taken_medication" : this.editMedListForm.value.when_taken_medication,
    "how_long" : this.editMedListForm.value.how_long

  }
   
   
     this._DataService.InsertmedhistlistofmedDetails(medlistEdit).subscribe(res=>{
       console.log('List of Medications Details res'+res);
       console.log('List of Medications Details success == '+res.success);
       if(res.success==true){
         alert("List of Medications Details Added Successfully!");
        
        // location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
          this.router.navigate(['./profile/healthnutritionalform']) ;
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }
  
   //Edit Initial Clinic List of Medication Details Details
   editMedList() { 
  
  
    //console.log('ptd id == ',id);
    var mlEdit = {   
    "id":this.editMedListForm1.value.id,
    "unique_id" : this.editMedListForm1.value.unique_id,
    "medical_history_id":   this.MHId, 
    "name_of_medication" : this.editMedListForm1.value.name_of_medication,
    "when_taken_medication" : this.editMedListForm1.value.when_taken_medication,
    "how_long" : this.editMedListForm1.value.how_long
  }
   
   
  this._DataService.InsertmedhistlistofmedDetails(mlEdit).subscribe(res=>{
    console.log('List of Medications Details res'+res);
    console.log('List of Medications Details success == '+res.success);
    if(res.success==true){
      alert("List of Medications Details Updated Successfully!");
     
     // location.href = '/patient/patient#/profile/healthnutritionalform';
       // window.location.reload();
       this.router.navigate(['./profile/healthnutritionalform']) ;
    } else {
      console.log('Error', res.error)
      alert("Update Failed");
    }
  });
  
  
   }
  
   deleteml(ml)
   {

   var mlDelete = {   
   "id":ml.id  
   }

   this._DataService.deletemedhistlistofmedDetails(mlDelete).subscribe(res=>{
   console.log('List of Medications Details Deleted res'+res);

   if(res.success==true){
   alert("List of Medications Details Deleted Successfully!");

   // location.href = '/patient/patient#/profile/healthnutritionalform';
   // window.location.reload();
   this.router.navigate(['./profile/healthnutritionalform']) ;
   } else {
   console.log('Error', res.error)
   alert("Update Failed");
   }
   });
   }



    //Insert Initial Clinic List of Suppliments Details Details
  addSuppList() { 
    console.log('supp hist id == ',this.MHId);
    
    // console.log('unique_id == ',this.editMedListForm.value.unique_id);
    // console.log('unique_id1 == ',this.editMedListForm1.value.unique_id);
    // console.log('unique_id2 == ',this.userReg.unique_id);
        var supplistEdit = {   
        "id":0,
        "unique_id" : this.userReg.unique_id,
        "medical_history_id":   this.MHId,
        "suppliment_herb": this.editSuppListForm.value.suppliment_herb,  
        "name_of_brand": this.editSuppListForm.value.name_of_brand,  
        "amount_taken": this.editSuppListForm.value.amount_taken, 
        "when_taken_suppliment": this.editSuppListForm.value.when_taken_suppliment,  
        "how_long": this.editSuppListForm.value.how_long
      }
       
       
         this._DataService.InsertmedhistlistofsuppDetails(supplistEdit).subscribe(res=>{
           console.log('List of Suppliments Details res'+res);
           console.log('List of Suppliments Details success == '+res.success);
           if(res.success==true){
             alert("List of Suppliments Details Added Successfully!");
            
            // location.href = '/patient/patient#/profile/healthnutritionalform';
              // window.location.reload();
              this.router.navigate(['./profile/healthnutritionalform']) ;
           } else {
             console.log('Error', res.error)
             alert("Update Failed");
           }
         });
      
      
       }
      
       //Edit Initial Clinic List of Suppliments Details
       editSuppList() { 
      
      
        //console.log('ptd id == ',id);
        var slEdit = {   
        "id":this.editSuppListForm1.value.id,
        "unique_id" : this.editSuppListForm1.value.unique_id,     
        "medical_history_id":   this.MHId,
        "suppliment_herb": this.editSuppListForm1.value.suppliment_herb,  
        "name_of_brand": this.editSuppListForm1.value.name_of_brand,  
        "amount_taken": this.editSuppListForm1.value.amount_taken, 
        "when_taken_suppliment": this.editSuppListForm1.value.when_taken_suppliment,  
        "how_long": this.editSuppListForm1.value.how_long
      }
       
       
      this._DataService.InsertmedhistlistofsuppDetails(slEdit).subscribe(res=>{
        console.log('List of Suppliments Details res'+res);
        console.log('List of Suppliments Details success == '+res.success);
        if(res.success==true){
          alert("List of Suppliments Details Updated Successfully!");
         
         // location.href = '/patient/patient#/profile/healthnutritionalform';
           // window.location.reload();
           this.router.navigate(['./profile/healthnutritionalform']) ;
        } else {
          console.log('Error', res.error)
          alert("Update Failed");
        }
      });
      
      
       }


    deletesl(sl)
    {

    var slDelete = {   
    "id":sl.id  
    }
    console.log('reach in delete ,',sl.id);
    this._DataService.deletemedhistlistofsuppDetails(slDelete).subscribe(res=>{
    console.log('List of Suppliments Details Deleted res'+res);

    if(res.success==true){
    alert("List of Suppliments Details Deleted Successfully!");

    // location.href = '/patient/patient#/profile/healthnutritionalform';
    // window.location.reload();
    this.router.navigate(['./profile/healthnutritionalform']) ;
    } else {
    console.log('Error', res.error)
    alert("Update Failed");
    }
    });
    }

selected = [];
// Toggle Status checkbox
toggleVisibility2(ev,s)
{
  console.log('ev ==',ev);
  console.log('index == ',s);
  console.log('ev ==',ev.target.value);
  if(ev.target.checked){
    this.selected.push(ev.target.value);

    console.log('selected == ',this.selected);
    } else {
      this.selected.splice(this.selected.indexOf(ev.target.value), 1);
      console.log('selected == ',this.selected);
    }

}

selectedexphp = [];
// Toggle Experience Health Problems checkbox
toggleVisibilityexphp(ev1,e)
{
  console.log('ev ==',ev1);
  console.log('index == ',e);
  console.log('ev ==',ev1.target.value);
  if(ev1.target.checked){
    this.selectedexphp.push(ev1.target.value);

    console.log('selectedexphp == ',this.selectedexphp);
    } else {
      this.selectedexphp.splice(this.selectedexphp.indexOf(ev1.target.value), 1);
      console.log('selectedexphp == ',this.selectedexphp);
    }

}

selectedexdiagcond = [];
// Toggle Experience Health Diagnose Cond checkbox
toggleVisibilityexdiagcond(ev2,ed)
{
  console.log('ev ==',ev2);
  console.log('index == ',ed);
  console.log('ev2 ==',ev2.target.value);
  if(ev2.target.checked){
    this.selectedexdiagcond.push(ev2.target.value);

    console.log('selectedexdiagcond == ',this.selectedexdiagcond);
    } else {
      this.selectedexdiagcond.splice(this.selectedexdiagcond.indexOf(ev2.target.value), 1);
      console.log('selectedexdiagcond == ',this.selectedexdiagcond);
    }

}


selectedusehf = [];
// Toggle Use Home Frangrance checkbox
toggleVisibilityusehf(ev3,u)
{
  console.log('ev ==',ev3);
  console.log('index == ',u);
  console.log('ev ==',ev3.target.value);
  if(ev3.target.checked){
    this.selectedusehf.push(ev3.target.value);

    console.log('selectedusehf == ',this.selectedusehf);
    } else {
      this.selectedusehf.splice(this.selectedusehf.indexOf(ev3.target.value), 1);
      console.log('selectedusehf == ',this.selectedusehf);
    }

}





}
