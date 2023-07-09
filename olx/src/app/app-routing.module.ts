import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateItemComponent } from './components/create-item/create-item.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'item', component: ItemComponent}, //Quitar
  { path: 'item/new', component: CreateItemComponent},
/*   { path: 'item/:id', component: ItemComponent}, */
 
  { path: 'item/edit/:id', component: CreateItemComponent},
  /* { path: 'item/edit/:id', component: CreateItemComponent}, */

  { path: 'item/:id', component: ItemComponent},
  { path: 'setting', component: SettingComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }