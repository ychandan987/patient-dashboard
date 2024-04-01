import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-psychosocialform',
  templateUrl: './psychosocialform.component.html',
  styleUrls: ['./psychosocialform.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class PsychosocialformComponent implements OnInit {

  public editpsycosocialassessmentForm: FormGroup;
  public editpsycosocialsummarystrengthForm: FormGroup;
  public editpsycosocialobstaclesbarriersForm : FormGroup;
  public editpsycosocialtreatmentservicesForm : FormGroup;
  public editpsycosocialdiagnosticinfoForm : FormGroup;
  public editpsycosocialfunctionalsummaryForm : FormGroup;

  public editpsycosocialmentalassesmentForm : FormGroup;
  public editpsycosocialhealthnsafetyForm : FormGroup;
  

  constructor(private formBuilder: FormBuilder, private _DataService: ApigatewayService, private storage: AngularFireStorage, 
    private router: Router, private crypt: CryptService) {

      this.editpsycosocialassessmentForm = this.formBuilder.group({
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
        married_unmarried: ['', Validators.required],
        dependent_name: ['', Validators.required],
        dependent_relationship: ['', Validators.required],
        dependent_contact: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        home_telephone: ['', Validators.required],
        email: ['', Validators.required],       
        do_have_children: ['', Validators.required],
        how_many_children: ['', Validators.required],
        age_of_children: ['', Validators.required],
        height: ['', Validators.required],
        weight: ['', Validators.required],
        bmi: ['', Validators.required],
        are_u_pegrant: ['', Validators.required],
        due_date_of_pregrant: ['', Validators.required],
        occupation_designation: [''],
        occupation_company_name: [''],
        occupation_address: [''],
        occupation_work_phone: [''],
        occupation_work_email: ['']           
      });

      this.editpsycosocialsummarystrengthForm = this.formBuilder.group({
        unique_id: [''],    
        summary_of_strengths_abilities_details: ['']                 
      });

      this.editpsycosocialobstaclesbarriersForm = this.formBuilder.group({
        unique_id: [''],    
        obstacles_barriers_details: ['']                 
      });


      this.editpsycosocialtreatmentservicesForm = this.formBuilder.group({
          unique_id: [''],    
          psychiatric_consultation: [''],	
      community_cupport: [''],	
      individual_therapy: [''],	
      psychological_evaluation: [''],	
      medication_assistance: [''],	
      group_therapy: [''],	
      speech_language: [''],	
      nursing_support: [''],	
      family_therapy: [''],	
      occupational_therapy: [''],	
      housekeeping: [''],	
      dual_diagnosis_group: [''],	
      physical_therapy: [''],	
      family_education: [''],	
      social_activity_recreation: [''],	
      group_home_afc: [''],	
      employment_assistance: [''],	
      housing_assistance: [''],	
      assistance_with_benefits: [''],	
      money_management: [''],	
      adl_instruction: [''],	
      physical_health_assessment: [''],	
      dietary_nutrition: [''],	
      transportation: [''],	
      dept_of_human_services: [''],	
      ccommunity_action: [''],	
      social_security_administration: [''],	
      mrs_mi_jobs_commission: [''],	
      home_health_clf: [''],	
      room_and_board: [''],	
      substance_abuse_assessment: [''],	
      primary_health_care: [''],	
      other: [''],	
      initial_completion: [''],	
      clinician_credentials: [''],	
      clinician_credentials_date: [''],	
      supervisor_credentials: [''],	
      supervisor_credentials_date: [''],	
      filled_by: [''],	
      checked_by: [''],	
      verified_by: [''],	
      filled_by_date: ['', Validators.required],	
      checked_by_date: ['', Validators.required],	
      verified_by_date : ['', Validators.required]               
        });

      this.editpsycosocialdiagnosticinfoForm = this.formBuilder.group({
      unique_id: [''],    
      designate_p_code: [''],	
      axis_1_code_1: [''],	
      axis_1_code_2: [''],	
      axis_1_code_3: [''],	
      axis_1_code_4: [''],	
      axis_2_code_1: [''],	
      axis_2_code_2: [''],	
      axis_2_code_3: [''],	
      axis_2_code_4: [''],	
      axis_3_code_1: [''],	
      axis_3_code_2: [''],	
      axis_4_prob_primary_supp_grp: [''],	
      axis_4_problems_related_to_the_social_environment: [''],	
      axis_4_educational_problems: [''],	
      axis_4_occupational_problems: [''],	
      axis_4_housing_problems: [''],	
      axis_4_economic_problems: [''],	
      axis_4_problems_with_access_to_health_care_services: [''],	
      axis_4_problems_related_to_interaction_legal_system_crime: [''],	
      axis_4_other_psychosocial_environmental_problems: [''],	
      axis_4_none: [''],	
      axis_5_outcomes: [''],	
      axis_5_gaf_gas: [''],	
      axis_5_cafas: [''],	
      axis_5_multnomah: ['']	              
      });

      this.editpsycosocialfunctionalsummaryForm = this.formBuilder.group({
        unique_id: [''],    
        daily_activities_na: [''],	
        daily_activities_strength: [''],	
        daily_activities_concern: [''],	
        family_relationships_na: [''],	
        family_relationships_strength: [''],	
        family_relationships_concern: [''],	
        social_relationships_na: [''],	
        social_relationships_strength: [''],	
        social_relationships_concern: [''],	
        school_na: [''],	
        school_strength: [''],	
        school_concern: [''],	
        work_na: [''],	
        work_strength: [''],	
        work_concern: [''],	
        finances_na: [''],	
        finances_strength: [''],	
        finances_concern: [''],	
        physical_health_na: [''],	
        physical_health_strength: [''],	
        physical_health_concern: [''],	
        safety_na: [''],	
        safety_strength: [''],	
        safety_concern: [''],	
        legal_na: [''],
        legal_strength: [''],
        legal_concern: [''],
        cognitive_functioning_na: [''],
        cognitive_functioning_strength: [''],
        cognitive_functioning_concern: [''],
        housing_na: [''],
        housing_strength: [''],
        housing_concern: [''],
        social_skills_na: [''],
        social_skills_strength: [''],
        social_skills_concern: [''],	
        impulse_control_na: [''],	
        impulse_control_strength: [''],	
        impulse_control_concern: [''],	
        responsibility_na: [''],	
        responsibility_strength: [''],	
        responsibility_concern: ['']	              
        });

    this.editpsycosocialmentalassesmentForm = this.formBuilder.group({
    unique_id : [''],
    well_groomed_appearance: [''],
    disheveled_appearance: [''],
    bizarre_appearance: [''],
    other_appearance: [''],
    describe_appearance: [''],
    normal_mood: [''],
    euphoric_mood: [''],
    depressed_mood: [''],
    irritable_mood: [''],
    anxious_mood: [''],
    other_mood: [''],
    describe_mood: [''],
    cooperative_anxious: [''],
    uncooperative_anxious: [''],
    normal_speech: [''],
    slurred_speech: [''],
    soft_speech: [''],
    nonverbal_speech: [''],
    loud_speech: [''],
    limited_comm_skills_speech: [''],
    pressured_speech: [''],
    uses_yes_no_only_speech: [''],
    halting_speech: [''],
    uses_a_picture_board_speech: [''],
    incoherent_speech: [''],
    other_speech: [''],
    describe_speech: [''],
    guarded_suspicious: [''],
    belligerent_hostile_suspicious: [''],
    other_suspicious: [''],
    describe_suspicious: [''],
    calm_motor_activity: [''],
    tremor_tics_motor_activity: [''],
    hyperactive_motor_activity: [''],
    lethargic_motor_activity: [''],
    agitated_motor_activity: [''],
    other_motor_activity: [''],
    describe_motor_activity: [''],
    intact_tangential_thought_process: [''],
    flight_of_ideas_thought_process: [''],
    circumstantial_thought_process: [''],
    inability_to_abstract_thought_process: [''],
    loose_associations_thought_process: [''],
    can_only_follow_1_step_directions_thought_process: [''],
    other_thought_process: [''],
    describe_thought_process: [''],
    appropriate_affect: [''],
    inappropriate_affect: [''],
    sad_affect: [''],
    angry_affect: [''],
    flat_affect: [''],
    constricted_affect: [''],
    anxious_affect: [''],
    labile_affect: [''],
    other_affect: [''],
    describe_affect: [''],
    normal_morbid_thought_content: [''],
    paranoid_thought_content: [''],
    somatic_complaints_thought_content: [''],
    phobias_thought_content: [''],
    //obsessive_thought_content: [''],
    aggressive_thought_content: [''],
    other_thought_content: [''],
    describe_thought_content: [''],
    person_orientation: [''],
    responds_to_name_orientation: [''],
    place_orientation: [''],
    time_orientation: [''],
    recognizes_familiar_faces_places_orientation: [''],
    describe_orientation: [''],
    na_psychosis: [''],
    describe_psychosis: [''],
    denies_hallucinations: [''],
    auditory_hallucinations: [''],
    visual_hallucinations: [''],
    other_hallucinations: [''],
    describe_hallucinations: [''],
    denies_command_hallucinations: [''],
    harm_to_self_command_hallucinations: [''],
    harm_to_others_command_hallucinations: [''],
    can_resist_commands_command_hallucinations: [''],
    other_command_hallucinations: [''],
    describe_command_hallucinations: [''],
    denies_bizarre_delusions: [''],
    thought_broadcasting_bizarre_delusions: [''],
    thought_insertion_bizarre_delusions: [''],
    thought_withdrawal_bizarre_delusions: [''],
    other_bizarre_delusions: [''],
    describe_bizarre_delusions: [''],
   // denies_bizarre_delusions: [''],
    religious_delusional_beliefs: [''],
    somatic_delusional_beliefs: [''],
    persecutory_delusional_beliefs: [''],
    grandiosity_delusional_beliefs: [''],
    being_controlled_delusional_beliefs: [''],
    ideas_of_reference_delusional_beliefs: [''],
    describe_delusional_beliefs: [''],
    summary_assessment_of_mental_status_exam_delusional_beliefs: ['']	              
    });

    this.editpsycosocialhealthnsafetyForm = this.formBuilder.group({
    unique_id : [''],
    none_identified_risk_factors: [''],	
    unsafe_sex_practices: [''],	
    physical_abuse: [''],	
    impulsivity: [''],	
    pregnancy: [''],	
    residential_safety: [''],	
    chronic_health_problems: [''],	
    sexual_abuse: [''],	
    iv_drug_abuse: [''],	
    non_attentive: [''],	
    alcohol_substance_abuse: [''],	
    diet_nutrition: [''],	
    hygiene: [''],	
    self_harm: [''],	
    nicotine_use: [''],	
    household_management: [''],	
    aggression_toward_others: [''],	
    medication_interaction: [''],	
    physical_disability: [''],	
    verbal_emotional_abuse: [''],	
    medication_management: [''],	
    recent_loss: [''],	
    children_at_risk: [''],	
    stress_related_to_parenting: [''],	
    psychosis: [''],	
    evacuation_score: [''],	
    community_safety: [''],	
    other_identified_risk_factors: [''],	
    none_identified_needs: [''],	
    quarterly_td_screening: [''],	
    dental_exam: [''],	
    vision_exam: [''],	
    labs_frequency: [''],	
    coordination_of_care: [''],	
    assistance_with_childrens_needs: [''],	
    health_care_assessment_yearly_checkup: [''],	
    other_identified_needs: [''],	
    na_basic_needs: [''],	
    food_basic_needs: [''],	
    shelter_basic_needs: [''],	
    medical_basic_needs: [''],	
    describe_basic_needs: [''],	
    none_suicide_risk: [''],	
    ideation_history_of_suicidality: [''],	
    chronic_history_of_suicidality: [''],	
    acute_history_of_suicidality: [''],	
    recent_suicidal_behavior: [''],	
    describe_history_of_suicidality: [''],	
    none_presence_of_risk_behaviour: [''],	
    note_presence_of_risk_behaviour: [''],	
    will_presence_of_risk_behaviour: [''],	
    gives_possessions_away: [''],	
    other_presence_of_risk_behaviour: [''],	
    intent_of_risk_factors: [''],	
    none_prior_attempts: [''],	
    plan_of_risk_factors: [''],	
    means_to_carry_out_plan: [''],	
    lethality_of_risk_factors: [''],	
    likelihood_of_rescue: [''],	
    access_to_gun: [''],	
    describe_of_risk_factors: [''],	
    thoughts_of_harm_to_threat_of_danger_to_others: [''],	
    recent_threatening_threat_of_danger_to_others: [''],	
    identified_target_threat_of_danger_to_others: [''],	
    intent_threat_of_danger_to_others: [''],	
    can_thoughts_of_harm_be_managed_threat_of_danger_to_others: [''],	
    means_to_carry_out_plan_threat_of_danger_to_others: [''],	
    lethality_threat_of_danger_to_others: [''],	
    access_to_gun_threat_of_danger_to_others: [''],	
    prior_aggression_threat_of_danger_to_others: [''],	
    plan_threat_of_danger_to_others: [''],	
    describe_threat_of_danger_to_others: [''],	
    none_presence_of_high_risk: [''],	
    cutting_presence_of_high_risk: [''],	
    head_banging_presence_of_high_risk: [''],	
    poor_or_dangerous_rel_presence_of_high_risk: [''],	
    anorexia_bulimia_presence_of_high_risk: [''],	
    risk_taking_presence_of_high_risk: [''],	
    other_self_injurious_beh_presence_of_high_risk: [''],	
    other_presence_of_high_risk: [''],	
    describe_presence_of_high_risk: [''],	
    na_presence_of_deterrents: [''],	
    describe_presence_of_deterrents: [''],	
    none_other_safety_concerns: [''],	
    describe_other_safety_concerns: [''],	
    assessment_of_risk: ['']	              
    });



   }


   PAssessmentDetails;
   PAssDId;

   PsummarystrengthDetails;
   PSSId;

   ObstaclesBarriesDetails;
   OBId;

   TreatmentServicesDetails;
   TSId;

   DiagnoaticInfoDetails;
   DIId;

   FunctionalsummaryDetails;
   FSId;

   MentalAssessmentDetails;
   MAId;
   
   HealthnSafetyDetails;
   HSId;

   currentUser = JSON.parse(this.crypt.get('currentUser'));
   user_uuid =this.currentUser.unique_id;
    first_name =this.currentUser.first_name;
    last_name =this.currentUser.last_name;
    mobile_no =this.currentUser.mobile_no;
    email =this.currentUser.email;
   userReg;
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
    profile;
    today = new Date().toJSON().split('T')[0];

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
     
      this.editpsycosocialassessmentForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialsummarystrengthForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialobstaclesbarriersForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialtreatmentservicesForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialdiagnosticinfoForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialfunctionalsummaryForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialmentalassesmentForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 

      this.editpsycosocialhealthnsafetyForm.patchValue({
        unique_id: this.userReg.unique_id
      }); 
   
      console.log('currentuser', this.currentUser);  
      console.log('currentuser unique id ==', this.currentUser.unique_id);  

      this._DataService.getPsychosocialAssessmentDetails(this.userReg.unique_id).subscribe(res => {
        console.log('ass det : ', res.data);
        this.PAssessmentDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PAssDId = res.data[0].id;
       }
       else{
        this.PAssDId = 0; 
       }
      console.log('AssDId == ',this.PAssDId);
        this.editpsycosocialassessmentForm.setValue({
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
          dob: this.dob,
          age: this.age,
          married_unmarried: res.data[0].married_unmarried,
          dependent_name: res.data[0].dependent_name,
          dependent_relationship:res.data[0].dependent_relationship,
          dependent_contact: res.data[0].dependent_contact,
          address: this.address,
          city: this.city,
          state: this.state,
          zip: this.pincode,
          home_telephone: this.mobile_no,
          email: this.email,        
          do_have_children: res.data[0].do_have_children,
          how_many_children: res.data[0].how_many_children,
          age_of_children: res.data[0].age_of_children,
          height: res.data[0].height,
          weight: res.data[0].weight,
          bmi: res.data[0].bmi,
          are_u_pegrant: res.data[0].are_u_pegrant,
          due_date_of_pregrant: res.data[0].due_date_of_pregrant,
          occupation_designation: res.data[0].occupation_designation,
          occupation_company_name: res.data[0].occupation_company_name,
          occupation_address: res.data[0].occupation_address,
          occupation_work_phone: res.data[0].occupation_work_phone,
          occupation_work_email: res.data[0].occupation_work_email    
        })
    //  }
      });


      this._DataService.getPsychosocialsummarystrengthDetails(this.userReg.unique_id).subscribe(res => {
        console.log('ss det : ', res.data);
        this.PsummarystrengthDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PSSId = res.data[0].id;
       }
       else{
        this.PSSId = 0; 
       }
      console.log('PSSId == ',this.PSSId);
        this.editpsycosocialsummarystrengthForm.setValue({
          unique_id: this.userReg.unique_id,        
          summary_of_strengths_abilities_details: res.data[0].summary_of_strengths_abilities_details          
        })
    //  }
      });



      this._DataService.getPsychosocialobstaclesbarriersDetails(this.userReg.unique_id).subscribe(res => {
        console.log('obs barr det : ', res.data);
        this.ObstaclesBarriesDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.OBId = res.data[0].id;
       }
       else{
        this.OBId = 0; 
       }
      console.log('OBId == ',this.OBId);
      this.editpsycosocialobstaclesbarriersForm.setValue({
        unique_id: this.userReg.unique_id,        
        obstacles_barriers_details: res.data[0].obstacles_barriers_details          
      })
    //  }
      });

      this._DataService.getPsychosocialtreatmentsevicesDetails(this.userReg.unique_id).subscribe(res => {
        console.log('treatment se det : ', res.data);
        this.TreatmentServicesDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.TSId = res.data[0].id;
       }
       else{
        this.TSId = 0; 
       }
      console.log('TSId == ',this.TSId);
      this.editpsycosocialtreatmentservicesForm.setValue({
        unique_id: this.userReg.unique_id,
        psychiatric_consultation: res.data[0].psychiatric_consultation,	
      community_cupport: res.data[0].community_cupport,	
      individual_therapy: res.data[0].individual_therapy, 
      psychological_evaluation: res.data[0].psychological_evaluation, 	
      medication_assistance: res.data[0].medication_assistance, 	
      group_therapy: res.data[0].group_therapy, 	
      speech_language: res.data[0].speech_language, 	
      nursing_support: res.data[0].nursing_support, 	
      family_therapy: res.data[0].family_therapy,	
      occupational_therapy: res.data[0].occupational_therapy, 	
      housekeeping: res.data[0].housekeeping, 	
      dual_diagnosis_group: res.data[0].dual_diagnosis_group, 	
      physical_therapy: res.data[0].physical_therapy, 	
      family_education: res.data[0].family_education, 	
      social_activity_recreation: res.data[0].social_activity_recreation, 	
      group_home_afc: res.data[0].group_home_afc, 
      employment_assistance: res.data[0].employment_assistance, 
      housing_assistance: res.data[0].housing_assistance, 	
      assistance_with_benefits: res.data[0].assistance_with_benefits, 
      money_management: res.data[0].money_management,   	
      adl_instruction: res.data[0].adl_instruction,   	
      physical_health_assessment: res.data[0].physical_health_assessment,   	
      dietary_nutrition: res.data[0].dietary_nutrition,   	
      transportation: res.data[0].transportation,   	
      dept_of_human_services: res.data[0].dept_of_human_services,   	
      ccommunity_action: res.data[0].ccommunity_action,   	
      social_security_administration: res.data[0].social_security_administration,   	
      mrs_mi_jobs_commission: res.data[0].mrs_mi_jobs_commission,   	
      home_health_clf: res.data[0].home_health_clf,
      room_and_board: res.data[0].room_and_board,   	
      substance_abuse_assessment: res.data[0].substance_abuse_assessment,   	
      primary_health_care: res.data[0].primary_health_care,   	
      other: res.data[0].other,   	
      initial_completion: res.data[0].initial_completion,   	
      clinician_credentials: res.data[0].clinician_credentials,   	
      clinician_credentials_date: res.data[0].clinician_credentials_date,   	
      supervisor_credentials: res.data[0].supervisor_credentials,   	
      supervisor_credentials_date: res.data[0].supervisor_credentials_date,   	
      filled_by: res.data[0].filled_by,   	
      checked_by: res.data[0].checked_by,   	
      verified_by: res.data[0].verified_by,   	
      filled_by_date: res.data[0].filled_by_date,   	
      checked_by_date: res.data[0].checked_by_date,   	
      verified_by_date : res.data[0].verified_by_date           
      })
    //  }
      });

      this._DataService.getPsychosocialdiagnosticInfoDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Diagnostic Info det : ', res.data);
        this.DiagnoaticInfoDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.DIId = res.data[0].id;
       }
       else{
        this.DIId = 0; 
       }
      console.log('DIId == ',this.DIId);
      this.editpsycosocialdiagnosticinfoForm.setValue({
        unique_id: this.userReg.unique_id,
        designate_p_code: res.data[0].designate_p_code,	
      axis_1_code_1: res.data[0].axis_1_code_1,	
      axis_1_code_2: res.data[0].axis_1_code_2,	
      axis_1_code_3: res.data[0].axis_1_code_3,	
      axis_1_code_4: res.data[0].axis_1_code_4,	
      axis_2_code_1: res.data[0].axis_2_code_1,	
      axis_2_code_2: res.data[0].axis_2_code_2,	
      axis_2_code_3: res.data[0].axis_2_code_3,	
      axis_2_code_4: res.data[0].axis_2_code_4,	
      axis_3_code_1: res.data[0].axis_3_code_1,	
      axis_3_code_2: res.data[0].axis_3_code_2,	
      axis_4_prob_primary_supp_grp: res.data[0].axis_4_prob_primary_supp_grp,	
      axis_4_problems_related_to_the_social_environment: res.data[0].axis_4_problems_related_to_the_social_environment,	
      axis_4_educational_problems: res.data[0].axis_4_educational_problems,	
      axis_4_occupational_problems: res.data[0].axis_4_occupational_problems,	
      axis_4_housing_problems: res.data[0].axis_4_housing_problems,	
      axis_4_economic_problems: res.data[0].axis_4_economic_problems,	
      axis_4_problems_with_access_to_health_care_services: res.data[0].axis_4_problems_with_access_to_health_care_services,	
      axis_4_problems_related_to_interaction_legal_system_crime: res.data[0].axis_4_problems_related_to_interaction_legal_system_crime,	
      axis_4_other_psychosocial_environmental_problems: res.data[0].axis_4_other_psychosocial_environmental_problems,	
      axis_4_none: res.data[0].axis_4_none,	
      axis_5_outcomes: res.data[0].axis_5_outcomes,	
      axis_5_gaf_gas: res.data[0].axis_5_gaf_gas,	
      axis_5_cafas: res.data[0].axis_5_cafas,	
      axis_5_multnomah: res.data[0].axis_5_multnomah                 
      })
     
      });


      this._DataService.getPsychosocialfunctionalsummaryDetails(this.userReg.unique_id).subscribe(res => {
        console.log('Functional Summary det : ', res.data);
        this.FunctionalsummaryDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.FSId = res.data[0].id;
       }
       else{
        this.FSId = 0; 
       }
      console.log('FSId == ',this.FSId);
      this.editpsycosocialfunctionalsummaryForm.setValue({
      unique_id: this.userReg.unique_id,       	    
      daily_activities_na: res.data[0].daily_activities_na,		
      daily_activities_strength: res.data[0].daily_activities_strength,		
      daily_activities_concern: res.data[0].daily_activities_concern,		
      family_relationships_na: res.data[0].family_relationships_na,		
      family_relationships_strength: res.data[0].family_relationships_strength,		
      family_relationships_concern: res.data[0].family_relationships_concern,		
      social_relationships_na: res.data[0].social_relationships_na,		
      social_relationships_strength: res.data[0].social_relationships_strength,		
      social_relationships_concern: res.data[0].social_relationships_concern,		
      school_na: res.data[0].school_na,		
      school_strength: res.data[0].school_strength,		
      school_concern: res.data[0].school_concern,
      work_na: res.data[0].work_na,		
      work_strength: res.data[0].work_strength,		
      work_concern: res.data[0].work_concern,		
      finances_na: res.data[0].finances_na,		
      finances_strength: res.data[0].finances_strength,		
      finances_concern: res.data[0].finances_concern,		
      physical_health_na: res.data[0].physical_health_na,		
      physical_health_strength: res.data[0].physical_health_strength,		
      physical_health_concern: res.data[0].physical_health_concern,		
      safety_na: res.data[0].safety_na,		
      safety_strength: res.data[0].safety_strength,		
      safety_concern: res.data[0].safety_concern,		
      legal_na: res.data[0].legal_na,	
      legal_strength: res.data[0].legal_strength,	
      legal_concern: res.data[0].legal_concern,	
      cognitive_functioning_na: res.data[0].cognitive_functioning_na,	
      cognitive_functioning_strength: res.data[0].cognitive_functioning_strength,	
      cognitive_functioning_concern: res.data[0].cognitive_functioning_concern,	
      housing_na: res.data[0].housing_na,	
      housing_strength: res.data[0].housing_strength,	
      housing_concern: res.data[0].housing_concern,	
      social_skills_na: res.data[0].social_skills_na,	
      social_skills_strength: res.data[0].social_skills_strength,	
      social_skills_concern: res.data[0].social_skills_concern,		
      impulse_control_na: res.data[0].impulse_control_na,		
      impulse_control_strength: res.data[0].impulse_control_strength,		
      impulse_control_concern: res.data[0].impulse_control_concern,		
      responsibility_na: res.data[0].responsibility_na,		
      responsibility_strength: res.data[0].responsibility_strength,		
      responsibility_concern: res.data[0].responsibility_concern                
      })
     
      });

      this._DataService.getPsychosocialmentalassessmentDetails(this.userReg.unique_id).subscribe(res => {
        console.log('mental ass det : ', res.data);
        this.MentalAssessmentDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.MAId = res.data[0].id;
       }
       else{
        this.MAId = 0; 
       }
      console.log('MAId == ',this.MAId);
      this.editpsycosocialmentalassesmentForm.setValue({
      unique_id: this.userReg.unique_id,
      well_groomed_appearance: res.data[0].well_groomed_appearance,
      disheveled_appearance: res.data[0].disheveled_appearance,
      bizarre_appearance: res.data[0].bizarre_appearance,
      other_appearance: res.data[0].other_appearance,
      describe_appearance: res.data[0].describe_appearance,
      normal_mood: res.data[0].normal_mood,
      euphoric_mood: res.data[0].euphoric_mood,
      depressed_mood: res.data[0].depressed_mood,
      irritable_mood: res.data[0].irritable_mood,
      anxious_mood: res.data[0].anxious_mood,
      other_mood: res.data[0].other_mood,
      describe_mood: res.data[0].describe_mood,
      cooperative_anxious: res.data[0].cooperative_anxious,
      uncooperative_anxious: res.data[0].uncooperative_anxious,
      normal_speech: res.data[0].normal_speech,
      slurred_speech: res.data[0].slurred_speech,
      soft_speech: res.data[0].soft_speech,
      nonverbal_speech: res.data[0].nonverbal_speech,
      loud_speech: res.data[0].loud_speech,
      limited_comm_skills_speech: res.data[0].limited_comm_skills_speech,
      pressured_speech: res.data[0].pressured_speech,
      uses_yes_no_only_speech: res.data[0].uses_yes_no_only_speech,
      halting_speech: res.data[0].halting_speech,
      uses_a_picture_board_speech: res.data[0].uses_a_picture_board_speech,
      incoherent_speech: res.data[0].incoherent_speech,
      other_speech: res.data[0].other_speech,
      describe_speech: res.data[0].describe_speech,
      guarded_suspicious: res.data[0].guarded_suspicious,
      belligerent_hostile_suspicious: res.data[0].belligerent_hostile_suspicious,
      other_suspicious: res.data[0].other_suspicious,
      describe_suspicious: res.data[0].describe_suspicious,
      calm_motor_activity: res.data[0].calm_motor_activity,
      tremor_tics_motor_activity: res.data[0].tremor_tics_motor_activity,
      hyperactive_motor_activity: res.data[0].hyperactive_motor_activity,
      lethargic_motor_activity: res.data[0].lethargic_motor_activity,
      agitated_motor_activity: res.data[0].agitated_motor_activity,
      other_motor_activity: res.data[0].other_motor_activity,
      describe_motor_activity: res.data[0].describe_motor_activity,
      intact_tangential_thought_process: res.data[0].intact_tangential_thought_process,
      flight_of_ideas_thought_process: res.data[0].flight_of_ideas_thought_process,
      circumstantial_thought_process: res.data[0].circumstantial_thought_process,
      inability_to_abstract_thought_process: res.data[0].inability_to_abstract_thought_process,
      loose_associations_thought_process: res.data[0].loose_associations_thought_process,
      can_only_follow_1_step_directions_thought_process: res.data[0].can_only_follow_1_step_directions_thought_process,
      other_thought_process: res.data[0].other_thought_process,
      describe_thought_process: res.data[0].describe_thought_process,
      appropriate_affect: res.data[0].appropriate_affect,
      inappropriate_affect: res.data[0].inappropriate_affect,
      sad_affect: res.data[0].sad_affect,
      angry_affect: res.data[0].angry_affect,
      flat_affect: res.data[0].flat_affect,
      constricted_affect: res.data[0].constricted_affect,
      anxious_affect: res.data[0].anxious_affect,
      labile_affect: res.data[0].labile_affect,
      other_affect: res.data[0].other_affect,
      describe_affect: res.data[0].describe_affect,
      normal_morbid_thought_content: res.data[0].normal_morbid_thought_content,
      paranoid_thought_content: res.data[0].paranoid_thought_content,
      somatic_complaints_thought_content: res.data[0].somatic_complaints_thought_content,
      phobias_thought_content: res.data[0].phobias_thought_content,
      //obsessive_thought_content: res.data[0].obsessive_thought_content,
      aggressive_thought_content: res.data[0].aggressive_thought_content,
      other_thought_content: res.data[0].other_thought_content,
      describe_thought_content: res.data[0].describe_thought_content,
      person_orientation: res.data[0].person_orientation,
      responds_to_name_orientation: res.data[0].responds_to_name_orientation,
      place_orientation: res.data[0].place_orientation,
      time_orientation: res.data[0].time_orientation,
      recognizes_familiar_faces_places_orientation: res.data[0].recognizes_familiar_faces_places_orientation,
      describe_orientation: res.data[0].describe_orientation,
      na_psychosis: res.data[0].na_psychosis,
      describe_psychosis: res.data[0].describe_psychosis,
      denies_hallucinations: res.data[0].denies_hallucinations,
      auditory_hallucinations: res.data[0].auditory_hallucinations,
      visual_hallucinations: res.data[0].visual_hallucinations,
      other_hallucinations: res.data[0].other_hallucinations,
      describe_hallucinations: res.data[0].describe_hallucinations,
      denies_command_hallucinations: res.data[0].denies_command_hallucinations,
      harm_to_self_command_hallucinations: res.data[0].harm_to_self_command_hallucinations,
      harm_to_others_command_hallucinations: res.data[0].harm_to_others_command_hallucinations,
      can_resist_commands_command_hallucinations: res.data[0].can_resist_commands_command_hallucinations,
      other_command_hallucinations: res.data[0].other_command_hallucinations,
      describe_command_hallucinations: res.data[0].describe_command_hallucinations,
      denies_bizarre_delusions: res.data[0].denies_bizarre_delusions,
      thought_broadcasting_bizarre_delusions: res.data[0].thought_broadcasting_bizarre_delusions,
      thought_insertion_bizarre_delusions: res.data[0].thought_insertion_bizarre_delusions,
      thought_withdrawal_bizarre_delusions: res.data[0].thought_withdrawal_bizarre_delusions,
      other_bizarre_delusions: res.data[0].other_bizarre_delusions,
      describe_bizarre_delusions: res.data[0].describe_bizarre_delusions,
     // denies_bizarre_delusions: res.data[0].denies_bizarre_delusions,
      religious_delusional_beliefs: res.data[0].religious_delusional_beliefs,
      somatic_delusional_beliefs: res.data[0].somatic_delusional_beliefs,
      persecutory_delusional_beliefs: res.data[0].persecutory_delusional_beliefs,
      grandiosity_delusional_beliefs: res.data[0].grandiosity_delusional_beliefs,
      being_controlled_delusional_beliefs: res.data[0].being_controlled_delusional_beliefs,
      ideas_of_reference_delusional_beliefs: res.data[0].ideas_of_reference_delusional_beliefs,
      describe_delusional_beliefs: res.data[0].describe_delusional_beliefs,
      summary_assessment_of_mental_status_exam_delusional_beliefs: res.data[0].summary_assessment_of_mental_status_exam_delusional_beliefs   
      })
    //  }
      });


      this._DataService.getPsychosocialhealthnsafetyDetails(this.userReg.unique_id).subscribe(res => {
        console.log('mental ass det : ', res.data);
        this.HealthnSafetyDetails = res.data[0];
        console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.HSId = res.data[0].id;
       }
       else{
        this.HSId = 0; 
       }
      console.log('HSId == ',this.HSId);
      this.editpsycosocialhealthnsafetyForm.setValue({
      unique_id: this.userReg.unique_id,
      none_identified_risk_factors: res.data[0].none_identified_risk_factors,	
	  unsafe_sex_practices: res.data[0].unsafe_sex_practices,	
	  physical_abuse: res.data[0].physical_abuse,	
	  impulsivity: res.data[0].impulsivity,	
	  pregnancy: res.data[0].pregnancy,	
	  residential_safety: res.data[0].residential_safety,	
	  chronic_health_problems: res.data[0].chronic_health_problems,	
	  sexual_abuse: res.data[0].sexual_abuse,	
	  iv_drug_abuse: res.data[0].iv_drug_abuse,	
	  non_attentive: res.data[0].non_attentive,	
	  alcohol_substance_abuse: res.data[0].alcohol_substance_abuse,	
	  diet_nutrition: res.data[0].diet_nutrition,	
	  hygiene: res.data[0].hygiene,	
	  self_harm: res.data[0].self_harm,	
	  nicotine_use: res.data[0].nicotine_use,	
	  household_management: res.data[0].household_management,	
	  aggression_toward_others: res.data[0].aggression_toward_others,	
	  medication_interaction: res.data[0].medication_interaction,	
	  physical_disability: res.data[0].physical_disability,	
	  verbal_emotional_abuse: res.data[0].verbal_emotional_abuse,	
	  medication_management: res.data[0].medication_management,	
	  recent_loss: res.data[0].recent_loss,	
	  children_at_risk: res.data[0].children_at_risk,	
	  stress_related_to_parenting: res.data[0].stress_related_to_parenting,	
	  psychosis: res.data[0].psychosis,	
	  evacuation_score: res.data[0].evacuation_score,	
	  community_safety: res.data[0].community_safety,	
	  other_identified_risk_factors: res.data[0].other_identified_risk_factors,	
	  none_identified_needs: res.data[0].none_identified_needs,	
	  quarterly_td_screening: res.data[0].quarterly_td_screening,	
	  dental_exam: res.data[0].dental_exam,	
	  vision_exam: res.data[0].vision_exam,	
	  labs_frequency: res.data[0].labs_frequency,	
	  coordination_of_care: res.data[0].coordination_of_care,	
	  assistance_with_childrens_needs: res.data[0].assistance_with_childrens_needs,	
	  health_care_assessment_yearly_checkup: res.data[0].health_care_assessment_yearly_checkup,	
	  other_identified_needs: res.data[0].other_identified_needs,	
	  na_basic_needs: res.data[0].na_basic_needs,	
	  food_basic_needs: res.data[0].food_basic_needs,	
	  shelter_basic_needs: res.data[0].shelter_basic_needs,	
	  medical_basic_needs: res.data[0].medical_basic_needs,	
	  describe_basic_needs: res.data[0].describe_basic_needs,	
	  none_suicide_risk: res.data[0].none_suicide_risk,	
	  ideation_history_of_suicidality: res.data[0].ideation_history_of_suicidality,	
	  chronic_history_of_suicidality: res.data[0].chronic_history_of_suicidality,	
	  acute_history_of_suicidality: res.data[0].acute_history_of_suicidality,	
	  recent_suicidal_behavior: res.data[0].recent_suicidal_behavior,	
	  describe_history_of_suicidality: res.data[0].describe_history_of_suicidality,	
	  none_presence_of_risk_behaviour: res.data[0].none_presence_of_risk_behaviour,	
	  note_presence_of_risk_behaviour: res.data[0].note_presence_of_risk_behaviour,	
	  will_presence_of_risk_behaviour: res.data[0].will_presence_of_risk_behaviour,	
	  gives_possessions_away: res.data[0].gives_possessions_away,	
	  other_presence_of_risk_behaviour: res.data[0].other_presence_of_risk_behaviour,	
	  intent_of_risk_factors: res.data[0].intent_of_risk_factors,	
	  none_prior_attempts: res.data[0].none_prior_attempts,	
	  plan_of_risk_factors: res.data[0].plan_of_risk_factors,	
	  means_to_carry_out_plan: res.data[0].means_to_carry_out_plan,	
	  lethality_of_risk_factors: res.data[0].lethality_of_risk_factors,	
	  likelihood_of_rescue: res.data[0].likelihood_of_rescue,	
	  access_to_gun: res.data[0].access_to_gun,	
	  describe_of_risk_factors: res.data[0].describe_of_risk_factors,	
	  thoughts_of_harm_to_threat_of_danger_to_others: res.data[0].thoughts_of_harm_to_threat_of_danger_to_others,	
	  recent_threatening_threat_of_danger_to_others: res.data[0].recent_threatening_threat_of_danger_to_others,	
	  identified_target_threat_of_danger_to_others: res.data[0].identified_target_threat_of_danger_to_others,	
	  intent_threat_of_danger_to_others: res.data[0].intent_threat_of_danger_to_others,	
	  can_thoughts_of_harm_be_managed_threat_of_danger_to_others: res.data[0].can_thoughts_of_harm_be_managed_threat_of_danger_to_others,	
	  means_to_carry_out_plan_threat_of_danger_to_others: res.data[0].means_to_carry_out_plan_threat_of_danger_to_others,	
	  lethality_threat_of_danger_to_others: res.data[0].lethality_threat_of_danger_to_others,	
	  access_to_gun_threat_of_danger_to_others: res.data[0].access_to_gun_threat_of_danger_to_others,	
	  prior_aggression_threat_of_danger_to_others: res.data[0].prior_aggression_threat_of_danger_to_others,	
	  plan_threat_of_danger_to_others: res.data[0].plan_threat_of_danger_to_others,	
	  describe_threat_of_danger_to_others: res.data[0].describe_threat_of_danger_to_others,	
	  none_presence_of_high_risk: res.data[0].none_presence_of_high_risk,	
	  cutting_presence_of_high_risk: res.data[0].cutting_presence_of_high_risk,	
	  head_banging_presence_of_high_risk: res.data[0].head_banging_presence_of_high_risk,	
	  poor_or_dangerous_rel_presence_of_high_risk: res.data[0].poor_or_dangerous_rel_presence_of_high_risk,	
	  anorexia_bulimia_presence_of_high_risk: res.data[0].anorexia_bulimia_presence_of_high_risk,	
	  risk_taking_presence_of_high_risk: res.data[0].risk_taking_presence_of_high_risk,	
	  other_self_injurious_beh_presence_of_high_risk: res.data[0].other_self_injurious_beh_presence_of_high_risk,	
	  other_presence_of_high_risk: res.data[0].other_presence_of_high_risk,	
	  describe_presence_of_high_risk: res.data[0].describe_presence_of_high_risk,	
	  na_presence_of_deterrents: res.data[0].na_presence_of_deterrents,	
	  describe_presence_of_deterrents: res.data[0].describe_presence_of_deterrents,	
	  none_other_safety_concerns: res.data[0].none_other_safety_concerns,	
	  describe_other_safety_concerns: res.data[0].describe_other_safety_concerns,	
	  assessment_of_risk: res.data[0].assessment_of_risk   
      })
    //  }
      });

    
    })
  }




  //Insert Edit Psycosocial Assessment Details
  editpsycosocialassessment() { 

    var psychosocialassessmentEdit = {   
    "id":this.PAssDId,   
    "unique_id":this.user_uuid,
    "uuid":this.editpsycosocialassessmentForm.value.uuid,
    "prescription_no":this.editpsycosocialassessmentForm.value.prescription_no,
    "membership_no":this.editpsycosocialassessmentForm.value.membership_no,
    "date_of_assessment":this.editpsycosocialassessmentForm.value.date_of_assessment,
    "time_of_assessment":this.editpsycosocialassessmentForm.value.time_of_assessment,
    "mode_of_assessment":this.editpsycosocialassessmentForm.value.mode_of_assessment,
    "first_name":this.first_name,
    "middle_name":this.editpsycosocialassessmentForm.value.middle_name,
    "last_name":this.last_name,
    "gender":this.gender,
    "dob":this.dob,
    "age":this.age,
    "married_unmarried":this.editpsycosocialassessmentForm.value.married_unmarried,
    "dependent_name":this.editpsycosocialassessmentForm.value.dependent_name,
    "dependent_relationship":this.editpsycosocialassessmentForm.value.dependent_relationship,
    "dependent_contact":this.editpsycosocialassessmentForm.value.dependent_contact,
    "address":this.editpsycosocialassessmentForm.value.address,
    "city":this.city,
    "state":this.state,
    "zip":this.zip,
    "home_telephone":this.mobile_no,
    "email":this.email,    
    "do_have_children":this.editpsycosocialassessmentForm.value.do_have_children,
    "how_many_children":this.editpsycosocialassessmentForm.value.how_many_children,
    "age_of_children":this.editpsycosocialassessmentForm.value.age_of_children,
    "height":this.editpsycosocialassessmentForm.value.height,
    "weight":this.editpsycosocialassessmentForm.value.weight,
    "bmi":this.editpsycosocialassessmentForm.value.bmi,
    "are_u_pegrant":this.editpsycosocialassessmentForm.value.are_u_pegrant,
    "due_date_of_pregrant":this.editpsycosocialassessmentForm.value.due_date_of_pregrant,
    "occupation_designation": this.editpsycosocialassessmentForm.value.occupation_designation,
    "occupation_company_name": this.editpsycosocialassessmentForm.value.occupation_company_name,
    "occupation_address": this.editpsycosocialassessmentForm.value.occupation_address,
    "occupation_work_phone": this.editpsycosocialassessmentForm.value.occupation_work_phone,
    "occupation_work_email": this.editpsycosocialassessmentForm.value.occupation_work_email
  }
   
   
     this._DataService.InsertPsychosocialAssessmentDetails(psychosocialassessmentEdit).subscribe(res=>{
       console.log('Assessment Details res'+res);
       console.log('Assessment Details success == '+res.success);
       if(res.success==true){
         alert("Assessment Details Updated Successfully!");
        
        // location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
          this.router.navigate(['./profile/psychosocialform']) 
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }

//Insert Edit Summary Strenghts Details
editpsycosocialsummarystrength() { 

  var psychosocialsummarystrengthEdit = {   
  "id":this.PSSId,   
  "unique_id":this.editpsycosocialsummarystrengthForm.value.unique_id,
  "summary_of_strengths_abilities_details":this.editpsycosocialsummarystrengthForm.value.summary_of_strengths_abilities_details    
}
 
 
   this._DataService.InsertPsychosocialsummarystrengthDetails(psychosocialsummarystrengthEdit).subscribe(res=>{
     console.log('Summary Strengths Details res'+res);
     console.log('Summary Strengths Details success == '+res.success);
     if(res.success==true){
       alert("Summary Strengths Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
       this.router.navigate(['./profile/psychosocialform']) 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Insert Edit Summary Strenghts Details
 editpsycosocialobstaclesbarriers() { 

  var psychosocialobstaclesbarriersEdit = {   
  "id":this.OBId,   
  "unique_id":this.editpsycosocialobstaclesbarriersForm.value.unique_id,
  "obstacles_barriers_details":this.editpsycosocialobstaclesbarriersForm.value.obstacles_barriers_details    
}
 
 
   this._DataService.InsertPsychosocialobstaclesbarriersDetails(psychosocialobstaclesbarriersEdit).subscribe(res=>{
     console.log('Obstacles Barriers Details res'+res);
     console.log('Obstacles Barriers Details success == '+res.success);
     if(res.success==true){
       alert("Obstacles Barriers Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
       this.router.navigate(['./profile/psychosocialform']) 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


 
 //Insert Edit Treatment Sevices Details
 editpsycosocialtreatmentservices() { 

  var psychosocialtreatmentservicesEdit = {   
  "id":this.TSId,   
  "unique_id":this.editpsycosocialtreatmentservicesForm.value.unique_id,
  "psychiatric_consultation" : this.editpsycosocialtreatmentservicesForm.value.psychiatric_consultation,	
  "community_cupport" : this.editpsycosocialtreatmentservicesForm.value.community_cupport,	
  "individual_therapy" : this.editpsycosocialtreatmentservicesForm.value.individual_therapy,	
  "psychological_evaluation" : this.editpsycosocialtreatmentservicesForm.value.psychological_evaluation,	
  "medication_assistance" : this.editpsycosocialtreatmentservicesForm.value.medication_assistance,	
  "group_therapy" : this.editpsycosocialtreatmentservicesForm.value.group_therapy,	
  "speech_language" : this.editpsycosocialtreatmentservicesForm.value.speech_language,	
  "nursing_support" : this.editpsycosocialtreatmentservicesForm.value.nursing_support,	
  "family_therapy" : this.editpsycosocialtreatmentservicesForm.value.family_therapy,	
  "occupational_therapy" : this.editpsycosocialtreatmentservicesForm.value.occupational_therapy,	
  "housekeeping" : this.editpsycosocialtreatmentservicesForm.value.housekeeping,	
  "dual_diagnosis_group" : this.editpsycosocialtreatmentservicesForm.value.dual_diagnosis_group,	
  "physical_therapy" : this.editpsycosocialtreatmentservicesForm.value.physical_therapy,	
  "family_education" : this.editpsycosocialtreatmentservicesForm.value.family_education,	
  "social_activity_recreation" : this.editpsycosocialtreatmentservicesForm.value.social_activity_recreation,	
  "group_home_afc" : this.editpsycosocialtreatmentservicesForm.value.group_home_afc,	
  "employment_assistance" : this.editpsycosocialtreatmentservicesForm.value.employment_assistance,	
  "housing_assistance" : this.editpsycosocialtreatmentservicesForm.value.housing_assistance,	
  "assistance_with_benefits" : this.editpsycosocialtreatmentservicesForm.value.assistance_with_benefits,	
  "money_management" : this.editpsycosocialtreatmentservicesForm.value.money_management,
  "adl_instruction" : this.editpsycosocialtreatmentservicesForm.value.adl_instruction,	
  "physical_health_assessment" : this.editpsycosocialtreatmentservicesForm.value.physical_health_assessment,	
  "dietary_nutrition" : this.editpsycosocialtreatmentservicesForm.value.dietary_nutrition,	
  "transportation" : this.editpsycosocialtreatmentservicesForm.value.transportation,	
  "dept_of_human_services" : this.editpsycosocialtreatmentservicesForm.value.dept_of_human_services,	
  "ccommunity_action" : this.editpsycosocialtreatmentservicesForm.value.ccommunity_action,	
  "social_security_administration" : this.editpsycosocialtreatmentservicesForm.value.social_security_administration,	
  "mrs_mi_jobs_commission" : this.editpsycosocialtreatmentservicesForm.value.mrs_mi_jobs_commission,	
  "home_health_clf" : this.editpsycosocialtreatmentservicesForm.value.home_health_clf,	
  "room_and_board" : this.editpsycosocialtreatmentservicesForm.value.room_and_board,	
  "substance_abuse_assessment" : this.editpsycosocialtreatmentservicesForm.value.substance_abuse_assessment,	
  "primary_health_care" : this.editpsycosocialtreatmentservicesForm.value.primary_health_care,	
  "other" : this.editpsycosocialtreatmentservicesForm.value.other,	
  "initial_completion" : this.editpsycosocialtreatmentservicesForm.value.initial_completion,	
  "clinician_credentials" : this.editpsycosocialtreatmentservicesForm.value.clinician_credentials,  	
  "clinician_credentials_date" : this.editpsycosocialtreatmentservicesForm.value.clinician_credentials_date,	
  "supervisor_credentials" : this.editpsycosocialtreatmentservicesForm.value.supervisor_credentials,	
  "supervisor_credentials_date" : this.editpsycosocialtreatmentservicesForm.value.supervisor_credentials_date,	
  "filled_by" : this.editpsycosocialtreatmentservicesForm.value.filled_by,	
  "checked_by" : this.editpsycosocialtreatmentservicesForm.value.checked_by,	
  "verified_by" : this.editpsycosocialtreatmentservicesForm.value.verified_by,	
  "filled_by_date" : this.editpsycosocialtreatmentservicesForm.value.filled_by_date,	
  "checked_by_date" : this.editpsycosocialtreatmentservicesForm.value.checked_by_date,	
  "verified_by_date" : this.editpsycosocialtreatmentservicesForm.value.verified_by_date
}
 
 
   this._DataService.InsertPsychosocialtreatmentsevicesDetails(psychosocialtreatmentservicesEdit).subscribe(res=>{
     console.log('Treatment Services Details res'+res);
     console.log(' Treatment Services Details success == '+res.success);
     if(res.success==true){
       alert("Treatment Services Details Updated Successfully!");
      
      // location.href = '/patient/patient#/profile/healthnutritionalform';
        // window.location.reload();
       this.router.navigate(['./profile/psychosocialform']) 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }


  //Insert Edit Diagnostic Info Details
  editpsycosocialdiagnosticinfo() { 

    var psychosocialdiagnosticInfoEdit = {   
    "id":this.DIId,   
    "unique_id":this.editpsycosocialdiagnosticinfoForm.value.unique_id,
    "designate_p_code": this.editpsycosocialdiagnosticinfoForm.value.designate_p_code,	
    "axis_1_code_1": this.editpsycosocialdiagnosticinfoForm.value.axis_1_code_1,	
    "axis_1_code_2": this.editpsycosocialdiagnosticinfoForm.value.axis_1_code_2,	
    "axis_1_code_3": this.editpsycosocialdiagnosticinfoForm.value.axis_1_code_3,	
    "axis_1_code_4": this.editpsycosocialdiagnosticinfoForm.value.axis_1_code_4,	
    "axis_2_code_1": this.editpsycosocialdiagnosticinfoForm.value.axis_2_code_1,	
    "axis_2_code_2": this.editpsycosocialdiagnosticinfoForm.value.axis_2_code_2,	
    "axis_2_code_3": this.editpsycosocialdiagnosticinfoForm.value.axis_2_code_3,	
    "axis_2_code_4": this.editpsycosocialdiagnosticinfoForm.value.axis_2_code_4,	
    "axis_3_code_1": this.editpsycosocialdiagnosticinfoForm.value.axis_3_code_1,	
    "axis_3_code_2": this.editpsycosocialdiagnosticinfoForm.value.axis_3_code_2,	
    "axis_4_prob_primary_supp_grp": this.editpsycosocialdiagnosticinfoForm.value.axis_4_prob_primary_supp_grp,	
    "axis_4_problems_related_to_the_social_environment": this.editpsycosocialdiagnosticinfoForm.value.axis_4_problems_related_to_the_social_environment,	
    "axis_4_educational_problems": this.editpsycosocialdiagnosticinfoForm.value.axis_4_educational_problems,	
    "axis_4_occupational_problems": this.editpsycosocialdiagnosticinfoForm.value.axis_4_occupational_problems,	
    "axis_4_housing_problems": this.editpsycosocialdiagnosticinfoForm.value.axis_4_housing_problems,	
    "axis_4_economic_problems": this.editpsycosocialdiagnosticinfoForm.value.axis_4_economic_problems,	
    "axis_4_problems_with_access_to_health_care_services": this.editpsycosocialdiagnosticinfoForm.value.axis_4_problems_with_access_to_health_care_services,	
    "axis_4_problems_related_to_interaction_legal_system_crime": this.editpsycosocialdiagnosticinfoForm.value.axis_4_problems_related_to_interaction_legal_system_crime,	
    "axis_4_other_psychosocial_environmental_problems": this.editpsycosocialdiagnosticinfoForm.value.axis_4_other_psychosocial_environmental_problems,	
    "axis_4_none": this.editpsycosocialdiagnosticinfoForm.value.axis_4_none,	
    "axis_5_outcomes": this.editpsycosocialdiagnosticinfoForm.value.axis_5_outcomes,	
    "axis_5_gaf_gas": this.editpsycosocialdiagnosticinfoForm.value.axis_5_gaf_gas,	
    "axis_5_cafas": this.editpsycosocialdiagnosticinfoForm.value.axis_5_cafas,	
    "axis_5_multnomah": this.editpsycosocialdiagnosticinfoForm.value.axis_5_multnomah    
  }
   
   
     this._DataService.InsertPsychosocialdiagnosticInfoDetails(psychosocialdiagnosticInfoEdit).subscribe(res=>{
       console.log('Diagnostic Info Details res'+res);
       console.log(' Diagnostic Info Details success == '+res.success);
       if(res.success==true){
         alert("Diagnostic Info Details Updated Successfully!");
        
        // location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
         this.router.navigate(['./profile/psychosocialform']) 
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }

    //Insert Edit Functional Summary Details
  editpsycosocialfunctionalsummary() { 
console.log("fms == ",this.editpsycosocialfunctionalsummaryForm.value.family_relationships_strength);
    var psychosocialfunctionalsummaryEdit = {   
    "id":this.FSId,   
    "unique_id": this.editpsycosocialfunctionalsummaryForm.value.unique_id,	    
    "daily_activities_na": this.editpsycosocialfunctionalsummaryForm.value.daily_activities_na,		
    "daily_activities_strength": this.editpsycosocialfunctionalsummaryForm.value.daily_activities_strength,		
    "daily_activities_concern": this.editpsycosocialfunctionalsummaryForm.value.daily_activities_concern,		
    "family_relationships_na": this.editpsycosocialfunctionalsummaryForm.value.family_relationships_na,		
    "family_relationships_strength": this.editpsycosocialfunctionalsummaryForm.value.family_relationships_strength,		
    "family_relationships_concern": this.editpsycosocialfunctionalsummaryForm.value.family_relationships_concern,		
    "social_relationships_na": this.editpsycosocialfunctionalsummaryForm.value.social_relationships_na,		
    "social_relationships_strength": this.editpsycosocialfunctionalsummaryForm.value.social_relationships_strength,		
    "social_relationships_concern": this.editpsycosocialfunctionalsummaryForm.value.social_relationships_concern,		
    "school_na": this.editpsycosocialfunctionalsummaryForm.value.school_na,		
    "school_strength": this.editpsycosocialfunctionalsummaryForm.value.school_strength,		
    "school_concern": this.editpsycosocialfunctionalsummaryForm.value.school_concern,
    "work_na": this.editpsycosocialfunctionalsummaryForm.value.work_na,		
    "work_strength": this.editpsycosocialfunctionalsummaryForm.value.work_strength,		
    "work_concern": this.editpsycosocialfunctionalsummaryForm.value.work_concern,		
    "finances_na": this.editpsycosocialfunctionalsummaryForm.value.finances_na,		
    "finances_strength": this.editpsycosocialfunctionalsummaryForm.value.finances_strength,		
    "finances_concern": this.editpsycosocialfunctionalsummaryForm.value.finances_concern,		
    "physical_health_na": this.editpsycosocialfunctionalsummaryForm.value.physical_health_na,		
    "physical_health_strength": this.editpsycosocialfunctionalsummaryForm.value.physical_health_strength,		
    "physical_health_concern": this.editpsycosocialfunctionalsummaryForm.value.physical_health_concern,		
    "safety_na": this.editpsycosocialfunctionalsummaryForm.value.safety_na,		
    "safety_strength": this.editpsycosocialfunctionalsummaryForm.value.safety_strength,		
    "safety_concern": this.editpsycosocialfunctionalsummaryForm.value.safety_concern,		
    "legal_na": this.editpsycosocialfunctionalsummaryForm.value.legal_na,	
    "legal_strength": this.editpsycosocialfunctionalsummaryForm.value.legal_strength,	
    "legal_concern": this.editpsycosocialfunctionalsummaryForm.value.legal_concern,	
    "cognitive_functioning_na": this.editpsycosocialfunctionalsummaryForm.value.cognitive_functioning_na,	
    "cognitive_functioning_strength": this.editpsycosocialfunctionalsummaryForm.value.cognitive_functioning_strength,	
    "cognitive_functioning_concern": this.editpsycosocialfunctionalsummaryForm.value.cognitive_functioning_concern,	
    "housing_na": this.editpsycosocialfunctionalsummaryForm.value.housing_na,	
    "housing_strength": this.editpsycosocialfunctionalsummaryForm.value.housing_strength,	
    "housing_concern": this.editpsycosocialfunctionalsummaryForm.value.housing_concern,	
    "social_skills_na": this.editpsycosocialfunctionalsummaryForm.value.social_skills_na,	
    "social_skills_strength": this.editpsycosocialfunctionalsummaryForm.value.social_skills_strength,	
    "social_skills_concern": this.editpsycosocialfunctionalsummaryForm.value.social_skills_concern,		
    "impulse_control_na": this.editpsycosocialfunctionalsummaryForm.value.impulse_control_na,		
    "impulse_control_strength": this.editpsycosocialfunctionalsummaryForm.value.impulse_control_strength,		
    "impulse_control_concern": this.editpsycosocialfunctionalsummaryForm.value.impulse_control_concern,		
    "responsibility_na": this.editpsycosocialfunctionalsummaryForm.value.responsibility_na,		
    "responsibility_strength": this.editpsycosocialfunctionalsummaryForm.value.responsibility_strength,		
    "responsibility_concern": this.editpsycosocialfunctionalsummaryForm.value.responsibility_concern
  }
   
   
     this._DataService.InsertPsychosocialfunctionalsummaryDetails(psychosocialfunctionalsummaryEdit).subscribe(res=>{
       console.log('Functional Summary Details res'+res);
       console.log('Functional Summary Details success == '+res.success);
       if(res.success==true){
         alert("Functional Summary Details Updated Successfully!");
        
        // location.href = '/patient/patient#/profile/healthnutritionalform';
          // window.location.reload();
         this.router.navigate(['./profile/psychosocialform']) 
       } else {
         console.log('Error', res.error)
         alert("Update Failed");
       }
     });
  
  
   }

    //Insert Edit Mental assessment Details
  editpsycosocialmentalassesment() { 

    var psychosocialmaEdit = {   
      "id":this.MAId,   
      "unique_id": this.editpsycosocialmentalassesmentForm.value.unique_id,
  "well_groomed_appearance": this.editpsycosocialmentalassesmentForm.value.well_groomed_appearance,
  "disheveled_appearance": this.editpsycosocialmentalassesmentForm.value.disheveled_appearance,
  "bizarre_appearance": this.editpsycosocialmentalassesmentForm.value.bizarre_appearance,
  "other_appearance": this.editpsycosocialmentalassesmentForm.value.other_appearance,
  "describe_appearance": this.editpsycosocialmentalassesmentForm.value.describe_appearance,
  "normal_mood": this.editpsycosocialmentalassesmentForm.value.normal_mood,
  "euphoric_mood": this.editpsycosocialmentalassesmentForm.value.euphoric_mood,
  "depressed_mood": this.editpsycosocialmentalassesmentForm.value.depressed_mood,
  "irritable_mood": this.editpsycosocialmentalassesmentForm.value.irritable_mood,
  "anxious_mood": this.editpsycosocialmentalassesmentForm.value.anxious_mood,
  "other_mood": this.editpsycosocialmentalassesmentForm.value.other_mood,
  "describe_mood": this.editpsycosocialmentalassesmentForm.value.describe_mood,
  "cooperative_anxious": this.editpsycosocialmentalassesmentForm.value.cooperative_anxious,
  "uncooperative_anxious": this.editpsycosocialmentalassesmentForm.value.uncooperative_anxious,
  "normal_speech": this.editpsycosocialmentalassesmentForm.value.normal_speech,
  "slurred_speech": this.editpsycosocialmentalassesmentForm.value.slurred_speech,
  "soft_speech": this.editpsycosocialmentalassesmentForm.value.soft_speech,
  "nonverbal_speech": this.editpsycosocialmentalassesmentForm.value.nonverbal_speech,
  "loud_speech": this.editpsycosocialmentalassesmentForm.value.loud_speech,
  "limited_comm_skills_speech": this.editpsycosocialmentalassesmentForm.value.limited_comm_skills_speech,
  "pressured_speech": this.editpsycosocialmentalassesmentForm.value.pressured_speech,
  "uses_yes_no_only_speech": this.editpsycosocialmentalassesmentForm.value.uses_yes_no_only_speech,
  "halting_speech": this.editpsycosocialmentalassesmentForm.value.halting_speech,
  "uses_a_picture_board_speech": this.editpsycosocialmentalassesmentForm.value.uses_a_picture_board_speech,
  "incoherent_speech": this.editpsycosocialmentalassesmentForm.value.incoherent_speech,
  "other_speech": this.editpsycosocialmentalassesmentForm.value.other_speech,
  "describe_speech": this.editpsycosocialmentalassesmentForm.value.describe_speech,
  "guarded_suspicious": this.editpsycosocialmentalassesmentForm.value.guarded_suspicious,
  "belligerent_hostile_suspicious": this.editpsycosocialmentalassesmentForm.value.belligerent_hostile_suspicious,
  "other_suspicious": this.editpsycosocialmentalassesmentForm.value.other_suspicious,
  "describe_suspicious": this.editpsycosocialmentalassesmentForm.value.describe_suspicious,
  "calm_motor_activity": this.editpsycosocialmentalassesmentForm.value.calm_motor_activity,
  "tremor_tics_motor_activity": this.editpsycosocialmentalassesmentForm.value.tremor_tics_motor_activity,
  "hyperactive_motor_activity": this.editpsycosocialmentalassesmentForm.value.hyperactive_motor_activity,
  "lethargic_motor_activity": this.editpsycosocialmentalassesmentForm.value.lethargic_motor_activity,
  "agitated_motor_activity": this.editpsycosocialmentalassesmentForm.value.agitated_motor_activity,
  "other_motor_activity": this.editpsycosocialmentalassesmentForm.value.other_motor_activity,
  "describe_motor_activity": this.editpsycosocialmentalassesmentForm.value.describe_motor_activity,
  "intact_tangential_thought_process": this.editpsycosocialmentalassesmentForm.value.intact_tangential_thought_process,
  "flight_of_ideas_thought_process": this.editpsycosocialmentalassesmentForm.value.flight_of_ideas_thought_process,
  "circumstantial_thought_process": this.editpsycosocialmentalassesmentForm.value.circumstantial_thought_process,
  "inability_to_abstract_thought_process": this.editpsycosocialmentalassesmentForm.value.inability_to_abstract_thought_process,
  "loose_associations_thought_process": this.editpsycosocialmentalassesmentForm.value.loose_associations_thought_process,
  "can_only_follow_1_step_directions_thought_process": this.editpsycosocialmentalassesmentForm.value.can_only_follow_1_step_directions_thought_process,
  "other_thought_process": this.editpsycosocialmentalassesmentForm.value.other_thought_process,
  "describe_thought_process": this.editpsycosocialmentalassesmentForm.value.describe_thought_process,
  "appropriate_affect": this.editpsycosocialmentalassesmentForm.value.appropriate_affect,
  "inappropriate_affect": this.editpsycosocialmentalassesmentForm.value.inappropriate_affect,
  "sad_affect": this.editpsycosocialmentalassesmentForm.value.sad_affect,
  "angry_affect": this.editpsycosocialmentalassesmentForm.value.angry_affect,
  "flat_affect": this.editpsycosocialmentalassesmentForm.value.flat_affect,
  "constricted_affect": this.editpsycosocialmentalassesmentForm.value.constricted_affect,
  "anxious_affect": this.editpsycosocialmentalassesmentForm.value.anxious_affect,
  "labile_affect": this.editpsycosocialmentalassesmentForm.value.labile_affect,
  "other_affect": this.editpsycosocialmentalassesmentForm.value.other_affect,
  "describe_affect": this.editpsycosocialmentalassesmentForm.value.describe_affect,
  "normal_morbid_thought_content": this.editpsycosocialmentalassesmentForm.value.normal_morbid_thought_content,
  "paranoid_thought_content": this.editpsycosocialmentalassesmentForm.value.paranoid_thought_content,
  "somatic_complaints_thought_content": this.editpsycosocialmentalassesmentForm.value.somatic_complaints_thought_content,
  "phobias_thought_content": this.editpsycosocialmentalassesmentForm.value.phobias_thought_content,
  //"obsessive_thought_content": this.editpsycosocialmentalassesmentForm.value.obsessive_thought_content,
  "aggressive_thought_content": this.editpsycosocialmentalassesmentForm.value.aggressive_thought_content,
  "other_thought_content": this.editpsycosocialmentalassesmentForm.value.other_thought_content,
  "describe_thought_content": this.editpsycosocialmentalassesmentForm.value.describe_thought_content,
  "person_orientation": this.editpsycosocialmentalassesmentForm.value.person_orientation,
  "responds_to_name_orientation": this.editpsycosocialmentalassesmentForm.value.responds_to_name_orientation,
  "place_orientation": this.editpsycosocialmentalassesmentForm.value.place_orientation,
  "time_orientation": this.editpsycosocialmentalassesmentForm.value.time_orientation,
  "recognizes_familiar_faces_places_orientation": this.editpsycosocialmentalassesmentForm.value.recognizes_familiar_faces_places_orientation,
  "describe_orientation": this.editpsycosocialmentalassesmentForm.value.describe_orientation,
  "na_psychosis": this.editpsycosocialmentalassesmentForm.value.na_psychosis,
  "describe_psychosis": this.editpsycosocialmentalassesmentForm.value.describe_psychosis,
  "denies_hallucinations": this.editpsycosocialmentalassesmentForm.value.denies_hallucinations,
  "auditory_hallucinations": this.editpsycosocialmentalassesmentForm.value.auditory_hallucinations,
  "visual_hallucinations": this.editpsycosocialmentalassesmentForm.value.visual_hallucinations,
  "other_hallucinations": this.editpsycosocialmentalassesmentForm.value.other_hallucinations,
  "describe_hallucinations": this.editpsycosocialmentalassesmentForm.value.describe_hallucinations,
  "denies_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.denies_command_hallucinations,
  "harm_to_self_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.harm_to_self_command_hallucinations,
  "harm_to_others_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.harm_to_others_command_hallucinations,
  "can_resist_commands_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.can_resist_commands_command_hallucinations,
  "other_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.other_command_hallucinations,
  "describe_command_hallucinations": this.editpsycosocialmentalassesmentForm.value.describe_command_hallucinations,
  "denies_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.denies_bizarre_delusions,
  "thought_broadcasting_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.thought_broadcasting_bizarre_delusions,
  "thought_insertion_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.thought_insertion_bizarre_delusions,
  "thought_withdrawal_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.thought_withdrawal_bizarre_delusions,
  "other_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.other_bizarre_delusions,
  "describe_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.describe_bizarre_delusions,
  //"denies_bizarre_delusions": this.editpsycosocialmentalassesmentForm.value.denies_bizarre_delusions,
  "religious_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.religious_delusional_beliefs,
  "somatic_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.somatic_delusional_beliefs,
  "persecutory_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.persecutory_delusional_beliefs,
  "grandiosity_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.grandiosity_delusional_beliefs,
  "being_controlled_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.being_controlled_delusional_beliefs,
  "ideas_of_reference_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.ideas_of_reference_delusional_beliefs,
  "describe_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.describe_delusional_beliefs,
  "summary_assessment_of_mental_status_exam_delusional_beliefs": this.editpsycosocialmentalassesmentForm.value.summary_assessment_of_mental_status_exam_delusional_beliefs,
    }
     
     
       this._DataService.InsertPsychosocialmentalassessmentDetails(psychosocialmaEdit).subscribe(res=>{
         console.log('Mental Assessment Details res'+res);
         console.log('Mental Assessment Details success == '+res.success);
         if(res.success==true){
           alert("Mental Assessment Details Updated Successfully!");
          
          // location.href = '/patient/patient#/profile/healthnutritionalform';
            // window.location.reload();
           this.router.navigate(['./profile/psychosocialform']) 
         } else {
           console.log('Error', res.error)
           alert("Update Failed");
         }
       });
    
    
     }



      //Insert Edit Mental assessment Details
  editpsycosocialhealthnsafety() { 

    var psychosocialhsEdit = {   
      "id":this.HSId,   
      "unique_id": this.editpsycosocialhealthnsafetyForm.value.unique_id,
  "none_identified_risk_factors": this.editpsycosocialhealthnsafetyForm.value.none_identified_risk_factors,	
	  "unsafe_sex_practices": this.editpsycosocialhealthnsafetyForm.value.unsafe_sex_practices,	
	  "physical_abuse": this.editpsycosocialhealthnsafetyForm.value.physical_abuse,	
	  "impulsivity": this.editpsycosocialhealthnsafetyForm.value.impulsivity,	
	  "pregnancy": this.editpsycosocialhealthnsafetyForm.value.pregnancy,	
	  "residential_safety": this.editpsycosocialhealthnsafetyForm.value.residential_safety,	
	  "chronic_health_problems": this.editpsycosocialhealthnsafetyForm.value.chronic_health_problems,	
	  "sexual_abuse": this.editpsycosocialhealthnsafetyForm.value.sexual_abuse,	
	  "iv_drug_abuse": this.editpsycosocialhealthnsafetyForm.value.iv_drug_abuse,	
	  "non_attentive": this.editpsycosocialhealthnsafetyForm.value.non_attentive,	
	  "alcohol_substance_abuse": this.editpsycosocialhealthnsafetyForm.value.alcohol_substance_abuse,	
	  "diet_nutrition": this.editpsycosocialhealthnsafetyForm.value.diet_nutrition,	
	  "hygiene": this.editpsycosocialhealthnsafetyForm.value.hygiene,	
	  "self_harm": this.editpsycosocialhealthnsafetyForm.value.self_harm,	
	  "nicotine_use": this.editpsycosocialhealthnsafetyForm.value.nicotine_use,	
	  "household_management": this.editpsycosocialhealthnsafetyForm.value.household_management,	
	  "aggression_toward_others": this.editpsycosocialhealthnsafetyForm.value.aggression_toward_others,	
	  "medication_interaction": this.editpsycosocialhealthnsafetyForm.value.medication_interaction,	
	  "physical_disability": this.editpsycosocialhealthnsafetyForm.value.physical_disability,	
	  "verbal_emotional_abuse": this.editpsycosocialhealthnsafetyForm.value.verbal_emotional_abuse,	
	  "medication_management": this.editpsycosocialhealthnsafetyForm.value.medication_management,	
	  "recent_loss": this.editpsycosocialhealthnsafetyForm.value.recent_loss,	
	  "children_at_risk": this.editpsycosocialhealthnsafetyForm.value.children_at_risk,	
	  "stress_related_to_parenting": this.editpsycosocialhealthnsafetyForm.value.stress_related_to_parenting,	
	  "psychosis": this.editpsycosocialhealthnsafetyForm.value.psychosis,	
	  "evacuation_score": this.editpsycosocialhealthnsafetyForm.value.evacuation_score,	
	  "community_safety": this.editpsycosocialhealthnsafetyForm.value.community_safety,	
	  "other_identified_risk_factors": this.editpsycosocialhealthnsafetyForm.value.other_identified_risk_factors,	
	  "none_identified_needs": this.editpsycosocialhealthnsafetyForm.value.none_identified_needs,	
	  "quarterly_td_screening": this.editpsycosocialhealthnsafetyForm.value.quarterly_td_screening,	
	  "dental_exam": this.editpsycosocialhealthnsafetyForm.value.dental_exam,	
	  "vision_exam": this.editpsycosocialhealthnsafetyForm.value.vision_exam,	
	  "labs_frequency": this.editpsycosocialhealthnsafetyForm.value.labs_frequency,	
	  "coordination_of_care": this.editpsycosocialhealthnsafetyForm.value.coordination_of_care,	
	  "assistance_with_childrens_needs": this.editpsycosocialhealthnsafetyForm.value.assistance_with_childrens_needs,	
	  "health_care_assessment_yearly_checkup": this.editpsycosocialhealthnsafetyForm.value.health_care_assessment_yearly_checkup,	
	  "other_identified_needs": this.editpsycosocialhealthnsafetyForm.value.other_identified_needs,	
	  "na_basic_needs": this.editpsycosocialhealthnsafetyForm.value.na_basic_needs,	
	  "food_basic_needs": this.editpsycosocialhealthnsafetyForm.value.food_basic_needs,	
	  "shelter_basic_needs": this.editpsycosocialhealthnsafetyForm.value.shelter_basic_needs,	
	  "medical_basic_needs": this.editpsycosocialhealthnsafetyForm.value.medical_basic_needs,	
	  "describe_basic_needs": this.editpsycosocialhealthnsafetyForm.value.describe_basic_needs,	
	  "none_suicide_risk": this.editpsycosocialhealthnsafetyForm.value.none_suicide_risk,	
	  "ideation_history_of_suicidality": this.editpsycosocialhealthnsafetyForm.value.ideation_history_of_suicidality,	
	  "chronic_history_of_suicidality": this.editpsycosocialhealthnsafetyForm.value.chronic_history_of_suicidality,	
	  "acute_history_of_suicidality": this.editpsycosocialhealthnsafetyForm.value.acute_history_of_suicidality,	
	  "recent_suicidal_behavior": this.editpsycosocialhealthnsafetyForm.value.recent_suicidal_behavior,	
	  "describe_history_of_suicidality": this.editpsycosocialhealthnsafetyForm.value.describe_history_of_suicidality,	
	  "none_presence_of_risk_behaviour": this.editpsycosocialhealthnsafetyForm.value.none_presence_of_risk_behaviour,	
	  "note_presence_of_risk_behaviour": this.editpsycosocialhealthnsafetyForm.value.note_presence_of_risk_behaviour,	
	  "will_presence_of_risk_behaviour": this.editpsycosocialhealthnsafetyForm.value.will_presence_of_risk_behaviour,	
	  "gives_possessions_away": this.editpsycosocialhealthnsafetyForm.value.gives_possessions_away,	
	  "other_presence_of_risk_behaviour": this.editpsycosocialhealthnsafetyForm.value.other_presence_of_risk_behaviour,	
	  "intent_of_risk_factors": this.editpsycosocialhealthnsafetyForm.value.intent_of_risk_factors,	
	  "none_prior_attempts": this.editpsycosocialhealthnsafetyForm.value.none_prior_attempts,	
	  "plan_of_risk_factors": this.editpsycosocialhealthnsafetyForm.value.plan_of_risk_factors,	
	  "means_to_carry_out_plan": this.editpsycosocialhealthnsafetyForm.value.means_to_carry_out_plan,	
	  "lethality_of_risk_factors": this.editpsycosocialhealthnsafetyForm.value.lethality_of_risk_factors,	
	  "likelihood_of_rescue": this.editpsycosocialhealthnsafetyForm.value.likelihood_of_rescue,	
	  "access_to_gun": this.editpsycosocialhealthnsafetyForm.value.access_to_gun,	
	  "describe_of_risk_factors": this.editpsycosocialhealthnsafetyForm.value.describe_of_risk_factors,	
	  "thoughts_of_harm_to_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.thoughts_of_harm_to_threat_of_danger_to_others,	
	  "recent_threatening_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.recent_threatening_threat_of_danger_to_others,	
	  "identified_target_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.identified_target_threat_of_danger_to_others,	
	  "intent_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.intent_threat_of_danger_to_others,	
	  "can_thoughts_of_harm_be_managed_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.can_thoughts_of_harm_be_managed_threat_of_danger_to_others,	
	  "means_to_carry_out_plan_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.means_to_carry_out_plan_threat_of_danger_to_others,	
	  "lethality_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.lethality_threat_of_danger_to_others,	
	  "access_to_gun_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.access_to_gun_threat_of_danger_to_others,	
	  "prior_aggression_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.prior_aggression_threat_of_danger_to_others,	
	  "plan_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.plan_threat_of_danger_to_others,	
	  "describe_threat_of_danger_to_others": this.editpsycosocialhealthnsafetyForm.value.describe_threat_of_danger_to_others,	
	  "none_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.none_presence_of_high_risk,	
	  "cutting_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.cutting_presence_of_high_risk,	
	  "head_banging_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.head_banging_presence_of_high_risk,	
	  "poor_or_dangerous_rel_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.poor_or_dangerous_rel_presence_of_high_risk,	
	  "anorexia_bulimia_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.anorexia_bulimia_presence_of_high_risk,	
	  "risk_taking_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.risk_taking_presence_of_high_risk,	
	  "other_self_injurious_beh_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.other_self_injurious_beh_presence_of_high_risk,	
	  "other_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.other_presence_of_high_risk,	
	  "describe_presence_of_high_risk": this.editpsycosocialhealthnsafetyForm.value.describe_presence_of_high_risk,	
	  "na_presence_of_deterrents": this.editpsycosocialhealthnsafetyForm.value.na_presence_of_deterrents,	
	  "describe_presence_of_deterrents": this.editpsycosocialhealthnsafetyForm.value.describe_presence_of_deterrents,	
	  "none_other_safety_concerns": this.editpsycosocialhealthnsafetyForm.value.none_other_safety_concerns,	
	  "describe_other_safety_concerns": this.editpsycosocialhealthnsafetyForm.value.describe_other_safety_concerns,	
	  "assessment_of_risk": this.editpsycosocialhealthnsafetyForm.value.assessment_of_risk
    }
     
     
       this._DataService.InsertPsychosocialhealthnsafetyDetails(psychosocialhsEdit).subscribe(res=>{
         console.log('Health And Safety Details res'+res);
         console.log('Health And Safety Details success == '+res.success);
         if(res.success==true){
           alert("Health And Safety Details Updated Successfully!");
          
          // location.href = '/patient/patient#/profile/healthnutritionalform';
            // window.location.reload();
           this.router.navigate(['./profile/psychosocialform']) 
         } else {
           console.log('Error', res.error)
           alert("Update Failed");
         }
       });
    
    
     }
   
}
