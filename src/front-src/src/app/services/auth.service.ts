import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';

const url = 'http://localhost:3000/api';

@Injectable()
export class AuthService {
	private token: string;

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelper ) {
		this.token = localStorage.getItem('token');
	}

	register(credentials: {username, mail, password}): Observable<boolean> {
		return this.http.post(url + '/register', credentials)
			.map((response: any) => {
			if (response.error) {
				console.log(response.error);
				return false;
			}
			return true;
		});
	}

	login(credentials: {username, password}): Observable<boolean> {
		return this.http.post(url + '/login', credentials)
			.map((response: any) => {
			console.log(response);
			if (response.token) {
				this.token = response.token;
				localStorage.setItem('token', response.token);
				const user = this.jwtHelper.decodeToken(response.token);
				// user.roles must be a string with roles two points separated
				// BEGIN TMP
				user.roles = 'student:member';
				// END TMP
				localStorage.setItem('user.roles', user.roles);
				return true;
			}
			return false;
		});
	}

	logout(): void {
		this.token = null;
		localStorage.removeItem('token');
	}
}
