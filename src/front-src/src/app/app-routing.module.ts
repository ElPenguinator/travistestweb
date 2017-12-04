import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberHomepageComponent } from './member-homepage/member-homepage.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '#', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'login', component: SigninComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'gestion', component: MemberHomepageComponent, canActivate: [AuthGuard], data:{ roles: ['member'] } }
	// Exemple de composant a accès sécurisé par mot de passe
	// { path: 'someSecuredRoute', component: SomeSecuredComponent, canActivate: [AuthGuard]}
];

@NgModule({
	imports:[
		RouterModule.forRoot(routes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
