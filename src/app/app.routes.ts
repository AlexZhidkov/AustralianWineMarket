import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CanActivateGuard } from './can-activate.guard';
import { WineComponent } from './wine/wine.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'profile', component: UserProfileComponent, canActivate: [CanActivateGuard] },
    { path: 'wine/:wineId', component: WineComponent, canActivate: [CanActivateGuard] },
    { path: '', component: HomeComponent },
];
