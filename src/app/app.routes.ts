import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CanActivateGuard } from './can-activate.guard';
import { WineComponent } from './wine/wine.component';
import { OrgComponent } from './org/org.component';
import { OrgWineComponent } from './org-wine/org-wine.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: UserProfileComponent, canActivate: [CanActivateGuard] },
    { path: 'org/:orgId', component: OrgComponent, canActivate: [CanActivateGuard] },
    { path: 'org/:orgId/wine/:wineId', component: OrgWineComponent, canActivate: [CanActivateGuard] },
    { path: 'wine/:wineId', component: WineComponent, canActivate: [CanActivateGuard] },
    { path: '', component: HomeComponent },
];
