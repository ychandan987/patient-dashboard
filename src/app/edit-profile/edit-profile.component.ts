import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApigatewayService } from '../apigateway.service';
import { Router } from '@angular/router';
import { CryptService } from '../crypt.service';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [ApigatewayService, CryptService]
})
export class EditProfileComponent implements OnInit {

  
  public editProfileForm: FormGroup;
  public editUserForm: FormGroup;
  public editUserWorkForm: FormGroup;

  public editFDProfileForm: FormGroup;
  public editPersonalHealthInsForm: FormGroup;
  public editMedicalPrefForm: FormGroup;
  public editFamilyHospForm: FormGroup;
  

    // Main Task
    task: AngularFireUploadTask;

    // Progress Monitoring
    percentage: Observable<number>;
  
    snapshot: Observable<any>;
  
    // Download URL
    downloadUrl: Observable<String>;

    isFileAvailable:boolean = false;

  constructor(private formBuilder: FormBuilder, private _DataService: ApigatewayService, private storage: AngularFireStorage, 
     private router: Router, private crypt: CryptService) {
    this.editProfileForm = this.formBuilder.group({
      uniqueId: [''],
      aadhaarNo: ['', [Validators.required, Validators.minLength(12)]],
      address: ['', [Validators.required,Validators.minLength(10)]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6)]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      previousAilments: ['', Validators.required],
      familyMedicalRecords: ['', Validators.required],
      profilePicturePath:['']
    });
    this.editUserForm = this.formBuilder.group({
      username: ['', [Validators.required,Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required]],
      mobile_no: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10),Validators.pattern('[6-9]\\d{9}')]]
    });

    this.editUserWorkForm = this.formBuilder.group({
      unique_id: [''],
      place_of_work: ['', Validators.required],
      office_address: ['', Validators.required],
      designation: ['', [Validators.required]],
      department: ['', [Validators.required]],
      permanent_address: ['', [Validators.required]],
      whatsapp_mob_no: ['', [Validators.required]],
      office_email_id: ['', [Validators.required]]
    });
    this.editFDProfileForm = this.formBuilder.group({
      unique_id: [''],    
      no_of_member: ['', Validators.required],
      spouse_name: ['', Validators.required],
      spouse_dob: ['', Validators.required],
      spouse_mob: ['', Validators.required],
      spouse_email: ['', Validators.required],
      child_name_1: ['', Validators.required],
      child_dob_1: ['', Validators.required],
      child_name_2: ['', Validators.required],
      child_dob_2: ['', Validators.required],
      father_name: ['', Validators.required],
      father_dob: ['', Validators.required],
      mother_name: ['', Validators.required],
      mother_dob: ['', Validators.required]
    });
    this.editFamilyHospForm = this.formBuilder.group({
      unique_id: [''],    
      hospital_incidence: ['', Validators.required],
      pimary_concern_hospitalized: ['', Validators.required],
      hospital_choosen: ['', Validators.required],
      final_bill: ['', Validators.required]     
    });

    this.editPersonalHealthInsForm = this.formBuilder.group({
      unique_id: [''],    
      family_members_covered: ['', Validators.required],
      personal_health_insurance: ['', Validators.required],
      insurance_company_name: ['', Validators.required],
      policy_name: ['', Validators.required], 
       inpatient_coverage_limit: ['', Validators.required],
      policy_plan_include_outpatient_coverage: ['', Validators.required],
      coverage_details_inr: ['', Validators.required] 
    });

    this.editMedicalPrefForm = this.formBuilder.group({
      unique_id: [''],    
      fixed_family_physician: ['', Validators.required],
      family_physician: ['', Validators.required],
      general_physician: ['', Validators.required],
      gynecologist: ['', Validators.required], 
       peditrician: ['', Validators.required],
      endocrinologist: ['', Validators.required],
      cardiologist: ['', Validators.required],
       preferred_diagnostic_center: ['', Validators.required],
      diagnostic_center_lab_1: ['', Validators.required],
      diagnostic_center_lab_2: ['', Validators.required],
      preferred_nursing_home: ['', Validators.required], 
       nursing_home_1: ['', Validators.required],
      nursing_home_2: ['', Validators.required] 
    });

   }
   userReg;
   profile;
   profileId;
   accountType;
   currentUser = JSON.parse(this.crypt.get('currentUser'));
   file;
   doc;
   workdetails;
   id;

   FamilyDetails;
   FDId;

   FamilyHosp;
   FHospId;   

  PersonalHealthIns;
   PHInsId;

   MedicalPref;
   MPrefId;

   age_date;
   dob;
   
   today = new Date().toJSON().split('T')[0];

  ngOnInit() {

   

    this._DataService.getUser(this.currentUser.username).subscribe(res => {
      this.userReg = res.data[0];
      this.editUserForm.patchValue({
        username: this.userReg.username,
        first_name: this.userReg.first_name,
        last_name: this.userReg.last_name,
        email: this.userReg.email,
        mobile_no: this.userReg.mobile_no
      });
      this.editProfileForm.patchValue({
        uniqueId: this.userReg.unique_id
      });
      this.editUserWorkForm.patchValue({
        unique_id: this.userReg.unique_id
      });
      this.editFDProfileForm.patchValue({
        unique_id: this.userReg.unique_id
      });
      this.editFamilyHospForm.patchValue({
        unique_id: this.userReg.unique_id
      });
      this.editPersonalHealthInsForm.patchValue({
        unique_id: this.userReg.unique_id
      });
      this.editMedicalPrefForm.patchValue({
        unique_id: this.userReg.unique_id
      });
      console.log('currentuser', this.currentUser)

      this._DataService.getUserProfile(this.userReg.unique_id).subscribe(res => {
        console.log('Profile new: ', res.data);
        this.profile = res.data[0];
        this.age_date = res.data[0].dob;
        function formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();
      
          if (month.length < 2) 
              month = '0' + month;
          if (day.length < 2) 
              day = '0' + day;
      
          return [year, month, day].join('-');
      }
       this.dob = formatDate(this.age_date);
      console.log('agedate===', this.dob);
        console.log('profile id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.profileId = res.data[0].profile_id;
       }
       else{
        this.profileId = 0; 
       }
        this.accountType = res.data[0].account_type;
        this.editProfileForm.setValue({
          uniqueId: res.data[0].unique_id,
          aadhaarNo: res.data[0].aadhaar_no,
          address: res.data[0].address,
          city: res.data[0].city,
          state: res.data[0].state,
          pincode: res.data[0].pincode,
          gender: res.data[0].gender,
          age: res.data[0].age,
          dob: this.dob,
          bloodGroup: res.data[0].blood_group,
          height: res.data[0].height,
          weight: res.data[0].weight,
          previousAilments: res.data[0].previous_ailments,
          familyMedicalRecords: res.data[0].family_medical_records,
          profilePicturePath: res.data[0].profile_picture_path
        
        })
    //  }
      });
      this._DataService.getUserWorkDetails(this.userReg.unique_id).subscribe(res => {
        console.log('work det : ', res.data);
        this.workdetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.id = res.data[0].id;
       }
       else{
        this.id = 0; 
       }
      console.log('id == ',this.id);
        this.editUserWorkForm.setValue({
          unique_id: res.data[0].unique_id,
          place_of_work: res.data[0].place_of_work,
          office_address: res.data[0].office_address,
          designation: res.data[0].designation,
          department: res.data[0].department,
          permanent_address: res.data[0].permanent_address,
          whatsapp_mob_no: res.data[0].whatsapp_mob_no,
          office_email_id: res.data[0].office_email_id
         
        })
    //  }
      });


      this._DataService.getUserFamilyDetails(this.userReg.unique_id).subscribe(res => {
        console.log('work det : ', res.data);
        this.FamilyDetails = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.FDId = res.data[0].id;
       }
       else{
        this.FDId = 0; 
       }
      console.log('FDId == ',this.FDId);
        this.editFDProfileForm.setValue({
          unique_id: res.data[0].unique_id,
          no_of_member: res.data[0].no_of_member,
          spouse_name: res.data[0].spouse_name,
          spouse_dob: res.data[0].spouse_dob,
          spouse_mob: res.data[0].spouse_mob,
          spouse_email: res.data[0].spouse_email,
          child_name_1: res.data[0].child_name_1,
          child_dob_1: res.data[0].child_dob_1,
          child_name_2: res.data[0].child_name_2,
          child_dob_2: res.data[0].child_dob_2,
          father_name: res.data[0].father_name,
          father_dob: res.data[0].father_dob,
          mother_name: res.data[0].mother_name,
          mother_dob: res.data[0].mother_dob         
        })
    //  }
      });

      this._DataService.getFamilyHospDetails(this.userReg.unique_id).subscribe(res => {
        console.log('FamilyHosp det : ', res.data);
        this.FamilyHosp = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.FHospId = res.data[0].id;
       }
       else{
        this.FHospId = 0; 
       }
      console.log('id == ',this.FHospId);
        this.editFamilyHospForm.setValue({
          unique_id: res.data[0].unique_id,
          hospital_incidence: res.data[0].hospital_incidence,
          pimary_concern_hospitalized: res.data[0].pimary_concern_hospitalized,
          hospital_choosen: res.data[0].hospital_choosen,
          final_bill: res.data[0].final_bill
         
        })
    //  }
      });

      this._DataService.getHealthInsDetails(this.userReg.unique_id).subscribe(res => {
        console.log('getHealthInsDetails : ', res.data);
        this.PersonalHealthIns = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.PHInsId = res.data[0].id;
       }
       else{
        this.PHInsId = 0; 
       }
      console.log('PHInsId == ',this.PHInsId);
        this.editPersonalHealthInsForm.setValue({
          unique_id: res.data[0].unique_id,
          family_members_covered: res.data[0].family_members_covered,
          personal_health_insurance: res.data[0].personal_health_insurance,
          insurance_company_name: res.data[0].insurance_company_name,
          policy_name: res.data[0].policy_name,
          inpatient_coverage_limit: res.data[0].inpatient_coverage_limit,
          policy_plan_include_outpatient_coverage: res.data[0].policy_plan_include_outpatient_coverage,
          coverage_details_inr: res.data[0].coverage_details_inr
         
        })
    //  }
      });

      this._DataService.getMedicalPrefDetails(this.userReg.unique_id).subscribe(res => {
        console.log('getMedicalPrefDetails : ', res.data);
        this.MedicalPref = res.data[0];
      //  console.log(' id==',res.data[0]);
      //  if (res.data[0]) {
        if(res.data[0])
       { 
        this.MPrefId = res.data[0].id;
       }
       else{
        this.MPrefId = 0; 
       }
      console.log('MPrefId == ',this.MPrefId);
        this.editMedicalPrefForm.setValue({
          unique_id: res.data[0].unique_id,
          fixed_family_physician: res.data[0].fixed_family_physician,
          family_physician: res.data[0].family_physician,
          general_physician: res.data[0].general_physician,
          gynecologist: res.data[0].gynecologist,
          peditrician: res.data[0].peditrician,
          endocrinologist: res.data[0].endocrinologist,
          cardiologist: res.data[0].cardiologist,         
          preferred_diagnostic_center: res.data[0].preferred_diagnostic_center,
          diagnostic_center_lab_1: res.data[0].diagnostic_center_lab_1,
          diagnostic_center_lab_2: res.data[0].diagnostic_center_lab_2,
          preferred_nursing_home: res.data[0].preferred_nursing_home,
          nursing_home_1: res.data[0].nursing_home_1,
          nursing_home_2: res.data[0].nursing_home_2
        })
    //  }
      });
     
     
     //console.log('edit user form values == ', this.editUserWorkForm);

    //  console.log('User profile: ',this.userReg);

    
      
    })
   
   
   
    


    this._DataService.getUserAddDetails(JSON.parse(this.crypt.get('currentUser').unique_id)).subscribe(res=>{
      this.editProfileForm.patchValue({
        id:res.data[0].id,
        doctor_id:res.data[0].doctor_id,
        bank_name:res.data[0].bank_name,
        branch:res.data[0].branch,
        ifsc_code:res.data[0].ifsc_code,
        beneficiary_name:res.data[0].beneficiary_name,
        account_no:res.data[0].account_no        
      })
       
    })
  }
  
  upload = false;
  getFile(event: FileList){
    // File object
    this.file = event.item(0);
    if (this.file.type.match('image.jpeg')) {
      // do something
      this.upload = true;
     
    } else {
      this.upload = false;
     
      alert('invalid format! Please select JPEG Images');
    }
    this.isFileAvailable = true;
  }
  
  editProfile() { 

   if(this.editProfileForm.value.dob)
   {
    const bdate = new Date(this.editProfileForm.value.dob);
    console.log('bdate ===',bdate);

  const timeDiff = Math.abs(Date.now() - bdate.getTime() );
  console.log('timeDiff ===',timeDiff);

  this.editProfileForm.value.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
console.log('age ===',this.editProfileForm.value.age);
  }
    var profileEdit = {
      "profileId": this.profileId,
      "uniqueId": this.editProfileForm.value.uniqueId,
      "bloodGroup": this.editProfileForm.value.bloodGroup,
      "height": this.editProfileForm.value.height,
      "weight": this.editProfileForm.value.weight,
      "age": this.editProfileForm.value.age,
      "dob": this.editProfileForm.value.dob,
      "gender": this.editProfileForm.value.gender,
      "state": this.editProfileForm.value.state,
      "city": this.editProfileForm.value.city,
      "address": this.editProfileForm.value.address,
      "pincode": this.editProfileForm.value.pincode,
      "aadhaarNo": this.editProfileForm.value.aadhaarNo,
      "previousAilments": this.editProfileForm.value.previousAilments,
      "familyMedicalRecords": this.editProfileForm.value.familyMedicalRecords,
      "profilePicturePath": this.editProfileForm.value.profilePicturePath,
      "accountType": this.accountType
  }
  
  if(this.isFileAvailable){
    if(this.upload){
    this.startUpload(this.file).then((res)=>{
      this.doc = res;
      console.log('pic upload status == ',this.doc);
      profileEdit.profilePicturePath = res;
      console.log("Uploaded Data: ", this.profile);
      if(this.doc != undefined)
      {//start of if
      this._DataService.userProfile(profileEdit).subscribe(res=>{
        if(res.success==true){
          alert("Profile Updated Successfully!");
         
          //location.href = '/member/member#/profile/';
         // window.location.reload();
         this.router.navigate(['./profile']);
        } else {
          console.log('Error', res.error)
          //alert("Update Failed");
        }
      });
    }//end of if
    });
  }
  else{
    alert("Please Upload Profile Picture in Jpeg or jpg format only!"); 
  }
  } else {
    this._DataService.userProfile(profileEdit).subscribe(res=>{
      if(res.success==true){
        alert("Profile Updated Successfully!");
       
        //location.href = '/member/patient#/profile/';
         // window.location.reload();
        this.router.navigate(['./profile']); 
      } else {
        console.log('Error', res.error)
       //alert("Update Failed");
      }
    });
  }


  }

  editUser() {
    // console.log("Sign Up form: ", this.signUpForm.value);
 // this.signUpForm.removeControl('confirmpassword')
 this._DataService.register(this.editUserForm.value).subscribe(res=>{
   // console.log("Response:", res.success);
   if(res.success==true){
     this.router.navigate(['profile/'+this.editUserForm.value.mobile_no]) 
   } else {
     console.log('Error', res.error)
    
   }
 });
}

