import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ItemComponent } from './components/item/item.component';
import { SettingComponent } from './components/setting/setting.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { CategoryComponent } from './components/category/category.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { permisosGuard } from './guards/permisos.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'category/:nombre', component: CategoryComponent},

  { path: 'register', component: RegisterComponent},
  { path: 'profile/:id', component: ProfileComponent},
  { path: 'profile/edit/:id', component: EditProfileComponent,canActivate:[permisosGuard] },

  { path: 'item/new', component: CreateItemComponent},
/*   { path: 'item/:id', component: ItemComponent}, */
 
  { path: 'item/edit/:id', component: EditItemComponent},
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
