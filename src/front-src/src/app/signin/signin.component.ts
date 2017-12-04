import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
	private loading = false;
	private form = { username: '', password: '' };

	constructor(
		private router: Router,
		private auth: AuthService
	) {}

	ngOnInit() {
		this.auth.logout();
	}

	onSignIn() {
		this.loading = true;
		this.auth.login(this.form)
			.subscribe(result => {
				if (result) {
					this.router.navigate([''])
						.catch(reason => console.log('Redirect error: ', reason));
				} else {
					console.log('Error: username or password incorrect');
					this.loading = false;
				}
			});
	}
}
