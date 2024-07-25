import { Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// import { DashboardComponent } from './components/manager/dashboard/dashboard.component';
import { UserTableComponent } from './components/user/user-table/user-table.component';
import { BookingsComponent } from './components/user/bookings/bookings.component';
import { AllusersComponent } from './components/sa/allusers/allusers.component';
import { EventstblComponent } from './components/sa/eventstbl/eventstbl.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DashboardComponent } from './components/manager/dashboard/dashboard.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { PassCodeComponent } from './components/pass-code/pass-code.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { Item2Component } from './components/item2/item2.component';

export const routes: Routes = [
    {path:'',component:LandingComponent},
    {path:'item/:id',component:Item2Component},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgot',component:ForgotPassComponent},
    {path:'code',component:PassCodeComponent},
    {path:'reset',component:PassResetComponent},
    {path:'user',component:UserDashboardComponent},
    {path:'manager',component:DashboardComponent},
    {path:'usertbl',component:UserTableComponent},
    {path:'book',component:BookingsComponent},
    {path:'sa',component:AllusersComponent},
    {path:'events',component:EventstblComponent},
    {path:'edit',component:EditComponent},
    {path:'**',component:NotfoundComponent}
];
