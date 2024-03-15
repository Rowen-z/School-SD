import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AbstractControl, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./login.component";
import { LoginService } from "src/app/services/login/login.service";
import { of, throwError } from "rxjs";
import { Router } from "@angular/router";

/**
 * @author Rowen Zaal
 * Tests for the login component.
 */
describe("LoginComponent", () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let loginService: LoginService;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule],
			declarations: [LoginComponent],
			providers: [LoginService]
		});

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		loginService = TestBed.inject(LoginService);
		router = TestBed.inject(Router);
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should mark the form as invalid when created", () => {
		expect(component.loginForm.valid).toBeFalsy();
	});

	it("should contain a login form with an email field", () => {
		expect(component.loginForm.get("email")).toBeTruthy();
	});

	it("should contain a login form with a password field", () => {
		expect(component.loginForm.get("password")).toBeTruthy();
	});

	it("should mark the email field as invalid when empty", () => {
		const emailField: AbstractControl<string, string> | null = component.loginForm.get("email");

		emailField?.setValue("");

		expect(emailField?.valid).toBeFalsy();
	});

	it("should mark the email field as invalid when an invalid email is provided", () => {
		const emailField: AbstractControl<string, string> | null = component.loginForm.get("email");

		emailField?.setValue("invalid");

		expect(emailField?.valid).toBeFalsy();
	});

	it("should mark the password field as invalid when empty", () => {
		const passwordField: AbstractControl<string, string> | null = component.loginForm.get("password");

		passwordField?.setValue("");

		expect(passwordField?.valid).toBeFalsy();
	});

	it("should mark the form as valid when both email and password fields have valid values", () => {
		const emailField: AbstractControl<string, string> | null = component.loginForm.get("email");
		const passwordField: AbstractControl<string, string> | null = component.loginForm.get("password");

		emailField?.setValue("valid@email.com");
		passwordField?.setValue("NotEmpty");

		expect(component.loginForm.valid).toBeTruthy();
	});

	it("passwordVisible property should be false by default", () => {
		expect(component.passwordVisible).toBeFalse();
	});

	it("passwordVisible property should be true when togglePassword method is called", () => {
		component.togglePassword();

		expect(component.passwordVisible).toBeTrue();
	});

	it("passwordVisible property should be false again when togglePassword method is called twice", () => {
		component.togglePassword();
		component.togglePassword();

		expect(component.passwordVisible).toBeFalse();
	});

	it("showError property should be false by default", () => {
		expect(component.showError).toBeFalse();
	});

	it("showError property should be true when showErrorMessage method is called, after 3 seconds it should be false again", fakeAsync(() => {
		component.showErrorMessage();

		expect(component.showError).toBeTrue();

		tick(3000);

		expect(component.showError).toBeFalse();
	}));

	it("should call the login service when the login form input is valid, user will be navigated to '/' when login is succesful.", () => {
		const loginServiceSpy = spyOn(loginService, "login").and.returnValue(of("Login sucessful"));
		const routerSpy = spyOn(router, "navigateByUrl");

		component.loginForm.patchValue({
			email: "kees@admin.com",
			password: "Testpassword123!"
		});

		component.login();

		expect(loginServiceSpy).toHaveBeenCalledWith("kees@admin.com", "Testpassword123!");
		expect(routerSpy).toHaveBeenCalledWith("/");
	});

	it("errorMessage property should be 'Ongeldige gegevens' when the received error message is 'Invalid input'", () => {
		spyOn(loginService, "login").and.returnValue(throwError({ error: { error: "Invalid input" }}));

		component.loginForm.patchValue({
			email: "kees@admin.com",
			password: "Invalid"
		});

		component.login();

		expect(component.errorMessage).toBe("Ongeldige gegevens");
	});

	it("errorMessage property should be 'Ongeldige gegevens' when the received error message is 'Invalid credentials'", () => {
		spyOn(loginService, "login").and.returnValue(throwError({ error: { error: "Invalid credentials" }}));

		component.loginForm.patchValue({
			email: "kees@unknown.com",
			password: "Testpassword123!"
		});

		component.login();

		expect(component.errorMessage).toBe("Ongeldige gegevens");
	});

	it("errorMessage property should be 'Er is iets misgegaan' when the received error message is not 'Invalid input' or 'Invalid credentials'", () => {
		spyOn(loginService, "login").and.returnValue(throwError({ error: { error: "Unexpected error occured" }}));

		component.loginForm.patchValue({
			email: "kees@admin.com",
			password: "Testpassword123!"
		});

		component.login();

		expect(component.errorMessage).toBe("Er is iets misgegaan");
	});
});
