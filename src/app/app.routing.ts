import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { PUBLIC_ROUTES } from './public.routing';
import { SECURE_ROUTES } from './secure.routing';

import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';

const appRouter: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: '', component: PublicComponent, children: PUBLIC_ROUTES },
    { path: '', component: SecureComponent, children: SECURE_ROUTES }
];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter, {useHash: true});
export const routes: ModuleWithProviders = RouterModule.forRoot(appRouter,{useHash: true});