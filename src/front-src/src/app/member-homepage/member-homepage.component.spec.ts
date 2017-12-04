import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHomepageComponent } from './member-homepage.component';

describe('MemberHomepageComponent', () => {
	let component: MemberHomepageComponent;
	let fixture: ComponentFixture<MemberHomepageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MemberHomepageComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MemberHomepageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
