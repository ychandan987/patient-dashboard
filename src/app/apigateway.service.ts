import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ApigatewayService {
  headers = new Headers();
  constructor(private http: Http) {
    this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MjQ3NDI4Nzh9.kBy-vsGFqaAlu6ukSsBF3vEAGlLnaQNGNw3T-QbwfXQ';
    this.headers.append('x-access-token', this.token);
   }
   token;

  authenticate(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/authenticate', json).map(res => res.json());
  }

  register(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/Users', json).map(res => res.json());
  }

  register1(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/Users1', json).map(res => res.json());
  }

  otp(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/verifyOtp', json).map(res => res.json());
  }

  getUser(username) {
    // console.log("header: ",this.headers)
    return this.http.get('https://arkaahealthapp.com/api/v1/users/' + username, { headers: this.headers }).map(res => res.json());
  }

  getUserEmailMobile() {
    return this.http.get(`https://arkaahealthapp.com/api/v1/arkaa/user/email-mobile/list`, { headers: this.headers }).map(res => res.json());
  }

  getUserProfile(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/users/profiles/' + uid, { headers: this.headers }).map(res => res.json());
  }

  getUserProfileAll(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/admin-users/list-unique-id/' + uid, { headers: this.headers }).map(res => res.json());
  }

  editProfile(json) {
    return this.http.put('https://arkaahealthapp.com/api/v1/UserProfile', json).map(res => res.json());
  }

  userProfile(json) {
    return this.http.put('https://arkaahealthapp.com/api/v1/users/profiles', json, { headers: this.headers }).map(res => res.json());
  }

  InsertUserWorkDetails(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/additional/info', json, { headers: this.headers }).map(res => res.json());
  }

  getUserWorkDetails(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/patient/additional-info/' + uid, { headers: this.headers }).map(res => res.json());
  }

  InsertUserFamilyDetails(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/family/user/details', json, { headers: this.headers }).map(res => res.json());
  }

  getUserFamilyDetails(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/patient/family/details/' + uid, { headers: this.headers }).map(res => res.json());
  }

  InsertFamilyHospDetails(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/user/family/hospitalization', json, { headers: this.headers }).map(res => res.json());
  }

  getFamilyHospDetails(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/patient/hospitalization/list/' + uid, { headers: this.headers }).map(res => res.json());
  }

  InsertHealthInsDetails(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/personel/health/insurance', json, { headers: this.headers }).map(res => res.json());
  }

  getHealthInsDetails(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/view/user/health/insurance/' + uid, { headers: this.headers }).map(res => res.json());
  }

  InsertMedicalPrefDetails(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/medical/preferences', json, { headers: this.headers }).map(res => res.json());
  }

  getMedicalPrefDetails(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/view/medical/preferences/' + uid, { headers: this.headers }).map(res => res.json());
  }
// Health Nutritional form functions
InsertHealthNutAssessmentDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/assessment/form', json, { headers: this.headers }).map(res => res.json());
}

getHealthNutAssessmentDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health/nut/assessment/' + uid, { headers: this.headers }).map(res => res.json());
}

// /https://arkaahealthapp.com/api/v1/family/medical/history

// Family Medical History form functions
InsertfamilymedicalhistoryDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/family/medical/history', json, { headers: this.headers }).map(res => res.json());
}

getFamilyMedicalHistoryDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health-nut/family/medical/history/' + uid, { headers: this.headers }).map(res => res.json());
}

// Family Medical History form functions
InsertGeneralHealthInfoDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-general/health/info', json, { headers: this.headers }).map(res => res.json());
}

getGeneralHealthInfoDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/general/health/info/' + uid, { headers: this.headers }).map(res => res.json());
}

// Primary concerns form functions
InsertpimaryconcensDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-health/nut/primary-concern', json, { headers: this.headers }).map(res => res.json());
}

getPrimaryConcernsDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health/nut/primary/concern/' + uid, { headers: this.headers }).map(res => res.json());
}

