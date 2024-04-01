import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormWizardModule } from 'angular-wizard-form';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatToolbarModule, MatButtonModule,MatStepperModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatDatepickerModule, MatDividerModule, MatProgressBarModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';

//import { routing } from './app.routing';
import { routes } from './app.routing';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { MediacalRecordsComponent } from './mediacal-records/mediacal-records.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { LabAppointmentsComponent } from './lab-appointments/lab-appointments.component';
import { MedicineOrdersComponent } from './medicine-orders/medicine-orders.component';
import { OnlineConsultationsComponent } from './online-consultations/online-consultations.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PaymentsComponent } from './payments/payments.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SubmitOtpComponent } from './submit-otp/submit-otp.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CryptService } from './crypt.service';
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
import { DoctorAppointmentsPaymentComponent } from './doctor-appointments-payment/doctor-appointments-payment.component';
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
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubmitOtpForgotpassworComponent } from './submit-otp-forgotpasswor/submit-otp-forgotpasswor.component';
import { MyMaterialModule } from  './material.module';
import { VideoComponent } from './video/video.component';
import { DocAppComponent } from './doc-app/doc-app.component';
import { ViewEhospitalPatientPrescriptionsComponent } from './view-ehospital-patient-prescriptions/view-ehospital-patient-prescriptions.component';
import { SignUpNewComponent } from './sign-up-new/sign-up-new.component';
import { UploadPreviousHistoryComponent } from './upload-previous-history/upload-previous-history.component';
import { EhospitalPaymentModeComponent } from './ehospital-payment-mode/ehospital-payment-mode.component';
import { PtsAppPaymentModeComponent } from './pts-app-payment-mode/pts-app-payment-mode.component';
import { PtsLabPaymentComponent } from './pts-lab-payment/pts-lab-payment.component';
import { PtsPharmacyPaymentComponent } from './pts-pharmacy-payment/pts-pharmacy-payment.component';
import { ViewEhospitalPrescriptionComponent } from './view-ehospital-prescription/view-ehospital-prescription.component';
import { HistoryShareComponent } from './history-share/history-share.component';
import { OtherReportShareComponent } from './other-report-share/other-report-share.component';
import { EhospHistoryShareComponent } from './ehosp-history-share/ehosp-history-share.component';
import { EhospLabReportShareComponent } from './ehosp-lab-report-share/ehosp-lab-report-share.component';
import { EhospUploadNewReportComponent } from './ehosp-upload-new-report/ehosp-upload-new-report.component';
import { HospListComponent } from './hosp-list/hosp-list.component';
import { HospLabListComponent } from './hosp-lab-list/hosp-lab-list.component';
import { HospLabItemsComponent } from './hosp-lab-items/hosp-lab-items.component';
import { HospLabBookingComponent } from './hosp-lab-booking/hosp-lab-booking.component';
import { HospLabBookingViewComponent } from './hosp-lab-booking-view/hosp-lab-booking-view.component';
import { PharmHospListComponent } from './pharm-hosp-list/pharm-hosp-list.component';
import { PharmListComponent } from './pharm-list/pharm-list.component';
import { PharmBookingComponent } from './pharm-booking/pharm-booking.component';
import { PharmBookingViewComponent } from './pharm-booking-view/pharm-booking-view.component';
import { NewPtsListComponent } from './new-pts-list/new-pts-list.component';
import { NewPrescriptionComponent } from './new-prescription/new-prescription.component';
import { HealthnutritionalformComponent } from './healthnutritionalform/healthnutritionalform.component';
import { PsychosocialformComponent } from './psychosocialform/psychosocialform.component';
import { InitialclinicformComponent } from './initialclinicform/initialclinicform.component';
import { RescheduleViewComponent } from './reschedule-view/reschedule-view.component';
import { InvoiceDoctorComponent } from './invoice-doctor/invoice-doctor.component';
import { InvoiceLabComponent } from './invoice-lab/invoice-lab.component';
import { InvoicePharmacyComponent } from './invoice-pharmacy/invoice-pharmacy.component';



@NgModule({
  declarations: [
    AppComponent,
    MediacalRecordsComponent,
    DoctorAppointmentsComponent,
    LabAppointmentsComponent,
    MedicineOrdersComponent,
    OnlineConsultationsComponent,
    FeedbackComponent,
    PaymentsComponent,
    ProfileComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    SubmitOtpComponent,
    PublicComponent,
    SecureComponent,
    EditProfileComponent,
    DoctorsComponent,
    DoctorDetailsComponent,
    LabsComponent,
    LabDetailsComponent,
    BookTestsComponent,
    BookLabtestsComponent,
    BookDoctorAppointmentComponent,
    OrderMedicineComponent,
    PharmacyComponent,
    PharmacyDetailsComponent,
    VideoConsultComponent,
    PrescriptionComponent,
    PrescriptionUploadComponent,
    LabPrescriptionUploadComponent,
    ViewAppointmentDetailsComponent,
    PrescriptionQuoteComponent,
    ViewPharmacyQuoteDetailsComponent,
    ViewPharmacyOrderDetailsComponent,
    ViewLabQuoteDetailsComponent,
    ReportsComponent,
    ReportsViewComponent,
    ShareReportComponent,
    LabPaymentComponent,
    DoctorAppointmentPaymentComponent,
    PharmacyPaymentComponent,
    DoctorAppointmentsPaymentComponent,
    DoctorAppointmentsOrdersComponent,
    DoctorAppointmentsOrdersDetailsComponent,
    EhospitalDashboardComponent,
    EhospitalListsComponent,
    EhospitalDoctorsComponent,
    EhospitalSpecializationsComponent,
    EhospitalDoctorDetailsComponent,
    EHospitalBookAppComponent,
    EhospitalAppointmentsComponent,
    EhospitalAppListsComponent,
    EhospitalAppDetailsComponent,
    EhospitalComponent,
    EhospitalPaymentComponent,
    PtsComponent,
    PtsAppointmentsComponent,
    PtsLabAppComponent,
    PtsPharmacyComponent,
    PtsAppDetailsComponent,
    PtsPaymentComponent,
    ResetPasswordComponent,
    SubmitOtpForgotpassworComponent,
    VideoComponent,
    DocAppComponent,
    ViewEhospitalPatientPrescriptionsComponent,
    SignUpNewComponent,
    UploadPreviousHistoryComponent,
    EhospitalPaymentModeComponent,
    PtsAppPaymentModeComponent,
    PtsLabPaymentComponent,
    PtsPharmacyPaymentComponent,
    ViewEhospitalPrescriptionComponent,
    HistoryShareComponent,
    OtherReportShareComponent,
    EhospHistoryShareComponent,
    EhospLabReportShareComponent,
    EhospUploadNewReportComponent,
    HospListComponent,
    HospLabListComponent,
    HospLabItemsComponent,
    HospLabBookingComponent,
    HospLabBookingViewComponent,
    PharmHospListComponent,
    PharmListComponent,
    PharmBookingComponent,
    PharmBookingViewComponent,
    NewPtsListComponent,
    NewPrescriptionComponent,
    HealthnutritionalformComponent,
    PsychosocialformComponent,
    InitialclinicformComponent,
    RescheduleViewComponent,
    InvoiceDoctorComponent,
    InvoiceLabComponent,
    InvoicePharmacyComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
   //routing,
    routes,
    FormsModule,
    ReactiveFormsModule,
    FormWizardModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatDividerModule,
    MatProgressBarModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MyMaterialModule,
  ],
  providers: [
    AuthGuard,
    CryptService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
