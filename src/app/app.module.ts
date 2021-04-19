import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserContextComponent } from './components/navigation/user-context/user-context.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user/user.reducer';
import { UserModule } from './store/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavigationComponent,
    UserContextComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    StoreModule.forRoot({}),
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