// Med Hist form functions
InsertmedhistDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-health/nut/medical-history', json, { headers: this.headers }).map(res => res.json());
}

getmedhistDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health/nut/medical/history/' + uid, { headers: this.headers }).map(res => res.json());
}

// Med Hist - List of Medications form functions
InsertmedhistlistofmedDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-health/medical_history/list_of_medications', json, { headers: this.headers }).map(res => res.json());
}

getmedhistlistofmedDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/medical_history/list_of_medications/' + uid, { headers: this.headers }).map(res => res.json());
}

deletemedhistlistofmedDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/delete/user_health_nut_medical_history_list_of_medications', json, { headers: this.headers }).map(res => res.json());
}


// Med Hist - List of Suppliments form functions
InsertmedhistlistofsuppDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-health-nut/medical/suppliments', json, { headers: this.headers }).map(res => res.json());
}

getmedhistlistofsuppDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health-nut/medical/suppliments/' + uid, { headers: this.headers }).map(res => res.json());
}

deletemedhistlistofsuppDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/delete/user_health_nut_medical_history_list_of_suppliments', json, { headers: this.headers }).map(res => res.json());
}


// Lifestyle form functions
InsertLifestyleDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-halth/lifestyle/info', json, { headers: this.headers }).map(res => res.json());
}

getLifestyleDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/health/life/style/info/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial form functions
InsertPsychosocialAssessmentDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add/psychosocial/assessment/form', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialAssessmentDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/assessment/form/' + uid, { headers: this.headers }).map(res => res.json());
}


// Psychosocial summary Strength form functions
InsertPsychosocialsummarystrengthDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/summary-of/strength', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialsummarystrengthDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/summary-of/strength-ability/' + uid, { headers: this.headers }).map(res => res.json());
}


// Psychosocial Obstacles Barriers form functions
InsertPsychosocialobstaclesbarriersDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/obstacles/details', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialobstaclesbarriersDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/obstacles/barriers/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial Treatment Services form functions
InsertPsychosocialtreatmentsevicesDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/treatment/service/support', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialtreatmentsevicesDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/treatment/service-support/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial Diagnostic Info form functions
InsertPsychosocialdiagnosticInfoDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/diagnostic/info', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialdiagnosticInfoDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/diagnostic/info/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial Functional Summary form functions
InsertPsychosocialfunctionalsummaryDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/functional/summary/updated', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialfunctionalsummaryDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/functional/summary/form/updated/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial Mental Assessment form functions
InsertPsychosocialmentalassessmentDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/mental/status/assessment', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialmentalassessmentDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/mental/status/assessment/' + uid, { headers: this.headers }).map(res => res.json());
}

// Psychosocial Health & Safety form functions
InsertPsychosocialhealthnsafetyDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-psychosocial/health/safety', json, { headers: this.headers }).map(res => res.json());
}

getPsychosocialhealthnsafetyDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/psychosocial/health/safety/' + uid, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Demographics Details form functions
InsertInitialclinicDemographicsDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/demographics', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicDemographicsDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/demographics/' + uid, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Health Checkups Details form functions
InsertInitialclinicHealthCheckupsDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/health/checkups', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicHealthCheckupsDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/health/checkups/' + uid, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Health Goals Details form functions
InsertInitialclinicHealthGoalsDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/present/health/goals', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicHealthGoalsDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/present/health/goals/' + uid, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Health Goals Details form functions
InsertInitialclinicKnownAllergiesDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/known/allergies', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicKnownAllergiesDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/known/allergies/' + uid, { headers: this.headers }).map(res => res.json());
}


// Initial Clinic Systems Summary Details form functions
InsertInitialclinicSystemssummaryDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/review/systems-summary', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicSystemssummaryDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/review/systems-summary/' + uid, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Lifestyle Related Details form functions
InsertInitialclinicLifestyleRelatedDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/lifestyle/related', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicLifestyleRelatedDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/lifestyle/related/' + uid, { headers: this.headers }).map(res => res.json());
}