async startUpload(file){

  if (file!=undefined){
    // Storage Path
    const path = `patient_profile/${new Date().getTime()}_${file.name}`;

    // Main Task
    this.task = this.storage.upload(path, file);

    const ref = this.storage.ref(path);

    // Progress Monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();

    let downURL;
    let promise = new Promise((resolve,reject) => {
      // File's Download Url
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadUrl = ref.getDownloadURL();
          this.downloadUrl.subscribe( (url) => {
            // this.doc = url;
            //  console.log("DownloadURL: "+this.doc);
            resolve(url);
          })
      })).subscribe();
    });

    downURL = await promise;
    return downURL;
  } else {
    return undefined;
    // if (file==undefined){
    //   alert("Please select a report to upload!");
    // } else {
    //   alert("Please specify test name of the report!");
    // }
  }
}

//Insert Edit User Work Details
editUserWork() { 

  var UserWorkEdit = {   
    "id":this.id ,
    "unique_id": this.editUserWorkForm.value.unique_id,
    "place_of_work": this.editUserWorkForm.value.place_of_work,
    "office_address": this.editUserWorkForm.value.office_address,
    "designation": this.editUserWorkForm.value.designation,
    "department": this.editUserWorkForm.value.department,
    "permanent_address": this.editUserWorkForm.value.permanent_address,
    "whatsapp_mob_no": this.editUserWorkForm.value.whatsapp_mob_no,
    "office_email_id": this.editUserWorkForm.value.office_email_id
}
 
 
   this._DataService.InsertUserWorkDetails(UserWorkEdit).subscribe(res=>{
     console.log('res'+res);
     console.log('res su == '+res.success);
     if(res.success==true){
       alert("Work Details Updated Successfully!");
      
      // location.href = '/member/member#/profile/edit/';
        // window.location.reload();
        this.router.navigate(['./profile/edit']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

 //Insert Edit User Family Details
 editFamilyDetailsProfile() { 

  var UserFamilyDetailsEdit = {   
  "id":this.FDId,   
  "unique_id":this.editFDProfileForm.value.unique_id,
  "no_of_member":this.editFDProfileForm.value.no_of_member,
  "spouse_name":this.editFDProfileForm.value.spouse_name,
  "spouse_dob":this.editFDProfileForm.value.spouse_dob,
  "spouse_mob":this.editFDProfileForm.value.spouse_mob,
  "spouse_email":this.editFDProfileForm.value.spouse_email,
  "child_name_1":this.editFDProfileForm.value.child_name_1,
  "child_dob_1":this.editFDProfileForm.value.child_dob_1,
  "child_name_2":this.editFDProfileForm.value.child_name_2,
  "child_dob_2":this.editFDProfileForm.value.child_dob_2,
  "father_name":this.editFDProfileForm.value.father_name,
  "father_dob":this.editFDProfileForm.value.father_dob,
  "mother_name":this.editFDProfileForm.value.mother_name,
  "mother_dob":this.editFDProfileForm.value.mother_dob
}
 
 
   this._DataService.InsertUserFamilyDetails(UserFamilyDetailsEdit).subscribe(res=>{
     console.log('family det res'+res);
     console.log('fd res su == '+res.success);
     if(res.success==true){
       alert("Family Details Updated Successfully!");
      
      // location.href = '/member/member#/profile/edit/';
        // window.location.reload();
        this.router.navigate(['./profile/edit']); 
     } else {
       console.log('Error', res.error)
      // alert("Update Failed");
     }
   });


 }

//Insert Edit User Family Hospitalized Details
 editFamilyHosp() { 
console.log('fam hosp u id==',this.editFamilyHospForm.value.unique_id);
console.log('fam hosp final bill==',this.editFamilyHospForm.value.final_bill);


  var UserFamilyHospEdit = {  
    "id":this.FHospId , 
    "unique_id": this.editFamilyHospForm.value.unique_id,
    "hospital_incidence": this.editFamilyHospForm.value.hospital_incidence,
    "pimary_concern_hospitalized": this.editFamilyHospForm.value.pimary_concern_hospitalized,
    "hospital_choosen": this.editFamilyHospForm.value.hospital_choosen,
    "final_bill": this.editFamilyHospForm.value.final_bill
    
}
 
 
   this._DataService.InsertFamilyHospDetails(UserFamilyHospEdit).subscribe(res=>{
     console.log('res'+res);
     console.log('res su == '+res.success);
     if(res.success==true){
       alert("Family Hospitalized Details Updated Successfully!");
      
       //location.href = '/member/member#/profile/edit/';
        // window.location.reload();
        this.router.navigate(['./profile/edit']);
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

//Insert Edit User Personal Health Ins Details
editPersonalHealthIns() { 

  var UserPersonalHealthInsEdit = {  
    "id":this.PHInsId , 
    "unique_id": this.editPersonalHealthInsForm.value.unique_id,
    "family_members_covered": this.editPersonalHealthInsForm.value.family_members_covered,
    "personal_health_insurance": this.editPersonalHealthInsForm.value.personal_health_insurance,
    "insurance_company_name": this.editPersonalHealthInsForm.value.insurance_company_name,
    "policy_name": this.editPersonalHealthInsForm.value.policy_name,
    "inpatient_coverage_limit": this.editPersonalHealthInsForm.value.inpatient_coverage_limit,
    "policy_plan_include_outpatient_coverage": this.editPersonalHealthInsForm.value.policy_plan_include_outpatient_coverage,
    "coverage_details_inr": this.editPersonalHealthInsForm.value.coverage_details_inr

}
 
 
   this._DataService.InsertHealthInsDetails(UserPersonalHealthInsEdit).subscribe(res=>{
     console.log('res'+res);
     console.log('res su == '+res.success);
     if(res.success==true){
       alert("Pesonal Health Ins Details Updated Successfully!");
      
       //location.href = '/member/member#/profile/edit/';
        // window.location.reload();
        this.router.navigate(['./profile/edit']);
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }

//Insert Edit User Personal Health Ins Details
editMedicalPref() { 

  var UsereditMedicalPrefEdit = {   
    "id":this.MPrefId , 
    "unique_id": this.editMedicalPrefForm.value.unique_id,
    "fixed_family_physician": this.editMedicalPrefForm.value.fixed_family_physician,
    "family_physician": this.editMedicalPrefForm.value.family_physician,
    "general_physician": this.editMedicalPrefForm.value.general_physician,
    "gynecologist": this.editMedicalPrefForm.value.gynecologist,
    "peditrician": this.editMedicalPrefForm.value.peditrician,
    "endocrinologist": this.editMedicalPrefForm.value.endocrinologist,
    "cardiologist": this.editMedicalPrefForm.value.cardiologist,
    "preferred_diagnostic_center": this.editMedicalPrefForm.value.preferred_diagnostic_center,
    "diagnostic_center_lab_1": this.editMedicalPrefForm.value.diagnostic_center_lab_1,
    "diagnostic_center_lab_2": this.editMedicalPrefForm.value.diagnostic_center_lab_2,
    "preferred_nursing_home": this.editMedicalPrefForm.value.preferred_nursing_home,
    "nursing_home_1": this.editMedicalPrefForm.value.nursing_home_1,
    "nursing_home_2": this.editMedicalPrefForm.value.nursing_home_2   

}
 
 
   this._DataService.InsertMedicalPrefDetails(UsereditMedicalPrefEdit).subscribe(res=>{
     console.log('res'+res);
     console.log('res su == '+res.success);
     if(res.success==true){
       alert("Medical Pref Details Updated Successfully!");
      
      // location.href = '/member/member#/profile/edit/';
        // window.location.reload();
        this.router.navigate(['./profile/edit']); 
     } else {
       console.log('Error', res.error)
       alert("Update Failed");
     }
   });


 }
//  End of all functions



}

