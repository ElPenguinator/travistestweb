import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginFieldComponent } from './login-field/login-field.component';
import { AppRoutingModule } from './/app-routing.module';
import { AccountCreationComponent } from './account-creation/account-creation.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { AuthService } from './services/auth.service';
import { SignupComponent } from './signup/signup.component';
import { MemberHomepageComponent } from './member-homepage/member-homepage.component';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		LoginFieldComponent,
		AccountCreationComponent,
		HomeComponent,
		SigninComponent,
		SignupComponent,
		MemberHomepageComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		AuthService,
		AuthHttp,
		JwtHelper,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
