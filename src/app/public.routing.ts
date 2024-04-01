import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SubmitOtpComponent } from './submit-otp/submit-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubmitOtpForgotpassworComponent } from './submit-otp-forgotpasswor/submit-otp-forgotpasswor.component';
import { SignUpNewComponent } from './sign-up-new/sign-up-new.component';

export const PUBLIC_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'submit-otp/:mob', component: SubmitOtpComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password/:mobile/:username/:email/:token', component: ResetPasswordComponent},
    {path: 'submit-otp-forgotpasswor/:mobile_no/:username', component: SubmitOtpForgotpassworComponent},
    {path: 'sign-up-new', component: SignUpNewComponent},
];

