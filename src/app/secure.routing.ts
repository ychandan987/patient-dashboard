import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MediacalRecordsComponent } from './mediacal-records/mediacal-records.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { LabAppointmentsComponent } from './lab-appointments/lab-appointments.component';
import { MedicineOrdersComponent } from './medicine-orders/medicine-orders.component';
import { OnlineConsultationsComponent } from './online-consultations/online-consultations.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { LabsComponent } from './labs/labs.component';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { BookTestsComponent } from './book-tests/book-tests.component';
import { BookLabtestsComponent } from './book-labtests/book-labtests.component';
import { BookDoctorAppointmentComponent } from './book-doctor-appointment/book-doctor-appointment.component';
import { OrderMedicineComponent } from './order-medicine/order-medicine.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { PharmacyDetailsComponent } from './pharmacy-details/pharmacy-details.component';
import { VideoConsultComponent } from './video-consult/video-consult.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionUploadComponent } from './prescription-upload/prescription-upload.component';
import { LabPrescriptionUploadComponent } from './lab-prescription-upload/lab-prescription-upload.component';
import { ViewAppointmentDetailsComponent } from './view-appointment-details/view-appointment-details.component';
import { PrescriptionQuoteComponent } from './prescription-quote/prescription-quote.component';
import { ViewPharmacyQuoteDetailsComponent } from './view-pharmacy-quote-details/view-pharmacy-quote-details.component';
import { ViewPharmacyOrderDetailsComponent } from './view-pharmacy-order-details/view-pharmacy-order-details.component';
import { ViewLabQuoteDetailsComponent } from './view-lab-quote-details/view-lab-quote-details.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsViewComponent } from './reports-view/reports-view.component';
import { ShareReportComponent } from './share-report/share-report.component';
import { LabPaymentComponent } from './lab-payment/lab-payment.component';
import { DoctorAppointmentPaymentComponent } from './doctor-appointment-payment/doctor-appointment-payment.component';
import { PharmacyPaymentComponent } from './pharmacy-payment/pharmacy-payment.component';
import { DoctorAppointmentsOrdersComponent } from './doctor-appointments-orders/doctor-appointments-orders.component';
import { DoctorAppointmentsOrdersDetailsComponent } from './doctor-appointments-orders-details/doctor-appointments-orders-details.component';
import { EhospitalDashboardComponent } from './ehospital-dashboard/ehospital-dashboard.component';
import { EhospitalListsComponent } from './ehospital-lists/ehospital-lists.component';
import { EhospitalDoctorsComponent } from './ehospital-doctors/ehospital-doctors.component';
import { EhospitalSpecializationsComponent } from './ehospital-specializations/ehospital-specializations.component';
import { EhospitalDoctorDetailsComponent } from './ehospital-doctor-details/ehospital-doctor-details.component';
import { EHospitalBookAppComponent } from './e-hospital-book-app/e-hospital-book-app.component';
import { EhospitalAppointmentsComponent } from './ehospital-appointments/ehospital-appointments.component';
import { EhospitalAppListsComponent } from './ehospital-app-lists/ehospital-app-lists.component';
import { EhospitalAppDetailsComponent } from './ehospital-app-details/ehospital-app-details.component';
import { EhospitalComponent } from './ehospital/ehospital.component';
import { EhospitalPaymentComponent } from './ehospital-payment/ehospital-payment.component';
import { PtsComponent } from './pts/pts.component';
import { PtsAppointmentsComponent } from './pts-appointments/pts-appointments.component';
import { PtsLabAppComponent } from './pts-lab-app/pts-lab-app.component';
import { PtsPharmacyComponent } from './pts-pharmacy/pts-pharmacy.component';
import { PtsAppDetailsComponent } from './pts-app-details/pts-app-details.component';
import { PtsPaymentComponent } from './pts-payment/pts-payment.component';
import { VideoComponent } from './video/video.component';
import { DocAppComponent } from './doc-app/doc-app.component';
import { ViewEhospitalPatientPrescriptionsComponent } from './view-ehospital-patient-prescriptions/view-ehospital-patient-prescriptions.component';
import { UploadPreviousHistoryComponent } from './upload-previous-history/upload-previous-history.component';
import { EhospitalPaymentModeComponent } from './ehospital-payment-mode/ehospital-payment-mode.component';
import { PtsAppPaymentModeComponent } from './pts-app-payment-mode/pts-app-payment-mode.component';
import { PtsLabPaymentComponent } from './pts-lab-payment/pts-lab-payment.component';
import { PtsPharmacyPaymentComponent } from './pts-pharmacy-payment/pts-pharmacy-payment.component';
import { ViewEhospitalPrescriptionComponent } from './view-ehospital-prescription/view-ehospital-prescription.component';
import { HistoryShareComponent } from './history-share/history-share.component';
import { OtherReportShareComponent } from './other-report-share/other-report-share.component';
import { EhospUploadNewReportComponent } from './ehosp-upload-new-report/ehosp-upload-new-report.component';
import { EhospHistoryShareComponent } from './ehosp-history-share/ehosp-history-share.component';
import { EhospLabReportShareComponent } from './ehosp-lab-report-share/ehosp-lab-report-share.component';
import { HospListComponent } from './hosp-list/hosp-list.component';
import { HospLabListComponent } from './hosp-lab-list/hosp-lab-list.component';
import { HospLabItemsComponent } from './hosp-lab-items/hosp-lab-items.component';
import { HospLabBookingComponent } from './hosp-lab-booking/hosp-lab-booking.component';
import { PharmHospListComponent } from './pharm-hosp-list/pharm-hosp-list.component';
import { PharmListComponent } from './pharm-list/pharm-list.component';
import { PharmBookingComponent } from './pharm-booking/pharm-booking.component';
import { NewPtsListComponent } from './new-pts-list/new-pts-list.component';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { HealthnutritionalformComponent } from './healthnutritionalform/healthnutritionalform.component';
import { PsychosocialformComponent } from './psychosocialform/psychosocialform.component';
import { InitialclinicformComponent } from './initialclinicform/initialclinicform.component';
import { RescheduleViewComponent } from './reschedule-view/reschedule-view.component';
import { InvoicePharmacyComponent } from './invoice-pharmacy/invoice-pharmacy.component';
import { InvoiceDoctorComponent } from './invoice-doctor/invoice-doctor.component';
import { InvoiceLabComponent } from './invoice-lab/invoice-lab.component';