// Initial Clinic Pe Existing Treatment Details form functions
InsertInitialclinicPreexistingTreatmentDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/pre-existing/treatment', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicPreexistingTreatmentDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/pre-existing/treatment/' + uid, { headers: this.headers }).map(res => res.json());
}

deleteInitialclinicPreexistingTreatmentDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/delete/clinic_pre_existing_teatment', json, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Practice Modality Details form functions
InsertInitialclinicPracticemodalityDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/pratice/modality', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicPracticemodalityDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/pratice/modality/' + uid, { headers: this.headers }).map(res => res.json());
}

deleteInitialclinicPracticemodalityDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/delete/user_initial_clinic_pratice_modality', json, { headers: this.headers }).map(res => res.json());
}

// Initial Clinic Significant Event Details form functions
InsertInitialclinicSignificanteventDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/add-initial/clinic/significant/event', json, { headers: this.headers }).map(res => res.json());
}

getInitialclinicSignificanteventDetails(uid) {
  return this.http.get('https://arkaahealthapp.com/api/v1/initial/clinic/significant/event/' + uid, { headers: this.headers }).map(res => res.json());
}

deleteInitialclinicSignificanteventDetails(json) {
  return this.http.post('https://arkaahealthapp.com/api/v1/delete/user_initial_clinic_significant_event', json, { headers: this.headers }).map(res => res.json());
}



  getAllAppointments(uid) {
    return this.http.get('https://arkaahealthapp.com/api/v1/users/' + uid + '/appointments/0',
    { headers: this.headers }).map(res => res.json());
  }

  getSpecializations() {
    return this.http.get('https://arkaahealthapp.com/api/v1/doctors/specialities', { headers: this.headers }).map(res => res.json());
  }

  getSpecwiseDoctors(id) {
    return this.http.get('https://arkaahealthapp.com/api/v1/doctors/specialities/' + id, { headers: this.headers }).map(res => res.json());
  }

  getSpecificDoctor(id) {
    return this.http.get('https://arkaahealthapp.com/api/v1/doctors/details/statuswise/' + id, { headers: this.headers }).map(res => res.json());
  }

  getLab(id) {
    return this.http.get('https://arkaahealthapp.com/api/v1/lab/profile/statuswise/' + id, { headers: this.headers }).map(res => res.json());
  }
  getPharmacy(id) {
    return this.http.get('https://arkaahealthapp.com/api/v1/pharmacy/profile/statuswise/' + id, { headers: this.headers }).map(res => res.json());
  }
  getAllMedicines(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/pharmacy/${uId}/medicine/0`, { headers: this.headers }).map(res => res.json());
  }
  getAllCategoriesTests(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/labs/${uId}/tests/categories/0`,
     { headers: this.headers }).map(res => res.json());
  }
  getAllSpecificTests(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/labs/${uId}/tests`,
     { headers: this.headers }).map(res => res.json());
  }

  getAllPrescriptions(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/users/${uId}/prescriptions/0`,
     { headers: this.headers }).map(res => res.json());
  }

  bookLabApp(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/labs/appointments', json,{ headers: this.headers }).map(res => res.json());
  }
  bookDocApp(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/appointments', json,{ headers: this.headers }).map(res => res.json());
  }

  sendPresPharm(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/pharmacy/prescriptions', json,{ headers: this.headers }).map(res => res.json());
  }

  sendPresLab(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/labs/prescriptions', json,{ headers: this.headers }).map(res => res.json());
  }
  getAllLabAppointmentList(uId,id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/labs/appointments/${uId}/${id}`, { headers: this.headers }).map(res => res.json());
  }

  getReports(id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/doctors/appointments/${id}/reports`, { headers:this.headers }).map(res=>res.json());
  }

  getAllDocAppointmentList(uId,id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/doctors/appointmentslist/${uId}/${id}`, { headers: this.headers }).map(res => res.json());
  }
  getAllPharmacyOrders(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/pharmacy/orders/userview/${uId}`, { headers: this.headers }).map(res => res.json());
  }
  getAllPharmacyQuote(uId, id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/pharmacy/orders/quotation/${uId}/${id}`, { headers: this.headers }).map(res => res.json());
  }
  changeOrderStatus(json, uId) {
    return this.http.post('https://arkaahealthapp.com/api/v1/pharmacy/user/'+ uId +'/orders', json,{ headers: this.headers }).map(res => res.json());
  }
  getAlllabQuote(id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/labs/quotes/${id}`, { headers: this.headers }).map(res => res.json());
  }
  changeLabAppointmentStatus(json, uId) {
    return this.http.post('https://arkaahealthapp.com/api/v1/labs/'+ uId +'/appointments', json,{ headers: this.headers }).map(res => res.json());
  }
  getLabReports(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/labs/reports/${uId}`, { headers: this.headers }).map(res => res.json());
  }
  shareReports(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/reports', json,{ headers: this.headers }).map(res => res.json());
  }
  orderMedicine(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/pharmacy/order', json,{ headers: this.headers }).map(res => res.json());
  }
  getLabAppOrder(appId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/lab/appointments/${appId}/order`, { headers: this.headers }).map(res => res.json());
  }
  getDoctorAppOrder(appId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/doctor/appointments/${appId}/order`, { headers: this.headers }).map(res => res.json());
  }

  getPharmacyOrderHistory(appId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/pharmacy/pharmacy-order/${appId}/order`, { headers: this.headers }).map(res => res.json());
  }
  updatePayment(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/lab-appointment/update-payment', json,{ headers: this.headers }).map(res => res.json());
  }
  updatePayment1(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/doctor-appointment/update-payment', json,{ headers: this.headers }).map(res => res.json());
  }
  getDoctorAppointmentPaymentList(uId) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/doctors-appointments/orders/${uId}`, { headers: this.headers }).map(res => res.json());
  }
  getEhospitals(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetHospitalProfile',{}).map(res => res.json());
  }

  getEhospitalsDOc(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetHospitalProfile', json).map(res => res.json());
  }
  // getEhospitals(json) {
  //   return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetHospitaladmin',json).map(res => res.json());
  // }
  getEhospitalSpecializations() {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetDrSpecialistzation', {}).map(res => res.json());
  }
  getEhospitalDoctors(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Getdoctorprofile', json).map(res => res.json());
  }
  getEhospitalDoctorsSchedule(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetDrSchedule', json).map(res => res.json());
  }
  bookEhospitalAppointment(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/SetAppointment', json).map(res => res.json());
  }
  updateStatus(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/PccApi/pts_dr_appointment_patient_status_update', json).map(res => res.json());
  }

  updateResceduleStatus(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/DoctorMasterApi/DoctorAppoinmentConfirmation', json).map(res => res.json());
  }

  shareLabReport(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/DoctorMasterApi/Insert_Patient_Docs', json).map(res => res.json());
  }
  shareLabReport1(json) {
    return this.http.post(' https://bridgehealth.ehospital.arkaahealth.com/api/DoctorMasterApi/Patient_Docs_Shared_or_not', json).map(res => res.json());
  }
  getAllPTS(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetAllPtsList', json).map(res => res.json());
  }

  getAllEhosApt(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/PatientHospitalListOnAppointments', json).map(res => res.json());
  }
  getAppointments(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetPatientAppointments', json).map(res => res.json());
  }
  updateEhospitalPayment(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/SetPaymentConfirmationForDoctorAppointments', json).map(res => res.json());
  }
  getPTSAppointments(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetPtsDoctorConsult', json).map(res => res.json());
  }
  getPTSLabServices(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetPtsLabServices', json).map(res => res.json());
  }
  getPTSMedicines(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetPtsMedicine', json).map(res => res.json());
  }
  updatePTSPayment(json) {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/SetPaymentConfirmation', json).map(res => res.json());
  }
  forgotpassword(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/forgotpassword', json).map(res => res.json());
  }
  getEhospitalPrescription(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/PrescriptionByDoctor`, json).map(res => res.json());

  }

  listing_patient_shared_docs(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/AdminApi/listing_patient_shared_docs`, json).map(res => res.json());

  }

  lab_items(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetLabItems`, json).map(res => res.json());

  }

  listing_lab_list(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/GetLabs`, json).map(res => res.json());

  }

  Fetch_New_PTS() {
    return this.http.post('https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Fetch_New_PTS',{}).map(res => res.json());
  }

  Fetch_PCC_UID(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Fetch_PCC_UID`, json).map(res => res.json());

  }

  Corpo_pts_labservices(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/CorporateApi/Corpo_pts_labservices`, json).map(res => res.json());

  }

  Corpo_PreTreatmentScheduler_prescription(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Corpo_PreTreatmentScheduler_prescription`, json).map(res => res.json());

  }

  // Corpo_pts_labservices_child(json)
  // {
  //   return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Corpo_pts_labservices_child`, json).map(res => res.json());

  // }

  final_lab_booking(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Corpo_pts_labservices_child`, json).map(res => res.json());

  }

  listing_pharmacy_list(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Fetch_Pharmas`, json).map(res => res.json());

  }

  listing_pharmacy_Items(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/CorporateApi/Fetch_Pharma_Items`, json).map(res => res.json());

  }

  pharm_booking(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Book_pts_medicines `, json).map(res => res.json());

  }

  pharm_booking_final(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/Book_pts_medicines_child `, json).map(res => res.json());

  }

  PrescriptionByDoctorByAppointmentID(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/PrescriptionByDoctorByAppointmentID`, json).map(res => res.json());

  }

  PrescriptionMedicines(json)
  {
    return this.http.post(`https://bridgehealth.ehospital.arkaahealth.com/api/HospitalMaster/PrescriptionMedicines`, json).map(res => res.json());

  }

  

  
  
  otpforgotpassword(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/verifyOtp/forgotpassword', json).map(res => res.json());
  }

  otpforgotpasswordWithUsername(json) {
    return this.http.post('https://arkaahealthapp.com/api/v1/verifyOtp/username/forgotpassword', json).map(res => res.json());
  }


  resetpassword(json) {
    return this.http.post(`https://arkaahealthapp.com/api/v1/users/resetpassword`, json, { headers: this.headers }).map(res => res.json());
  }

  uploadPatientPreviousHistory(json)
  {
    return this.http.post(`https://arkaahealthapp.com/api/v1/patient/previous/documents`, json, { headers:this.headers }).map(res=>res.json());
  }

  getPatientPreviousHistory(Uid) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/patient/previousdocuments/${Uid}`, { headers: this.headers }).map(res => res.json());
  }

  getUserAddDetails(Uid) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/patient/additional-info/${Uid}`, { headers: this.headers }).map(res => res.json());
  }

  getUserMob(username) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/user/mobile/${username}`, { headers: this.headers }).map(res => res.json());
  }

  getDoctorTransactionView(id){ 
    return this.http.get(`https://arkaahealthapp.com/api/v1/admin-doctor/transaction/view/${id}`, { headers:this.headers }).map(res=>res.json());
  };

  getpharmacyInvoice(uId,id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/admin-pharmacy/transactions/${uId}/view/${id}`, { headers:this.headers }).map(res=>res.json());
  }

  getlabInvoice(uId,id) {
    return this.http.get(`https://arkaahealthapp.com/api/v1/admin-lab/transactions/${uId}/view/${id}`, { headers:this.headers }).map(res=>res.json());
  }

  
}

