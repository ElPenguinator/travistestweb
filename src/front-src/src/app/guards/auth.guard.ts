import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot): boolean {
		// get user roles and split it into array
		const userRoles = (localStorage.getItem('user.roles') || '').split(':');
		// get roles required for this route
		const roles = route.data['roles'] as Array<string>;
		// check if user have right to acces this route
		if (roles.filter(
			value1 => userRoles.find(
				value2 => value2 === value1)).length > 0)
			return true;
		this.router.navigate(['/login']);
		return false;
	}
}