export const SECURE_ROUTES: Routes = [
    {path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard]},
    {path: 'medical-records', component: MediacalRecordsComponent, canActivate : [AuthGuard]},
    {path: 'doctor-appointments', component: DoctorAppointmentsComponent, canActivate : [AuthGuard]},
    {path: 'lab-appointments', component: LabAppointmentsComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/orders', component: MedicineOrdersComponent, canActivate : [AuthGuard]},
    {path: 'online-consultations', component: OnlineConsultationsComponent, canActivate : [AuthGuard]},
    {path: 'feedback', component: FeedbackComponent, canActivate : [AuthGuard]},
    {path: 'payments', component: PaymentsComponent, canActivate : [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
    {path: 'profile/edit', component: EditProfileComponent, canActivate : [AuthGuard]},
    {path: 'book-appointment', component: DoctorsComponent, canActivate : [AuthGuard]},
    {path: 'book-appointment/:id', component: DoctorDetailsComponent, canActivate : [AuthGuard]},
    {path: 'labs', component: LabsComponent, canActivate : [AuthGuard]},
    {path: 'labs/:id/details', component: LabDetailsComponent, canActivate : [AuthGuard]},
    {path: 'labs/:id/tests', component: BookTestsComponent, canActivate : [AuthGuard]},
    {path: 'labs/:id/book', component: BookLabtestsComponent, canActivate : [AuthGuard]},
    {path: 'labs/:id/payment/:ordId', component: LabPaymentComponent, canActivate : [AuthGuard]},
    {path: 'book-doctor-appointment/:officeId/:dId/:clinicId', component: BookDoctorAppointmentComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/:uId/order-medicine', component: OrderMedicineComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy', component: PharmacyComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/:uId/details', component: PharmacyDetailsComponent, canActivate : [AuthGuard]},
    {path: 'video-consult', component: VideoConsultComponent, canActivate : [AuthGuard]},
    {path: 'prescriptions', component: PrescriptionComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/:uId/prescription-upload', component: PrescriptionUploadComponent, canActivate : [AuthGuard]},
    {path: 'lab/:uId/prescription-upload', component: LabPrescriptionUploadComponent, canActivate : [AuthGuard]},
    {path: 'lab/appointment/details/:id', component: ViewAppointmentDetailsComponent, canActivate : [AuthGuard]},
    {path: 'prescription/quote', component: PrescriptionQuoteComponent, canActivate : [AuthGuard]},
    {path: 'prescription/quote/details/:id', component: ViewPharmacyQuoteDetailsComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/orders/details/:id', component: ViewPharmacyOrderDetailsComponent, canActivate : [AuthGuard]},
    {path: 'lab/quote/details/:id', component: ViewLabQuoteDetailsComponent, canActivate : [AuthGuard]},
    {path: 'reports', component: ReportsComponent, canActivate : [AuthGuard]},
    {path: 'reports/view/details/:id', component: ReportsViewComponent, canActivate : [AuthGuard]},
    {path: 'reports/share/:id', component: ShareReportComponent, canActivate : [AuthGuard]},
    {path: 'doctor_appointment/:docid/:id/payment/:ordId/:paymentmode', component: DoctorAppointmentPaymentComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/:id/payment/:ordId', component: PharmacyPaymentComponent, canActivate : [AuthGuard]},
    {path: 'doctor-appointments/orders', component: DoctorAppointmentsOrdersComponent, canActivate : [AuthGuard]},
    {path: 'doctor-appointment/orders/details/:appId', component: DoctorAppointmentsOrdersDetailsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital', component: EhospitalDashboardComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/lists', component: EhospitalListsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/lists/:id/specializations', component: EhospitalSpecializationsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/lists/:id/:specId/doctors', component: EhospitalDoctorsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/lists/:id/:specId/:docId', component: EhospitalDoctorDetailsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/lists/:id/:specId/:docId/book/:walkInFees/:voiceFees/:textFees/:videoFees', component: EHospitalBookAppComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/appointments', component: EhospitalAppointmentsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/appointments/:hospId/list', component: EhospitalAppListsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/appointments/:hospId/:appId/details', component: EhospitalAppDetailsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/appointments/:hospId/:appId/details/pay/:payId', component: EhospitalPaymentComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/appointments/list', component: EhospitalComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/list', component: EhospitalComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId', component: PtsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/appointments', component: PtsAppointmentsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/appointments/:id/details', component: PtsAppDetailsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/appointments/:id/details/pay/:payId', component: PtsPaymentComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/lab-tests', component: PtsLabAppComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/lab-tests/pay/:payId', component: PtsPaymentComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/pharmacy', component: PtsPharmacyComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/pts/:ptsId/:transId/pharmacy/pay/:payId', component: PtsPaymentComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/video', component: VideoComponent, canActivate : [AuthGuard]},
    {path: 'e/appointment', component: DocAppComponent, canActivate : [AuthGuard]}, {path:'e-hospital/appointments/:hospId/:appId/details/view-ehospital-patient-prescriptions/:patientId', component: ViewEhospitalPatientPrescriptionsComponent, canActivate : [AuthGuard]},
    {path: 'profile/upload-previous-history', component: UploadPreviousHistoryComponent, canActivate : [AuthGuard]}, {path:'e-hospital/appointments/:hospId/:appId/details/view-ehospital-patient-prescriptions/:patientId', component: ViewEhospitalPatientPrescriptionsComponent, canActivate : [AuthGuard]},
    {path: 'e-hospital/payment-mode/:hospid/:id', component: EhospitalPaymentModeComponent, canActivate : [AuthGuard]}, {path:'e-hospital/appointments/:hospId/:appId/details/view-ehospital-patient-prescriptions/:patientId', component: ViewEhospitalPatientPrescriptionsComponent, canActivate : [AuthGuard]},
    {path: 'pts/payment-mode/:id', component: PtsAppPaymentModeComponent, canActivate : [AuthGuard]}, 
    {path: 'pts/lab/payment/:id', component: PtsLabPaymentComponent, canActivate : [AuthGuard]}, 
    {path: 'pts/pharmacy/payment/:id', component: PtsPharmacyPaymentComponent, canActivate : [AuthGuard]}, 
    {path: 'e-hospital/appointments/:hospId/view-ehospital-prescription', component: ViewEhospitalPrescriptionComponent, canActivate : [AuthGuard]}, 
    {path: 'history/share/:id', component: HistoryShareComponent, canActivate : [AuthGuard]}, 
    {path: 'other/report/share/:id', component: OtherReportShareComponent, canActivate : [AuthGuard]},{path: 'ehosp/report/share/:id/:docId', component: EhospUploadNewReportComponent, canActivate : [AuthGuard]}, 
    {path: 'ehosp/history/share/:id/:docId', component: EhospHistoryShareComponent, canActivate : [AuthGuard]},
    {path: 'ehosp/lab/report/share/:id/:docId', component: EhospLabReportShareComponent, canActivate : [AuthGuard]},
    {path: 'hosp/list', component: HospListComponent, canActivate : [AuthGuard]},
    {path: 'lab/list/:id/hosp', component: HospLabListComponent, canActivate : [AuthGuard]},
    {path: 'hosp/lab/items/:id', component: HospLabItemsComponent, canActivate : [AuthGuard]},
    {path: 'lab/booking/:id/:labId/:pts_new_id/:transactionId', component: HospLabBookingComponent, canActivate : [AuthGuard]},
    {path: 'pharm/hosp/list', component: PharmHospListComponent, canActivate : [AuthGuard]},
    {path: 'pharm/list/:id/hosp', component: PharmListComponent, canActivate : [AuthGuard]},
    {path: 'pharm/booking/:id/:pharmId/:pts_new_id/:transactionId/:mby', component: PharmBookingComponent, canActivate : [AuthGuard]},
    {path: 'new/pts/list', component: NewPtsListComponent, canActivate : [AuthGuard]},
    {path: 'new/prescription/:PatientId/:hospId/:appId', component: NewPrescriptionComponent, canActivate : [AuthGuard]},
    {path: 'profile/healthnutritionalform', component: HealthnutritionalformComponent, canActivate : [AuthGuard]},
    {path: 'profile/psychosocialform', component: PsychosocialformComponent, canActivate : [AuthGuard]},
    {path: 'profile/initialclinicform', component: InitialclinicformComponent, canActivate : [AuthGuard]},
    {path: 'reschedule/:AppointmentId/:hospId', component: RescheduleViewComponent, canActivate : [AuthGuard]},
    {path: 'doctor/view-invoice/:id', component: InvoiceDoctorComponent, canActivate : [AuthGuard]},
    {path: 'pharmacy/paid/view-invoice/:id/:uId', component: InvoicePharmacyComponent, canActivate : [AuthGuard]},
    {path: 'lab/paid/view-invoice/:id/:labuid', component: InvoiceLabComponent, canActivate : [AuthGuard]},
];
