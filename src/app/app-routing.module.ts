import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardtoComponent } from './components/cardto/cardto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/cardto/:carId", component:CardtoComponent},
  {path:"cars/update/:carId", component: CarUpdateComponent, canActivate:[AdminGuard]},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"admin", component: AdminComponent, canActivate:[AdminGuard]},
  {path:"profile", component: UserComponent,  canActivate:[LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
