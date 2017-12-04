import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['../signin/signin.component.css']
})
export class SignupComponent implements OnInit {
	private loading = false;
	private form = { username: '', mail: '', password: '' };

	constructor(
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit() {
	}

	onSignUp() {
		this.loading = true;
		this.auth.register(this.form)
			.subscribe(ok => {
				if (ok) {
					this.router.navigate(['login'])
						.catch(reason => console.log('Redirect error: ', reason));
				} else {
					console.log('Error: unable to create user');
					this.loading = false;
				}
			});
	}
}
