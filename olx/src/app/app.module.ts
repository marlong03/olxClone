import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './components/setting/setting.component';
import { ItemComponent } from './components/item/item.component';
import { CategoryComponent } from './components/category/category.component';
import { HeaderComponent } from './components/sections/header/header.component';
import { FooterComponent } from './components/sections/footer/footer.component';
import { ListItemsComponent } from './components/sections/list-items/list-items.component';
import { CreateItemComponent } from './components/create-item/create-item.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { CookieService } from 'ngx-cookie-service';

/* Auth */
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { FirestoreModule } from '@angular/fire/firestore'
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SettingComponent,
    ItemComponent,
    CategoryComponent,
    HeaderComponent,
    FooterComponent,
    ListItemsComponent,
    CreateItemComponent,
    EditProfileComponent,
    EditItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
