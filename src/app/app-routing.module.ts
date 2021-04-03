import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HomeModule } from './components/home/home.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FacebookGuard } from './guards/facebook.guard';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[FacebookGuard]},
    // loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
